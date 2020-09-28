const fs = require('fs'); // get the file stream module from NPM
const http = require("http"); // for create server
const url = require("url"); // for rounting

// third party module
const slugify = require('slugify');
//own module
const replaceTemplate = require("./modules/replaceTemplate");
/*******************************************/
/*File*/

// Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
//
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");
//
// // Blocking, synchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1)=> {
//   // throwing error
//   if(err) return console.log("Error!");
//
//   // read the data name from data1
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2)=> {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3)=> {
//       console.log(data3);
//
//       // append the data2 and data3
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//         console.log("The file has been written");
//       });
//     });
//   });
// });
// console.log("Will read file!");

/*******************************************/
/*Server*/

// only execute once
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data); // data object (can be loop)

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);
// console.log(slugify('Fresh Avocados', {lower: true}));

// Create server & run every each of request
const server = http.createServer((req, res)=>{

  // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15080942?start=108#notes
  const {query, pathname} = url.parse(req.url, true);

  // overview page
  if(pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {"Content-type": "text/html"});
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
    res.end(output);

  // product page
} else if (pathname === '/product') {
    res.writeHead(200, {"Content-type": "text/html"});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

  // api page
} else if (pathname === '/api') {
    // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15080930?start=525#notes
    res.writeHead(200, {"Content-type": "application/json"});
    res.end(data);

  // not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-cmk-header": 'hello world'
    }); // https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15080928?start=540#notes
    res.end("<h1>Page Not Found!</h1>")
  }
});

// listen the local host at port 8000
server.listen(8000, "127.0.0.1", ()=>{
  console.log("Listening to requests on port 8000");
});
