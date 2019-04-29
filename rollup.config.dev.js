// rollup.config.js
import alias from "rollup-plugin-alias";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "main.js",
  output: {
    file: "dist/utils.dev.js",
    format: "es"
  },
  external: ["lodash", "date-fns", "reconnecting-websocket"],
  plugins: [
    alias({
      resolve: [".js"]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      )
    }),
    resolve(),
    json(),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      runtimeHelpers: true,
      exclude: "node_modules/**"
    })
  ]
};
