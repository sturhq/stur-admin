import path from 'path';
import url from 'url';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import Unfonts from 'unplugin-fonts/vite';

export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      // Custom fonts.
      custom: {
        /**
         * Fonts families lists
         */
        families: [
          {
            /**
             * Name of the font family.
             */

            name: 'SF Pro Text',
            /**
             * Local name of the font. Used to add `src: local()` to `@font-rule`.
             */

            local: 'SF Pro Text',
            /**
             * Regex(es) of font files to import. The names of the files will
             * predicate the `font-style` and `font-weight` values of the `@font-rule`'s.
             */
            src: './public/fonts/*.otf',

            /**
             * This function allow you to transform the font object before it is used
             * to generate the `@font-rule` and head tags.
             */
            /*  transform(font) {
            if (font.basename === 'Clash Display') {
              // update the font weight
              font.weight = 500;
            }

            // we can also return null to skip the font
            return font;
          }, */
            transform(font) {
              if (font.basename === 'SF Pro Text') {
                // update the font weight
                font.weight = 500;
              }

              // we can also return null to skip the font
              return font;
            },
          },
        ],

        /**
         * Defines the default `font-display` value used for the generated
         * `@font-rule` classes.
         */
        display: 'auto',

        /**
         * Using `<link rel="preload">` will trigger a request for the WebFont
         * early in the critical rendering path, without having to wait for the
         * CSSOM to be created.
         */
        preload: true,

        /**
         * Using `<link rel="prefetch">` is intended for prefetching resources
         * that will be used in the next navigation/page load
         * (e.g. when you go to the next page)
         *
         * Note: this can not be used with `preload`
         */
        prefetch: false,

        /**
         * define where the font load tags should be inserted
         * default: 'head-prepend'
         *   values: 'head' | 'body' | 'head-prepend' | 'body-prepend'
         */
        injectTo: 'head-prepend',
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      src: './src',
      '@utils': './src/utils',
      '@assets': './src/assets',
      '@components': './src/components',
      '@config': './src/config',
      '@context': './src/context',
      '@layouts': './src/layouts',
      '@pages': './src/pages',
      '@types': './src/types',
      '@mock': './src/mock',
      '@test': './src/test',
    },
  },
  server: {
    port: 9000,
    host: true,
  },
});
