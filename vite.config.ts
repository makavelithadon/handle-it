import { defineConfig, type LibraryOptions } from 'vite';
import dts from 'vite-plugin-dts';

const getOutputFilename = (
  format: LibraryOptions['fileName'],
  entryName: string
) => {
  let subFolderName: string;

  switch (format) {
    case 'es':
      subFolderName = 'esm';
      break;
    case 'cjs':
      subFolderName = 'cjs';
      break;
    case 'umd':
      subFolderName = 'umd';
      break;
    default:
      throw new Error(`[vite.config.js][build] ${format} format is unknown!`);
  }
  const extension = `${subFolderName === 'cjs' ? 'c' : ''}js`;

  return `${subFolderName}/${entryName}.${extension}`;
};

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: 'src/lib/index.ts',
      fileName: getOutputFilename,
      name: 'handle-it',
      formats: ['cjs', 'es', 'umd'],
    },
  },
  plugins: [dts()],
});
