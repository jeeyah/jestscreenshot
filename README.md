# jestscreenshot
Extend Jest and Puppeteer to automatically take screenshots after each test failure or success.

Screen shots will be created in a subdirectory of your test script as follows.

Success: screenshots/scriptname-testname.png
Failure: screenshots/0-fail-scriptname-testname.png


## Import jestscreenshot
```javascript
let jestscreenshot = require('@jeeyah/jestscreenshot');
```

## In beforeAll, initialize jestscreenshot after initializing Puppeteer
```javascript
beforeAll(async () => {
  // Create puppeteer browser and page objects first:
  // 
  // browser = await options.puppeteer.launch
  // page = await ret.browser.newPage();
  
  let path = require('path');
  let scriptName = path.basename(__filename).replace('.js', '');
  /** page: page object returned from Puppeteer
   * dirName: __dirname defaults to same directory as script
   * scriptName: Used in the screen shot file name
   * onlyFailures: ONLY take screenshots on test failures, default: false
   */
  let options = {
    page: page, 
    dirName: __dirname,
    scriptName: scriptName
  };
  
  await jestscreenshot.init(options);
});
```

## In afterAll, configure jestscreenshot cleanup just prior to closing browser
jestscreenshot needs to wait for screen shots to finish before the browser closes.
```javascript
afterAll((done) => {
  jestscreenshot.cleanup(function () {
    if (browser) {
      browser.close();
    }
    done();
  });
});
```

### Example test file
See tests/test.js for a working example.