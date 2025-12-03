import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import shiki from 'shiki';
import path from 'path';
import parseRange from 'parse-numeric-range';

// if we don't replace curly braces with html escape codes, svelte will choke on code
function escapeSvelte(html) {
	return html.replaceAll('{', '&#123;');
}

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	highlight: {
		highlighter: async (code, lang, metastring) => {
			// gotta do some good old-fashioned parsing
			const options = Object.fromEntries(
				(metastring ?? '').split(' ').map((option) => {
					// only split on the first '-' and capture the remainder of the string
					const segments = option.split(/-(.*)/s);
					return [segments[0], segments[1] ?? true];
				})
			);

			const theme = options.theme ?? 'github-dark';
			const numbers = options.numbers ?? false;
			const highlight = options.highlight ?? '';

			const linesOfCode = (code.match(/\n/g) || []).length + 1;
			const lineOptions = parseRange(highlight)
				.filter((line) => line > 0 && line <= linesOfCode)
				.map((line) => ({ line, classes: ['highlighted'] }));

			const highlighter = await shiki.getHighlighter({ theme });
			const tokens = highlighter.codeToThemedTokens(code, lang);
			return shiki.renderToHtml(tokens, {
				lineOptions,
				elements: {
					pre({ className, children }) {
						return `<pre class="${className}">${children}</pre>`;
					},
					code({ children }) {
						return `<code>${escapeSvelte(children)}</code>`;
					}
				}
			});
		}
	},

	layout: path.join(import.meta.dirname, './src/lib/svx/layout.svelte'),

	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
