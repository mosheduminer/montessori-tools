<script>
  import Nav from "../components/library/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    padding: 0em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
