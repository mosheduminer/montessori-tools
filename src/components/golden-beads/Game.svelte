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
  #spawn-area {
    padding: 1rem;
    width: 50rem;
    background-color: burlywood;
    display: grid;
    grid-template-columns: 220px repeat(4, 1fr);
  }
  #cover {
    position: absolute;
    top: 160px;
    left: 220px;
    height: 300px;
    width: 615px;
    background-color: white;
  }
</style>

<DragArea style="height: 100vh" draggable={draggables} {latest}>
  <div id="cover" />
  <div id="spawn-area">
    <Cards on:spawn={spawn} />
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
</DragArea>
