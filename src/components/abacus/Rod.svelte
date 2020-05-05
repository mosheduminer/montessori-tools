<script>
    export let color = "red";

    let leftArr = [...Array(10).keys()];
    let rightArr = [];

    const onClick = (index) => {
        leftArr = [...Array(index).keys()];
        rightArr = [...Array(10 - index).keys()];
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
    .rod {
        display: flex;
        background: linear-gradient(180deg,
            rgba(0,0,0,0) calc(50% - 0.25rem),
            rgb(193,154,107) calc(50%),
            rgba(0,0,0,0) calc(50% + 0.25rem)
        );
        margin-bottom: 3.25rem;
    }
    .bead {
        border-radius: 50%;
        height: 1.5rem;
        width: 1.5rem;
    }
    button {
        margin-left: calc(min(1024px, 75vw) + 10px);
        float: right;
        position: absolute;
        border-radius: 50%;
        background-color: green;
    }
</style>

<button type="button" on:click={() => onClick(10)}>&#8634</button>
<div class="rod">
    {#each leftArr as index}
        <span on:click={() => onClick(index)}
            in:receive={{key: index}}
            out:send={{key: index}}
            style="background: {color};" class="bead" />
    {/each}
    <span style="opacity: 0; flex-grow: 1;" class="bead" />
    {#each rightArr as index (index + leftArr.length)}
        <span on:click={() => onClick(leftArr.length + index + 1)}
            in:receive={{key: leftArr.length + index}}
            out:send={{key: leftArr.length + index}}
            style="background: {color};" class="bead" />
    {/each}
</div>
