import fs from 'fs-extra';
import { resolve } from 'path';

export function isDir(path) {
  const state = fs.statSync(resolve(path));
  return state.isDirectory();
}

export function readDir(path) {
  return fs.readdirSync(resolve(path));
}

export function mkdir(path) {
  fs.ensureDirSync(resolve(path));
}

export function mkFile(path) {
  fs.ensureFileSync(resolve(path));
}

export function clearDir(path) {
  fs.emptyDirSync(resolve(path));
}

export function getDirFile(path) {
  return fs.readdirSync(resolve(path));
}

export function initJson(path = 'json/storage.json') {
  mkFile(path);
  if (fs.readFileSync(resolve(path)).toString() === '') {
    fs.writeFileSync(resolve(path), '{}');
  }
}

export function getJson(path = 'json/storage.json') {
  initJson(path);
  return fs.readJSONSync(resolve(path));
}

export function writeJson(obj, path = 'json/storage.json') {
  initJson(path);
  fs.writeJSONSync(resolve(path), obj, {
    spaces: 2
  })
}

export function getEmptyJpeg() {
  return resolve('./src/assets/empty/empty.jpeg');
}