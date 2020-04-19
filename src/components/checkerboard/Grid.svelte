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
            height: 150px;
            width: 150px;
        }
    }

    @media (max-width: 1500px) {
        .column {
            height: 130px;
            width: 130px;
        }
    }

    @media (max-width: 1325px) {
        .column {
            height: 100px;
            width: 100px;
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

    .column-red { background-color: #f75e5e; }
    .column-blue { background-color: #7575e4; }
    .column-green { background-color: #5edc5e; }
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