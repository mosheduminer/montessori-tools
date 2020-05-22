<script>
  import Letter from "./Letter.svelte";
  import { publish, TOPICS } from "../../lib/pubsub";

  const update = (x, y) => {
    publish(TOPICS.ALPHABET_BOARD.MOVE, { x, y });
  };

  const colors = {
    RED: "#FA2200",
    BLUE: "#3977C0",
  };
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const constants = "aeiou".split("");
  const amountPerRow = 13;

  const initialLetters = alphabet.map((char, index) => {
    return {
      char: char,
      color: constants.includes(char) ? colors.BLUE : colors.RED,
      x: 14 + (index % amountPerRow) * 64,
      y: 14 + Math.floor(index / amountPerRow) * 80,
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
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: cornsilk;
    /* background-image: radial-gradient(
      circle at 2rem 2.5rem,
      rosybrown 0.4rem,
      transparent 0
    ); */
    /* background-size: 4rem 4rem; */
  }

  #holder {
    display: block;
    /* 14 + 72 + 8 + 72 + 14 */
    height: 180px;
    width: 100%;

    background: url(/img/smooth-wood.jpg);
    /* border-bottom: 4px solid #cf9059; */
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
</style>

<section id="moveable-alphabet-board">

  <div
    on:mousemove={(e) => update(e.clientX, e.clientY)}
    on:touchmove|preventDefault={(e) => update(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}>
    <span id="holder" />

    {#each letters as letter, i (letter.id)}
      <Letter index={i} {...letter} {moveLetter} />
    {/each}
  </div>
</section>
