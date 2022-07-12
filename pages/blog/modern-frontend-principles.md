# Modern frontend principles

Here are some points I usually check when working with a legacy frontend codebase.

## Documentation

If you're starting to work on a legacy project and have an insane amount of luck, there might already be some documentation present. But most often, there's only some out-of-date information scattered around somewhere.

My process of working on documentation for legacy projects goes like this:

- Every time I have a question regarding the application or its codebase, I write it down in a `FAQ.md`. If I find the answer, I add the answer and the place/person where I got it.
- Treat documentation like this: If a person can't easily find the information they're looking for, it doesn't exist. Having some stale docs deep down in a confluence tree helps nobody. Making sure that docs are easily discoverable is just as important as the docs themselves.

Once you have a solid grasp of the project, start structuring the information you gathered in a hierarchical way. For example, I like having the following structure in the `README.md`:

1. Two-sentence elevator pitch - what does this artifact do?
2. Table of contents
3. What does one have to do to start working on the artifact
4. How does the building process work
5. How does deployment work
6. External links (Azure resources, Kibana dashboards,...)

## TypeScript

There's (imho) no sane reason to keep an enterprise codebase on JavaScript. Migrating to TypeScript should be the first step.

- Install the typical devDependencies, like `typescript` and `ts-node-dev`.
- Try to get a development version up and running without actually changing any files from JS to TS.
- Once the development version is running, start by incrementally migrating parts of the application to TS.
- As soon as the codebase is somewhat migrated to TS, start to make sure that the build step works properly. This usually means re-setting the main file in `package.json`.

## Linting

Linting is probably one of the things that saves most time during development. I usually like the following setup:

- ESLint with standard TypeScript ruleset
- The `standard` ruleset
- Prettier, invoked through ESLint

