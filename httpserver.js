var http = require('http');
var url = require('url');
var port = 80;

var server = http.createServer(function (request, response)
{
    try {
	//while the server is running, goto the localhost (127.0.0.1) in your browser to display the message below
        console.log('Server Pinged');
    } 
    catch (e) {
        response.writeHead(500, { 'content-type': 'text/plain' });
        response.write('ERROR:' + e);
        response.end('\n');
    }

});
server.listen(port);

console.log('Hello World!');
