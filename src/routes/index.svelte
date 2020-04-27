<style>
	.container {
		margin: 0 auto;
		max-width: 860px;
		padding: 2rem 3rem;
		min-height: 100vh;
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
	}

	#spacer {
		flex-grow: 1;
	}

	p a {
		font-weight: bold;
	}

	h1 {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	ul#games-list {
		display: flex;
		padding: 0;
		margin: 0;
		flex-wrap: wrap;
		list-style: none;
	}

	ul#games-list li {
		display: inline-block;
		max-width: 250px;
		min-width: 195px;
		height: 200px;
		flex-grow: 1;
		box-sizing: border-box;
		margin: 10px;
		
		overflow: hidden;
	}

	ul#games-list li a {
		position: relative;
		font-weight: bold;
		text-decoration: none;
		font-family: cursive;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		background-position: center;
		background-size: cover;
		transition: all .5s;
	}

	a#peg-board {
		background-image: url("/img/peg-board.png");
	}

	a#dot-game {
		background-image: url("/img/dot-game.jpg");
	}

	a#checkerboard {
		background-image: url("/img/checkerboard.jpg");
	}

	ul#games-list > li > a::before {
		content: " ";
		display: block;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(222, 222, 222, 0.75);
	}

	ul#games-list li a span {
			z-index: 10;
			color: #000;
			font-size: 1.2em;

			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			padding: 10%;
			box-sizing: border-box;
	}

	ul#games-list li:hover a {
		transform: scale(1.2);
	}

	img#logo {
		max-height: 64px;
	}

	/* img {
		max-width: 100%;
		max-height: 100%;
	} */
</style>

<svelte:head>
	<title>Virtual Montessori Materials</title>
</svelte:head>

<div class="container">
	<img id="logo" src="icons/logo.svg" alt="logo" aria-hidden="true" />
	<h1>Virtual Montessori Materials</h1>

	<p>
		Welcome to Virtual Montessori Materials. This is a collection of games and tools to support teachers during the COVID-19 pandemic and beyond.
		<br/><br/>
		All of these games are developed by volunteers during their spare time.
		If you find value in these tools and want to support their creation and maintanence please <a href="https://www.paypal.me/mosheduminer">donate here.</a>
	</p>

	<h2>Available Materials</h2>

	<ul id="games-list">
		<li>
			<a href="/peg-board" id="peg-board">
				<span>Peg Board</span>
			</a>
		</li>
		<li>
			<a href="/dot-game" id="dot-game">
				<span>Dot Game</span>
			</a>
		</li>
		<li>
			<a href="/checkerboard" id="checkerboard">
				<span>Checkerboard</span>
			</a>
		</li>
		<li>
			<a href="/fractions" id="fractions">
				<span>Fractions</span>
			</a>
		</li>
	</ul>

	<h3>And more on the way!</h3>

	<span id="spacer" />

	<small>
		<div>
			Icons from <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
			& <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a>
			from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> |
			Project of <a href="https://www.linkedin.com/in/rivkah-schack-51167a63/">Rivkah Schack</a>
			and <a href="https://github.com/mosheduminer">Moshe Uminer</a> |
			Hosted on <a href="https://www.netlify.com/">Netlify</a>
		</div>
	</small>
</div>
