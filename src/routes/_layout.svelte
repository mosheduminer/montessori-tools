<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    background-color: white;
    padding: 0em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
