import babel from "rollup-plugin-babel";

module.exports = {
	input: "arrow-right-straight.jsx",
	output: {
		file: "arrow-right-straight.js",
		format: "cjs"
	},
	plugins: [babel()]
};