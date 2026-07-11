export default function manifest() {
  return {
    name: "Justin J Daniel",
    short_name: "JJ Daniel",
    description: "Personal website of Justin J Daniel",
    url: "https://justinjdaniel.com",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
