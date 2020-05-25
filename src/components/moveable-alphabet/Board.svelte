<script>
  import Letter from "./Letter.svelte";
  import DragArea from '../library/DragArea.svelte';
  import SpawnArea from '../library/SpawnArea.svelte';

  const sweepAudio = typeof Audio !== 'undefined' && new Audio('/audio/sweep.mp3');
  let latest = 0, draggable = [];

  const onSpawn = (event) => {
      const {component, data} = event.detail;
      const id = ++latest;
      draggable.push({ id, component, data });
      draggable = draggable;
  }

  const emptyTrash = () => {
      sweepAudio.volume = .3;
      sweepAudio.play();
      draggable = [];
  }

  const colors = {
    RED: "#FA2200",
    BLUE: "#3977C0",
  };

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const constants = "aeiou".split("");

  const initialLetters = alphabet.map((char, index) => {
    return {
      char: char,
      color: constants.includes(char) ? colors.BLUE : colors.RED
    };
  });

  let id = 1;
  const getId = () => id++;

  let letters = [...initialLetters.map((l) => ({ ...l, id: getId() }))];

  const fonts = ["abcprint", "macursiveul"];
  const fontSizes = ["36px", "40px"];
  const fontNames = ["Print font", "Cursive font"];
  let fontIndex = 0;
  const changeFont = () => (fontIndex = (fontIndex + 1) % 2);
</script>

<style>
  #moveable-alphabet-board {
    height: 100vh;
  }

  #holder {
    background: url(/img/smooth-wood.jpg);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    border: 4px solid blue;
    padding: 10px;
    display: block;
    margin: 12px auto;
    width: fit-content;
    max-width: 80%;
    text-align: center;
  }

  .font-button {
    font-size: 28px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    padding: 8px;
    background: none;
    border: none;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    border-top-right-radius: 10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

   #trash {
      position: fixed;
      height: 65px;
      width: 65px;
      left: 0;
      top: 0;
      background: #ffdab9;
      padding: 8px;
      border-bottom-right-radius: 15%;
      z-index: 1000;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
  }
</style>

<section id="moveable-alphabet-board" style={`font-family: ${fonts[fontIndex]}; font-size: ${fontSizes[fontIndex]};`}>
  <button on:click={emptyTrash} id="trash">
      <img src="/icons/recycle.svg" alt="Clear" />
  </button>

  <DragArea draggable={draggable} latest={latest}>
    <div id="holder">
      {#each initialLetters as letter}
        <SpawnArea on:spawn={onSpawn} component={Letter} data={{...letter}}>
          <Letter disabled={true} {...letter} />
        </SpawnArea>
      {/each}
    </div>
  </DragArea>
  

  <div>
    <button
      class="font-button"
      style={`font-family: ${fonts[(fontIndex + 1) % 2]};`}
      on:click={changeFont}>
      {fontNames[(fontIndex + 1) % 2]}
    </button>

    <!-- {#each letters as letter, i (letter.id)}
      <Letter index={i} {...letter} {moveLetter} />
    {/each} -->
  </div>
</section>
