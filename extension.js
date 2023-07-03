const vscode = require("vscode");
const fs = require("fs");

const pluginName = "add-test";

function activate(context) {
  const convert = vscode.commands.registerTextEditorCommand(pluginName + ".convert", (textEditor) => {
    const options = vscode.workspace.getConfiguration(pluginName);
    let text = textEditor.document.getText();
    text = text.replaceAll("const ", "const test-");
    const filePath = textEditor.document.fileName;
    var newFilePath = filePath.substring(0, filePath.lastIndexOf(".")) + "-test." + filePath.substring(filePath.lastIndexOf(".") + 1);
    fs.writeFile(newFilePath, text, (err) => {
      if (err) {
        return vscode.window.showErrorMessage("Failed to create testFile!");
      }
      vscode.window.showInformationMessage("testFile created");
    });
  });

  context.subscriptions.push(convert);
}

exports.activate = activate;

function deactivate() {
  // Code...
}

exports.deactivate = deactivate;
