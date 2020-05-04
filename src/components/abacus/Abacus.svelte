<script>
    import Rod from "./Rod.svelte"

    const colorGradients = {
        RED: 'radial-gradient(circle at 50% 50%, rgb(235, 72, 72), rgb(194, 92, 92) 66%)',
        GREEN: 'radial-gradient(circle at 50% 50%, rgb(72, 235, 72), rgb(92, 194, 92) 66%)',
        BLUE: 'radial-gradient(circle at 50% 50%, rgb(72, 72, 235), rgb(92, 92, 194) 66%)'
    };

    let rods = [
        {color: colorGradients.GREEN, magnitude: "1"},
        {color: colorGradients.BLUE, magnitude: "10"},
        {color: colorGradients.RED, magnitude: "100"},
        {color: colorGradients.GREEN, magnitude: "1,000"},
        {color: colorGradients.BLUE, magnitude: "10,000"},
        {color: colorGradients.RED, magnitude: "100,000"},
        {color: colorGradients.GREEN, magnitude: "1,000,000"}
    ];
</script>

<style>
    .magnitude {
        margin-left: -11ch;
        position: absolute;
        text-align: right;
        width: 10ch;
    }
</style>

{#each rods as rod}
    <div class="magnitude">{rod.magnitude}</div>
    <Rod color={rod.color} />
{/each}
