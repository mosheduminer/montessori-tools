<script>
    let rows, columns;
    $: rows = [ ...Array(4).keys()].map(i => 10 ** i).reverse();
    $: columns = [ ...Array(9).keys()].map(i => 10 ** i).reverse();

    const colors = ['green', 'blue', 'red'];
    const getColor = (row, column) => {
        row = formatNumber(row).split(',')[0].length;
        column = formatNumber(column).split(',')[0].length;

        let index = (column + row) - 2;
        while (index >= 3) index -= 3;

        return colors[index];
    };

    const formatNumber = number =>
            number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
</script>

<style>
    #grid {
        min-width: 975px;
        display: grid;
        grid-template-columns: repeat(9, minmax(104px, 1fr)) 58px;
        max-width: 1620px;
        margin: 0 auto;
    }

    .row {
        display: flex;
        width: 100%;
    }

    .column {
        height: 170px;
        min-width: 170px;
        flex-grow: 1;
    }

    @media (max-width: 1680px) {
        .column {
            height: 152px;
            min-width: 152px;
        }
    }

    @media (max-width: 1500px) {
        .column {
            height: 125px;
            min-width: 141px;
        }
    }

    @media (max-width: 1325px) {
        .column {
            height: 104px;
            min-width: 103.02px;
        }
    }

    .header {
        background: peachpuff;
        user-select: none;
        min-width: 3em;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .column, .header {
        border: 2px solid #ababab;
    }

    .column-red { background-color: rgb(235, 72, 72); }
    .column-blue { background-color: rgb(72, 72, 235); }
    .column-green { background-color: rgb(72, 235, 72); }
</style>

<div id="grid">
    {#each rows as row}
    {#each columns as column}
        <div class="column column-{getColor(row, column)}" />
    {/each}
    <div class="header">{formatNumber(row)}</div>
    {/each}
    {#each columns as column}
        <div class="header">{formatNumber(column)}</div>
    {/each}
    <div class="header"></div>
</div>
