<script>
  import BeadGroup from "./BeadGroup.svelte";
  import DragArea from "../library/DragArea.svelte";
  import SpawnArea from "../library/SpawnArea.svelte";

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

<SpawnArea component={BeadGroup} on:spawn={spawn} data={{width: 10, height: 10}}>
  <BeadGroup disabled={true} width={10} height={10} />
</SpawnArea>

<DragArea>
  {#each draggables as draggable (draggable.id)}
    <svelte:component
      this={draggable.component}
      {...draggable.data}
      startPickedUp={draggable.id === latest}
      index={draggable.id} />
  {/each}
</DragArea>
