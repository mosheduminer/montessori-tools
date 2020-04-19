<script>
    import { spring } from 'svelte/motion';
    import { createEventDispatcher, onMount } from 'svelte';
    import { TOPICS, subscribe } from "../../lib/pubsub";

    export let x;
    export let y;
    export let index;
    export let normalize;
    export let validate;

    let element;
    let listener;
    let coords;
    const dispatch = createEventDispatcher();
    let offset = { x: 0, y: 0 }

    onMount(() => {
        let rect = element.getBoundingClientRect();
        let initialPos = {
            x: x || offset.x,
            y: y || offset.y
        };
        coords = spring(initialPos, {stiffness: 1, damping: 0.8});
    });

    const update = (x, y) => {
        const rect = element.getBoundingClientRect();
        coords.set({
            x: x - offset.x,
            y: y - offset.y
        });
    };

    const pickUp = (e) => {
        var rect = element.getBoundingClientRect();
        offset = {
            x: e.offsetX || (e.targetTouches[0].pageX - rect.left),
            y: e.offsetY || (e.targetTouches[0].pageY - rect.top)
        }
        // move 100 levels above it's current z-index to ensure we catch click events
        element.style.zIndex = ((parseInt(element.style.zIndex) || 0) + 100).toString();
        unsubscribe = unsubscribe || movePosition.subscribe(movement => {
            update(movement.x, movement.y);
        })
    };

    const putDown = () => {
        element.style.zIndex = ((parseInt(element.style.zIndex) || 100) - 100).toString();

        if (listener && listener.removed) {
            listener.remove();
            listener = undefined;
        }

        let normalized = normalize && typeof normalize === 'function'
            ? normalize($coords.x, $coords.y)
            : { x: $coords.x, y: $coords.y };

        const data = {
            index,
            from: { x, y },
            to: { x: normalized.x, y: normalized.y }
        };

        if (validate && typeof validate === 'function' && !validate(data)) {
            coords.set({x, y});
        } else {
            dispatch('moved', data);
        }
    }
</script>

<style>
    div { position: absolute; }
</style>

<div
    {...$$restProps}
    bind:this={element}
    on:mousedown={pickUp}
    on:mouseup={putDown}
    on:touchstart={pickUp}
    on:touchend={putDown}
    style="left: {$coords && $coords.x + 'px'}; top: {$coords && $coords.y + 'px'};">
    <slot />
</div>