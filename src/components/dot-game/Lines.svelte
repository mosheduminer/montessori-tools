<script>
  export let lines;
  import Line from "./Line.svelte";
</script>

{#each lines as line}
  <Line {line} />
{/each}
