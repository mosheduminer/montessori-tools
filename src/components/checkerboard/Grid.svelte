<script>
    export let vertical = 4;
    export let horizontal = 9;

    let rows, columns;
    $: rows = [ ...Array(vertical).keys()].map(i => 10 ** i).reverse();
    $: columns = [ ...Array(horizontal).keys()].map(i => 10 ** i).reverse();

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
    table {
        border-collapse: collapse;
        min-width: 975px;
    }

    .column {
        height: 170px;
        width: 170px;
    }

    @media (max-width: 1680px) {
        .column {
            height: 152px;
            width: 152px;
        }
    }

    @media (max-width: 1500px) {
        .column {
            height: 125px;
            width: 141px;
        }
    }

    @media (max-width: 1325px) {
        .column {
            height: 104px;
            width: 103.02px;
        }
    }

    .header {
        background: peachpuff;
        text-align: center;
        user-select: none;
    }

    .column, .header {
        border: 2px solid #ababab;
    }

    .column-red { background-color: rgb(235, 72, 72); }
    .column-blue { background-color: rgb(72, 72, 235); }
    .column-green { background-color: rgb(72, 235, 72); }
</style>

<table id="grid">
    {#each rows as row}
        <tr class="row">
            {#each columns as column}
                <td class="column column-{getColor(row, column)}"></td>
            {/each}
            <td class="header">{formatNumber(row)}</td>
        </tr>
    {/each}
    <tr style="height: 2em; vertical-align: top;">
        {#each columns as column}
            <td class="header">{formatNumber(column)}</td>
        {/each}
        <td class="header"></td>
    </tr>
</table>