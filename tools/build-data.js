const { writeFileSync, readdirSync, readFileSync } = require('fs');
const { join, resolve } = require('path');
const merge = require('deepmerge')
const { name, version, author } = require('../package.json');
const RESOURCES_PATH = resolve('resources');
const JSON_DATA_PATH = join(RESOURCES_PATH, 'data-json');
const JSON_INDEX_PATH = join(RESOURCES_PATH, 'index.json');
const JSON_DATA = readdirSync(JSON_DATA_PATH);


const SETTING_DATA = {
  setting: {
    name,
    version,
    author,
  },
};

let DATA = {};

JSON_DATA.map(o => {
  const item = {
    name: o.replace('.json', ''),
    data: JSON.parse(readFileSync(join(JSON_DATA_PATH, o), 'utf8') || '{}'),
  };
  
  if(item.name != 'setting') {
    DATA[item.name] = item.data;
  } else {
    SETTING_DATA[item.name] = merge(SETTING_DATA[item.name], item.data);
  }
  return o;
});

DATA = merge(SETTING_DATA, DATA);

writeFileSync(JSON_INDEX_PATH, JSON.stringify(DATA, null, 4));