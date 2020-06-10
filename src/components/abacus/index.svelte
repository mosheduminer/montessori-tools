<script>
    import Abacus from "./Abacus.svelte";
</script>

<style>
    .abacus {
        display: inline-block;
        width: 100%;
        border: 0.5rem solid rgb(193,154,107);
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
    .padding {
        width: 12.5vw;
    }
    #abacus-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div id="abacus-container">
    <div class="padding" />
    <div class="abacus">
        <Abacus />
    </div>
    <div class="padding" />
</div>