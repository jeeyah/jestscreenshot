let puppeteer = require('puppeteer');
let jestscreenshot = require('@jeeyah/jestscreenshot');

/* global beforeAll, afterAll, expect */

let browser = null;
let page = null;

describe('Search Engine', () => {

  test('Match', async () => {
    await page.goto('https://www.google.com');
    await expect(page.title()).resolves.toMatch('Google');
  }, 10000);

  test('Mismatch', async () => {
    await page.goto('https://www.bing.com');
    await expect(page.title()).resolves.toMatch('Yahoo');
  }, 3000);
  
});

beforeAll(async () => {
  // Create puppeteer browser and page objects first:
  browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-features=site-per-process']});
  page = await browser.newPage();
  
  await page.setViewport({ width: 1024, height: 768 });
  
  let path = require('path');
  let scriptName = path.basename(__filename).replace('.js', '');
  /** page: page object returned from Puppeteer
   * dirName: __dirname defaults to same directory as script
   * scriptName: Used in the screen shot file name
   */
  let options = {
    page: page, 
    dirName: __dirname,
    scriptName: scriptName
  };
  
  await jestscreenshot.init(options);
});

afterAll((done) => {
  jestscreenshot.cleanup(function () {
    if (browser) {
      browser.close();
    }
    done();
  });
});
