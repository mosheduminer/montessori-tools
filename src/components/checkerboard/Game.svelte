<script>
    import Bead from './Bead.svelte';
    import Grid from './Grid.svelte';
    import NumberCard from './NumberCard.svelte';
    import DragArea from '../library/DragArea.svelte';
    import { onMount } from 'svelte';

    let size = 1;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    const onMoved = data => console.log(data);

    let section, selector, lightRow, darkRow, trash, beadBox;

    let lightCards = [], initialLightCards = [],
        darkCards = [], initialDarkCards = [],
        beads = [], initialBeads = [];

    let id = 0;
    const getId = () => id++;

    onMount(() => {
        const lightTop = lightRow.getBoundingClientRect().top;
        const darkTop = darkRow.getBoundingClientRect().top;
        const beadsRect = beadBox.getBoundingClientRect();

        lightCards = numbers.map(number => ({
            id: getId(), number: number,
            y: lightTop + 8, x: 10 + (number * 55)
        }));

        darkCards = numbers.map(number => ({
            id: getId(), number: number,
            y: darkTop + 8, x: 10 + (number * 55)
        }));

        beads = [ ...Array(9).keys() ].map(size => ({
            id: getId(), size: size + 1,
            y: beadsRect.top + ((size) * 20), x: beadsRect.left + 6
        }));

        initialLightCards = lightCards.map(c => ({ x: c.x, y: c.y }));
        initialDarkCards = darkCards.map(c => ({ x: c.x, y: c.y }));
        initialBeads = beads.map(b => ({ x: b.x, y: b.y }));

        console.log(initialBeads);
    })
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
        margin-top: 65px;
        display: flex;
    }

    #selector > div {
        display: inline-block;
    }

    #number-rows .numbers-row {
        height: 60px;
        width: 575px;
        background: #ffdab9;
        border: 1px solid;
    }
</style>

<section bind:this={section}>
    <DragArea>
        <Grid />

        <div id="selector" bind:this={selector}>
            <div id="number-rows">
                <div class="numbers-row" bind:this={lightRow}>
                    {#each lightCards as card (card.id)}
                        <NumberCard y="{card.y}" x="{card.x}" on:moved={onMoved} index="{card.id}">{card.number}</NumberCard>
                    {/each}
                </div>
                <div class="numbers-row" bind:this={darkRow}>
                    {#each darkCards as card (card.id)}
                        <NumberCard dark={true} y="{card.y}" x="{card.x}" on:moved={onMoved} index="{card.id}">{card.number}</NumberCard>
                    {/each}
                </div>
            </div>

            <div id="trash" bind:this="{trash}"></div>

            <div id="bead-box" bind:this={beadBox}>
                {#each beads as bead}
                    <Bead size="{bead.size}" y="{bead.y}" x="{bead.x}" index="{getId()}" on:moved={onMoved}/>
                {/each}
            </div>
        </div>
    </DragArea>
</section>
