<script>
    import Bead from './Bead.svelte';
    import Grid from './Grid.svelte';
    import NumberCard from './NumberCard.svelte';
    import SpawnArea from '../library/SpanArea.svelte';
    import DragArea from '../library/DragArea.svelte';
    import { onMount } from 'svelte';

    let size = 1;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    let id = 0;
    const getId = () => id++;

    let dragables = [];
    let section, latest;

    onMount(() => {
        // const lightTop = lightRow.getBoundingClientRect().top;
        // const darkTop = darkRow.getBoundingClientRect().top;
        // const beadsRect = beadBox.getBoundingClientRect();
        //
        // lightCards = numbers.map(number => ({
        //     id: getId(), number: number,
        //     y: lightTop + 8, x: 10 + (number * 55)
        // }));
        //
        // darkCards = numbers.map(number => ({
        //     id: getId(), number: number,
        //     y: darkTop + 8, x: 10 + (number * 55)
        // }));
        //
        // beads = [ ...Array(9).keys() ].map(size => ({
        //     id: getId(), size: size + 1,
        //     y: beadsRect.top + ((size) * 20), x: beadsRect.left + 6
        // }));
        //
        // initialLightCards = lightCards.map(c => ({ x: c.x, y: c.y }));
        // initialDarkCards = darkCards.map(c => ({ x: c.x, y: c.y }));
        // initialBeads = beads.map(b => ({ x: b.x, y: b.y }));
        //
        // console.log(initialBeads);
    });

    const onSpawn = (event) => {
        const {component, data} = event.detail;
        const id = getId();
        latest = id;
        dragables.push({ id, component, data });
        dragables = dragables;
    };
    const onMoved = data => console.log(data);
</script>

<style>
    :global(body) {
        background: url(/img/table-top.jpg);
    }
    :global(main) {
        background: none !important;
    }
    section {
        height: 100vh;
        width: 100vw;
        overflow: auto;
    }

    #selector {
        margin-top: 50px;
        display: flex;
    }

    #selector > div {
        display: inline-block;
    }

    #number-rows .numbers-row {
        padding: 10px;
        background: #ffdab9;
        border: 1px solid;
    }

    :global(#number-rows .numbers-row > div:not(:last-child))
    {
        margin-right: 10px;
    }

    :global(#bead-box > div) {
        display: block;
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

        {#each dragables as draggable (draggable.id)}
            <svelte:component this="{draggable.component}" {...draggable.data} pickedUp={draggable.id === latest} index={draggable.id} />
        {/each}

<!--        <div id="selector" bind:this={selector}>-->
<!--            <div id="number-rows">-->
<!--                <div class="numbers-row" bind:this={lightRow}>-->
<!--                    {#each lightCards as card (card.id)}-->
<!--                        <NumberCard y="{card.y}" x="{card.x}" on:moved={onMoved} index="{card.id}">{card.number}</NumberCard>-->
<!--                    {/each}-->
<!--                </div>-->
<!--                <div class="numbers-row" bind:this={darkRow}>-->
<!--                    {#each darkCards as card (card.id)}-->
<!--                        <NumberCard dark={true} y="{card.y}" x="{card.x}" on:moved={onMoved} index="{card.id}">{card.number}</NumberCard>-->
<!--                    {/each}-->
<!--                </div>-->
<!--            </div>-->

<!--            <div id="trash" bind:this="{trash}"></div>-->

<!--            <div id="bead-box" bind:this={beadBox}>-->
<!--                {#each beads as bead}-->
<!--                    <Bead size="{bead.size}" y="{bead.y}" x="{bead.x}" index="{getId()}" on:moved={onMoved}/>-->
<!--                {/each}-->
<!--            </div>-->
<!--        </div>-->
    </DragArea>
</section>
