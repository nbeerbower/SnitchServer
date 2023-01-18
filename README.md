# SnitchServer

A simple API and frontend for collecting and viewing crashes from [Snitch](https://github.com/JujuAdams/Snitch).

## Setup

Install the latest version of [NodeJS](https://nodejs.org/) on your machine. Then open a terminal window at the project directory and install dependencies with:

```
npm i
```

The frontend app also needs to be built:
```
cd app
npm i
npm run build
```

## Configure

Port, database name, and password protection can be set in `config.js`.

## Run

From the root project directory:
```
node index.js
```

By default the app will run on port `3001`.