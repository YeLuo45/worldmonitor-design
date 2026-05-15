import { defineConfig } from "vitepress";

export default defineConfig({
  title: "WorldMonitor Design",
  description: "WorldMonitor — Real-time Global Intelligence Dashboard Design Document",
  base: "/worldmonitor-design/",
  head: [
    ["link", { rel: "icon", href: "/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#1e3a5f" }],
  ],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Architecture", link: "/architecture" },
      { text: "Frontend", link: "/frontend" },
      { text: "API", link: "/api" },
      { text: "Deployment", link: "/deployment" },
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Home", link: "/" },
          { text: "Architecture", link: "/architecture" },
          { text: "Variants", link: "/variants" },
        ],
      },
      {
        text: "Core Systems",
        items: [
          { text: "Frontend", link: "/frontend" },
          { text: "Map System", link: "/map-system" },
          { text: "Data Sources", link: "/data-sources" },
          { text: "API Layer", link: "/api" },
        ],
      },
      {
        text: "Infrastructure",
        items: [
          { text: "Deployment", link: "/deployment" },
          { text: "Desktop App", link: "/desktop" },
          { text: "Docker", link: "/docker" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Tech Stack", link: "/tech-stack" },
          { text: "Contributing", link: "/contributing" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/koala73/worldmonitor" },
    ],
  },
  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
  lastUpdated: true,
});
