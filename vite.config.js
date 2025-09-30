import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

// Flexible loader for the prerender plugin (handles ESM/CJS/export quirks)
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);

async function loadPrerenderPlugin() {
  try {
    const esm = await import('vite-plugin-prerender');
    return esm.default ?? esm;
  } catch (e1) {
    try {
      // Some versions expose a CJS build but don't export it at package root
      const cjs = require('vite-plugin-prerender/dist/index.cjs');
      return cjs.default ?? cjs;
    } catch (e2) {
      console.warn('[vite] prerender plugin not available:', (e2?.message || e1?.message));
      return null;
    }
  }
}

const isDev = process.env.NODE_ENV !== 'production';
let inlineEditPlugin, editModeDevPlugin;

if (isDev) {
	inlineEditPlugin = (await import('./plugins/visual-editor/vite-plugin-react-inline-editor.js')).default;
	editModeDevPlugin = (await import('./plugins/visual-editor/vite-plugin-edit-mode.js')).default;
}

const configHorizonsViteErrorHandler = `
const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		for (const addedNode of mutation.addedNodes) {
			if (
				addedNode.nodeType === Node.ELEMENT_NODE &&
				(
					addedNode.tagName?.toLowerCase() === 'vite-error-overlay' ||
					addedNode.classList?.contains('backdrop')
				)
			) {
				handleViteOverlay(addedNode);
			}
		}
	}
});

observer.observe(document.documentElement, {
	childList: true,
	subtree: true
});

function handleViteOverlay(node) {
	if (!node.shadowRoot) {
		return;
	}

	const backdrop = node.shadowRoot.querySelector('.backdrop');

	if (backdrop) {
		const overlayHtml = backdrop.outerHTML;
		const parser = new DOMParser();
		const doc = parser.parseFromString(overlayHtml, 'text/html');
		const messageBodyElement = doc.querySelector('.message-body');
		const fileElement = doc.querySelector('.file');
		const messageText = messageBodyElement ? messageBodyElement.textContent.trim() : '';
		const fileText = fileElement ? fileElement.textContent.trim() : '';
		const error = messageText + (fileText ? ' File:' + fileText : '');

		window.parent.postMessage({
			type: 'horizons-vite-error',
			error,
		}, '*');
	}
}
`;

const configHorizonsRuntimeErrorHandler = `
window.onerror = (message, source, lineno, colno, errorObj) => {
	const errorDetails = errorObj ? JSON.stringify({
		name: errorObj.name,
		message: errorObj.message,
		stack: errorObj.stack,
		source,
		lineno,
		colno,
	}) : null;

	window.parent.postMessage({
		type: 'horizons-runtime-error',
		message,
		error: errorDetails
	}, '*');
};
`;

const configHorizonsConsoleErrroHandler = `
const originalConsoleError = console.error;
console.error = function(...args) {
	originalConsoleError.apply(console, args);

	let errorString = '';

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg instanceof Error) {
			errorString = arg.stack || \`\${arg.name}: \${arg.message}\`;
			break;
		}
	}

	if (!errorString) {
		errorString = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
	}

	window.parent.postMessage({
		type: 'horizons-console-error',
		error: errorString
	}, '*');
};
`;

const configWindowFetchMonkeyPatch = `
const originalFetch = window.fetch;

window.fetch = function(...args) {
	const url = args[0] instanceof Request ? args[0].url : args[0];

	// Skip WebSocket URLs
	if (url.startsWith('ws:') || url.startsWith('wss:')) {
		return originalFetch.apply(this, args);
	}

	return originalFetch.apply(this, args)
		.then(async response => {
			const contentType = response.headers.get('Content-Type') || '';

			// Exclude HTML document responses and known failing external services
			const isDocumentResponse =
				contentType.includes('text/html') ||
				contentType.includes('application/xhtml+xml');
			
			const isKnownFailingService = 
				url.includes('forms.hsforms.com') ||
				url.includes('connect.facebook.net') ||
				url.includes('js.hs-scripts.com');

			if (!response.ok && !isDocumentResponse && !isKnownFailingService) {
				try {
					const responseClone = response.clone();
					const errorFromRes = await responseClone.text();
					const requestUrl = response.url;
					console.warn(\`Fetch warning from \${requestUrl}: \${response.status}\`);
				} catch (e) {
					// Silently ignore errors when reading response
				}
			}

			return response;
		})
		.catch(error => {
			// Only log errors for our own resources, not external services
			if (!url.includes('forms.hsforms.com') && !url.includes('connect.facebook.net') && !url.match(/\.html?$/i)) {
				console.warn('Network error:', error.message);
			}
			throw error;
		});
};
`;

const addTransformIndexHtml = {
	name: 'add-transform-index-html',
	transformIndexHtml(html) {
		return {
			html,
			tags: [
				{
					tag: 'script',
					children: configHorizonsRuntimeErrorHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					children: configHorizonsViteErrorHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					children: configHorizonsConsoleErrroHandler,
					injectTo: 'head',
				},
				{
					tag: 'script',
					children: configWindowFetchMonkeyPatch,
					injectTo: 'head',
				},
			],
		};
	},
};

console.warn = () => {};

const logger = createLogger();
const loggerError = logger.error;
logger.error = (msg, options) => {
	if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) {
		return;
	}
	loggerError(msg, options);
};

