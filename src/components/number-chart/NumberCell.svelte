<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let value;
  let element;
  const onKeyup = () => {
    if (value !== undefined) {
      let next = element.nextElementSibling;
      if (next && next.tagName.toLowerCase() === "input") {
        next.focus();
      }
    }
  };
</script>

<style>
  input {
    width: 36px;
    font-size: 20px;
    border-width: 1px;
  }
</style>

<input
  bind:this={element}
  bind:value
  on:keyup={onKeyup}
  type="number"
  min="0"
  max="9" />
