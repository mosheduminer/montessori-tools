<script>
  import { penColor } from "./store";
  import screenshot from "../../lib/screenshot";

  export let chart;

  const setColor = color => {
    penColor.set(color);
  };

  const saveImage = () => {
    screenshot(chart, 'number-chart');
  }

  const copyChart = () => {
    screenshot(chart, 'number-chart', true);
  }
</script>

<style>
  span {
    border-style: double;
    min-height: 35px;
    display: inline-block;
  }
  img {
    cursor: pointer;
    padding: 0px;
    margin-bottom: -5px;
    min-height: 35px;
  }
  img:hover {
    background-color: gainsboro;
  }
</style>

<div>
  <span>
    <img
      src="/icons/edit-blue.svg"
      alt="Blue Pen"
      title="Blue Pen"
      on:click={() => setColor('blue')} />
    <img
      src="/icons/edit-green.svg"
      alt="Green Pen"
      title="Green Pen"
      on:click={() => setColor('green')} />
    <img
      src="/icons/edit-red.svg"
      alt="Red Pen"
      title="Red Pen"
      on:click={() => setColor('red')} />
    <img
      src="/icons/edit-black.svg"
      alt="Black Pen"
      title="Black Pen"
      on:click={() => setColor('black')} />
    <img
      src="/icons/eraser.svg"
      alt="Eraser"
      title="Eraser"
      on:click={() => setColor('white')} />

    <button on:click={copyChart}>Save to Clipboard</button>
    <button on:click={saveImage}>Download Image</button>
  </span>
</div>
