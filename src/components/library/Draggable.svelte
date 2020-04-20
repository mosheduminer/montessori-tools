<script>
    import { spring } from 'svelte/motion';
    import { createEventDispatcher, onMount } from 'svelte';
    import { subscribe, TOPICS } from '../../lib/pubsub';

    export let x = undefined;
    export let y = undefined;
    export let index = undefined;
    export let topic = TOPICS.DRAG_AREA.MOVE;
    export let normalize = undefined;
    export let validate = undefined;
    export let disabled = false;

    let element;
    let listener;
    let coords;
    const dispatch = createEventDispatcher();
    let offset = { x: 0, y: 0 };

    export let startPickedUp = false;
    let startPickedUpTimeout = setTimeout(putDown, 500);

    let pickedUp;

    onMount(() => {
        if (disabled) return;

        let initialPos = {
            x: x || offset.x,
            y: y || offset.y
        };
        coords = spring(initialPos, {stiffness: 1, damping: 0.8});

        if (startPickedUp) {
            pickUp();
        }
    });

    const update = (x, y) => {
        if (disabled) return;
        coords.set({
            x: x - offset.x,
            y: y - offset.y
        });

        if (startPickedUp) {
            clearTimeout(startPickedUpTimeout);
            startPickedUpTimeout = setTimeout(putDown, 500);
        }
    };

    const pickUp = (e) => {
        if (disabled) return;

        const rect = element.getBoundingClientRect();
        offset = {
            x: e ? e.offsetX || (e.targetTouches[0].pageX - rect.left) : rect.width / 2,
            y: e ? e.offsetY || (e.targetTouches[0].pageY - rect.top) : rect.height / 2
        };
        // move 100 levels above it's current z-index to ensure we catch click events
        element.style.zIndex = ((parseInt(element.style.zIndex) || 0) + 100).toString();
        listener = listener || subscribe(
                (topic || TOPICS.DRAG_AREA.MOVE),
                ({x, y}) => update(x, y)
        );
        pickedUp = true;
    };

    var putDown = () => {
        if (disabled) return;

        element.style.zIndex = ((parseInt(element.style.zIndex) || 100) - 100).toString();

        if (listener && listener.remove) {
            listener = listener.remove();
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
            console.log('validateFailed');
            coords.set({x, y});
        } else {
            dispatch('moved', data);
        }

        pickedUp = false;
    }
</script>

<style>
    div.draggable {
        position: absolute;
    }
</style>

<div
    {...$$restProps}
    bind:this={element}
    on:mousedown={pickUp}
    on:mouseup={putDown}
    on:touchstart={pickUp}
    on:touchend={putDown}
    class:draggable={!disabled}
    class:pickedUp={pickedUp}
    style="left: {$coords && $coords.x + 'px'};
        top: {$coords && $coords.y + 'px'};
        cursor: {disabled ? 'auto' : pickedUp ? 'grabbing' : 'grab'}">
    <slot />
</div>