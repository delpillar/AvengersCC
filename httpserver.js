var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var base = require('./base.js');
var intermediate = require('./intermediate.js');

var path = 'client/';
var page = 'index.html';

var ipAddress = '127.0.0.1';
var serverPort = '8000';
var dbPort = '4040'; 

var server = http.createServer(function (request, response) {
    try {
        var id = url.parse(request.url).pathname;
        
        if (id.charAt(0) === '/') {
            id = id.slice(1);
        }
        
        if (id.charAt(id.length - 1) === '/') {
            id = id.slice(0, id.length - 1);
        }

        if (id === page || id === '') {
            fs.readFile(__dirname + '/' + path + page, function (err, data) {
                if (err) {
                    console.log(err);
                }

                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
        } else if(request.url.indexOf('.css') != -1) { 
            fs.readFile(__dirname + '/' + path + id, function (err, data) {
                if (err) {
                    console.log(err);
                }

                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            });
        } else if(request.url.indexOf('.js') != -1) { 
            fs.readFile(__dirname + '/' + path + id, function (err, data) {
                if (err) {
                    console.log(err);
                }

                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            });    
        } else if (request.method === 'POST') {
            var data = '';
            request.addListener('data', function (chunk) {
                data += chunk; 
            });
            
            request.addListener('end', function () {
                var parameters = JSON.parse(data);

                intermediate.assemble[parameters.msgType](parameters, response);
            });
        }
    } 
    catch (e) {
        response.writeHead(500, { 'content-type': 'text/plain' });
        response.write('ERROR:' + e);
        response.end('\n');
    }
});
server.listen(serverPort);

process.stdout.write('\033c');
console.log(base.getCurrentTime() + 'The server is operating on port ' + serverPort);