import { JSDOM } from 'jsdom';

/**
 * Convert HTML string to Strapi Rich Text blocks format
 */
export function htmlToStrapiBlocks(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const body = document.body;

  const blocks = [];

  // Helper to collect inline text nodes with formatting
  function collectInlineContent(node) {
    const inlineNodes = [];

    function traverse(n, formatting = {}) {
      if (n.nodeType === 3) {
        // Text node
        const text = n.textContent;
        if (text) {
          const textNode = { type: 'text', text };
          if (formatting.bold) textNode.bold = true;
          if (formatting.italic) textNode.italic = true;
          if (formatting.url) {
            return {
              type: 'link',
              url: formatting.url,
              children: [{ type: 'text', text }]
            };
          }
          inlineNodes.push(textNode);
        }
      } else if (n.nodeType === 1) {
        const tagName = n.tagName.toLowerCase();
        const newFormatting = { ...formatting };

        if (tagName === 'strong' || tagName === 'b') {
          newFormatting.bold = true;
        } else if (tagName === 'em' || tagName === 'i') {
          newFormatting.italic = true;
        } else if (tagName === 'a') {
          const href = n.getAttribute('href');
          const linkText = n.textContent;
          if (href && linkText) {
            inlineNodes.push({
              type: 'link',
              url: href,
              children: [{ type: 'text', text: linkText }]
            });
          }
          return; // Don't process children separately
        } else if (tagName === 'br') {
          return; // Skip br tags
        } else if (tagName === 'p') {
          // In inline context, treat paragraph as just its content
          Array.from(n.childNodes).forEach(child => traverse(child, formatting));
          return;
        }

        // Process children
        Array.from(n.childNodes).forEach(child => traverse(child, newFormatting));
      }
    }

    traverse(node);
    return inlineNodes.length > 0 ? inlineNodes : [{ type: 'text', text: '' }];
  }

  // Process block-level nodes
  function processBlock(node) {
    if (node.nodeType === 3) {
      const text = node.textContent.trim();
      if (text) {
        return {
          type: 'paragraph',
          children: [{ type: 'text', text }]
        };
      }
      return null;
    }

    if (node.nodeType !== 1) return null;

    const tagName = node.tagName.toLowerCase();

    switch (tagName) {
      case 'p':
        const pChildren = collectInlineContent(node);
        if (pChildren.length === 0 || (pChildren.length === 1 && pChildren[0].text === '')) {
          return null; // Skip empty paragraphs
        }
        return {
          type: 'paragraph',
          children: pChildren
        };

      case 'h1':
        return {
          type: 'heading',
          level: 1,
          children: collectInlineContent(node)
        };

      case 'h2':
        return {
          type: 'heading',
          level: 2,
          children: collectInlineContent(node)
        };

      case 'h3':
        return {
          type: 'heading',
          level: 3,
          children: collectInlineContent(node)
        };

      case 'h4':
        return {
          type: 'heading',
          level: 4,
          children: collectInlineContent(node)
        };

      case 'ul':
        const ulItems = Array.from(node.children)
          .filter(child => child.tagName.toLowerCase() === 'li')
          .map(li => ({
            type: 'list-item',
            children: collectInlineContent(li)
          }));
        if (ulItems.length === 0) return null;
        return {
          type: 'list',
          format: 'unordered',
          children: ulItems
        };

      case 'ol':
        const olItems = Array.from(node.children)
          .filter(child => child.tagName.toLowerCase() === 'li')
          .map(li => ({
            type: 'list-item',
            children: collectInlineContent(li)
          }));
        if (olItems.length === 0) return null;
        return {
          type: 'list',
          format: 'ordered',
          children: olItems
        };

      case 'blockquote':
        const quoteChildren = collectInlineContent(node);
        if (quoteChildren.length === 0) return null;
        return {
          type: 'quote',
          children: quoteChildren
        };

      case 'code':
        return {
          type: 'code',
          children: [{ type: 'text', text: node.textContent }]
        };

      case 'hr':
        return {
          type: 'paragraph',
          children: [{ type: 'text', text: '---' }]
        };

      case 'br':
        return null; // Skip br tags at block level

      default:
        // For unhandled tags, try to extract text content
        const text = node.textContent.trim();
        if (text) {
          return {
            type: 'paragraph',
            children: [{ type: 'text', text }]
          };
        }
        return null;
    }
  }

  // Process all top-level nodes
  Array.from(body.childNodes).forEach(node => {
    const block = processBlock(node);
    if (block) {
      blocks.push(block);
    }
  });

  return blocks;
}
