'use strict';

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'docs');

function traverse(fd, prefix = './') {
  const name = path.basename(fd);
  if (!fs.lstatSync(fd).isDirectory()) {
    return {
      name,
      prefix,
      link: prefix + name,
    };
  }
  const list = fs.readdirSync(fd).filter(i => !i.startsWith('.'));
  const newPrefix = prefix + name + '/';
  return {
    name: name,
    prefix,
    children: list.map(i => traverse(path.join(fd, i), newPrefix))
  };
}

const menu = traverse(dir).children;


function buildMarkdown(menu, indent = '') {
  if (!menu || (Array.isArray(menu) && menu.length === 0)) {
    return '';
  }
  return menu.map(item => {
    const head = `${indent}- [${item.name}](${item.prefix}${item.name})`;
    const content = buildMarkdown(item.children, indent + '  ');
    return [head, content].join('\n');
  }).join('');
}

const str = buildMarkdown(menu);

fs.writeFileSync('./menu.md', str);
