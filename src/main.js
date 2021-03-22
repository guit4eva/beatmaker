import Polls from './Polls.svelte';
import DrumKit from './DrumKit.svelte';

let appToShow = "drum";

if (appToShow == "polls") {
	const app = new Polls({
		target: document.body,
		props: {
			name: 'world'
		}
	});
} else {
	const app = new DrumKit({
		target: document.body,
		// props: {
		// 	name: 'world'
		// }
	});

}

export default app;