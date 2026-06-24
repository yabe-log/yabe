import type { Preview } from '@storybook/nextjs-vite'
// @ts-expect-error ts dumb that it doesnt recognize the css module import
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;