<script>
    export let color;
    export let vertical = false;
    export let button = true;

    let leftArr = [...Array(10).keys()];
    let rightArr = [];

    const slideAudio = typeof Audio !== 'undefined' && new Audio('/audio/abacus.mp3');
    const onClick = (index) => {
        leftArr = [...Array(index).keys()];
        rightArr = [...Array(10 - index).keys()];
        slideAudio.volume = 0.1;
        slideAudio.play();
    }

    // transitions
    // https://svelte.dev/tutorial/deferred-transitions
    import { cubicInOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 300,
                easing: cubicInOut,
                css: t => `
                    transform: ${transform} scale(${t});
                    opacity: ${t}`
            };
        }
    });
</script>

<style>
    .rod:not(.vertical) {
        display: flex;
        background: linear-gradient(180deg,
            rgba(0,0,0,0) calc(50% - 0.25rem),
            rgb(193,154,107) calc(50%),
            rgba(0,0,0,0) calc(50% + 0.25rem)
        );
        margin-bottom: 3.25rem;
    }

    .rod.vertical {
        display: inline-flex;
        background: linear-gradient(90deg,
            rgba(0,0,0,0) calc(50% - 0.15rem),
            rgb(0, 0, 0) calc(50%),
            rgba(0,0,0,0) calc(50% + 0.15rem)
        );
        flex-direction: column;
        height: 100%;
    }

    .bead {
        border-radius: 50%;
        height: 1.5rem;
        width: 1.5rem;
    }
    button {
        margin-left: calc(80vw);
        float: right;
        position: absolute;
        border-radius: 50%;
        background-color: green;
    }
</style>

{#if button}
    <button type="button" on:click={() => onClick(10)}>&#8634</button>
{/if}
<div class="rod" class:vertical={vertical}>
    {#each leftArr as index}
        <span on:click={() => onClick(index)}
            in:receive={{key: index}}
            out:send={{key: index}}
            style="background: {color};" class="bead" />
    {/each}
    <span style="opacity: 0; flex-grow: 1;" class="bead" />
    {#each rightArr as index (index + leftArr.length)}
        <span
            style="{color ? `background: ${color};` : ''}" class="bead"
            on:click={() => onClick(leftArr.length + index + 1)}
            in:receive={{ key: leftArr.length + index }}
            out:send={{key: leftArr.length + index}} />
    {/each}
</div>
