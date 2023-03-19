import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

export async function insertSnippet(searchFolder: string | undefined) {
  // 指定した拡張子を読み込み
  const targetFileExtensions: string[] = vscode.workspace
    .getConfiguration('snippet-inserter')
    .get('targetFileExtensions', ['.*']);

  // Create a search pattern using the registered file extensions
  const searchPattern = `**/*{${targetFileExtensions.join(',')}}`;
  
  const files = await vscode.workspace.findFiles(
    new vscode.RelativePattern(searchFolder || vscode.workspace.rootPath || '', searchPattern),
    '**/node_modules/**'
  );

  const items = files.map((uri) => ({ label: path.basename(uri.fsPath), description: uri.fsPath }));

  const selected = await vscode.window.showQuickPick(items, { placeHolder: 'ファイルを選択してください' });

  if (selected) {
    const snippet = await getSnippetText(selected.description);

    if (snippet) {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        await editor.edit((editBuilder) => {
          editBuilder.insert(editor.selection.active, snippet);
        });
      }
    } else {
      vscode.window.showErrorMessage('スニペットが見つかりませんでした');
    }
  }
}

async function getSnippetText(filePath: string): Promise<string | null> {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream });

  let snippet = '';
  let inSnippet = false;
  for await (const line of rl) {
    if (line.includes('@snippet_start')) {
      inSnippet = true;
      continue;
    } else if (line.includes('@snippet_end')) {
      inSnippet = false;
      break;
    } else if (inSnippet) {
      snippet += line + '\n';
    }
  }

  return snippet || null;
}

export async function setSnippetFolder() {
  const selectedFolder = await vscode.window.showOpenDialog({
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: 'Select Folder',
    title: 'デフォルトのファイル検索フォルダを選択してください'
  });

  if (selectedFolder && selectedFolder.length > 0) {
    const folderPath = selectedFolder[0].fsPath;
    await vscode.workspace.getConfiguration().update('snippet-inserter.defaultFolder', folderPath, vscode.ConfigurationTarget.Global);
    vscode.window.showInformationMessage(`デフォルトのファイル検索フォルダが "${folderPath}" に設定されました`);
  }
}

