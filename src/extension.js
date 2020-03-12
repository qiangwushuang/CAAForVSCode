// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('CAA二次开发插件');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let buildModule = vscode.commands.registerCommand('extension.buildModule', (uri) => {
		var FilePath = uri.path;
		var pos = FilePath.indexOf('.m')
		if(pos > 0){
			var ModulePath = FilePath.substring(0,pos+2)
			vscode.window.showInformationMessage('module目录为：'+ModulePath);

			//编译Module
			//Step1，TCK INIT
			



		}
		else{
			vscode.window.showInformationMessage('请检查当前文件是否在module下');
		}
	});

	let buildFramework = vscode.commands.registerCommand('extension.buildFramework', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('编译Framework');
	});

	context.subscriptions.push(buildModule);
	context.subscriptions.push(buildFramework);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
