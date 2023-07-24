#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage(
    'Usage: $0 --model [model name] --folder [output base folder name] --verbose [generate all template files]'
  )
  .demandOption(['model', 'folder']).argv;
const { snakeCase, ap } = require('snake-case');
const fs = require('fs');
const { join } = require('path');
const {
  exportTemplate,
  repoImplTemplate,
  remoteDataSource,
  localDataSource,
  dataTemplate,
  entityTemplate,
  repoTemplate,
  domainTemplate,
  viewTemplate,
} = require('./templates');

const { model: modelName, folder: folderPath, verbose } = argv;

const snakeModel = snakeCase(modelName);
const baseFolderPath = join(folderPath, snakeModel);

const folders = [
  'data/repos',
  'data/models',
  'data/data_sources',
  'domain/entities',
  'domain/repos',
  'domain/usecases',
  'view/cubit',
  'view/widgets',
  'view/pages',
];

const files = ['data/data.dart', 'domain/domain.dart', 'view/view.dart'];

for (const folder of folders) {
  fs.mkdirSync(join(baseFolderPath, folder), { recursive: true });
}

for (const file of files) {
  fs.writeFileSync(join(baseFolderPath, file), '');
}

fs.writeFileSync(join(baseFolderPath, `${snakeModel}.dart`), exportTemplate);

if (!verbose) {
  console.log('done');
  process.exit(0);
}

// Generate templates
// Generate data layers
fs.writeFileSync(
  join(baseFolderPath, 'data/models', `${snakeModel}_model.dart`),
  ''
);
fs.writeFileSync(
  join(baseFolderPath, 'data/repos', `${snakeModel}_repo_impl.dart`),
  repoImplTemplate(modelName)
);
fs.writeFileSync(
  join(
    baseFolderPath,
    'data/data_sources',
    `${snakeModel}_remote_data_source.dart`
  ),
  remoteDataSource(modelName)
);
fs.writeFileSync(
  join(
    baseFolderPath,
    'data/data_sources',
    `${snakeModel}_local_data_source.dart`
  ),
  localDataSource(modelName)
);
fs.writeFileSync(
  join(baseFolderPath, 'data', `data.dart`),
  dataTemplate(modelName)
);

// Generate domain layers
fs.writeFileSync(
  join(baseFolderPath, 'domain/entities', `${snakeModel}.dart`),
  entityTemplate(modelName)
);
fs.writeFileSync(
  join(baseFolderPath, 'domain/repos', `${snakeModel}_repo.dart`),
  repoTemplate(modelName)
);
fs.writeFileSync(
  join(baseFolderPath, 'domain', `domain.dart`),
  domainTemplate(modelName)
);

// Page layers
fs.writeFileSync(
  join(baseFolderPath, 'view/pages', `${snakeModel}_page.dart`),
  ''
);
fs.writeFileSync(
  join(baseFolderPath, 'view', `view.dart`),
  viewTemplate(modelName)
);
