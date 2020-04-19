<script>
	let textValue
	let messages = ['text']
	const ws = new WebSocket('ws://localhost:8080')

	ws.onmessage = (message) => {
		console.log(message.data)
		messages.push(message.data)
		messages = messages // forces rerender since array methods like push don't trigger updates
	}

	ws.onopen = () => {
		console.log('open')
	}

	ws.onclose = () => {
		console.log('close')
	}

	function handleClick(e) {
		if (ws.readyState === WebSocket.OPEN && textValue) {
			ws.send(textValue)
			textValue = ''
		}
	}
</script>

<main>
	<h1>Websockets Test</h1>
	<div class="text-area">
		<textarea bind:value={textValue}></textarea>
		<button on:click={handleClick}>Send</button>
	</div>

	{#if messages}
		{#each messages as message}
			<div>{message}</div>
		{/each}
	{/if}
</main>

<style>
	.text-area,.recieved {
		display: flex;
		flex-direction: column;
		align-items: center;
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