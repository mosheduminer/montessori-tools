<script>
    import { createEventDispatcher } from 'svelte';
    import { getOffset } from '../../lib/utils';

    export let component;
    export let data;

    let element;

    const dispatch = createEventDispatcher();

    const spawn = (event) => {
        const rect = element.getBoundingClientRect();
        dispatch('spawn', { component, data: {
            x: rect.left,
            y: rect.top,
            startOffset: getOffset(event, rect),
            ...data
        }});
    }
</script>

<style>
    div { display: inline-flex; }
</style>

<div on:mousedown={spawn} on:touchstart={spawn} {...$$restProps} bind:this={element}>
    <slot />
</div>
