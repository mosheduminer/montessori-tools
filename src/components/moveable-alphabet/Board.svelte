<script>
  import Letter from "./Letter.svelte";
  import { publish, TOPICS } from "../../lib/pubsub";

  const update = (x, y) => {
    publish(TOPICS.ALPHABET_BOARD.MOVE, { x, y });
  };

  const pageWith = process.browser ? window.innerWidth : 1024;
  let grid = {
    offsetX: 14,
    offsetY: 14,
    height: 80,
    width: 64,
  }
  if (pageWith < 800) {
    grid.height = 64
    grid.width = 52
  }
  if (pageWith < 400) {
    grid.height = 48
    grid.width = 40
  }

  const colors = {
    RED: "#FA2200",
    BLUE: "#3977C0",
  };
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const constants = "aeiou".split("");
  const amountPerRow = Math.min(Math.round((pageWith - 80) / grid.width), 13);
  const drawerHeight = 22 + Math.ceil(26 / amountPerRow) * grid.height;

  const initialLetters = alphabet.map((char, index) => {
    return {
      char: char,
      color: constants.includes(char) ? colors.BLUE : colors.RED,
      x: 14 + (index % amountPerRow) * grid.width,
      y: 14 + Math.floor(index / amountPerRow) * grid.height,
      grid
    };
  });

  const findBaseLetter = ({ x, y }) => {
    return initialLetters.find((c) => c.x === x && c.y === y);
  };

  const isBaseCoord = ({ x, y }) => !!findBaseLetter({ x, y });
  const isNotBaseCoord = ({ x, y }) => !findBaseLetter({ x, y });

  let id = 1;
  const getId = () => id++;

  let letters = [...initialLetters.map((l) => ({ ...l, id: getId() }))];

  const moveLetter = ({ index, from, to }) => {
    const letter = letters[index];
    let letterMoved = true;

    // delete letter by moving back to its initial place
    if (isBaseCoord(to)) {
      if (isNotBaseCoord(from)) {
        letters.splice(index, 1);
      } else {
        // it is another placeholder letter
        letterMoved = false;
      }
      // not going back into the drawer
    } else {
      // make sure there is always a letter in the drawer
      if (isBaseCoord(from)) {
        letters.push({
          ...findBaseLetter(from),
          id: getId(),
        });
      }
    }

    if (letterMoved) {
      letters = letters.map((l) =>
        l.id === letter.id ? { ...l, x: to.x, y: to.y, id: letter.id } : l
      );
    }

    return letterMoved;
  };

  const fonts = ["abcprint", "macursiveul"];
  const fontNames = ["Print font", "Cursive font"];
  let fontIndex = 0;
  const changeFont = () => (fontIndex = (fontIndex + 1) % 2);
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    position: absolute;
  }

  #holder {
    display: block;
    width: 100%;
    background: url(/img/smooth-wood.jpg);
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  .font-button {
    font-size: 1rem;
    position: fixed;
    bottom: 8px;
    right: 8px;
    z-index: 2;
  }
</style>

<section id="moveable-alphabet-board">

  <div
    style={`font-family: ${fonts[fontIndex]};`}
    on:mousemove={(e) => update(e.clientX, e.clientY)}
    on:touchmove|preventDefault={(e) => update(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}>

    <span id="holder" style={`height: ${drawerHeight}px;`} />
    <button
      class="font-button"
      style={`font-family: ${fonts[(fontIndex + 1) % 2]};`}
      on:click={changeFont}>
      {fontNames[(fontIndex + 1) % 2]}
    </button>

    {#each letters as letter, i (letter.id)}
      <Letter index={i} {...letter} {moveLetter} />
    {/each}
  </div>
</section>
