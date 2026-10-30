import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { studio: { bg: "#090b10", panel: "#11151e", line: "#252b38", muted: "#929bad", accent: "#a78bfa" } } } },
  plugins: [],
};
export default config;
