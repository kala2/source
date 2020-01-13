import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"

const extensions = [".ts", ".tsx"]

module.exports = {
	input: "index.tsx",
	output: [
		{
			file: "dist/link.js",
			format: "cjs",
		},
		{
			file: "dist/link.esm.js",
			format: "esm",
		},
	],
	external: [
		"react",
		"@emotion/core",
		"@emotion/css",
		"@guardian/src-foundations",
		"@guardian/src-foundations/accessibility",
		"@guardian/src-foundations/themes",
		"@guardian/src-foundations/typography",
	],
	plugins: [babel({ extensions }), resolve({ extensions }), commonjs()],
}