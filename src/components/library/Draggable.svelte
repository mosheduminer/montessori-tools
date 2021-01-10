<script>
    import { spring } from "svelte/motion";
    import { createEventDispatcher, onMount } from "svelte";
    import { subscribe, TOPICS } from "../../lib/pubsub";
    import { getOffset } from "../../lib/utils";

    export let x = undefined;
    export let y = undefined;
    export let index = undefined;
    export let topic = TOPICS.DRAG_AREA.MOVE;
    export let normalize = undefined;
    export let validate = undefined;
    export let disabled = false;
    export let style = "";
    export let rotateDegrees = 0;

    //     const pickupAudio = typeof Audio !== 'undefined' && new Audio('/audio/pickup.mp3');
    //     const putdownAudio = typeof Audio !== 'undefined' && new Audio('/audio/putdown.mp3');

    let element, listener, coords, isRotated;
    const dispatch = createEventDispatcher();
    let offset = { x: 0, y: 0 };
    let initialRect;

    $: isRotated = rotateDegrees % 360 !== 0;

    export let startPickedUp = false;
    export let startOffset = undefined;

    let pickedUp;

    onMount(() => {
        if (disabled) return;

        let initialPos = {
            x: x || offset.x,
            y: y || offset.y,
        };
        coords = spring(initialPos, { stiffness: 1, damping: 0.8 });

        if (startPickedUp) {
            offset = startOffset || offset;
            pickUp(undefined, true);
        }

        initialRect = element.getBoundingClientRect();
    });

    const update = (x, y) => {
        if (disabled) return;
        coords.set({
            x: x - offset.x,
            y: y - offset.y,
        });

        if (startPickedUp) {
            clearTimeout(startPickedUpTimeout);
            startPickedUpTimeout = setTimeout(putDown, 500);
        }
    };

    const pickUp = (e, useStartOffset) => {
        if (disabled) return;

        const rect = element.getBoundingClientRect();
        if (!useStartOffset && !isRotated) {
            // TODO: Fix FireFox
            offset = getOffset(e, rect);
        } else if (isRotated) {
            // get the diff from a straight circle
            const widthDiff = (initialRect.width - rect.width) / 2;
            const heightDiff = (initialRect.height - rect.height) / 2;

            offset = getOffset(e, rect);
            offset.x += widthDiff;
            offset.y += heightDiff;
        }

        // move 100 levels above it's current z-index to ensure we catch click events
        element &&
            (element.style.zIndex = (
                (parseInt(element.style.zIndex) || 0) + 100
            ).toString());
        listener =
            listener ||
            subscribe(topic || TOPICS.DRAG_AREA.MOVE, ({ x, y }) =>
                update(x, y)
            );
        pickedUp = true;
        //         pickupAudio && (pickupAudio.volume = 0.2);
        //         pickupAudio && pickupAudio.play();
    };

    var putDown = () => {
        if (disabled) return;

        element &&
            (element.style.zIndex = (
                (parseInt(element.style.zIndex) || 100) - 100
            ).toString());

        if (listener && listener.remove) {
            listener = listener.remove();
        }

        let normalized =
            normalize && typeof normalize === "function"
                ? normalize($coords.x, $coords.y)
                : { x: $coords ? $coords.x : 0, y: $coords ? $coords.y : 0 };

        const data = {
            index,
            from: { x, y },
            to: { x: normalized.x, y: normalized.y },
        };

        if (validate && typeof validate === "function" && !validate(data)) {
            coords.set({ x, y });
        } else {
            dispatch("moved", data);
        }

        pickedUp = false;
        startPickedUp = false;
        //         putdownAudio && (putdownAudio.volume = 0.2);
        //         putdownAudio && putdownAudio.play();
    };

    const onWheel = (event) => {
        if (!pickedUp) {
            dispatch("wheel", event);
        }
    };

    let startPickedUpTimeout = setTimeout(putDown, 500);
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
    on:touchstart|preventDefault={(e) => {
        if (e.touches.length === 1) pickUp(e);
        else e.stopPropagation();
    }}
    on:touchmove|preventDefault={(e) => {
        if (e.touches.length > 1) {
            dispatch("touchrotate", e);
            putDown();
            e.stopPropagation();
        }
    }}
    on:wheel|stopPropagation|preventDefault={onWheel}
    class:draggable={!disabled}
    class:pickedUp
    style="left: {$coords && $coords.x + 'px'};
        top: {$coords && $coords.y + 'px'};
        cursor: {disabled ? 'auto' : pickedUp ? 'grabbing' : 'grab'};
        transform: rotate({rotateDegrees}deg);
        {style}">
    <slot />
</div>

<svelte:window on:mouseup={putDown} on:touchend={e => {putDown(); dispatch("touchrotateend")}} />
