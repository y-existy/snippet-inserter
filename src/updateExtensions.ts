import * as vscode from 'vscode';

export async function updateExtensions() {
  const config = vscode.workspace.getConfiguration('snippet-inserter');
  const currentExtensions = config.get('targetFileExtensions', ['.*']);

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

