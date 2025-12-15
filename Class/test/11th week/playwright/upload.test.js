const { test, expect } = require('@playwright/test');
const path = require('path');
const { UploadPage } = require('./UploadFiles.js');
const { getStrategy } = require('./strategies.js');
const data = require('../data.json');

const strategy = getStrategy('input');

test.describe('File upload (Playwright) - data driven using POM + strategies', () => {
    for (const entry of data) {
        test(`Upload ${entry.file} (${entry.type})`, async ({ page }) => {
            const uploadPage = new UploadPage(page);
            await uploadPage.open();

            const filePath = path.resolve(__dirname, '..', 'resources', entry.file);

            // Use strategy to upload; InputFileStrategy will call setInputFiles
            await strategy.upload(page, '#fileinput', filePath);

            await uploadPage.chooseType(entry.type);
            await uploadPage.submit();

            // Assertions
            const uploadedType = await uploadPage.getUploadedFileType();
            const uploadedName = await uploadPage.getUploadedFileName();

            // Log values to help debug cross-browser differences (Firefox sometimes
            // reports different text or timing). These will appear in the test output
            // and the artifacts (trace/video/screenshot) if the test fails.
            console.log('Uploaded type:', uploadedType);
            console.log('Uploaded name:', uploadedName);

            expect(uploadedType).toBe(entry.type);
            expect(uploadedName).toBe(entry.file);
        });
    }
});
