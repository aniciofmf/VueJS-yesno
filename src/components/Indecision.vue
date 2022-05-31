<template>
	<img v-if="img" :src="img" alt="" />
	<div class="bg-dark"></div>
	<div class="indecision-container">
		<input v-model="question" type="text" placeholder="Ask me something" />
		<p>Remember to end the question with a <strong>?</strong></p>

		<div v-if="isValidQuestion">
			<h2 id="question">{{ question }}</h2>
			<h1 id="anwer">{{ answer }}</h1>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			question: null,
			answer: null,
			img: null,
			isValidQuestion: false,
		};
	},
	watch: {
		question(value, oldValue) {
			this.isValidQuestion = false;

			if (value.length == 0) {
				this.answer = null;
				this.img = null;
				return;
			}

			if (!value.endsWith("?")) {
				return;
			}

			this.isValidQuestion = true;

			this.getAnswer();
		},
	},
	methods: {
		async getAnswer() {
			const { answer, image } = await fetch("https://yesno.wtf/api").then((r) => r.json());

			this.answer = answer;
			this.img = image;
		},
	},
};
</script>

<style scoped>
img,
.bg-dark {
	height: 100vh;
	left: 0px;
	max-height: 100%;
	max-width: 100%;
	position: fixed;
	top: 0px;
	width: 100vw;
}

.bg-dark {
	background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
	position: relative;
	z-index: 99;
}

input {
	width: 250px;
	padding: 10px 15px;
	border-radius: 5px;
	border: none;
}
input:focus {
	outline: none;
}

p {
	color: white;
	font-size: 20px;
	margin-top: 10px;
}

h1,
h2 {
	color: white;
	text-transform: capitalize;
}

h2 {
	margin-top: 150px;
}
</style>
