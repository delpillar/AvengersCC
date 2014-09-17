var http = require('http');
var url = require('url');
var port = 8000;

var server = http.createServer(function (request, response){
 try {
  //go to http://127.0.0.1:8000/?req=Hello
  console.log('Server Pinged');
  response.writeHead(200, {"Content-Type": "text/plain"});
  var req = checkURL(request);
  var resp;
  if(req === "Hello"){
   resp = "World";
  }
  else{
   resp = "Please Enter: Aaron, Monty or Hello";
  }
  response.write(resp);
  response.end();
 }
 catch(e) {
  response.writeHead(500, { 'content-type': 'text/plain' });
  response.write('ERROR:' + e);
  response.end('\n');
 }
});
server.listen(port);

console.log('The server has run');

function checkURL(request){
 var phrase = url.parse(request.url, true).query;
 // this checks for a query with a property called 'req' and returns its value.
 return phrase.req;
}