// Resolve the prerender plugin (Vite supports async config)
const Prerender = await loadPrerenderPlugin();

export default defineConfig({
	customLogger: logger,
	plugins: [
		...(isDev ? [inlineEditPlugin(), editModeDevPlugin()] : []),
		react(),
		addTransformIndexHtml,

		// Add prerender plugin only if it loaded successfully
		...(Prerender ? [
			Prerender({
				routes: (() => {
					try { return JSON.parse(readFileSync('.prerender-routes.json', 'utf-8')); }
					catch { return ['/']; } // fallback if the routes file isn't there
				})(),
				renderAfterDocumentEvent: 'app-rendered', // fire after async route data is ready
				staticDir: 'dist',
				postProcess: (c) => {
					// write /route/index.html (good for static hosting)
					c.outputPath = c.route.endsWith('/')
						? c.outputPath
						: c.outputPath.replace(/\.html$/, '/index.html');
					return c;
				}
			})
		] : [])
	],
	server: {
		cors: true,
		headers: {
			'Cross-Origin-Embedder-Policy': 'credentialless',
		},
		allowedHosts: true,
	},
	resolve: {
		extensions: ['.jsx', '.js', '.tsx', '.ts', '.json' ],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		modulePreload: false, // Disable modulepreload to avoid console warnings
		rollupOptions: {
			output: {
				// Aggressive chunk splitting for better caching and parallel loading
				manualChunks: (id) => {
					// Core React bundle - highest priority
					if (id.includes('react') || id.includes('react-dom')) {
						return 'react-core';
					}
					
					// React Router - second priority for navigation
					if (id.includes('react-router-dom')) {
						return 'react-router';
					}
					
					// Critical UI components - split into smaller chunks
					if (id.includes('@radix-ui/react-toast')) {
						return 'ui-toast';
					}
					if (id.includes('@radix-ui')) {
						return 'ui-radix';
					}
					if (id.includes('class-variance-authority') || id.includes('clsx') || id.includes('tailwind-merge')) {
						return 'ui-utils';
					}
					
					// Icons - separate chunk since they're used selectively
					if (id.includes('lucide-react')) {
						return 'icons';
					}
					
					// Animation library - defer loading
					if (id.includes('framer-motion')) {
						return 'animations';
					}
					
					// Third-party integrations - load only when needed
					if (id.includes('react-helmet-async')) {
						return 'helmet';
					}
					if (id.includes('react-gtm-module')) {
						return 'gtm';
					}
					
					// Lodash if present
					if (id.includes('lodash')) {
						return 'lodash';
					}
					
					// Other vendor code
					if (id.includes('node_modules')) {
						// Group small modules together to avoid too many requests
						const module = id.split('node_modules/')[1];
						const packageName = module.split('/')[0];
						if (packageName.length < 10) {
							return 'vendor-misc';
						}
						return 'vendor';
					}
					
					// App code splitting
					if (id.includes('/src/pages/')) {
						// Split each major page separately for better caching
						if (id.includes('HomePage')) return 'page-home';
						if (id.includes('BlogPage') || id.includes('BlogPost')) return 'page-blog';
						if (id.includes('LpSpinning')) return 'page-lp-spinning';
						if (id.includes('LpWebinar')) return 'page-lp-webinar';
						if (id.includes('ServiceDetailPage') || id.includes('ServicesPage')) return 'page-services';
						return 'pages-other';
					}
					
					// Core components used across pages
					if (id.includes('/src/components/')) {
						if (id.includes('Header') || id.includes('Footer')) {
							return 'layout-critical';
						}
						if (id.includes('SEO') || id.includes('Schema')) {
							return 'seo';
						}
						if (id.includes('Hero') || id.includes('OptimizedImage') || id.includes('LazyHeroImage')) {
							return 'images';
						}
						if (id.includes('HubSpot')) {
							return 'hubspot-components';
						}
						return 'components';
					}
				},
				// Optimize asset file names with longer hashes for better caching
				assetFileNames: (assetInfo) => {
					const info = assetInfo.name.split('.');
					const extType = info[info.length - 1];
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						return `images/[name]-[hash:12][extname]`;
					}
					return `assets/[name]-[hash:12][extname]`;
				},
				chunkFileNames: `js/[name]-[hash:12].js`,
				entryFileNames: `js/[name]-[hash:12].js`,
			},
		},
		// Enable tree shaking and better optimization
		target: 'es2020',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
				unused: true,
				dead_code: true,
				passes: 3,
				module: true,
				toplevel: true,
			},
			mangle: {
				safari10: true,
				toplevel: true,
			},
			format: {
				comments: false,
			},
		},
		cssMinify: true,
		cssCodeSplit: true,
		assetsInlineLimit: 4096,
		chunkSizeWarningLimit: 500,
		sourcemap: false,
	},
	// Optimize dependencies
	optimizeDeps: {
		include: [
			'react', 
			'react-dom',
			'react-router-dom',
			'clsx',
			'class-variance-authority'
		],
		exclude: [
			'framer-motion',
			'react-gtm-module'
		]
	},
	// Additional build optimizations
	esbuild: {
		drop: ['console', 'debugger'],
	}
});
