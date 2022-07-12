# UI Component sharing for enterprises

As soon as you have more than one application with a web UI, sharing components across them usually makes sense. This is how you get all the nice things:

- tree-shakable ES Module exports + CommonJS
- TypeScript definitions
- Securely sharing the component library via your GitHub organization
- Automatic releases via GitHub Actions

# Setting up the library

First, bootstrap with npm and git. For that, create a new folder and add a `package.json`:

```json
{
  "name": "@bigco/ui-components",
  "version": "0.0.1",
  "description": "Big Corporation UI component library",
  "license": "UNLICENSED",
  "peerDependencies": {
    "react": "16-18",
    "react-dom": "16-18"
  }
}
```

- Use your GitHub org name as package scope (here `@bigco`). This is important to be able to properly share it across your organization. Upper- and lowercase doesn't seem to matter.
- This is an enterprise tutorial, so you probably want to have `"license": "UNLICENSED"` in your `package.json`. See the [`package.json` docs](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#license) for more information.
- As this is a React UI library, you want to have `react` and `react-dom` as peer dependencies. This means that NPM will yell if someone tries to install it in an environment where `react` or `react-dom` is missing and allows us to exclude both packages from the library bundle. There's an excellent [article on node.js on peer dependencies](https://nodejs.org/es/blog/npm/peer-dependencies/).

Now, run `git init` and we can start writing the first component.

# Writing components

Install all the dependencies you need:

```bash
npm add -D typescript @types/react react react-dom
```

The compiled library will not depend on react per-se, as it will be a peer dependency, which is why we're installing it as `devDependency`.

We add a pretty normal `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "declarationDir": "dist",
    "declaration": true,
    "outDir": "dist",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"]
}
```

Now create, for example, `src/components/Container.tsx`:

```tsx
import React from 'react'

interface ContainerProps {
  title: string
}
const Container: React.FC<ContainerProps> = ({ title }) => (
  <div style={{ border: '1px solid steelblue' }}>
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)
```

# Setting up ESBuild

Bundling JS libraries is a complex topic and there are many ways of doing things. One pretty recent and (imho) really enjoyable way is to let TypeScript generate the declaration files and use [ESBuild](https://esbuild.github.io/) to compile everything to ES Modules and CommonJS. This makes building the library surprisingly fast.

Create an entrypoint for your library (e.g. `src/index.tsx`):

```tsx
export { default as Container } from './components/Container'
```

Install all the necessary dependencies:

```bash
npm add -D rimraf concurrently esbuild
```

Now, create a ESBuild configuration file (e.g. `esbuild.mjs`):

```js
import esbuild from 'esbuild'

const baseConfig = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  sourcemap: true,
  external: ['react'],
  target: 'esnext',
}

// esm
esbuild.build({
  ...baseConfig,
  outdir: 'dist/esm',
  splitting: true,
  format: 'esm',
})

// cjs
esbuild.build({
  ...baseConfig,
  outdir: 'dist/cjs',
  format: 'cjs',
})
```

Finally, we add the necessary scripts to the `package.json`:

```json
{
  "scripts": {
    "ts-types": "tsc --emitDeclarationOnly --outDir dist",
    "build": "rimraf dist && concurrently \"node ./esbuild.mjs\" \"npm run ts-types\""
  }
}
```

We can now create our compiled library by running `npm run build`. It should land in the `dist` folder, which includes everything we want to publish.

# Publishing the library

In order to consume the library in our UIs, we first have to publish it. There are two ways of doing this:

- publishing to the public NPM registry, or
- publishing to some private registry.

In an enterprise context, the latter is the typical approach. Organizations typically have some Artifactory setup. But there's a way more comfortable way of doing this, which is by using the [GitHub Packages Registry](https://github.com/features/packages).

The main advantages are:

- Organizations typically already have GitHub with properly scoped GitHub organizations, so developers don't need to log in to a separate registry service.
- To publish packages from GitHub Actions, absolutely no configuration is necessary. No expiring Artifactory tokens in each repository's secrets!
- Consuming the packages is straightforward, simply log in to your NPM CLI with your GitHub username and a [GitHub PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) (explained below).

First, we need to declare the `dist` files in our `package.json`:

```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "files": ["dist"],
  "types": "dist/index.d.ts"
}
```

Additionally, we need to specify the package's repository in the `package.json`, which has to be in your GitHub organization.

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/bigco/ui-components.git"
  }
}
```

We will now create a GitHub Actions workflow to publish the package whenever we create a new release.

```yml
# .github/workflows/publish.yml

name: Publish package to GitHub Packages
on:
  release:
    types: [created]
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16' # current LTS as of writing this
          cache: 'npm' # makes later runs crazy fast
          registry-url: 'https://npm.pkg.github.com'
          scope: '@bigco'
      - run: npm install
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }} # this is automatically set by GitHub, no need to add a secret
```

You can publish a new version by

1. updating the `version` field in `package.json`,
2. pushing the update to main, and then
3. tagging a new release.

GitHub Actions will then publish a new version to the registry.

# Consuming the library

Consuming the library works pretty much like consuming a package from NPM. You just have to authenticate the NPM CLI.

First, you need to create a personal access token (PAT). You can do this [here](https://github.com/settings/tokens). Your token needs `delete:packages`, `repo` and `write:packages` scopes. If necessary, enable SSO.

Afterwards, log in to the NPM CLI by running

```bash
npm login --scope=@bigco --registry=https://npm.pkg.github.com
```

When asked, use your GitHub username as username, the PAT as password and the main mail associated with your GitHub account as mail address.

You can now install packages from your organization's scope just like regular NPM packages.