You can look at [this repo](https://github.com/nfour/eslint-config-standard-typescript-prettier) for guidance on how it is set up.

## Dependencies

- Install [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).
- Run `ncu` in your project root, which will tell you which packages are outdated.
- If there's no good reason to stay on some old version, update all packages by running `ncu -u`.

If the project is sufficiently old, this will probably break lots of things. If TypeScript and linting is properly set up, most of those errors can be nicely caught.

Also, dependencies are often not sorted correctly, as NPM (and other package managers) don't really enforce rules here. My rule of thumb is:

- **`dependencies`**: Packages the production bundle needs (even though they are usually compiled into the actual bundle).
- **`devDependencies`**: Everything needed to build the production bundle (especially all `@types/` packages).
- **`peerDependencies`**: Packages the specific package extends (e.g. `@material-ui/core` when building custom MUI components) or packages without which the specific package makes no sense (e.g. `react` for a custom react visualization library).

## Unimported files

It's quite typical for long-running projects to accumulate unused components that lay around here and there. If the project setup is not too exotic, you can find unused dependencies and files by running this command:

```bash
npx unimported .
```

## Bundling

- Use bundle analyzers to check that there's no unnecessary trash in your bundles (e.g. [`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer), [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer), [`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer)).
- Make sure you actually need all those rollup/webpack plugins. If your project has one SVG file, just wrap it manually into a component instead of letting `svgr` run over your 800-file project.
- Use modern tooling if you can. Using `esbuild` or `vite` will massively increase your developer happiness compared to `create-react-app` or some selfmade Parcel configs from the stone age.
- Make sure you're using code splitting (if building a frontend), so that you don't download 5MB of JS for a simple Login page.
- Cache as much stuff as you can and cache-bust where necessary.
- If you're building a library to be consumed by different frontends, it's absolutely crucial that the library is nicely tree-shakable. Otherwise your 5000-icon-library will be fully included in application bundles even if the application only uses 3 of them.

## Minification

Usually this gets taken care of by the bundler of your choice, which will internally use [terser](https://github.com/terser/terser) to minify your bundle down.

It's really important to remember that this only applies to applications, not to libraries. **Do not minify libraries** (exceptions exist of course, e.g. when pushing to services like [jsdelivr](https://www.jsdelivr.com/)). Let the applications that consume your library take care of minification, because

- it reduces the risk of breaking tree-shakeability
- it allows application developers to introspect the library easier

## Tests

In a perfect scenario, the following tests should exist:

- Unit tests for helper functions etc
- Integration tests mocking backend services and checking all functionality through Cypress tests

I personally never really saw the benefits of things like snapshot testing because they're so brittle.

And I never understood shallow unit tests of React components.

<figure className="flex flex-col items-center">
	<img src="/static/images/frontend-principles/meme.jpg" alt="Shallow component unit tests" style={{ maxWidth: '600px' }} />
	<figcaption>Component unit tests doing their work</figcaption>
</figure>

## Internationalization and Localization

It's important to know the difference between those two - internationalization refers to stuff you need to do in order to make your application localizeable, i.e. adaptable to different regions.

Both the user's language and region-specific preferences can be guessed, but ideally they should be able to override both. One common pitfall is allowing the user to set a language and formatting things like dates according to it. For English, for example, this will cause tons of people to face a (for them) weird date format, as they differ heavily throughout the English-speaking world.

- don't self-bake stuff, use battle-tested solutions like `react-i18next`
- don't implement date formatting yourself, use browser APIs like `Intl.DateTimeFormat` - you probably don't need Luxon and friends for that
- make sure that you respect the i18n/l10n needs of the libraries you use - e.g. [Material-UI requires specific settings](https://mui.com/guides/localization/#main-content).

## Responsivity

I've more often seen responsivity being over- than under-engineered, so

- make sure that you are actually aware of the different screen sizes you have to support - if you're developing a business dashboard, a minimum required resolution of 1080p should (hopefully!) be ok
- use modern CSS wherever possible - a lot of good responsivity can be achieved through proper use of things like Flexbox and Grid without ever touching media breakpoints.
- make sure media breakpoints are centralized, otherwise this becomes a testing nightmare.

## Errors

Make sure that errors can't go unnoticed. You will typically have some kind of global error bus that can be reached from everywhere. There are many great libraries for this, I personally really like [`react-hot-toast`](https://react-hot-toast.com/).

## Server State

Something that is very characteristic for frontends is fetching server state too often. Having a 20 second API call running every time you switch between two commonly-used views is very annoying and often unnecessary.

In my opinion, properly handling server state is one of the hardest things to get right in frontend development. Some of the challenges (see also the [list over at react-query](https://react-query.tanstack.com/overview#motivation)):

- **Request caching** to avoid expensive queries on quick view switches
- **Deduplication** to avoid synchronization logic between two components far apart, e.g. a notification icon in the navbar showing some message count and having those messages also displayed elsewhere
- **Request invalidation** - if you delete a ToDo from your ToDo list, delete it remotely and refetch instead of deleting it remotely and locally to avoid edge-cases (multiple devices, server-side error,...)
- **Background updates** of out-of-date data (and determining when data is out-of-date)

There are multiple nice libraries to help with that, like [React Query](https://react-query.tanstack.com/) (which I personally prefer) and [swr](https://swr.vercel.app/).

As always - don't reinvent the wheel, use industry-standard solutions.

## Guardrails

A lot of errors and bad practices can be catched automatically by providing some guardrails.

- Use [Husky](https://github.com/typicode/husky) to enforce linting rules before committing
- Let [bundlesize](https://github.com/siddharthkp/bundlesize) yell at you via a GitHub action if a PR significantly increases the bundle size
- Run all tests as PR gate in a GitHub action

# Conclusion

If you adhere to all the stuff listed above, your application should hopefully be

- well-documented
- minimal in the amount of code
- adhering to modern principles of bundling
- well-tested and stable

With this, you should have yourself an application that can be nicely maintained for the time to come.
