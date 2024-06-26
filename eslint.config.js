import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        process: "readonly",
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
];
