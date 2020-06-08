<script>
  import NumberCard from "./NumberCard.svelte";
  import SpawnArea from "../library/SpawnArea.svelte";

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let magnitudes = [1000, 100, 10, 1];
  let colors = ['green', 'blue', 'red', 'green']
</script>

<style>
  #number-spawn-area {
    display: inline-grid;
    border: 4px solid #895f2b;
    background-color: burlywood;
    padding: 5px;
    grid-template-columns: calc(24px + 3rem) calc(24px + 2rem) calc(24px + 1rem) 24px;
    grid-gap: 5px;
  }
</style>

<div id="number-spawn-area">
  {#each numbers as number, columnIndex}
    {#each magnitudes as magnitude, index}
      <SpawnArea
        on:spawn
        component={NumberCard}
        data={{ style: `color: ${colors[index]}; width: calc(24px + ${3 - index}rem); padding-left: 0; padding-right: 0; z-index: ${10000 - (3 - index * 500)}`, 
          number: number * magnitude }}>
        <NumberCard
          disabled={true}
          x={index === 3 ? 136 : index === 2 ? 80 : index === 1 ? 40 : 16}
          y={columnIndex * 44 + 16}
          number={number * magnitude}
          style={`color: ${colors[index]}; width: calc(24px + ${3 - index}rem); padding-left: 0; padding-right: 0; z-index: ${10000 - (3 - index * 500)}`} />
      </SpawnArea>
    {/each}
  {/each}
</div>
