<script>
	import { onMount } from "svelte";
	// import  Metronome  from "./functions/metronome.svelte";

	// let audioFile = new Audio();
	$: keypress = "";
	let playingMelody = false;
	let bpm = 60;
	let playLoop = true;
	let loops = 5;

	let stopMetro = () => {
		clearInterval(metro);
	};
	$: currBeat = 0;
	let beatsArray = [
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false],
		[false, false, false, false]
	];

	let startPlaying;
	let isPlaying = true;
	let audioFiles = {
		10: {
			src: "sounds/loop3.wav",
			name: "Loop",
		},
		0: {
			src: "sounds/kick.wav",
			name: "Kick",
		},
		1: {
			src: "sounds/snare.wav",
			name: "Snare",
		},
		2: {
			src: "sounds/openhat.wav",
			name: "Open Hat",
		},
		3: {
			src: "sounds/hihat.wav",
			name: "Hihat",
		},
	};

	let loop;
	let audioFile;
	let beatTiming = 0;
	// -------------------------------------------------------------------------
	// START PLAYING
	// -------------------------------------------------------------------------
	let startPlayingNow = () => {
		loop = new Audio(audioFiles[10].src);
		loop.play();
		startPlaying = setInterval(() => {
			beatTiming = beatTiming <= 0.9 ? beatTiming + 0.1 : 0;
			// currentBeatInArray = beatsArray[currBeat];
			beatsArray[currBeat].forEach(function (item, index) {
				if (item) {
					// setTimeout(function () {
					// 	keypress = "";
					// }, 100);
					// keypress = "!!!";

					new Audio(audioFiles[index].src).play();
					setTimeout(function () {
						document.getElementById("main").classList.add("hit");
					}, 1000);
					document.getElementById("main").classList.remove("hit");
				}
			});
			currBeat++;
			if (currBeat == beatsArray.length) {
				currBeat = 0;
				loop.pause();
				loop.curr3;
				loop.play();
			}
		}, 186.5);
	};
	// -------------------------------------------------------------------------
	// STOP PLAYING
	// -------------------------------------------------------------------------
	let stopPlaying = () => {
		clearInterval(startPlaying);
		currBeat = 0;
		beatTiming = 0;
		loop.pause();
		// audioFile.pause();
	};

	$: isRecording = false;

	let clearArray = (indexOfBeat) => {
		beatsArray.forEach(function (item, index) {
			beatsArray[index][indexOfBeat] = false;
		});
	};

	let startRecording = () => {
		if (isRecording) {
			isRecording = false;
			document.getElementById("recordBtn").classList.remove("btn-active");
		} else {
			isRecording = true;
			document.getElementById("recordBtn").classList.add("btn-active");
		}
	};
	onMount(() => {
		// ---------------------------------------------------------------------
		// Start Metronome
		// ---------------------------------------------------------------------

		// ---------------------------------------------------------------------
		// Key DOWN
		// ---------------------------------------------------------------------
		window.addEventListener("keydown", function (e) {
			// -----------------------------------------------------------------
			// Start Loop
			// -----------------------------------------------------------------

			if (e.code == "Space") {
				isPlaying = !isPlaying;
				console.log(isPlaying);
				if (!isPlaying) {
					return startPlayingNow();
				} else {
					console.log("STOPPING");
					return stopPlaying();
				}
			}
			if (e.key == 0) {
				playingMelody = !playingMelody;
			}
			if (e.key == "p") {
				return metro();
			}
			if (e.key == "s") {
				return stopMetro();
			}
			// if (e.key == "r") {
			// 	return (isRecording = !isRecording);
			// }

			keypress = audioFiles[e.key].name;

			if (isRecording) {
				// -------------------------------------------------------------
				// Add beats to array
				// -------------------------------------------------------------
				// beatsArray[currBeat][e.key] = beatsArray[currBeat][e.key]
				// 	? false
				// 	: true;

				// beatsArray[currBeat][e.key] = true;
				beatsArray[currBeat] = [
					e.key == "0" ? true : false,
					e.key == "1" ? true : false,
					e.key == "2" ? true : false,
					e.key == "3" ? true : false,
				];
			} else {
				audioFile = new Audio(audioFiles[e.key].src);
				audioFile.play();
			}

			document.getElementById("main").classList.add("hit");
			document.getElementById("matrix").classList.add("matrix-hit");
		});
		// ---------------------------------------------------------------------
		// Key UP
		// ---------------------------------------------------------------------
		window.addEventListener("keyup", function () {
			document.getElementById("main").classList.remove("hit");
			document.getElementById("matrix").classList.remove("matrix-hit");
			keypress = "";
		});
	});
</script>

<main id="main" class="main">
	<h2>{beatTiming}</h2>
	<h2>Current Beat: {currBeat}</h2>
	<button id="recordBtn" class="btn" on:click={() => startRecording()}
		>RECORD</button
	>
	<div>
		<div id="matrix">
			{#each beatsArray as beatArray, index (index)}
				<div style="background: {index == currBeat ? '#777' : 'none'}">
					{#each beatArray as beat, index (index)}
						<button
							on:click={() => (beatsArray[index][index] = true)}
							><div
								style="background: {beat
									? '#02b2ba'
									: '#fff'};height: 20px; width: 20px; border-radius: 100%; display: inline-block; margin: 2px;"
							>
								<!-- {beat} -->
							</div></button
						>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<div>
		<button id="recordBtn" class="btn" on:click={() => clearArray(0)}
			>Clear Kick</button
		>
		<button id="recordBtn" class="btn" on:click={() => clearArray(1)}
			>Clear Snare</button
		>
		<button id="recordBtn" class="btn" on:click={() => clearArray(2)}
			>Clear OpenHat</button
		>
		<button id="recordBtn" class="btn" on:click={() => clearArray(3)}
			>Clear HiHat</button
		>
	</div>
	<h1 class="keypress">{keypress}</h1>
	<!-- <h1 class="keypress">{currentBeatInArray}</h1> -->
</main>

<style>
	* {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}

	.main {
		background: #496f86;
		text-align: center;
		opacity: 1;
		-webkit-transition: all 250ms linear;
		-moz-transition: all 250ms linear;
		-o-transition: all 250ms linear;
		transition: all 250ms linear;
	}

	.keypress {
		position: absolute;
		top: 0;
		left: 20%;
		font-size: 10vw;
		margin: 0 auto;
		padding-top: 10%;
	}

	:global(.hit) {
		background: #aaa !important;
		opacity: 0;
	}

	.btn {
		cursor: pointer;
	}

	#recordBtn {
		margin: 40px 10px 10px 10px;
		background: #fff;
		padding: 10px;
		border-radius: 10px;
	}

	:global(.btn-active) {
		background: rgb(87, 15, 15) !important;
		color: white;
	}

	#matrix {
		display: inline-block;
	}

	:global(.matrix-hit) {
		box-shadow: 0 0 10px 3px #333;
	}
</style>
