<script>
  import Slice from "../components/fractions/Slice.svelte";
  import DragArea from '../components/library/DragArea.svelte';
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

/* img {
    position: absolute;
    width: 356px;
    top: -44px;
    left: -27px;
} */

:global(div#fractions .container > div) {
    position: absolute;
}
</style>

<div id="fractions">
    <DragArea>
        <Slice fraction={6} number={1} />
        <Slice fraction={6} number={2} />
        <Slice fraction={6} number={3} />
        <Slice fraction={6} number={4} />
        <Slice fraction={6} number={5} />
        <Slice fraction={6} number={6} />
    </DragArea>
</div>
