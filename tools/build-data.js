const { writeFileSync, readdirSync, readFileSync } = require('fs');
const { join, resolve } = require('path');
const { set, values, merge, keyBy } = require('lodash');
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

const NAVIGATION_DATA = [
  {
    name: 'Contact',
    icon: 'mail',
    link: `mailto:${author.email || ''}`,
  },
];

const DATA = JSON_DATA.map((obj) => ({
  key: obj.replace('.json', ''),
  value: JSON.parse(readFileSync(join(JSON_DATA_PATH, obj), 'utf8') || '{}'),
})).reduce(
  (obj, item) => ({
    ...obj,
    [item['key']]: item.value,
  }),
  {}
);

const MERGED_DATA = set(
  merge(SETTING_DATA, DATA),
  'navigation.social',
  values(merge(keyBy(DATA.navigation.social, 'name'), keyBy(NAVIGATION_DATA, 'name')))
);

writeFileSync(JSON_INDEX_PATH, JSON.stringify(MERGED_DATA, null, 2));
