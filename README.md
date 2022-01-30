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

## Run

From the root project directory:
```
node index.js
```

By default the app will run on port `3001`.

## Client Setup

`snitch_sync.gml` is provided as an example of how to upload a crash to the server. You can simply change `postURL` to match your server's location then run `snitch_sync()` at your game's start.