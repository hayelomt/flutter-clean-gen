#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage(
    'Usage: $0 --model [model name] --folder [output base folder name] --json [stringified response object from api]'
  )
  .demandOption(['model', 'folder', 'json']).argv;
const fs = require('fs');
const { camelCase } = require('camel-case');
const { modelTemplate, entityTemplate } = require('./templates');
const { join } = require('path');
const { snakeCase } = require('snake-case');

const snakeModel = snakeCase(argv.model);
const parsedModel = JSON.parse(argv.json);
const baseFolderPath = join(argv.folder, snakeModel);

const parseFieldName = (datatype, name, entityClass = false) => {
  return name === camelCase(name) || entityClass
    ? `final ${datatype} ${name};`
    : `@JsonKey(name: '${name}')\n  final ${datatype} ${camelCase(name)};`;
};

const parseFieldType = (value) => {
  if (typeof value === 'string') {
    return 'String';
  }
  if (typeof value === 'number') {
    return value.toString().includes('.') ? 'float' : 'int';
  }
  if (typeof value === 'boolean') {
    return 'bool';
  }

  return ' ';
};

const modelFields = Object.entries(parsedModel)
  .map(([key, value]) => `  ${parseFieldName(parseFieldType(value), key)}`)
  .join('\n');

const entityFields = Object.entries(parsedModel)
  .map(
    ([key, value]) => `  ${parseFieldName(parseFieldType(value), key, true)}`
  )
  .join('\n');

fs.writeFileSync(
  join(baseFolderPath, 'data/models', `${snakeModel}_model.dart`),
  modelTemplate(argv.model, modelFields)
);
fs.writeFileSync(
  join(baseFolderPath, 'domain/entities', `${snakeModel}.dart`),
  entityTemplate(argv.model, entityFields)
);
