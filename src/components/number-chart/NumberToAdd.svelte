<script>
  import NumberCell from "./NumberCell.svelte";
</script>

<style>
  div {
    display: flex;
    width: 155px;
  }
</style>

<div>
  {#each Array(4) as i}
    <NumberCell on:next />
  {/each}
</div>
