import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { codeToHtml } from 'shiki';
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
			const highlight = options.highlight ?? '';

			const linesOfCode = (code.match(/\n/g) || []).length + 1;
			const highlightedLines = parseRange(highlight).filter(
				(line) => line > 0 && line <= linesOfCode
			);

			const html = await codeToHtml(code, {
				lang: lang || 'text',
				theme,
				transformers: [
					{
						pre(node) {
							// drop shiki's inline background/tabindex so the site's pre.shiki styles apply
							delete node.properties.style;
							delete node.properties.tabindex;
						},
						line(node, line) {
							if (highlightedLines.includes(line)) {
								this.addClassToHast(node, 'highlighted');
							}
						}
					}
				]
			});
			return escapeSvelte(html);
		}
	},

	layout: path.join(import.meta.dirname, './src/lib/svx/layout.svelte'),

	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
