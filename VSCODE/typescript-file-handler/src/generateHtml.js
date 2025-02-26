// Import the 'fs' module to enable file system operations, such as writing to files.
const fs = require('fs');

// Import the 'https' module to make HTTPS requests.
const https = require('https');

// Define the URL of the API endpoint that provides comments data.
const url = 'https://jsonplaceholder.typicode.com/comments';

// Make an HTTPS GET request to the specified URL.
https.get(url, (res) => {
    // Initialize an empty string to store the incoming data.
    let data = '';

    // Listen for the 'data' event, which is triggered when a chunk of data is received.
    res.on('data', (chunk) => {
        // Append the received chunk to the 'data' string.
        data += chunk;
    });

    // Listen for the 'end' event, which signifies that all data has been received.
    res.on('end', () => {
        // Parse the received JSON data into a JavaScript object.
        const comments = JSON.parse(data);

        // Construct an HTML document as a string using template literals.
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Comments</title>
                <style>
                    /* Apply basic styling to the page */
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    
                    /* Style individual comment sections */
                    .comment { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
                    
                    /* Style the email field in each comment */
                    .email { font-weight: bold; color: #007bff; }
                </style>
            </head>
            <body>
                <h1>Comments</h1>
                ${comments
                  .map(
                    (comment) => `
                  <div class="comment">
                      <!-- Display the email of the commenter in bold and colored -->
                      <p class="email">${comment.email}</p>

                      <!-- Display the name of the commenter in bold -->
                      <p><strong>${comment.name}</strong></p>

                      <!-- Display the actual comment content -->
                      <p>${comment.body}</p>
                  </div>
                `
                  )
                  .join('')} <!-- Join the array of HTML strings into one continuous string -->
            </body>
            </html>
        `;

        // Write the generated HTML content to a file named 'indexComments.html'.
        fs.writeFileSync('indexComments.html', htmlContent, 'utf8');

        // Log a message indicating successful file creation.
        console.log('HTML file created successfully: indexComments.html');
    });
})
// Handle any errors that may occur during the HTTPS request.
.on('error', (err) => {
    // Log the error message to the console.
    console.error('Error fetching data:', err.message);
});
