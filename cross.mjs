import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://d3untqd069jdot.cloudfront.net/puzzles/crossword/latest.html');

  // A4-esque Set screen size
  await page.setViewport({width: 1754, height: 1240});

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  await page.evaluate(() => {
    dom = document.querySelector('.menu-bar');
    dom.innerHTML = "";
    dom = document.querySelector('.keyboard-container');
    dom.innerHTML = "";
    dom = document.querySelector('.clue-list-scroll');
    dom.classList.remove("clue-list-scroll");
    dom = document.querySelector('.clue-list-scroll');
    dom.classList.remove("clue-list-scroll");

    dom = document.querySelector('.puzzle-grid');
    dom.style.top = "25%";
  });

  await page.screenshot({
    path: 'cross.png',
  });

  await browser.close();
})();
