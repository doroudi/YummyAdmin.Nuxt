# Yummy Admin Nuxt

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
![Vercel Deploy](https://deploy-badge.vercel.app/vercel/yummy-admin-nuxt)
[![Static Badge](https://img.shields.io/badge/Fa-IR?style=flat&label=Lang)](https://github.com/doroudi/YummyAdmin/blob/main/README.fa-ir.md)
[![Static Badge](https://img.shields.io/badge/Zh-CN?style=flat&label=Lang&color=red)](https://github.com/doroudi/YummyAdmin/blob/main/README.zh-cn.md)
<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px"></a>

Free Nuxt AdminPanel based on Naive UI and Tailwind CSS. Fairly complete with a beautiful design, Full RTL support and multilingual support.

![Preview](/docs/banner-dark.png "Preview")

<p align='center'>
   <a href="https://yummy-admin-nuxt.vercel.app/">🌏 Live Demo</a>
   <a href="https://yummy-admin-nuxt.vercel.app?theme=dark">🌑 Dark Mode</a>
   <br>
   Other languages demo:<br />
   <a href="https://yummy-admin-nuxt.vercel.app?lang=fa"> Persian</a> |
   <a href="https://yummy-admin-nuxt.vercel.app?lang=zh"> Chines</a>
</p>

![Preview](/docs/banner-light.png "Preview Light")

## Try it now

> Yummy Admin Nuxt requires Node >=20.0

### Clone to local

```bash
npx degit https://github.com/doroudi/yummyadmin.nuxt yummy-admin-nuxt
cd yummy-admin-nuxt
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try to follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `locales/en.yaml`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Remove the `.github` folder, which contains the funding info
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

### Support this project

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>

### Development

Just run and visit http://localhost:3000

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist`, which is ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.