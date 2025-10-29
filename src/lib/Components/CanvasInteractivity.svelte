<script lang="ts">
  import { onMount } from 'svelte';
  import { interactivity } from '@threlte/extras';

  // Run only on the client, after this component has been
  // mounted as part of the <Canvas> subtree.
  onMount(() => {
    interactivity();
  });
</script>
