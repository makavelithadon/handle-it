const env = process.env.NODE_ENV || "development";

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "last 1 version, > 1%, maintained node versions, not dead",
        useBuiltIns: "usage",
        corejs: 3,
        debug: env === "production",
        ...(env === "production" && { modules: false }),
      },
    ],
  ],
};
