<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import CanvasPortalTarget from '$lib/Components/CanvasPortalTarget.svelte';
	import { Canvas } from '@threlte/core';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="absolute top-0 left-0 h-full w-full">
	<Canvas>
		<CanvasPortalTarget />
	</Canvas>
</div>

<div class="min-h-screen bg-zinc-300">
	{@render children?.()}
</div>
