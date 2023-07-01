const puppeteer = require("puppeteer");

const scrapeProducts = async (search) => {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto("https://www.amazon.com/");
    await page.type("#twotabsearchtextbox", search);
    await page.click("#nav-search-submit-text");
    await page.waitForNavigation();
    const products = await page.evaluate(() => {
        let results = [];
        const items = document.querySelectorAll(".s-result-item .s-card-border");
        for (let i = items.length; i--; i > 0) {
            const item = items[i];
            const title = item.querySelector("h2 > a > span");
            const price = item.querySelector(".a-price-whole");
            const cents = item.querySelector(".a-price-fraction");
            const image = item.querySelector("img");
            if (!title || !price || !image) continue;
            results = [...results, {
                title: title.innerText,
                price: parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`),
                image: image.getAttribute("src")
            }]
        }
        return results;
    });

    return products;



}

module.exports = scrapeProducts;