/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
				'2xl': '1400px',
			},
		},
		extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Purple: 88, 28, 135
					foreground: 'hsl(var(--primary-foreground))', // White
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Pink: 0, 149, 110 (using Teal for now as Pink doesn't fit typical secondary usage) -> adjusted to Teal from user's palette
					foreground: 'hsl(var(--secondary-foreground))', // White
				},
        accent: {
					DEFAULT: 'hsl(var(--accent))', // Blue: 37, 99, 125
					foreground: 'hsl(var(--accent-foreground))', // White
				},
        highlight: {
          DEFAULT: 'hsl(var(--highlight))', // Green: 37, 235, 209
          foreground: 'hsl(var(--highlight-foreground))', // Black
        },
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))', // Gray: 157, 157, 156
					foreground: 'hsl(var(--muted-foreground))', // White
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
        'pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};