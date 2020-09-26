const fs = require('fs'); // get the file stream module from NPM
const http = require("http"); // for create server
const url = require("url"); // for rounting

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

// Create server
const server = http.createServer((req, res)=>{
  // console.log(req.url);
  const pathName = req.url;

  if(pathName === '/' || pathName === '/overview') {
    res.end("this is the OVERVIEW");
  } else if (pathName === '/product') {
    res.end("This is the PRODUCT");
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
