<script lang="ts">
	import MediaIcon from './MediaIcon.svelte';

	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const nav = [
		{ path: resolve('/'), title: 'Articles' },
		{ path: resolve('/about'), title: 'About me' },
		{ path: resolve('/projects'), title: 'Projects' },
		{ path: resolve('/videos'), title: 'Videos' }
	];
</script>

<div class="mx-auto max-w-screen-lg">
	<div class="float-left p-10 sm:w-1/3 w-full">
		<img class="w-20 h-20 mb-4" src="/profile.png" alt="Aaron James" />

		<h4>Aaron James</h4>

		<p class="text-gray-500 mb-6">The ramblings of a security researcher who likes tooling.</p>

		<ul class="mb-8">
			{#each nav as navItem (navItem.path)}
				<li class="my-2">
					<a
						class={`text-zinc-800 hover:text-amber-500 hover:border-current border-solid border-b ${
							navItem.path === page.url.pathname ? 'border-current' : 'border-transparent'
						}`}
						href={navItem.path}
					>
						{navItem.title}
					</a>
				</li>
			{/each}
		</ul>

		<ul class="mb-8 flex flex-row space-x-1 items-center">
			<MediaIcon link="https://www.linkedin.com/in/aaron-james-eason" icon="linkedin" />
			<MediaIcon link="https://github.com/KNOXDEV" icon="github" />
			<MediaIcon link="mailto:nick@knox.codes" icon="email" />
		</ul>

		<p class="text-gray-400 text-sm">&copy; All rights reserved.</p>
	</div>
	<div class="p-10 float-left sm:w-2/3 w-full">
		{@render children?.()}
	</div>
</div>
