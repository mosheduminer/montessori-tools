<script>
    import {formatNumber} from '../lib/utils';
    import Rod from "../components/abacus/Rod.svelte";
    import DragArea from "../components/library/DragArea.svelte";
    import NumberCards from "../components/library/NumberCards.svelte";

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

    #bead-frame {
        width: calc(100% - 100px);
        max-width: 1500px;
        max-height: 800px;
        height: 75%;
        margin: 5px auto 0;
        background: url(/img/border.jpg);
        padding: 60px 50px;
        border-radius: 8px;
        position: relative;
        flex-grow: 1;
        box-sizing: border-box;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, .4);
        border: 1px solid #000;
    }

    #bead-frame-top {
        height: 60px;
        position: absolute;
        top: 0;
        display: flex;
        width: calc(100% - 100px);
    }

    .bead-top-cell {
        flex-grow: 1;
        width: 33%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 20px;
        font-family: macursiveul;
        color: rgb(193,154,107);
    }

    .bead-top-cell:first-child { background: #333; }
    .bead-top-cell:nth-child(2) { background: #ccc; }
    .bead-top-cell:nth-child(3) { background: #fff; }

    .bead-top-cell > span {
        flex-grow: 1;
        width: 33%;
    }

    .bead-top-cell > span:first-child {
        width: 100%;
    }

    #bead-content {
        background: url(/img/smooth-wood.jpg);
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    :global(#bead-content .rod .bead) {
        background: radial-gradient(circle at 50% 50%, rgb(235, 170, 72), rgb(160, 126, 63) 66%)
    }

    #bead-frame-right {
        width: 50px;
        height: calc(100% - 120px);
        position: absolute;
        right: 0;
        top: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    #bead-frame-right .dot {
        display: block;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #fff;
    }

    #bead-frame-right .dot.green { background: green; }
    #bead-frame-right .dot.blue { background: blue; }
    #bead-frame-right .dot.red { background: red; }

    #bead-frame-bottom {
        height: 60px;
        font-size: 27px;
        color: #f5840f;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>

<svelte:head>
    <title>Bead Frame - Virtual Montessori Materials</title>
</svelte:head>

<section>
    <button on:click={emptyTrash} id="trash">
        <img src="/icons/recycle.svg" alt="Clear" />
    </button>
    <DragArea draggable={draggable} latest="{latest}">
        <div id="bead-frame">
            <div id="bead-frame-top">
                {#each [ ...[ ...Array(3).keys() ].reverse() ] as i}
                    <div class="bead-top-cell">
                        <span>{formatNumber(1000 ** i)}</span>
                        <span>100</span>
                        <span>10</span>
                        <span>1</span>
                    </div>
                {/each}
            </div>
            <div id="bead-content">
                {#each [ ...Array(9).keys() ] as i}
                    <Rod vertical={true} button={false} />
                {/each}
            </div>
            <div id="bead-frame-right">
                <span class="dot green"></span>
                <span class="dot red"></span>
                <span class="dot blue"></span>
                <span class="dot green"></span>
            </div>
            <div id="bead-frame-bottom">
                {#each [ ...Array(9).keys() ] as i}
                <span>0</span>
                {/each}
            </div>
        </div>
        <NumberCards on:spawn={onSpawn} />
</DragArea>
</section>

