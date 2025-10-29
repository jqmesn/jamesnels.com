<script lang="ts">
	import CanvasPortal from '$lib/Components/CanvasPortal.svelte';
	import { T } from '@threlte/core';
</script>

<!-- 3D content -->
<CanvasPortal>
	<T.PerspectiveCamera
		makeDefault
		position={[10, 10, 10]}
		oncreate={(ref) => {
			ref.lookAt(0, 1, 0);
		}}
	/>
	<T.Mesh>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshBasicMaterial color="red" />
	</T.Mesh>
</CanvasPortal>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
