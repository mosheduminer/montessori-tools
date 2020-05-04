<script>
    import Abacus from "./Abacus.svelte";
</script>

<style>
    .abacus {
        display: inline-block;
        width: max(760px, 75vw);
        border: 0.5rem solid rgb(193,154,107);
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    #abacus-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div id="abacus-container">
    <div class="abacus">
        <Abacus />
    </div>
</div>