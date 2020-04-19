<script>
    import Bead from './Bead.svelte';
    import Grid from './Grid.svelte';
    import NumberCard from './NumberCard.svelte';
    import SpawnArea from '../library/SpawnArea.svelte';
    import DragArea from '../library/DragArea.svelte';
    import { onMount } from 'svelte';

    let size = 1;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    let id = 0;
    const getId = () => id++;

    let draggables = [];
    let section, latest;

    const onSpawn = (event) => {
        const {component, data} = event.detail;
        const id = getId();
        latest = id;
        draggables.push({ id, component, data });
        draggables = draggables;
    };
    const onMoved = data => console.log(data);
</script>

<style>
    :global(main) {
        background: none !important;
    }
    section {
        height: 100vh;
        width: 100vw;
        overflow: auto;
        background: url(/img/table-top.jpg);
    }

    #selector {
        margin-top: 50px;
        display: flex;
        align-items: flex-start;
    }

    #selector > div {
        margin: 0 7px;
        box-shadow: 1px 4px 10px rgba(0, 0, 0, .5);
    }

    #number-rows .numbers-row {
        background: #ffdab9;
        border: 1px solid;
        display: grid;
        grid-template-columns: repeat( auto-fit, minmax(48px, 1fr) );
        width: 285px; /* 570 / 2 */
        gap: 10px;
        padding: 10px;
    }

    #selector > #bead-box {
        width: 570px;
        display: flex;
        flex-wrap: wrap;
    }

    :global(#selector > #bead-box > div) {
        padding: 15px;
        background: #ffdab9;
        border: 1px solid;
        flex-grow: 1;
        display: inline-flex;
        justify-content: center;
    }

    @media (min-width: 1500px) {
        #number-rows .numbers-row { width: 570px; }
    }

</style>

<section bind:this={section}>
    <DragArea>
        <Grid />

        <div id="selector">
            <div id="number-rows">
                <div class="numbers-row">
                    {#each numbers as number}
                        <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{dark: false, number}}>
                            <NumberCard disabled="{true}" number={number} />
                        </SpawnArea>
                    {/each}
                </div>
                <div class="numbers-row">
                    {#each numbers as number}
                        <SpawnArea on:spawn={onSpawn} component={NumberCard} data={{dark: true, number}}>
                            <NumberCard disabled="{true}" number={number} dark={true} />
                        </SpawnArea>
                    {/each}
                </div>
            </div>

            <div id="bead-box">
                {#each [ ...Array(9).keys() ] as bead}
                    <SpawnArea on:spawn={onSpawn} component={Bead} data={{dark: true, size: bead + 1}}>
                        <Bead size="{bead + 1}" on:moved={onMoved} disabled={true}/>
                    </SpawnArea>
                {/each}
            </div>
        </div>

        <div id="trash"></div>

        {#each draggables as draggable (draggable.id)}
            <svelte:component this="{draggable.component}" {...draggable.data}
                pickedUp={draggable.id === latest} index={draggable.id}
                on:moved={onMoved} />
        {/each}
    </DragArea>
</section>
