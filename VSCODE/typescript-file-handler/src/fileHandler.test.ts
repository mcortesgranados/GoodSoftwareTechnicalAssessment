/**
 * @file fileHandler.test.ts
 * @description This file contains unit tests for the FileHandler class using Jest.
 * The tests verify the functionality of writing, reading, and appending data to a file.
 */

import * as fs from 'fs'; // Import Node.js File System module
import FileHandler from './fileHandler'; // Import the FileHandler class

/**
 * Describe block to group all tests related to the FileHandler class.
 */
describe('FileHandler Tests', () => {
    /**
     * @constant {string} filePath - Defines the file path used for testing.
     */
    const filePath = 'testFile.txt';

    /**
     * @constant {FileHandler} fileHandler - Instance of FileHandler to perform file operations.
     */
    const fileHandler = new FileHandler(filePath);

    /**
     * afterEach Hook:
     * This function runs after each test and ensures that the test file is deleted,
     * preventing interference between tests.
     */
    afterEach(() => {
        if (fs.existsSync(filePath)) { // Check if the test file exists
            fs.unlinkSync(filePath);  // Delete the test file
        }
    });

    /**
     * Test Case 1: Writing data to a file.
     * It verifies that the writeFile method correctly writes data to the specified file.
     */
    test('should write data to a file', () => {
        fileHandler.writeFile('Hello, Jest!'); // Call writeFile method to create the file and write data
        const content = fs.readFileSync(filePath, 'utf8'); // Read the file contents
        expect(content).toBe('Hello, Jest!'); // Validate that the written content is correct
    });

    /**
     * Test Case 2: Reading data from a file.
     * It verifies that the readFile method correctly reads existing file content.
     */
    test('should read data from a file', () => {
        fs.writeFileSync(filePath, 'Test Read', 'utf8'); // Write data directly using fs module
        expect(fileHandler.readFile()).toBe('Test Read'); // Verify that readFile retrieves correct data
    });

    /**
     * Test Case 3: Appending data to a file.
     * It verifies that the updateFile method correctly appends data without overwriting.
     */
    test('should append data to a file', () => {
        fileHandler.writeFile('First Line'); // Write the initial data
        fileHandler.updateFile('Second Line'); // Append new data to the file
        const content = fs.readFileSync(filePath, 'utf8'); // Read file content after appending
        expect(content).toContain('First Line'); // Check if the file contains the original data
        expect(content).toContain('Second Line'); // Check if the file contains the appended data
    });
});
