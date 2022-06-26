const request = require("request");
const cheerio = require("cheerio");
const getIssueshtml = require("./issues");

function getReposePageHmtl(url, topic) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");

        } else {
            getResponseLink(html);
            // console.log(html);
        }

    }

    function getResponseLink(html) {
        // cheerio
        let $ = cheerio.load(html);
        let headingarr = $(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for (let i = 0; i < 8; i++) {
            let twoanchors = $(headingarr[i]).find("a");
            let link = $(twoanchors[1]).attr("href");
            let fullLink = `https://github.com${link}/issues`;
            // console.log(fullLink);
            let repoName = link.split("/").pop();
            getIssueshtml(fullLink, topic, repoName);
        }
        console.log("``````````````````````");
    }


}

module.exports = getReposePageHmtl;