<script>
    import { TOPICS, publish } from "../../lib/pubsub";

    const update = (x, y) => {
        publish(topic, {x, y});
    }
</script>

<style>
    div {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
</style>

<div
    {...$$restProps}
    on:mousemove="{e => update(e.clientX, e.clientY)}"
    on:touchmove|preventDefault={e => update(
        e.changedTouches[0].clientX, e.changedTouches[0].clientY
    )}>
    <slot />
</div>