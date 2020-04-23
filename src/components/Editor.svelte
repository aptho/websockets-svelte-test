<script>
	import { onMount } from 'svelte';
    import Quill from 'quill'

	onMount(async() => {
        const options = {
            modules: {
                toolbar: [['bold', 'italic'], ['link', 'image']]
			},
			theme: 'snow'
		}

        const quill = new Quill('#editor', options)
        let selection
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source == 'user' && ws.readyState === WebSocket.OPEN) {
                selection = quill.getSelection()
                ws.send(JSON.stringify(quill.getContents()))
            }
        })

        const ws = new WebSocket('ws://localhost:8080')
        ws.onmessage = (message) => {
            quill.setContents(JSON.parse(message.data))
            quill.setSelection(selection, 'user')
        }

        ws.onopen = () => {}
        ws.onclose = () => {}
    })
</script>

<svelte:head>
	<link href="https://cdn.quilljs.com/1.3.6/quill.core.css" rel="stylesheet">
	<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
	<link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet">
</svelte:head>

<div class="editor-wrapper">
    <div id="editor"></div>
</div>

<style>
	.editor-wrapper {
		width: 500px;
	}
</style>