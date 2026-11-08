// @ts-check
import {defineConfig, fontProviders} from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import hedvigUnicode from "@fontsource-variable/hedvig-letters-serif/unicode.json" with {type: "json"};
import familjenUnicode from "@fontsource-variable/familjen-grotesk/unicode.json" with {type: "json"};
import {SITE_URL} from "./src/consts";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts:
        process.env.ASTRO_DEV_ALLOWED_HOSTS?.split(",")
          .map((host) => host.trim())
          .filter(Boolean) ?? []
    }
  },

  // Each subset is its own face, not an alternate source of the same face.
  // Unicode ranges come from the installed OFL packages. Both fonts are
  // emitted locally; no third-party font host is contacted by the browser.
  fonts: [
    {
      name: "Hedvig Letters Serif",
      cssVariable: "--font-hedvig",
      provider: fontProviders.local(),
      weights: [400],
      styles: ["normal"],
      fallbacks: ["Iowan Old Style", "Georgia", "serif"],
      options: {
        variants: [
          {
            src: [
              "@fontsource-variable/hedvig-letters-serif/files/hedvig-letters-serif-latin-ext-opsz-normal.woff2"
            ],
            weight: 400,
            style: "normal",
            unicodeRange: [hedvigUnicode["latin-ext"]]
          },
          {
            src: [
              "@fontsource-variable/hedvig-letters-serif/files/hedvig-letters-serif-latin-opsz-normal.woff2"
            ],
            weight: 400,
            style: "normal",
            unicodeRange: [hedvigUnicode.latin]
          }
        ]
      }
    },
    {
      name: "Familjen Grotesk",
      cssVariable: "--font-familjen",
      provider: fontProviders.local(),
      weights: ["400 700"],
      styles: ["normal", "italic"],
      fallbacks: ["Arial", "sans-serif"],
      options: {
        variants: [
          {
            src: [
              "@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-ext-wght-normal.woff2"
            ],
            weight: "400 700",
            style: "normal",
            unicodeRange: [familjenUnicode["latin-ext"]]
          },
          {
            src: [
              "@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2"
            ],
            weight: "400 700",
            style: "normal",
            unicodeRange: [familjenUnicode.latin]
          },
          {
            src: [
              "@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-ext-wght-italic.woff2"
            ],
            weight: "400 700",
            style: "italic",
            unicodeRange: [familjenUnicode["latin-ext"]]
          },
          {
            src: [
              "@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-italic.woff2"
            ],
            weight: "400 700",
            style: "italic",
            unicodeRange: [familjenUnicode.latin]
          }
        ]
      }
    }
  ]
});
