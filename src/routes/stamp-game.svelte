<script>
  import Skittle from "../components/stamp-game/Skittle.svelte";
  import Circle from "../components/stamp-game/Circle.svelte";
  import NumberCard from "../components/stamp-game/NumberCard.svelte";
  import ScratchPad from "../components/stamp-game/ScratchPad.svelte";
  import DragArea from '../components/library/DragArea.svelte';
  import SpawnArea from '../components/library/SpawnArea.svelte';

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
</script>

<style>
  #stamp-game {
    height: 100vh;
  }

  #controls {
    margin: 6px auto;
    text-align: center;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 95%;
    justify-content: space-around;
  }

  #controls > div {
    margin: 6px;
  }

  #game-box {
    align-items: stretch;
    border: 4px solid #895f2b;
    display: grid;
    grid-template-areas: "skittle skittle circle circle";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 5fr 6fr;
    justify-items: stretch;
    margin: auto;
    max-width: 570px;
    width: 100%;
  }

  #game-box > div {
    align-items: center;
    background: #fff3e1;
    border: 4px solid #895f2b;
    display: flex;
    justify-content: space-around;
    padding: 8px;
  }

  #game-box .skittles {
    grid-area: skittle;
  }
  #game-box .circles {
    grid-area: circle;
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

<svelte:head>
  <title>Stamp Game - Virtual Montessori Materials</title>
</svelte:head>

<section id="stamp-game">
  <button on:click={emptyTrash} id="trash">
      <img src="/icons/recycle.svg" alt="Clear" />
  </button>

  <DragArea draggable={draggable} latest={latest}>
    <div id="controls">
      <div id="game-box">
        <div class="skittles">
          <SpawnArea on:spawn={onSpawn} component={Skittle} data={{ color: "red" }}>
            <Skittle color="red" disabled={true} />
          </SpawnArea>
          <SpawnArea on:spawn={onSpawn} component={Skittle} data={{ color: "blue" }}>
            <Skittle color="blue" disabled={true} />
          </SpawnArea>
          <SpawnArea on:spawn={onSpawn} component={Skittle} data={{ color: "green" }}>
            <Skittle color="green" disabled={true} />
          </SpawnArea>
        </div>
        <div class="circles">
          <SpawnArea on:spawn={onSpawn} component={Circle} data={{ color: "red" }}>
            <Circle color="red" disabled={true} />
          </SpawnArea>
          <SpawnArea on:spawn={onSpawn} component={Circle} data={{ color: "blue" }}>
            <Circle color="blue" disabled={true} />
          </SpawnArea>
          <SpawnArea on:spawn={onSpawn} component={Circle} data={{ color: "green" }}>
            <Circle color="green" disabled={true} />
          </SpawnArea>
        </div>
        <div>
          <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{ color: "green", number: 1000 }}>
            <NumberCard color="green" number={1000} disabled={true} />
          </SpawnArea>
        </div>
        <div>
          <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{ color: "red", number: 100 }}>
            <NumberCard color="red" number={100} disabled={true} />
          </SpawnArea>
        </div>
        <div>
          <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{ color: "blue", number: 10 }}>
            <NumberCard color="blue" number={10} disabled={true} />
          </SpawnArea>
        </div>
        <div>
          <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{ color: "green", number: 1 }}>
            <NumberCard color="green" number={1} disabled={true} />
          </SpawnArea>
        </div>
      </div>
      <ScratchPad />
    </div>
  </DragArea>
</section>
