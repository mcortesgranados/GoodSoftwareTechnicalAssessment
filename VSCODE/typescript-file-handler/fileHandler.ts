import * as fs from 'fs';

class FileHandler {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  writeFile(data: string): void {
    fs.writeFileSync(this.filePath, data, 'utf8');
    console.log(`File written successfully: ${this.filePath}`);
  }

  readFile(): string {
    if (!fs.existsSync(this.filePath)) {
      console.error('File does not exist.');
      return '';
    }
    return fs.readFileSync(this.filePath, 'utf8');
  }

  updateFile(data: string): void {
    if (!fs.existsSync(this.filePath)) {
      console.error('File does not exist. Creating a new one.');
      this.writeFile(data);
    } else {
      fs.appendFileSync(this.filePath, '\n' + data, 'utf8');
      console.log(`File updated successfully: ${this.filePath}`);
    }
  }
}

const fileHandler = new FileHandler('example.txt');
fileHandler.writeFile('Hello, World!');
console.log('Read:', fileHandler.readFile());
fileHandler.updateFile('Appending new data.');
console.log('Updated Read:', fileHandler.readFile());