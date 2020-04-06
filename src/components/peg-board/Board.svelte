<script>
  import Peg from "./Peg.svelte";
  import { publish, TOPICS } from '../../lib/pubsub';

  const update = (x, y) => {
    publish(TOPICS.PEG_BOARD.MOVE, { x, y });
  };

  const colors = {
    RED: 'radial-gradient(circle at 50% 50%, rgb(235, 72, 72), rgb(194, 92, 92) 66%)',
    GREEN: 'radial-gradient(circle at 50% 50%, rgb(72, 235, 72), rgb(92, 194, 92) 66%)',
    BLUE: 'radial-gradient(circle at 50% 50%, rgb(72, 72, 235), rgb(92, 92, 194) 66%)'
  };

  const initialPegs = [
    { color: colors.RED, x: 14, y: 14 },
    { color: colors.GREEN, x: 78, y: 14 },
    { color: colors.BLUE, x: 142, y: 14 }
  ];

  let id = 1;
  const getId = () => id++;

  let pegs = [ ...initialPegs.map(p => ({ ...p, id: getId()})) ];

  const movePeg = ({ color, from, to }) => {
    console.log({ from, to, pegs: [...pegs], color });
    const peg = pegs[from.index];
    let success = true;

    // delete peg by moving back to its initial place
    if (to.y === 14 && [14, 78, 142].indexOf(to.x) >= 0) {
      if (from.y !== 14 || (from.y === 14 && [14, 78, 142].indexOf(from.x) < 0)) {
        pegs.splice(from.index, 1);
      } else { // it is another placeholder peg
        success = false;
      }
    // not going back into the drawer
    } else {
      // make sure there is always a dot in the drawer
      if (from.y === 14 && [14, 78, 142].indexOf(from.x) >= 0) {
        pegs.push({ ...initialPegs.find(p => p.x === from.x), id: getId() });
      }
    }

    if (success) {
      pegs = pegs.map(p => p.id === peg.id ? { color, x: to.x, y: to.y, id: peg.id } : p);
    }

    console.log({ success, pegs: [...pegs], color });
    return success;
  }
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: cornsilk;
    background-image: radial-gradient(
      circle at 2rem 2rem,
      rosybrown 0.4rem,
      transparent 0
    );
    background-size: 4rem 4rem;
  }

  #holder {
    display: block;
    height: 4.1rem;
    width: 12.1rem;

    background: #fff8dc;
    border-bottom: 4px solid #cf9059;
    border-right: 4px solid #cf9059;
    box-shadow: 1px 1px 2px rgba(0,0,0,.2);
  }
</style>

<div
  on:mousemove={e => update(e.clientX, e.clientY)}
  on:touchmove|preventDefault={e => update(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}>
  <span id="holder"></span>

  {#each pegs as peg, i (peg.id)}
    <Peg index={i} {...peg} {movePeg} />
  {/each}
</div>
