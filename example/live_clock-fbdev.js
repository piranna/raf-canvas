#!/usr/bin/env node

const { backends: { FBDevBackend }, Canvas } = require('canvas')

const rafCanvas = require('..')

const clock = require('./clock')


const device = process.argv[2]

const backend = new FBDevBackend(device, true)
const canvas = new Canvas(backend)
const ctx = canvas.getContext('2d')

const {requestAnimationFrame} = rafCanvas(backend)

function draw (timestamp) {
  clock(ctx)

  backend.swapBuffers()
  requestAnimationFrame(draw)
}

draw()
