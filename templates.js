const { pascalCase } = require('pascal-case');
const { snakeCase } = require('snake-case');

exports.exportTemplate = `export 'data/data.dart';
export 'domain/domain.dart';
export 'view/view.dart';
`;

exports.repoTemplate = (modelName) => `
abstract class ${pascalCase(modelName)}Repo {

}
`;

exports.repoImplTemplate = (modelName) => `import '../../${snakeCase(
  modelName
)}.dart';

class ${pascalCase(modelName)}RepoImpl implements ${pascalCase(modelName)}Repo {

}
`;

exports.remoteDataSource = (modelName) => `
class ${pascalCase(modelName)}RemoteDataSource {

}
`;

exports.localDataSource = (modelName) => `
class ${pascalCase(modelName)}LocalDataSource {

}
`;

exports.dataTemplate = (modelName) => `export 'data_sources/${snakeCase(
  modelName
)}_local_data_source.dart';
export 'data_sources/${snakeCase(modelName)}_remote_data_source.dart';
export 'models/${snakeCase(modelName)}_model.dart';
export 'repos/${snakeCase(modelName)}_repo_impl.dart';
`;

exports.entityTemplate = (modelName) => `
class ${pascalCase(modelName)} {

}
`;

exports.domainTemplate = (modelName) => `export 'entities/${snakeCase(
  modelName
)}.dart';
export 'repos/${snakeCase(modelName)}_repo.dart';
`;

exports.viewTemplate = (modelName) => `export 'pages/${snakeCase(
  modelName
)}_page.dart';
`;
