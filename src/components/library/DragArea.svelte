<script>
    import { publish, TOPICS } from '../../lib/pubsub';

    export let topic = TOPICS.DRAG_AREA.MOVE;
    export let draggable = [];
    export let latest = undefined;

    let element;
    const update = (x, y) => {
        publish(topic || TOPICS.DRAG_AREA.MOVE, { x: x + element.scrollLeft, y: y + element.scrollTop });
    }
</script>

<style>
    div {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
</style>

<div
    bind:this={element}
    {...$$restProps}
    on:mousemove="{e => update(e.clientX, e.clientY)}"
    on:touchmove|preventDefault={e => update(
        e.changedTouches[0].clientX, e.changedTouches[0].clientY
    )}>
    <slot />

    {#each draggable as draggable (draggable.id)}
        <svelte:component this="{draggable.component}" {...draggable.data}
                          startPickedUp={draggable.id === latest} index={draggable.id}
                          on:moved />
    {/each}
</div>