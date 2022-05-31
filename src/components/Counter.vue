<template>
	<h2>{{ customTitle }}</h2>
	<p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
	<p data-testid="counter">{{ counter }}</p>
	<div>
		<button @click="increase">+1</button>
		<button @click="decrease">-1</button>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		start: {
			type: Number,
			default: 5,
			validator(value) {
				return value > 0;
			},
		},
	},
	data() {
		return {
			counter: this.start,
		};
	},
	methods: {
		getSquareValue() {
			return this.counter * this.counter;
		},
		increase() {
			this.counter++;
		},
		decrease() {
			this.counter--;
		},
	},
	computed: {
		squareCounter() {
			return this.counter * this.counter;
		},
		customTitle() {
			return this.title || "Counter";
		},
	},
};
</script>

<style>
button {
	background-color: #64bb87;
	border-radius: 5px;
	color: white;
	margin: 0 5px;
	padding: 0 15px;
}

button:hover {
	background-color: #5aa67b;
}
</style>
