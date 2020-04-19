<script>
    import Bead from './Bead.svelte';
    import DragArea from '../library/DragArea.svelte';

    let size = 1;

    const onMoved = data => console.log(data);
</script>

<style>
    div {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: url(/img/table-top.jpg);
    }
</style>

<div>
    <DragArea>
        <input bind:value={size} type="number">
        <Bead size="{size}" y="{50}" on:moved={onMoved}/>
    </DragArea>
</div>
