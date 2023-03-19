import * as vscode from 'vscode';
import { insertSnippet, setSnippetFolder } from './snippetInserter';

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

  async function updateExtensions() {
    const config = vscode.workspace.getConfiguration('snippet-inserter');
    const currentExtensions = config.get('targetFileExtensions', ['.txt']);
  
    const userInput = await vscode.window.showInputBox({
      prompt: 'Enter file extensions separated by commas (e.g., .txt, .md)',
      value: currentExtensions.join(', '),
    });
  
    if (userInput !== undefined) {
      const newExtensions = userInput
        .split(',')
        .map((ext) => ext.trim())
        .filter((ext) => ext.startsWith('.'));
  
      await config.update('targetFileExtensions', newExtensions, vscode.ConfigurationTarget.Global);
    }
  };
  // Register the new command in the `activate` function
  context.subscriptions.push(
    vscode.commands.registerCommand('snippet-inserter.updateExtensions', updateExtensions)
  );
}
