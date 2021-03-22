<script>
	let bgColor = "grey";
	let textColor = "white";
	$: people = [
		{ id: 1, name: "Rudi", age: 33 },
		{ id: 2, name: "Ruth", age: 33 },
		{ id: 3, name: "Ruth", age: 33 },
	];

	$: testy = [1, 2, 3];

	const handleClick = (personId) => {
		// delete person
		people = people.filter((person) => person.id != personId);
		console.log(e);
	};
	const addPerson = () => {
		people.push({ id: 5, name: "John", age: 20 });
		alert(people);
	};
	let num = 1;
</script>

<main id="main" style="background:{bgColor}">
	<!-- <h1 style="color: {textColor}">{people[0].name}</h1> -->
	<button on:click={addPerson}>Add a person</button>
	{#if num < 5}
		<h1>HEYYYYY!!!!</h1>
	{/if}

	{#each people as person (person.id)}
		<p>{person.name} is {person.age} years old!</p>
		<button on:click={() => handleClick(person.id)}>Delete</button>
	{:else}
		<p>Nothing to show..</p>
	{/each}
</main>

<style>
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
