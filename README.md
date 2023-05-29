# Oh My CV!

Word and LaTeX are too overkill for a curriculum vitae / resume.

So why not write it in Markdown?

Have fun: [ohmycv.app](https://ohmycv.app/)

**WIP**


&nbsp;

## Notice

Highly recommend using Chromium-based browsers, e.g., [Chrome](https://www.google.com/chrome/) and [Microsoft Edge](https://www.microsoft.com/en-us/edge).


&nbsp;

## Features

- Write your resume in Markdown and preview it in real-time, it's smooth!
- It works offline ([PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps))
- Export to A4 and US Letter size PDFs
- Customize page margins, theme colors, line heights, fonts, etc.
- Pick any fonts from [Google Fonts](https://fonts.google.com/)
- Add icons easily via [Iconify](https://github.com/iconify/iconify) (search for icons on [Icônes](https://icones.js.org/))
- Tex support ([KaTeX](https://github.com/KaTeX/KaTeX))
- Cross-reference (would be useful for an academic CV)
- Case correction (e.g. `Github` -> `GitHub`)
- Add line breaks (`\\[10px]`) or start a new page (`\newpage`) just like in LaTeX
- Break pages automatically
- Customize CSS
- Manage multiple resumes
- Your data in your hands:
  - Data are saved locally within your browser, see [here](https://localforage.github.io/localForage/) for details
  - Open-source static website hosted on [Github Pages](https://pages.github.com/), which doesn't (have the ability to) collect your data
  - No user tracking, no ads
- Dark mode


&nbsp;

## Development

It's built on [Vitesse](https://github.com/antfu/vitesse), with the power of [Vue 3](https://github.com/vuejs/vue-next), [Vite](https://github.com/vitejs/vite) and [UnoCSS](https://github.com/antfu/unocss).

Clone the repo and install dependencies:

```bash
pnpm install
```

Build some [packages](packages):

```bash
pnpm build:pkg
```

To enable picking fonts from [Google Fonts](https://fonts.google.com/), you will need to generate a [Google Fonts Developer API Key](https://developers.google.com/fonts/docs/developer_api#APIKey). Then, create a `.env` file in [`site`](site/) folder and put:

```
VITE_GOOGLE_FONTS_KEY="YOUR_API_KEY"
```

Start developing / building the site:

```bash
pnpm dev
pnpm build
```


&nbsp;

## Credits

- [billryan/resume](https://github.com/billryan/resume)


&nbsp;

## License

[MIT](LICENSE)
