import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page

 // const browser = await puppeteer.launch({headless: false});
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  //await page.goto('https://d3untqd069jdot.cloudfront.net/puzzles/crossword/latest.html');
  await page.goto('https://metro.co.uk/puzzles/quick-crossword/');

  // A4-esque Set screen size
  await page.setViewport({width: 1754, height: 1240});

 // await page.waitForNavigation({
 //   waitUntil: 'networkidle0',
 // });


  await page.addStyleTag({content: '.cell.selected { background-color: white !important; }'});
  await page.addStyleTag({content: '.cell.highlighted { background-color: white !important; }'});

  await page.evaluate(() => {

    document.getElementsByTagName('header')[0].remove();
    document.getElementsByTagName('footer')[0].remove();

    document.querySelector('.ad-slot').remove();

    document.querySelector('.trending-puzzles').remove();

    document.querySelector('.trending-now').remove();

    document.querySelector('.portrait-video-carousel').remove();

    document.querySelector('.channel-header').remove();

 //   dom = document.querySelector('.wrapper');
  //  dom.style.maxWidth = "70rem";

    dom = document.getElementsByTagName('table')[0];
    dom.removeAttribute('style');


    // swap menu bar for today's date
    dom = document.querySelector('.menu-bar');
    todaydate = new Date();

    // add the current date
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

    // do a little centering
    dom = document.querySelector('.puzzle-grid');
    dom.style.top = "25%";
  });

  // if this is omitted, the cells don't lose highlighted styles
  console.log(await page.content());

  await page.screenshot({
    path: 'cross.png',
  });

  await browser.close();
})();
