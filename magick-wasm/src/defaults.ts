import {  defaultOptions } from './main';
import { mkdir, ls, test } from 'shelljs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Context, Library, TemplateContext, Options } from "./types";


export const defaultLibraries = ['fftw', 'freetype', 'libjpeg', 'libpng', 'tiff', 'webp', 'zlib', 'openjpeg', 'lcms', 'raw', 'autotrace', 'libde265', 'libheif'
  // 'openexr',
];

export const defaultContext: Required<Context> = {
  type: 'production',
  noClean: false,
  quantumDepth: '16',
  noHdri: false,
  scriptsFolder: 'emscripten-scripts',
  templatesFolder: join(__dirname, '..', 'src', 'templates'),
  libraries: defaultLibraries as Library[],
  noLibraries: false,
  skipImageMagickConfig: false,
  skipImageMagickBuild: false,
  noRun: false
};

export const defaultTemplateContext: Required<TemplateContext> = {
  ...defaultOptions,
  addLib(this: Required<Options>, lib: Library) {
    throw new Error('Not implemented');
  },
  test, ls, mkdir, readFileSync, writeFileSync
};
