# raf-canvas

Implementation of
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
for [node-canvas](https://github.com/Automattic/node-canvas)

It needs a modified `node-canvas` that has support for VSync, like the one of
[Ventrata](https://github.com/ventrata/node-canvas).

## Usage

```js
const { FBDevBackend } = require('canvas').backends
const rafCanvas = require('raf-canvas')

const backend = new FBDevBackend()
const {requestAnimationFrame} = rafCanvas(backend)

requestAnimationFrame(function(timestamp)
{
  ...
})
```
