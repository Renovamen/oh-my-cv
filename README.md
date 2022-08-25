# Oh, CV!

Word and LaTeX are too overkill for a curriculum vitae / resume.

So why not write it in Markdown?

Have fun: [ohcv.zxh.io](https://ohcv.zxh.io/)

**WIP**


&nbsp;

## Notice

Highly recommend using Chrome.


&nbsp;

## Features

- Write your resume in Markdown and preview it in real-time online, it's smooth!
- Export to A4 and US Letter size PDFs
- Customize: page margins, theme colors, line heights, fonts, etc.
- Add icons easily via [Iconify](https://github.com/iconify/iconify) (search for icons on [Icônes](https://icones.js.org/))
- Tex support ([Katex](https://github.com/KaTeX/KaTeX))
- Automatically breaking pages
- Neat template
- Manage multiple resumes
- Your data in your hands:
  - Data are saved locally within your browser, see [here](https://localforage.github.io/localForage/) for details
  - Open-source static website hosted on [Github Pages](https://pages.github.com/), which doesn't (have the ability to) collect your data
  - No user tracking, no ads
- Dark mode


&nbsp;

## TO-DO

- [ ] Export to:

  - [x] PDF
  - [x] Markdown
  - [ ] HTML

- [ ] Pick any fonts from [Google Fonts](https://fonts.google.com/)

- [ ] Custom CSS


&nbsp;

## Development

It's built on [Vitesse](https://github.com/antfu/vitesse), with the power of [Vue 3](https://github.com/vuejs/vue-next), [Vite 3](https://github.com/vitejs/vite) and [UnoCSS](https://github.com/antfu/unocss).

Clone the repo and install dependencies:

```bash
pnpm install
```

Build some [packages](packages):

```bash
pnpm build:pkg
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
