<script>
  import NumberToAdd from "./NumberToAdd.svelte";

  let numberOfRows = 1;
  const addRow = () => {
      numberOfRows++;
  }
</script>

<style>
  div {
    display: inline-flex;
    flex-direction: column;
    max-width: 160px;
    margin-left: -4px;
  }
</style>

<div>
  {#each Array(numberOfRows) as i}
    <NumberToAdd on:next={addRow} />
  {/each}
</div>
