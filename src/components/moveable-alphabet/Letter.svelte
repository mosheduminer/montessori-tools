<script>
  import Draggable from '../library/Draggable.svelte';

  export let color;
  export let char;
  export let cursive = false;
</script>

<style>
  :global(.letter-container) {
    box-sizing: border-box;
    padding: 2px;
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .letter {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 0.5px solid black;
    border-radius: 2px;
    user-select: none;
  }
</style>

<Draggable {...$$restProps} style="color: {color};" class="letter-container" on:moved>
  <span class="letter" class:cursive={cursive}>
    {char}
  </span>
</Draggable>
