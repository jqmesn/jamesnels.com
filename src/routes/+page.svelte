<script lang="ts">
	import CanvasPortal from '$lib/Components/CanvasPortal.svelte';
	import CanvasInteractivity from '$lib/Components/CanvasInteractivity.svelte';
	import { T } from '@threlte/core';
	//import { interactivity } from '@threlte/extras';
	import { Spring } from 'svelte/motion';

	//interactivity()
	const scale = new Spring(1);
</script>

<!-- 3D content -->
<CanvasPortal>
  <CanvasInteractivity />
	<T.PerspectiveCamera
		makeDefault
		position={[10, 10, 10]}
		oncreate={(ref) => {
			ref.lookAt(0, 1, 0);
		}}
	/>
	<T.Mesh
	  position.y={1}
  	scale={scale.current}
    onpointerenter={() => {
      scale.target = 1.5
    }}
    onpointerleave={() => {
      scale.target = 1
    }}
	>
		<T.BoxGeometry args={[1, 1, 1]} />
		<T.MeshBasicMaterial color="red" />
	</T.Mesh>
</CanvasPortal>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
