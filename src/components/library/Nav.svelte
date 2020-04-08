<script>
  export let segment;

  let frontPages = [undefined]; // undefined represents the home page
  let onBottom = ["dot-game"];
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
    bottom: 10px;
    right: 10px;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    border-radius: 50%;
    background: #fff;
    padding: 8px;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 10px rgba(0,0,0,.3);
  }

  a img {
    height: 24px;
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

    </ul>
  </nav>
{/if}
