<script>
    import Rod from "./Rod.svelte"

    const colorGradients = {
        RED: 'radial-gradient(circle at 50% 50%, rgb(235, 72, 72), rgb(194, 92, 92) 66%)',
        GREEN: 'radial-gradient(circle at 50% 50%, rgb(72, 235, 72), rgb(92, 194, 92) 66%)',
        BLUE: 'radial-gradient(circle at 50% 50%, rgb(72, 72, 235), rgb(92, 92, 194) 66%)'
    };

    let rods = [
        {color: colorGradients.GREEN, magnitude: 1},
        {color: colorGradients.BLUE, magnitude: 10},
        {color: colorGradients.RED, magnitude: 100}
    ];
</script>

{#each rods as rod}
    <Rod color={rod.color} />
{/each}
