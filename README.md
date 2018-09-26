# Mamba App template

[![Greenkeeper badge](https://badges.greenkeeper.io/stone-payments/pos-mamba-app-template.svg)](https://greenkeeper.io/)

> A complete project template for building [Mamba](https://github.com/stone-payments/pos-mamba) apps.

## Requirements

Make sure all dependencies have been installed before moving on:

- [Node.js](http://nodejs.org/) >= v8.11.3

Recommended:

- [@mamba/cli](https://www.npmjs.com/package/@mamba/cli)

## Creating a new Mamba App

### With `@mamba/cli`

```shell
# Install the mamba cli globally if doesn't already have it
npm i -g @mamba/cli

# Create a new mamba app at 'my-mamba-app' directory
mamba new app my-mamba-app

? Name: My Mamba App
? Version: 0.0.1
? Description: My new Mamba app

# Enter the app directory
cd my-mamba-app

# Start the development server
mamba app start
```

### Manually

```shell
# Create and enter your new app directory
mkdir my-mamba-app
cd my-mamba-app

# Install the standard mamba app template
npx degit stone-payments/pos-mamba-app-template

# Install its dependencies with 'yarn'
npm i

# Run the development server
npm run start
```

## Building and deploying to the `POS`

1. Generate the *production* app bundle

```shell
# With the @mamba/cli
mamba app build

# Without the @mamba/cli
npm run build
```

This will generate the `dist/bundle.pos` directory and a `dist/bundle.pos.tar.gz` file, which both contains your Mamba app.

2. Start the local http server

```shell
npm run serve # Starts the local http server
```

3. Open the `Develop` app and insert your local server ip and the app will automatically look for the `dist/bundle.pos.tar.gz` and install it.

### Npm Commands

- `npm run start` - Start the dev server;
- `npm run serve` - Start a local http server;
- `npm run build` - Build the production bundle;
- `npm run build:dev` - Build the development bundle;
- `npm run build:analyze` - Analyze the final bundle;
- `npm run lint` - Lint all style and script files;
- `npm run format` - Format all style and script files;

## Documentation

- [Svelte](https://svelte.technology/guide)
