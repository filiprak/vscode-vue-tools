const vscode = require('vscode');

const typeScriptExtensionId = 'vscode.typescript-language-features';
const configurationSection = 'vue-tools';


module.exports = async function activate (context) {
    const extension = vscode.extensions.getExtension(typeScriptExtensionId);
    if (!extension) {
        return;
    }

    await extension.activate();

    if (!extension.exports || !extension.exports.getAPI) {
        return;
    }

    const api = extension.exports.getAPI(0);

    if (!api) {
        return;
    }

    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration(configurationSection)) {
            synchronizeConfiguration(api);
        }
    }, undefined, context.subscriptions);

    synchronizeConfiguration(api);
}

function synchronizeConfiguration (api) {

}

function getConfiguration () {
    const outConfig = {
        format: {}
    };

    return outConfig;
}
