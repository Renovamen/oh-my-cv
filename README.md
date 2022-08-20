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

- Write your resume in Markdown and preview it in real-time online
- Export to A4 and US Letter size PDFs
- Automatically breaking pages
- Neat template
- Customize: page margins, theme colors, line heights, fonts, etc.
- Add icons via [Iconify](https://github.com/iconify/iconify) (search for icons on [Icônes](https://icones.js.org/))
- Tex support ([Katex](https://github.com/KaTeX/KaTeX))
- Dark mode
- Open-source static website hosted on [Github Pages](https://pages.github.com/) which doesn't (have the ability to) collect your data


&nbsp;

## TO-DO

- [ ] Export to:

  - [x] PDF
  - [ ] Markdown
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
