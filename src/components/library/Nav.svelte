<script>
  import is from 'is_js';

  export let segment;
  let informationBox;

  const frontPages = [undefined]; // undefined represents the home page
  const onBottom = ["dot-game", "checkerboard"];

  const showInfo = () => {
    informationBox.style.transform = "scale(1.0)";
    informationBox.style.display = "block";
  }

  const hideInfo = () => {
    informationBox.style.transform = "scale(0)";
    informationBox.style.display = "block";
  }
</script>

<style>
  nav {
    position: absolute;
    z-index: 100;
    padding: 0px;
    border-bottom-left-radius: 10px;
  }
  
  nav.top-right {
    top: 10px;
    right: 10px;
  }

  nav.bottom-right {
    bottom: 20px;
    right: 20px;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
  }

  li:not(:first-child) {
    margin-top: 15px;
  }

  a, .button {
    border-radius: 50%;
    background: #fff;
    padding: 8px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 10px rgba(0,0,0,.3);
    text-decoration: none;
    font-size: 30px;
    cursor: pointer;
  }

  a img {
    height: 24px;
  }

  #information-box {
    display: none;
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    z-index: 10000000;
    background: #fff;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0px 0px 15px rgba(0,0,0,.5);
  }

  #information-header {
    padding: 15px;
    text-align: left;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  .close-header {
    cursor: pointer;
  }
</style>

{#if !frontPages.includes(segment)}
  <nav class="{onBottom.includes(segment) ? "bottom-right" : "top-right"}">
    <ul>
      <li>
        <a aria-current={segment === undefined ? 'page' : undefined} href=".">
          <img src="/icons/home.svg" alt="home" />
        </a>
      </li>
      <li>
        <span class="button" on:click|preventDefault={showInfo}>
          🛈
        </span>
      </li>
    </ul>
  </nav>
  <div id="information-box" bind:this={informationBox}>
    <div id="information-header">
      <span class="header-content">🛈 How to Use</span>
      <span class="close-header" on:click|preventDefault={hideInfo}>X</span>
    </div>
    <div id="information-content">
      {#if segment === 'fractions' && is.desktop()}
        <p>Rotate your scroll wheel when hovering over a fraction slice to rotate</p>
      {:else if segment === 'bead-bars' && is.desktop()}
        <p>Rotate your scroll wheel when hovering over a bar of beads to rotate</p>
      {:else}
        <p>No special instructions for this material :(</p>
      {/if}
    </div>
  </div>
{/if}
