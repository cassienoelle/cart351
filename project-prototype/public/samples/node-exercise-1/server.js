// https://howtonode.org/deploy-blog-to-heroku

var http = require("http");
var fs = require("fs"); // file system module
var path = require("path");
var mime = require("mime");

// 404 error file not found
function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"}); // return plain text
  response.write("Error 404: resource not found"); // text content
  response.end();
}

// Send requested file (file found)
function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))}); // lookup MIME type of file and set type
  response.end(fileContents); // send file contents
}

// Define how our server will handle responses
// Returns content of requested file or 404 error
function serverWorking(response, absPath) {
  // check if file exists
  fs.exists(absPath, function(exists) { // absPath = absolute file path
    if (exists) { // if it exists
      fs.readFile(absPath, function(err, data) { // read file
        if (err) { // if error, send 404
          send404(response)
        } else { // else send file contents
          sendPage(response, absPath, data);
        }
      });
    } else { // else if file doesn't exist, send 404 error
      send404(response);
    }
  });
}

// Create HTTP server
var server = http.createServer(function(request, response){
  var filePath = false;

  if (request.url == '/') {
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
}).listen(8000);

//var port_number = server.listen(process.env.PORT || 3000);
