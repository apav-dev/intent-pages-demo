import type { Config } from "tailwindcss";
import { ComponentsContentPath } from "@yext/search-ui-react";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", ComponentsContentPath],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
