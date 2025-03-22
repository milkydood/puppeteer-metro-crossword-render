import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page

  // const browser = await puppeteer.launch({headless: false});
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

    // swap menu bar for today's date
    dom = document.querySelector('.menu-bar');
    todaydate = new Date();

    todaydatediv = document.createElement("div");
    todaydatediv.append(todaydate.toISOString().slice(0,10));

    todaydatediv.style.marginLeft = "auto";
    todaydatediv.style.marginRight = "auto";

    dom.replaceChildren(todaydatediv);

    // remove keyboard element
    dom = document.querySelector('.keyboard-container');
    dom.innerHTML = "";

    // remove scroll styling from 'across' clues
    dom = document.querySelector('.clue-list-scroll');
    dom.classList.remove("clue-list-scroll");

    // remove scroll styling from 'down' clues
    dom = document.querySelector('.clue-list-scroll');
    dom.classList.remove("clue-list-scroll");

    // move crossword grid into the verical center a little
    dom = document.querySelector('.puzzle-grid');
    dom.style.top = "25%";
  });

  await page.screenshot({
    path: 'cross.png',
  });

  await browser.close();
//await browser.close();
})();
