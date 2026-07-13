module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm start",
      url: ["http://localhost:3000/"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
