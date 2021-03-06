const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssueshtml(url, topic, repoName) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("Page Not Found");
        } else {
            // getResponseLink(html);
            // console.log(html);
            getIssues(html);
        }

    }

    function getIssues(html) {
        let $ = cheerio.load(html);

        let issueseleArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log(issueseleArr.length);
        let arr = [];
        for (let i = 0; i < issueseleArr.length; i++) {
            let link = $(issueseleArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        // console.log(topic, "     ", arr);
        let folderpath = path.join(__dirname, topic);
        dirCreator(folderpath);
        let filePath = path.join(folderpath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();


        // fs.writeFileSync(filePath, );
    }
}

module.exports = getIssueshtml;

function dirCreator(folderpath) {
    if (fs.existsSync(folderpath) == false) {
        fs.mkdirSync(folderpath);
    }
}