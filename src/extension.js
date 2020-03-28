// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
var fs = require('fs')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('CAA二次开发插件');
	let buildModule = vscode.commands.registerCommand('extension.buildModule', (uri) => {
		var FilePath = uri.fsPath;
		var pos = FilePath.indexOf('.m')
		if(pos > 0){
			var ModulePath = FilePath.substring(0,pos+2)
			vscode.window.showInformationMessage('module目录为：'+ModulePath);

			//编译Module
			//Step1，TCK INIT
			var levelFile = FindFile(FilePath,"CATIAV5Level.lvl");
			if(levelFile.length > 0){
				var caalvl = ReadCAALevel(levelFile);
				console.log("当前CAA版本为："+caalvl);


			}
			else{
				vscode.window.showInformationMessage('获取当前CAA版本失败，请检查是否为CAA工程，以及文件工程下是否存在CATIAV5Level.lvl文件');
			}

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


/**
 * @param {any} uri
 */
function CheckTCKLevel(uri)
{
	
}


/**
 * @param {string} lvlFile
 */
function ReadCAALevel(lvlFile)
{
	var lvl = "";
	var exist = fs.existsSync(lvlFile);
	if(exist.valueOf()){
		/* fs.readFileSync(lvlFile){
			if(err){
				console.log(err);
			}

			var pos = data.lastIndexOf("#define");
			if(pos >= 0){
				var pos1 = data.indexOf("CATIA",pos);
				var pos2 = data.indexOf("\n",pos1);
				lvl = data.substring(pos1,pos2);
			}

		}); */

		var fcont = fs.readFileSync(lvlFile);
		var data = fcont.toString();
		var pos = data.lastIndexOf("#define");
			if(pos >= 0){
				var pos1 = data.indexOf("CATIA",pos);
				var pos2 = data.indexOf("\n",pos1);
				lvl = data.substring(pos1,pos2);
			}
	}
	else{
		console.log(lvlFile+"文件不存在");
	}
	return lvl;
}

/**
 * @param {string} path
 * @param {string} file
 */
function FindFile(path,file)
{
	var refile = "";
	var openfile = fs.lstatSync(path);
	if(openfile.isDirectory()){
		var files = fs.readdirSync(path);
		var pos =  files.indexOf(file);
		if(pos >= 0){
			refile = path+"\\"+file;
		}
		else
		{
			var pos = path.lastIndexOf("\\");
			if(pos > 1)
			{
				refile = FindFile(path.substring(0,pos),file);
			}
			
		}		
	}
	else{
		var pos = path.lastIndexOf("\\");
		if(pos > 1)
		{
			refile = FindFile(path.substring(0,pos),file);
		}		
	}	
	return refile;
}