import * as vscode from 'vscode';
import File from './File';

export function activate(context: vscode.ExtensionContext) {

	if (typeof vscode.workspace.rootPath === undefined) {
		vscode.window.showInformationMessage('Open an project please!');
		return;
	}

	const fileManager = new File(vscode.workspace.rootPath);

	let disposable = vscode.commands.registerCommand('extension.laravel-view-creator', () => {

		const inputBox = vscode.window.createInputBox();
		inputBox.onDidAccept(async (e) => {
			let file = inputBox.value.split('.').join('\\');

			const filePath = await fileManager.create(file + '.blade.php');

			const textDocument = await vscode.workspace.openTextDocument(filePath);

			if (!textDocument) {
				throw new Error('Could not open file!');
			}

			const editor = vscode.window.showTextDocument(textDocument);
			if (!editor) {
				throw new Error('Could not show document!');
			}

			vscode.window.showInformationMessage('View created with success!');
		});
		inputBox.show();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
