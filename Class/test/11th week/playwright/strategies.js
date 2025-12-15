// Simple strategy implementations for uploading files (CommonJS)
class InputFileStrategy {
    // uses Playwright setInputFiles
    async upload(page, selector, filePath) {
        await page.setInputFiles(selector, filePath);
    }
}

class DragDropStrategy {
    // Basic drag-and-drop simulation: create a DataTransfer and dispatch events.
    // Works only if the target page handles drag/drop of files. Kept as an example.
    async upload(page, dropSelector, filePath) {
        // Placeholder: implement page-specific drag/drop handling if needed
        throw new Error('DragDropStrategy not implemented. Use InputFileStrategy instead.');
    }
}

function getStrategy(name) {
    if (name === 'input') return new InputFileStrategy();
    if (name === 'drag') return new DragDropStrategy();
    return new InputFileStrategy();
}

module.exports = { getStrategy, InputFileStrategy, DragDropStrategy };
