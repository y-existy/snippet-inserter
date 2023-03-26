English | [日本語](README.ja.md)
# Snippet Inserter

 Snippet Inserter is an extension for Visual Studio Code. This extension allows you to insert only specific snippets from files in a given folder.

## Main Features

- Insert specific snippets from files
  - Extracts and inserts the portion from the point containing "@snippet_start" to "@snippet_end
  - Use in conjunction with line comments according to your programming language
- You can set up a folder to search for snippets to make your search more efficient

## build
- `vsce package`

## Installation

1. open the Extensions tab of Visual Studio Code
2. Type "Snippet Inserter" in the search bar to find the extension 
3. Click the "Install" button to install the extension 
4. After installation, restart Visual Studio Code

## How to use

1. Add a snippet to the file. A snippet starts with a line containing "@snippet_start" and ends with a line containing "@snippet_end".

Example.

```cpp
// Assume an example where the line comment is "//".
// @snippet_start
// this part is inserted as a snippet
// @snippet_end
```
2. Open the Command Palette and execute the "Set Snippet Folder" command and set folder path.

3. Open the Command Palette and execute the "Update Target File Extensions" command and set extensions you need.

4. Position the cursor in the open file where you want to insert the snippet. 

5. Open the Command Palette and execute the "Insert Snippet" command. 

6. A list of files in the specified folder will be displayed, so select the file into which you want to insert a snippet. 

7. The snippet of the selected file will be inserted at the cursor position of the currently opened file.