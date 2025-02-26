console.log('Script loaded successfully!');

// Example of DOM manipulation
document.addEventListener('DOMContentLoaded', () => {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'This paragraph was added via JavaScript!';
    document.body.appendChild(paragraph);
});
