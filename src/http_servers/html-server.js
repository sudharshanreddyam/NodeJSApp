import fs from 'fs';
import path from 'path';
import http from 'http';
import replace from 'stream-replace';

const TEMPLATE_PATH = 'html/index.html';
const customData = {
  message: 'A custom message from html-server',
};

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const htmlTemplate = fs.readFileSync(path.join(__dirname, TEMPLATE_PATH), 'utf8');
  res.end(generateHTML(htmlTemplate));
})
.listen(3002);

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const htmlStream = fs.createReadStream(path.join(__dirname, TEMPLATE_PATH));
  htmlStream.pipe(replace('{message}', customData.message)).pipe(res);
})
.listen(3005);

function generateHTML(template) {
  const regexp = /{(.*?)}/;
  const variables = template.match(regexp);

  let generatedHTML;

  variables.forEach((variable) => {
    if (customData[variable]) {
      const replaceRegExp = new RegExp(`{(${variable}?)}`);
      generatedHTML = template.replace(replaceRegExp, customData[variable]);
    }
  });

  return generatedHTML;
}