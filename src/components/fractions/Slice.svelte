<script>
    import Draggable from "../library/Draggable.svelte";

    export let fraction = 1;
    export let number = 1;

</script>

<style>
    :global(.fraction-slice) {
        position: absolute;
        height: 300px;
        width: 300px;
        background: radial-gradient(circle, rgb(235, 72, 72), rgb(194, 92, 92) 66%);
        border-radius: 50%;
        clip-path: circle(50%);
        /* opacity: .5; */
    }

    :global(.fraction-2.fraction-number-1) { clip-path: polygon(0 0, 0 100%, 50% 100%, 50% 0) }
    :global(.fraction-2.fraction-number-2) { clip-path: polygon(100% 0, 100% 100%, 50% 100%, 50% 0) }

    :global(.fraction-3.fraction-number-1) { clip-path: polygon(50% 50%, 0 79%, 0 0, 50% 0); }
    :global(.fraction-3.fraction-number-2) { clip-path: polygon(50% 50%, 0 79%, 0 100%, 100% 100%, 100% 79%, 50% 50%); }
    :global(.fraction-3.fraction-number-3) { clip-path: polygon(50% 50%, 100% 79.00%, 100% 0, 50% 0); }

    :global(.fraction-4.fraction-number-1) { clip-path: polygon(50% 50%, 0 50%, 0 0, 50% 0); }
    :global(.fraction-4.fraction-number-2) { clip-path: polygon(50% 50%, 0 50%, 0 100%, 50% 100%); }
    :global(.fraction-4.fraction-number-3) { clip-path: polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%); }
    :global(.fraction-4.fraction-number-4) { clip-path: polygon(50% 50%, 100% 50%, 100% 0, 50% 0); }

    :global(.fraction-5.fraction-number-1) { clip-path: polygon(50% 50%, 0 34%, 0 0, 50% 0); }
    :global(.fraction-5.fraction-number-2) { clip-path: polygon(50% 50%, 0 34%, 0 100%, 14% 100%); }
    :global(.fraction-5.fraction-number-3) { clip-path: polygon(50% 50%, 85% 100%, 14% 100%); }
    :global(.fraction-5.fraction-number-4) { clip-path: polygon(50% 50%, 85% 100%, 100% 100%, 100% 34%); }
    :global(.fraction-5.fraction-number-5) { clip-path: polygon(50% 50%, 100% 34%, 100% 0, 50% 0); }

    :global(.fraction-6.fraction-number-1) { clip-path: polygon(50% 50%, 0 22%, 0 0, 50% 0); }
    :global(.fraction-6.fraction-number-2) { clip-path: polygon(50% 50%, 0 22%, 0 79%); }
    :global(.fraction-6.fraction-number-3) { clip-path: polygon(50% 50%, 50% 100%, 0 100%, 0% 79%); }
    :global(.fraction-6.fraction-number-4) { clip-path: polygon(50% 50%, 50% 100%, 100% 100%, 100% 79%); }
    :global(.fraction-6.fraction-number-5) { clip-path: polygon(50% 50%, 100% 22%, 100% 79%); }
    :global(.fraction-6.fraction-number-6) { clip-path: polygon(50% 50%, 100% 22%, 100% 0, 50% 0); }
</style>

<Draggable {...$$restProps} class="fraction-slice fraction-{fraction} fraction-number-{number}" on:moved />
