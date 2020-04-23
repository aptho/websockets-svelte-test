<script>
	import Editor from './components/Editor.svelte'
</script>

<main>
	<h1>Websockets Test</h1>
	<div class="editor-wrapper">
		<Editor />
	</div>
</main>

<style>
	.editor-wrapper {
		display: flex;
		justify-content: center;
	}

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>