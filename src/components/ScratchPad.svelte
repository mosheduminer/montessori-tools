<script>
    export let rows = 2;
    let columns = 4;

    const addRow = () => rows += 1;
    const colors = ['green', 'blue', 'red'];
</script>

<style>
    table {
        background: #fff;
        padding: 15px;
        border-radius: 3px;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, .5)
    }

    td {
        text-align: center;
        border: 1px solid #000;
    }

    td input {
        border: none;
        text-align: center;
    }

    th, td input {
        font-weight: bold;
        font-family: cursive;
        font-size: 18px;
        font-style: italic;
    }

    td:first-child, td:first-child input {
        width: 3em;
        border: none;
    }

    td:first-child input:not(:read-only) {
        border-bottom: 1px solid #ccc
    }

    td:not(:first-child), td:not(:first-child) input {
        width: 3em;
    }

    .pad-green input { color: green; }
    .pad-red input { color: red; }
    .pad-blue input { color: blue; }

    hr {
        margin: 2px 0px;
        height: 4px;
        background: #000;
        border: none;
        border-radius: 15px;
    }
</style>

<svelte:head>
    <title>Scratch Pad - Virtual Montessori Materials</title>
</svelte:head>

<table>
    <thead>
        <th></th>
        <th>th</th>
        <th>h</th>
        <th>t</th>
        <th>u</th>
    </thead>
    <tbody>
        {#each [ ...Array(rows).keys() ] as row}
        <tr>
            <td class="operand">
            {#if row >= 1}
                <input class="operand" value="+"/>
            {/if}
            </td>
            {#each [ ...Array(columns).keys() ].reverse() as column}
                <td class="pad-{colors[column % 3]}">
                    <input type="number" max="9" min="0"/>
                </td>
            {/each}
        </tr>
        {/each}
        <tr>
            <td colspan="5">
                <hr />
            </td>
        </tr>
        <tr>
            <td>
                <input type="text" readonly value="=" />
            </td>
            {#each [ ...Array(columns).keys() ].reverse() as column}
                <td class="pad-{colors[column % 3]}">
                    <input type="number" max="9" min="0"/>
                </td>
            {/each}
        </tr>
    </tbody>
</table>
