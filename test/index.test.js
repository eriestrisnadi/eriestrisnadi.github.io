const { readFileSync } = require('fs');
const { resolve, join } = require('path');
const Mustache = require('mustache');
const RESOURCES_PATH = resolve('resources');
const INDEX_PATH = resolve('index.html');
const data = JSON.parse(readFileSync(join(RESOURCES_PATH, 'cached.json'), 'utf8'));
const file = readFileSync(join(RESOURCES_PATH, 'index.mustache'), 'utf8');
const index = readFileSync(INDEX_PATH, 'utf8');
const rendered = Mustache.render(file, data);

test('index.html must be same as the second rendered string!', () => {
  expect(index).toEqual(rendered);
});
