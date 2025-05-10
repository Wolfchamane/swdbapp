package io.wolfchamane.openapigenerators;

import org.openapitools.codegen.*;
import org.openapitools.codegen.languages.AbstractTypeScriptClientCodegen;
import org.openapitools.codegen.model.ModelMap;
import org.openapitools.codegen.model.ModelsMap;
import org.openapitools.codegen.model.OperationMap;
import org.openapitools.codegen.model.OperationsMap;
import org.openapitools.codegen.utils.CamelizeOption;
import org.openapitools.codegen.utils.ModelUtils;
import org.openapitools.codegen.utils.StringUtils;
import io.swagger.v3.oas.models.media.Schema;

import java.util.*;
import java.io.File;

import static org.apache.commons.lang3.StringUtils.capitalize;
import static org.openapitools.codegen.utils.StringUtils.*;

public class SwdbappHttpInfraGenerator extends AbstractTypeScriptClientCodegen {

    private static final String DEFAULT_IMPORT_PREFIX = "./";
    private static final String DEFAULT_MODEL_IMPORT_DIRECTORY_PREFIX = "../";

    protected String serviceSuffix = "HttpClient";
    protected String serviceFileSuffix = ".http-client";
    protected String modelSuffix = "";
    protected String modelFileSuffix = ".model";

    public SwdbappHttpInfraGenerator() {
        super();

        outputFolder = "generated-code/swdbapp-frontend";

        modelTemplateFiles.put("model.mustache", ".ts");
        apiTemplateFiles.put("api.mustache", ".ts");

        templateDir = "templates";
        apiPackage = "clients";
        modelPackage = "models";

        supportingFiles.add(
                new SupportingFile("models.mustache", modelPackage().replace('.', File.separatorChar), "index.ts"));
        supportingFiles
                .add(new SupportingFile("apis.mustache", apiPackage().replace('.', File.separatorChar), "index.ts"));
        supportingFiles.add(new SupportingFile("index.mustache", getIndexDirectory(), "index.ts"));
    }

    @Override
    protected void addAdditionPropertiesToCodeGenModel(CodegenModel codegenModel, Schema schema) {
        codegenModel.additionalPropertiesType = getTypeDeclaration(getSchemaAdditionalProperties(schema));
        addImport(codegenModel, codegenModel.additionalPropertiesType);
    }

    @Override
    public String getName() {
        return "swdbapp-http-infra-generator";
    }

    @Override
    public boolean isDataTypeFile(final String dataType) {
        return "Blob".equals(dataType);
    }

    @Override
    public String getTypeDeclaration(Schema p) {
        if (ModelUtils.isFileSchema(p)) {
            return "Blob";
        } else {
            return super.getTypeDeclaration(p);
        }
    }

    @Override
    public void postProcessParameter(CodegenParameter parameter) {
        super.postProcessParameter(parameter);
        parameter.dataType = applyLocalTypeMapping(parameter.dataType);
    }

    private String applyLocalTypeMapping(String type) {
        if (typeMapping.containsKey(type)) {
            type = typeMapping.get(type);
        }
        return type;
    }

    @Override
    public OperationsMap postProcessOperationsWithModels(OperationsMap operations, List<ModelMap> allModels) {
        OperationMap objs = operations.getOperations();

        objs.put("apiFilename", getApiFilenameFromClassname(objs.getClassname()));

        List<CodegenOperation> ops = objs.getOperation();
        boolean hasSomeFormParams = false;
        boolean hasSomeEncodableParams = false;
        boolean hasSomeProjectPathParam = false;

        ArrayList<String[]> originalOperationIds = new ArrayList<>();

        for (CodegenOperation op : ops) {
            if (op.getHasFormParams()) {
                 hasSomeFormParams = true;
            }

            op.httpMethod = op.httpMethod.toUpperCase(Locale.ENGLISH);

            originalOperationIds.add(op.operationIdOriginal.split("\\."));

            op.path = op.path.replace("{", "${");
        }

        for(int i = 0; i < originalOperationIds.size(); i++) {
            String[] operationId = originalOperationIds.get(i);

            if (ops.get(i).operationIdOriginal.contains(".")) {
                String methodName;

                methodName = StringUtils.camelize(operationId[2], CamelizeOption.LOWERCASE_FIRST_CHAR);

                if (hasDuplicateMethodNames(originalOperationIds, methodName, 1)) {
                    methodName = StringUtils.camelize(operationId[1] + "-" + operationId[2], CamelizeOption.LOWERCASE_FIRST_CHAR);

                    if (hasDuplicateMethodNames(originalOperationIds, methodName, 2)) {
                        methodName = StringUtils.camelize(operationId[0] + "-" + operationId[1] + "-" + operationId[2], CamelizeOption.LOWERCASE_FIRST_CHAR);
                    }
                }

                ops.get(i).nickname = methodName;
            }
        }

        operations.put("hasSomeFormParams", hasSomeFormParams);
        operations.put("hasSomeEncodableParams", hasSomeEncodableParams);
        operations.put("hasProjectPathParam", hasSomeProjectPathParam);

        List<Map<String, String>> imports = operations.getImports();
        for (Map<String, String> im : imports) {
            im.put("filename", im.get("import"));
            im.put("classname", im.get("classname"));
        }

        return operations;
    }

