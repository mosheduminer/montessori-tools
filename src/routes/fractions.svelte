<script>
  import Slice from "../components/fractions/Slice.svelte";
  import DragArea from '../components/library/DragArea.svelte';

  let fraction = 3;
  let offset = 0;
</script>

<svelte:head>
  <title>Fractions - Virtual Montessori Materials</title>
</svelte:head>

<style>
div#fractions {
    position: relative;
    height: 100vh;
    width: 100vw;
    min-height: 100vh;
    min-width: 100vw;
}

:global(div#fractions .container > div) {
    position: absolute;
}
</style>

<div id="fractions">
    <DragArea>
        <Slice fraction={1 / fraction} offset={offset} />
        <input type="number" bind:value={fraction} />
        <input type="number" bind:value={offset} />
    </DragArea>
</div>
