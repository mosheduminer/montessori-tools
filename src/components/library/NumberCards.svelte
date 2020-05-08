<script>
    import { createEventDispatcher } from 'svelte';
    import NumberCard from '../../components/checkerboard/NumberCard.svelte';
    import SpawnArea from "./SpawnArea.svelte";

    export let light = true;
    export let dark = true;

    export let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    // const dispatch = createEventDispatcher();
    // const spawn = (event) => {
    //     dispatch('spawn', event.detail);
    // }
</script>

<style>
    #number-box {
        margin: 20px auto 10px;
        border: 10px solid #5e432e;
        min-height: 115px;
        width: 580px;
        background: url(/img/smooth-wood.jpg);
        
        display: flex;
        flex-direction: column;
    }

    .number-box-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        flex-grow: 1;
    }
</style>

<div id="number-box">
    {#if dark}
    <div class="number-box-row">
        {#each numbers as number}
            <SpawnArea on:spawn component={NumberCard} data={{dark: true, number}}>
                <NumberCard disabled="{true}" number={number} dark={true} />
            </SpawnArea>
        {/each}
    </div>
    {/if}

    {#if light}
    <div class="number-box-row">
        {#each numbers as number}
            <SpawnArea on:spawn component={NumberCard} data={{dark: false, number}}>
                <NumberCard disabled="{true}" number={number} dark={false} />
            </SpawnArea>
        {/each}
    </div>
    {/if}
</div>