    @Override
    public ModelsMap postProcessModels(ModelsMap objs) {
        ModelsMap result = super.postProcessModels(objs);
        return postProcessModelsEnum(result);
    }

    @Override
    public Map<String, ModelsMap> postProcessAllModels(Map<String, ModelsMap> objs) {
        Map<String, ModelsMap> result = super.postProcessAllModels(objs);
        for (ModelsMap entry : result.values()) {
            for (ModelMap mo : entry.getModels()) {
                CodegenModel cm = mo.getModel();

                Set<String> parsedImports = parseImports(cm);
                mo.put("tsImports", toTsImports(cm, parsedImports));
            }
        }
        return result;
    }

    @Override
    public String toApiName(String name) {
        if (name.length() == 0) {
            return "DefaultHttpClient";
        }
        return camelize(name) + serviceSuffix;
    }

    @Override
    public String toApiFilename(String name) {
        if (name.length() == 0) {
            return "default.http-client";
        }
        return this.convertUsingFileNamingConvention(name) + serviceFileSuffix;
    }

    @Override
    public String toApiImport(String name) {
        if (importMapping.containsKey(name)) {
            return importMapping.get(name);
        }
        return apiPackage() + "/" + toApiFilename(name);
    }

    @Override
    public String toModelFilename(String name) {
        if (importMapping.containsKey(name)) {
            return importMapping.get(name);
        }
        return DEFAULT_IMPORT_PREFIX + this.convertUsingFileNamingConvention(super.toModelFilename(name)) + modelFileSuffix;
    }

    @Override
    public String toModelImport(String name) {
        if (importMapping.containsKey(name)) {
            return importMapping.get(name);
        }
        return DEFAULT_MODEL_IMPORT_DIRECTORY_PREFIX + modelPackage() + "/" + toModelFilename(removeModelPrefixSuffix(name)).substring(DEFAULT_IMPORT_PREFIX.length());
    }

    @Override
    public String toModelName(String name) {
        name = addSuffix(name, modelSuffix);
        return super.toModelName(name);
    }

    public String removeModelPrefixSuffix(String name) {
        String result = name;
        if (modelSuffix.length() > 0 && result.endsWith(modelSuffix)) {
            result = result.substring(0, result.length() - modelSuffix.length());
        }
        String prefix = capitalize(this.modelNamePrefix);
        String suffix = capitalize(this.modelNameSuffix);
        if (prefix.length() > 0 && result.startsWith(prefix)) {
            result = result.substring(prefix.length());
        }
        if (suffix.length() > 0 && result.endsWith(suffix)) {
            result = result.substring(0, result.length() - suffix.length());
        }

        return result;
    }

    private String convertUsingFileNamingConvention(String originalName) {
        String name = this.removeModelPrefixSuffix(originalName);
        return dashize(underscore(name));
    }

    private String getIndexDirectory() {
        String indexPackage = modelPackage.substring(0, Math.max(0, modelPackage.lastIndexOf('.')));
        return indexPackage.replace('.', File.separatorChar);
    }

    private Boolean hasDuplicateMethodNames(ArrayList<String[]> operationIds, String methodName, int parts) {
        int count = 0;

        for (String[] operationId : operationIds) {
            String name = "";

            if (parts == 1) {
                name = StringUtils.camelize(operationId[2], CamelizeOption.LOWERCASE_FIRST_CHAR);
            } else if (parts == 2) {
                name = StringUtils.camelize(operationId[1] + "-" +operationId[2], CamelizeOption.LOWERCASE_FIRST_CHAR);
            } else if (parts == 3) {
                name = StringUtils.camelize(operationId[0] + "-" + operationId[1] + "-" +operationId[2], CamelizeOption.LOWERCASE_FIRST_CHAR);
            }

            if (name.equals(methodName)) {
                count++;
                if (count > 1) {
                    return Boolean.TRUE;
                }
            }
        }

        return Boolean.FALSE;
    }

    private Set<String> parseImports(CodegenModel cm) {
        Set<String> newImports = new HashSet<>();
        if (cm.imports.size() > 0) {
            for (String name : cm.imports) {
                if (name.indexOf(" | ") >= 0) {
                    String[] parts = name.split(" \\| ");
                    Collections.addAll(newImports, parts);
                } else {
                    newImports.add(name);
                }
            }
        }
        return newImports;
    }

    private List<Map<String, String>> toTsImports(CodegenModel cm, Set<String> imports) {
        List<Map<String, String>> tsImports = new ArrayList<>();
        for (String im : imports) {
            if (!im.equals(cm.classname)) {
                HashMap<String, String> tsImport = new HashMap<>();
                tsImport.put("classname", im);
                tsImport.put("filename", toModelFilename(removeModelPrefixSuffix(im)));
                tsImports.add(tsImport);
            }
        }
        return tsImports;
    }

    private String getApiFilenameFromClassname(String classname) {
        String name = classname.substring(0, classname.length() - serviceSuffix.length());
        return toApiFilename(name);
    }

    private boolean isInstanceDomain(String path) {
        return path.contains("/instance/");
    }
}
