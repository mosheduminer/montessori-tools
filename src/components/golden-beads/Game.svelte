<script>
  import BeadGroup from "./BeadGroup.svelte";
  import ThousandBeads from "./ThousandBeads.svelte";
  import Cards from "./Cards.svelte";
  import DragArea from "../library/DragArea.svelte";
  import SpawnArea from "../library/SpawnArea.svelte";
  import SpawnContainer from "./SpawnContainer.svelte";

  const dimensions = [
    { width: 10, height: 10 },
    { width: 1, height: 10 },
    { width: 1, height: 1 },
  ];

  let draggables = [];

  let latest;
  let id = 0;
  const getId = () => id++;

  const spawn = ({ detail }) => {
    const { component, data } = detail;
    const id = getId();
    latest = id;
    draggables = draggables.concat({ id, component, data });
  };
</script>

<style>
  section {
    height: 100vh;
  }

  #selectors {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap-reverse;
  }

  #beads-selector {
    background: #fff3e1;
    border: 4px solid #895f2b;
    display: inline-grid;
    grid-template-columns: 3fr 3fr 2fr 2fr;
  }
</style>

<section>
  <DragArea draggable={draggables} {latest}>
    <div id="selectors">
      <Cards on:spawn={spawn} />

      <div id="beads-selector">
        <SpawnContainer>
          <SpawnArea
            component={ThousandBeads}
            on:spawn={spawn}
            data={{ width: 10, height: 10 }}>
            <ThousandBeads disabled={true} />
          </SpawnArea>
        </SpawnContainer>
        {#each dimensions as dimension}
          <SpawnContainer>
            <SpawnArea
              component={BeadGroup}
              on:spawn={spawn}
              data={{ width: dimension.width, height: dimension.height }}>
              <BeadGroup
                disabled={true}
                width={dimension.width}
                height={dimension.height} />
            </SpawnArea>
          </SpawnContainer>
        {/each}
      </div>
    </div>
  </DragArea>
</section>
