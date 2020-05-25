<script>
    import {formatNumber} from '../lib/utils';
    import DragArea from "../components/library/DragArea.svelte";
    import SpawnArea from '../components/library/SpawnArea.svelte';
    import NumberCard from '../components/library/NumberCard.svelte';
    import DraggableImage from '../components/library/DraggableImage.svelte';
    import ScratchPad from '../components/ScratchPad.svelte';

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
    section {
        height: 100vh;
        background: url(/img/table-top.jpg);
        display: flex;
        flex-direction: column;
    }

    #play-zone {
        display: flex;
        justify-content: space-around;
        padding: 15px;
    }

    #selector-box {

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
    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>

<svelte:head>
    <title>Bead Frame - Virtual Montessori Materials</title>
</svelte:head>

<section>
    <!-- <button on:click={emptyTrash} id="trash">
        <img src="/icons/recycle.svg" alt="Clear" />
    </button> -->
    <DragArea draggable={draggable} latest="{latest}">
        <div id="play-zone">
            <ScratchPad />
            <div id="selector-box">
                <div class="top-selector">
                    <SpawnArea>
                        <img src="/icons/skittle.red.png" height="50" alt=""/>
                    </SpawnArea>
                    <SpawnArea>
                        <img src="/icons/skittle.blue.png" height="50" alt=""/>
                    </SpawnArea>
                    <SpawnArea>
                        <img src="/icons/skittle.green.png" height="50" alt=""/>
                    </SpawnArea>
                </div>
                <div class="top-selector">

                </div>
                <div class="number-selector">
                    <SpawnArea on:spawn component={NumberCard} data={{color: 'green', number: 1000}}>
                        <NumberCard disabled="{true}" number={1000} color='green' />
                    </SpawnArea>
                </div>
                <div class="number-selector">
                    <SpawnArea on:spawn component={NumberCard} data={{color: 'red', number: 100}}>
                        <NumberCard disabled="{true}" number={100} color='red' />
                    </SpawnArea>
                </div>
                <div class="number-selector">
                    <SpawnArea on:spawn component={NumberCard} data={{color: 'blue', number: 10}}>
                        <NumberCard disabled="{true}" number={10} color='blue' />
                    </SpawnArea>
                </div>
                <div class="number-selector">
                    <SpawnArea on:spawn component={NumberCard} data={{color: 'green', number: 1}}>
                        <NumberCard disabled="{true}" number={1} color='green' />
                    </SpawnArea>
                </div>
            </div>
        </div>
        
    </DragArea>
</section>