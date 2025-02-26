"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var FileHandler = /** @class */ (function () {
    function FileHandler(filePath) {
        this.filePath = filePath;
    }
    FileHandler.prototype.writeFile = function (data) {
        fs.writeFileSync(this.filePath, data, 'utf8');
        console.log("File written successfully: ".concat(this.filePath));
    };
    FileHandler.prototype.readFile = function () {
        if (!fs.existsSync(this.filePath)) {
            console.error('File does not exist.');
            return '';
        }
        return fs.readFileSync(this.filePath, 'utf8');
    };
    FileHandler.prototype.updateFile = function (data) {
        if (!fs.existsSync(this.filePath)) {
            console.error('File does not exist. Creating a new one.');
            this.writeFile(data);
        }
        else {
            fs.appendFileSync(this.filePath, '\n' + data, 'utf8');
            console.log("File updated successfully: ".concat(this.filePath));
        }
    };
    return FileHandler;
}());
var fileHandler = new FileHandler('example.txt');
fileHandler.writeFile('Hello, World!');
console.log('Read:', fileHandler.readFile());
fileHandler.updateFile('Appending new data.');
console.log('Updated Read:', fileHandler.readFile());
