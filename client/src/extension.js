const path = require('path');
const { workspace, ExtensionContext } = require('vscode');

const {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} = require('vscode-languageclient/node');

let client;

exports.activate = (context) => {
	// The server is implemented in node
	let serverModule = context.asAbsolutePath(path.join('server', 'src', 'server.js'));
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	let clientOptions = {
		// Register the server for javascript documents
		documentSelector: [{ scheme: 'file', language: 'javascript' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

exports.deactivate = () => {
	if (!client) {
		return undefined;
	}
	return client.stop();
}