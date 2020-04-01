<script>
  import Peg from "./Peg.svelte";

  let updater;
</script>

<style>
  div {
    height: calc(100% - 57px);
    width: 100%;
    position: absolute;
    background-color: cornsilk;
    background-image: radial-gradient(
      circle at 2rem 2rem,
      rosybrown 0.4rem,
      transparent 0
    );
    background-size: 4rem 4rem;
  }
</style>

<div
  on:mousemove={e => (updater.update ? updater.update(e.clientX, e.clientY) : null)}
  on:touchmove|preventDefault={e => (updater.update ? updater.update(e.changedTouches[0].clientX, e.changedTouches[0].clientY) : null)}>
  <Peg bind:updater color={'red'} />
  <Peg bind:updater color={'green'} initialCoords={{ x: 78, y: 14 }} />
  <Peg bind:updater color={'blue'} initialCoords={{ x: 142, y: 14 }} />
</div>
