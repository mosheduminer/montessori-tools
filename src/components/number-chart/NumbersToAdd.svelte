<script>
  import NumberToAdd from "./NumberToAdd.svelte";

  let numberOfRows = 1;
  const addRow = () => {
    numberOfRows++;
  };
</script>

<style>
  button {
    height: 25px;
    font-weight: bold;
    background-color: #4299e1;
    color: white;
    cursor: pointer;
    margin-top: -2px;
    margin-bottom: 4px;
    margin-right: 10px;
    margin-left: 10px;
  }
  button:hover {
    background-color: #2b6cb0;
  }
  div {
    display: inline-flex;
    flex-direction: column;
    margin-left: -4px;
    margin-top: 0px;
    vertical-align: top;
  }
</style>

<div>
  <button type="button" on:click={addRow}>&plus;</button>
  {#each Array(numberOfRows) as i}
    <NumberToAdd on:next={addRow} />
  {/each}
</div>
