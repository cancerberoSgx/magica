import * as React from 'react'
import { File } from 'magica';
import { getFileExtension } from 'misc-utils-of-mine-generic';

export function width() {
  return document.body.clientWidth
}

export function height() {
  return window.screen.height
}

export function isDesktop() {
  return width() >= 1023
}

export const Space = () => (
  <span style={{ marginRight: '0.5em' }}></span>
)

export function createUrl() {
  const s = {
    // code: getCodeEditorText(),
  }
  const b = btoa(JSON.stringify(s))
  window.location.hash = '#state=' + b
}

export function loadUrl() {
  if (window.location.hash.includes('state=')) {
    const d = window.location.hash.split('state=')[1]
    const state = JSON.parse(atob(d))
    // setCodeEditorText(state.code)
  } else {

  }
}

