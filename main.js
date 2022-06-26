let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposePageHmtl = require("./reposePage");


request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("Page Not Found");
    } else {
        getTopicsLinks(html);
        // console.log(html);

    }

}

function getTopicsLinks(html) {
    let $ = cheerio.load(html);
    let linkElearr = $(".no-underline.d-flex.flex-column.flex-justify-center");

    for (let i = 0; i < linkElearr.length; i++) {
        let href = $(linkElearr[i]).attr("href");
        let topic = href.split("/").pop(); //Q- ye pop ka answer kya milta hai bhai => array ka last element remove krta hua jo element last me remove krta hai vo return bhi hoga;
        console.log(href);
        let fullLink = `https://github.com/${href}`;

        getReposePageHmtl(fullLink, topic);

    }

}