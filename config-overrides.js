const { getBabelLoader } = require("react-app-rewired");
const emoji = require("remark-emoji");
const images = require("remark-images");

module.exports = (config, env) => {
  const babelLoader = getBabelLoader(config.module.rules);
  const { loader, options } = babelLoader;

  config.module.rules.map(rule => {
    // This ma
    if (typeof rule.test !== "undefined" || typeof rule.oneOf === "undefined") {
      return rule;
    }

    rule.oneOf.unshift({
      test: /\.md?x$/,
      // include: babelLoader.include,
      use: [
        {
          loader,
          options
        },
        {
          loader: "@mdx-js/loader",
          options: {
            mdPlugins: [emoji, images]
          }
        }
      ]
    });

    return rule;
  });
  return config;
};
