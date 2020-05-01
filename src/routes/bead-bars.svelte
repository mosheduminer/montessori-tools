<script>
    import Bead from '../components/checkerboard/Bead.svelte';
    import Grid from '../components/checkerboard/Grid.svelte';
    import NumberCard from '../components/checkerboard/NumberCard.svelte';
    import SpawnArea from '../components/library/SpawnArea.svelte';
    import DragArea from '../components/library/DragArea.svelte';

    let size = 1;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    let id = 0;
    const getId = () => id++;

    let draggables = [];
    let positions = {};
    let section, latest;

    let trash;
    const sweepAudio = typeof Audio !== 'undefined' && new Audio('/audio/sweep.mp3');

    const onSpawn = (event) => {
        const {component, data} = event.detail;
        const id = getId();
        latest = id;
        draggables.push({ id, component, data });
        draggables = draggables;
    };
    const onMoved = data => {
        positions[data.detail.index] = data.detail.to;
    };

    const emptyTrash = () => {
        const trashRect = trash.getBoundingClientRect();
        var ids = Object.entries(positions)
                .filter(pos => pos[1].x >= trashRect.left
                        && pos[1].x <= trashRect.right
                        && pos[1].y >= trashRect.top
                        && pos[1].y <= trashRect.bottom)
                .map(pos => parseInt(pos[0]));

        positions = {};
        draggables = draggables.filter(item => ids.indexOf(item.id) < 0);
        sweepAudio && sweepAudio.play();
    }
</script>

<style>
    section {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: url(/img/table-top.jpg);
    }

    #selector {
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 10px;
        display: flex;
        max-width: 1620px;
    }

    #selector > div {
        margin: 0 7px;
        box-shadow: 1px 4px 10px rgba(0, 0, 0, .5);
        flex-grow: 1;
    }

    #number-rows .numbers-row {
        background: #ffdab9;
        border: 1px solid;
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(48px, 1fr) );
        gap: 10px;
        padding: 10px;
        margin: 0 auto 10px;
    }

    #selector > #bead-box {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #7f522a;
        max-width: 400px;
    }

    #selector #right {
        display: inline-flex;
        flex-direction: column;
    }

    #trash {
        flex-grow: 1;
        max-height: 250px;
        background: #ffdab9;
        border: 5px solid #7f522a;
        box-sizing: border-box;
        align-self: normal;
    }

    #trash > button {
        max-height: 60px;
        max-width: 60px;
        background: #5edc5e;
        border: none;
        padding: 10px;
        border-radius: 0;
        border-bottom-right-radius: 35%;
        cursor: pointer;
        transition: .1s ease-in-out;
        user-select: none;
    }

    #trash > button:hover {
        max-height: 65px;
        max-width: 65px;
    }

    img {
        max-height: 100%;
        max-width: 100%;
    }

    @media (max-width: 1325px) {
        #selector {
            margin-top: 30px;
        }
    }

    :global(#checkerboard-game #selector > #bead-box > div) {
        padding: 15px;
        background: #ffdab9;
        border: 2px solid #7f522a;
        flex-grow: 1;
        display: inline-flex;
        justify-content: center;
    }

    @media (min-width: 1500px) {
        #number-rows .numbers-row { width: 570px; }
    }

    #grid {
        width: 100%;
        max-width: 1620px;
        min-height: 480px;
        background: #ffdab9;
        border: 5px solid #7f522a;
        box-sizing: border-box;
        margin: 0 auto;
        box-shadow: 0px 0px 18px inset rgba(0, 0, 0, .5), 1px 1px 10px rgba(0, 0, 0, .5);
    }
</style>

<section bind:this={section} id="checkerboard-game">
    <DragArea>
        <div id="grid"></div>

        <div id="selector">
            <div id="right">
                <div id="number-rows">
                    <div class="numbers-row">
                        {#each numbers as number}
                            <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{dark: false, number}}>
                                <NumberCard disabled="{true}" number={number} />
                            </SpawnArea>
                        {/each}
                    </div>
                </div>

                <div id="trash" bind:this={trash}>
                    <button on:click={emptyTrash}>
                        <img src="/icons/recycle.svg" alt="Clear" />
                    </button>
                </div>
            </div>

            <div id="bead-box">
                {#each [ ...Array(9).keys() ] as bead}
                    <SpawnArea on:spawn={onSpawn} component={Bead} data={{dark: true, size: bead + 1, fullSize: true, shouldRotate: true}}>
                        <Bead size="{bead + 1}" on:moved={onMoved} disabled={true} fullSize={true}/>
                    </SpawnArea>
                {/each}
            </div>

        </div>

        {#each draggables as draggable (draggable.id)}
            <svelte:component this="{draggable.component}" {...draggable.data}
                              startPickedUp={draggable.id === latest} index={draggable.id}
                              on:moved={onMoved} />
        {/each}
    </DragArea>
</section>
