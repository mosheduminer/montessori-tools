<script>
  import NumberCard from "../checkerboard/NumberCard.svelte";
  import SpawnArea from "../library/SpawnArea.svelte";

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let magnitudes = [1, 10, 100, 1000];
</script>

<style>
  #number-spawn-area {
    display: grid;
    background-color: burlywood;
    width: 216px;
    height: 420px;
    padding: 1px;
    grid-template-columns: 22px calc(22px + 1rem) calc(22px + 2rem) calc(
        22px + 3rem
      );
  }
  .number-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
  }
</style>

<div id="number-spawn-area">
  {#each magnitudes as magnitude, index}
    <div class="number-column">
      {#each numbers as number, columnIndex}
        <SpawnArea
          on:spawn
          component={NumberCard}
          data={{ style: `width: calc(22px + ${index}rem); padding-left: 0; padding-right: 0; z-index: ${500 - index}`, 
            number: number * magnitude }}>
          <NumberCard
            disabled={true}
            x={index === 3 ? 136 : index === 2 ? 80 : index === 1 ? 40 : 16}
            y={columnIndex * 44 + 16}
            number={number * magnitude}
            style={`width: calc(22px + ${index}rem); padding-left: 0; padding-right: 0; z-index: ${500 - index}`} />
        </SpawnArea>
      {/each}
    </div>
  {/each}
</div>
