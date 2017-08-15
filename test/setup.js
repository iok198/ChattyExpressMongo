require("babel-register")

const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

let storage = { }

global.window.localStorage = {
  getItem(item) {
    return storage[item]
  },

  setItem(item, value) {
    storage[item] = value
  }
}

// global.window.fetch = () => { }

copyProps(window, global)
