module.exports = {
  ci: {
    collect: {
      staticDistDir: "./.next/server/app",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
