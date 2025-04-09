import { join, dirname } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath("@storybook/experimental-addon-test"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/react-vite'),
    "options": {}
  },

  // Dynamic refs configuration based on configType
  refs: ({ configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        react: {
          title: 'Composed React Storybook running in development mode',
          url: 'http://localhost:7007',
        },
        angular: {
          title: 'Composed Angular Storybook running in development mode',
          url: 'http://localhost:7008',
        },
      };
    }
    return {
      react: {
        title: 'Composed React Storybook running in production',
        url: 'https://thomascandille.github.io/design-system-rte-deployment-test/react/',
      },
      angular: {
        title: 'Composed Angular Storybook running in production',
        url: 'https://thomascandille.github.io/design-system-rte-deployment-test/angular/',
      },
    };
  },
};

export default config;
