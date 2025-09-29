require('chromedriver');
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

(async function runAllTests() {
  const driver = await new Builder().forBrowser("chrome").build();
  const APP_URL = "https://testpages.eviltester.com/styled/apps/notes/simplenotes.html";

  async function clearAllNotes() {
    try {
      const clearBtn = await driver.findElement(
        By.xpath('//button[normalize-space()="Clear All" or @value="Clear All"]')
      );
      await clearBtn.click();
      try {
        await driver.wait(until.alertIsPresent(), 500);
        const alert = await driver.switchTo().alert();
        await alert.accept();
      } catch (e) {}
    } catch (e) {}
  }

  async function addNote(title, note) {
    const titleInput = await driver.findElement(By.id("note-title-input"));
    await titleInput.clear();
    await titleInput.sendKeys(title);

    const noteInput = await driver.findElement(By.id("note-details-input"));
    await noteInput.clear();
    await noteInput.sendKeys(note);

    const addBtn = await driver.findElement(By.xpath('//button[text()="Add"]'));
    await addBtn.click();

    // const showBtn = await driver.findElement(
    //   By.xpath('//button[normalize-space()="Show"]')
    // );
    // await showBtn.click();
    await driver.sleep(300);
  }

  async function getNotes() {
  const notes = await driver.findElements(By.css("#list-of-notes .note-in-list"));
    return Promise.all(
    notes.map(async (note) => {
      const titleElem = await note.findElement(By.css(".title-note-in-list"));
      return titleElem.getText();
    })
  ); 
  }

  async function getErrorMessage() {
    try {
      const err = await driver.findElement(By.id("note-status-details"));
      return (await err.getText()).trim();
    } catch (e) {
      return null;
    }
  }

  try {
    await driver.get(APP_URL);

    console.log("TC-01: Add new note");
    await clearAllNotes();
    await addNote("Hend", "Hend, Mohamed, Anas");
    let notes = await getNotes();
    assert.ok(notes.some((n) => n.includes("Hend")), "Expected note to appear");
    console.log("TC-01 passed");

    
    console.log("TC-02: Add note with empty title");
    await clearAllNotes();
    await addNote("", "Hend, Mohamed, Anas");
    let err1 = await getErrorMessage();
    assert.strictEqual(err1, "Error Adding Note", "Expected error for empty title");
    console.log(" TC-02 passed");

    console.log("TC-03: Add note with empty body");
    await clearAllNotes();
    await addNote("Hend's Family", "");
    let err2 = await getErrorMessage();
    assert.strictEqual(err2, "Error Adding Note", "Expected error for empty note body");
    console.log(" TC-03 passed");

    console.log("TC-04: Delete note");
    await clearAllNotes();
    await addNote("Hend's Family", "Hend, Mohamed, Anas");
    await clearAllNotes();
    notes = await getNotes();
    assert.strictEqual(notes.length, 0, "Expected all notes deleted");
    console.log(" TC-04 passed");

 
    console.log("TC-05: Update existing note");
    await clearAllNotes();
    await addNote("Hend's Family", "Hend, Mohamed, Anas");

 const notesForEdit = await driver.findElements(By.css("#list-of-notes .note-in-list"));
   const editBtn=    await Promise.all(
    notesForEdit.map(async (note) => {
      return await note.findElement(By.css(".edit-note-in-list"));
     
     
    })
  ); 

  if (editBtn.length > 0) {
      await editBtn[0].click();
    } else {
      throw new Error("Edit button not found");
    }

    const noteInput = await driver.findElement(By.id("note-title-input"));
    await noteInput.clear();
    await noteInput.sendKeys("Hend, Mohamed, Anas, Updated");

    const updateBtn = await driver.findElement(By.xpath('//button[text()="Update"]'));
    await updateBtn.click();

    
    notes = await getNotes();
    assert.ok(notes.some((n) => n.includes("Updated")), "Expected note content to be updated");
    console.log(" TC-05 passed");

    console.log("🎉 All test cases passed successfully!");

  } catch (err) {
    console.error(" Test failed:", err);
  } finally {
    await driver.quit();
  }
})();