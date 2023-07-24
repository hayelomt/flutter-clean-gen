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

exports.modelTemplate = (modelName, fields = '') => `
part '${snakeCase(modelName)}_model.g.dart';

@JsonSerializable()
class ${pascalCase(modelName)}Model {
  ${fields}


  factory ${pascalCase(modelName)}Model.fromJson(Map<String, dynamic> json) =>
      _$${pascalCase(modelName)}ModelFromJson(json);

  Map<String, dynamic> toJson() => _$${pascalCase(modelName)}ModelToJson(this);

  factory ${pascalCase(modelName)}Model.fromDocument(
      QueryDocumentSnapshot<Map<String, dynamic>> snap) {
    final doc = snap.data();
    doc['id'] = snap.id;

    return ${pascalCase(modelName)}Model.fromJson(doc);
  }

  ${pascalCase(modelName)} get entity => ${pascalCase(modelName)}
}
`;

exports.entityTemplate = (modelName, fields = '') => `
class ${pascalCase(modelName)} {
${fields}
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
