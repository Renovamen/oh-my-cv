# Contributing Guide

**WIP**

Thanks for your interest in contributing to this project. Before getting started, you might find this guideline useful.


&nbsp;

## Project Structure

This is a monorepo based on a [pnpm workspace](https://pnpm.io/workspaces):

- `packages`: Contains useful functions needed by this app
- `site`: The main site


&nbsp;

## Development Setup

This app is deployed with [Node.js](https://nodejs.org/) version 20+ and [pnpm](https://pnpm.io/) version 9+.

It is built on [Nuxt 3](https://nuxt.com), with the power of [Vue 3](https://github.com/vuejs/vue-next), [Vite](https://github.com/vitejs/vite), [Radix Vue](https://www.radix-vue.com/), [Zag](https://zagjs.com/), and [UnoCSS](https://github.com/antfu/unocss).

To start developing, clone the repository and install the dependencies.

```bash
pnpm install
```

Then, build the [packages](../packages):

```bash
pnpm build:pkg
```

To enable picking fonts from [Google Fonts](https://fonts.google.com/), you need to generate a [Google Fonts Developer API Key](https://developers.google.com/fonts/docs/developer_api#APIKey). After that, create a `.env` file in the [`site`](../site/) folder and add the following:

```
NUXT_PUBLIC_GOOGLE_FONTS_KEY="YOUR_API_KEY"
```

Finally, you can start developing or building the site:

```bash
pnpm dev
pnpm build
```


&nbsp;

## Multilingual

This app currently supports:

- English
- Simplified Chinese
- Spanish ([@fmpaci](https://github.com/fmpaci))

To add a new language, create a translation file `[language-code].yaml` in the [site/src/i18n](../site/src/i18n) folder. You can refer to the [English version file](../site/src/i18n/en.yaml) as a guide. Finally, add the language code, name, icon, and translation file name in [site/configs/i18n.ts](../site/configs/i18n.ts).
