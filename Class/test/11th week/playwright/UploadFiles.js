class UploadPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://testpages.eviltester.com/pages/files/file-upload/';
        this.fileInput = page.locator('#fileinput');
        this.itsAnImage = page.locator('#itsanimage');
        this.itsAFile = page.locator('#itsafile');
        this.submitBtn = page.locator('input[type="submit"]');
        this.uploadedFileType = page.locator('#uploadedfiletype');
        this.uploadedFileName = page.locator('#uploadedfilename');
    }

    async open() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('domcontentloaded');
        // Apply a small zoom-out so more content fits on screen (helps on
        // high-DPI or small viewports). Adjust scale as needed (0.8-0.9).
        const scale = 0.85;
        await this.page.evaluate((s) => {
            document.body.style.transform = `scale(${s})`;
            document.body.style.transformOrigin = '0 0';
            document.documentElement.style.width = (100 / s) + '%';
        }, scale);
    }

    // upload using Playwright file API (filePath should be an absolute path)
    async uploadViaInput(filePath) {
        await this.fileInput.setInputFiles(filePath);
    }

    async chooseType(type) {
        if (type === 'image') {
            await this.itsAnImage.check();
        } else {
            await this.itsAFile.check();
        }
    }

    async submit() {
        // Some browsers/pages may not trigger a full navigation on submit.
        // Click the submit button and wait for the results element to appear.
        await this.submitBtn.click();
        await this.uploadedFileName.waitFor({ state: 'visible', timeout: 5000 });
    }

    async getUploadedFileType() {
        return (await this.uploadedFileType.textContent()).trim();
    }

    async getUploadedFileName() {
        return (await this.uploadedFileName.textContent()).trim();
    }
}

module.exports = { UploadPage };
