<script lang="ts">
	import type { ProjectStatus } from '$lib/projects';

	export let link = '';
	export let title = 'Project Name';
	export let status: ProjectStatus = {
		text: 'Unset',
		description: 'Unset',
		colorClass: ''
	};
</script>

<div class="mb-10">
	<h3>
		<a class="text-zinc-800 mr-1" target="_blank" href={link}>
			{title}
		</a>
		<span
			title={status.description}
			class="uppercase border-dashed hover:border-b-2 font-semibold text-xs {status.colorClass}"
		>
			{status.text}
		</span>
	</h3>
	<div class="mb-4 leading-6 text-gray-800 text-base">
		<slot />
	</div>
</div>
