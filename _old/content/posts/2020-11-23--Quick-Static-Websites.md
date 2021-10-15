---
title: quick static websites for small businesses
date: '2020-11-23T12:00:37.121Z'
template: 'post'
draft: false
slug: 'quick-websites'
category: 'Development'
tags:
  - 'development'
description: "During the Coronavirus pandemic, several local businesses contacted me and asked if I could help set them up with  a nice website. As requests were usually quite custom, an off-the-shelf Wordpress site would've become a struggle, so I decided to go for a more robust setup. This post describes the process."
socialImage: '/media/image-code.jpg'
---

During the Coronavirus pandemic, several local businesses contacted me and asked if I could help set them up with a nice website. As requests were usually quite custom, an off-the-shelf Wordpress site would've become a struggle, so I decided to go for a more robust setup. This post describes the process.

![Coding Banner](/media/image-code.jpg)

# The Stack

As all requested sites are quite static, I decided to go with [Next.js](https://nextjs.org/). The full stack looks like this:

- Next.js
- [tailwindcss](https://tailwindcss.com/) for styling

# Base setup

Make sure that you have a basic web development setup in place ([Node](https://nodejs.org/en/), [VS Code](https://code.visualstudio.com/))

```sh
npx create-next-app new-page
cd new-page
npm run dev
```

Add `tailwindcss` and friends:

```sh
npm install tailwindcss postcss-preset-env
```

Create a `postcss` config file:

```js
// postcss.config.js

module.exports = {
  plugins: ['tailwindcss', 'postcss-preset-env'],
}
```

Override the auto-generated `globals.css` file:

```css
/* styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Also, remove the `styles/Home.module.css` file.

Next, let `tailwindcss` purge unused styles by creating an appropriate config file:

```js
// tailwind.config.js

module.exports = {
  purge: ['./pages/**/*.js'],
  theme: {},
  variants: {},
  plugins: [],
}
```

The base setup is now done :)

# Adding custom fonts

Create a document overwrite:

```jsx
// pages/_document.js

import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

You can now use your custom font (e.g. Lobster) in your style files.

# Adding eslint and prettier

You could also add Typescript in this step, but that seems like overkill for small sites.

Install all needed dependencies:

```sh
npm install -D eslint eslint-plugin-react eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node prettier eslint-config-prettier eslint-plugin-prettier
```

Add a `.eslintrc.js` file:

```js
// .eslintrc.js

module.exports = {
  extends: ['standard', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
}
```

Add a `.prettierrc.js` file:

```js
// .prettierrc.js

module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
}
```

# Use Blurhash for nicer image placeholders

[Next 10 introduced a built-in image optimization pipeline](https://nextjs.org/blog/next-10#built-in-image-component-and-automatic-image-optimization), which means that that doesn't need to be done by hand anymore, nice!

One small improvement can be done, though: Using [next-placeholder](https://github.com/joe-bell/next-placeholder) to generate a blurred out preview using [BlurHash](https://blurha.sh/).

Add `next-placeholder`:

```sh
npm i next-blurhash react-blurhash
```

Create a `BlurImage` component:

```jsx
import Image from 'next/image'
import { useState } from 'react'
import { BlurhashCanvas } from 'react-blurhash'

const BlurImage = ({ imgHash, ...passProps }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <main>
      <div className="relative">
        <BlurhashCanvas
          hash={imgHash}
          width={32}
          height={32}
          punch={1}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        />
        <Image
          {...passProps}
          className={`transition ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </main>
  )
}

export default BlurImage
```

This component can be used just like the built-in `Image` component, it only provides one additional prop, `imgHash`. Use e.g. `getStaticProps` on a page to pre-compute a hash:

```jsx
import { getBlurhash } from 'next-blurhash'
import Image from 'next/image'
import BlurImage from '../components/blurImage'

export async function getStaticProps() {
  const hash = await getBlurhash('/my-image.jpg')

  return {
    props: {
      hash,
    },
  }
}

const MyPage = ({ hash }) => (
  <div>
    <BlurImage
      imgHash={hash}
      src={'/my-image.jpg'}
      alt="This is my image"
      width={1920}
      height={1080}
    />
  </div>
)

export default MyPage
```

That's it for now :)
