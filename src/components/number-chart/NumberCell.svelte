<script>
  import { createEventDispatcher, onMount } from "svelte";
  export let index;
  const dispatch = createEventDispatcher();
  let value;
  let element;
  // svelte starts throwing warnings for the autofocus attribute (accessiblity issues)
  // and technically, autofocus="false" autofocus="true" are invalid, so I don't know it would be toggable
  onMount(() => {
    if (index === 0) {
      element.focus();
    }
  });
  const onKeyup = () => {
    if (value !== undefined) {
      let next = element.nextElementSibling;
      if (next && next.tagName.toLowerCase() === "input") {
        next.focus();
      } else {
        dispatch("next");
      }
    }
  };
</script>

<style>
  input {
    width: 36px;
    font-size: 32px;
  }
</style>

<input
  bind:this={element}
  bind:value
  on:keyup={onKeyup}
  type="number"
  min="0"
  max="9" />
