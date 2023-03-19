import * as vscode from 'vscode';
import { insertSnippet, setSnippetFolder } from './snippetInserter';
import { updateExtensions } from './updateExtensions';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('snippet-inserter.insertSnippet', async (args: { folder?: string } | undefined) => {
    const defaultFolder = vscode.workspace.getConfiguration().get<string>('snippet-inserter.defaultFolder');
    await insertSnippet(args?.folder || defaultFolder);
  });

  context.subscriptions.push(disposable);

  let setFolderDisposable = vscode.commands.registerCommand('snippet-inserter.setFolder', async () => {
    await setSnippetFolder();
  });

  context.subscriptions.push(setFolderDisposable);

  context.subscriptions.push(
    vscode.commands.registerCommand('snippet-inserter.updateExtensions', updateExtensions)
  );
}
