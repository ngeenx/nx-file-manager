const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");

import globalTailwindConfig from "../../../global-tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        ...globalTailwindConfig.theme.extend.colors,
      },
    },
  },
  plugins: [],
};
