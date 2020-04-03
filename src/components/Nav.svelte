<script>
  export let segment;

  let frontPages = ["about", undefined];
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
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
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

{#if frontPages.includes(segment)}
  <nav>
    <ul>
      <li>
        <a aria-current={segment === undefined ? 'page' : undefined} href=".">
          home
        </a>
      </li>
      <li>
        <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
          about
        </a>
      </li>
      <li>
        <a
          aria-current={segment === 'peg-board' ? 'page' : undefined}
          href="peg-board">
          Peg Board
        </a>
      </li>
      <li>
        <a
          aria-current={segment === 'number-chart' ? 'page' : undefined}
          href="number-chart">
          Dot Game
        </a>
      </li>
    </ul>
  </nav>
{/if}
