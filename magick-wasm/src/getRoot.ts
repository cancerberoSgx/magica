import { test, mkdir } from 'shelljs';
import { homedir } from 'os';
export function getRoot() {
  const d = homedir() + '/.magick-wasm';
  if (!test('-d', d)) {
    mkdir('-p', d);
  }
  return d;
}
