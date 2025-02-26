"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const fileHandler_1 = __importDefault(require("./fileHandler")); // Adjust path based on your structure
describe('FileHandler Tests', () => {
    const filePath = 'testFile.txt';
    const fileHandler = new fileHandler_1.default(filePath);
    afterEach(() => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
    test('should write data to a file', () => {
        fileHandler.writeFile('Hello, Jest!');
        const content = fs.readFileSync(filePath, 'utf8');
        expect(content).toBe('Hello, Jest!');
    });
    test('should read data from a file', () => {
        fs.writeFileSync(filePath, 'Test Read', 'utf8');
        expect(fileHandler.readFile()).toBe('Test Read');
    });
    test('should append data to a file', () => {
        fileHandler.writeFile('First Line');
        fileHandler.updateFile('Second Line');
        const content = fs.readFileSync(filePath, 'utf8');
        expect(content).toContain('First Line');
        expect(content).toContain('Second Line');
    });
});
