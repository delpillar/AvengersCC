var http = require('http');
var url = require('url');
var port = 8000;

var server = http.createServer(function (request, response){

    try {
		//go to http://127.0.0.1:8000/?req=Monty
		console.log('Server Pinged');	//Ping the server (will show in the cmd prompt)
		//The below will be written to the Web Browser
		response.writeHead(200, {"Content-Type": "text/plain"});
		var req = checkURL(request); 	//Passes request into the checkURL function and stores output into the req variable
		var resp;
		if(req == "Aaron"){				//If the page is Aaron...
			resp = "Gavendo";			//Response is Gavendo
		}
		else if(req == "Monty"){			//....
			resp = "python";			//....
		}
		else if(req == "Hello"){			//....
			resp = "World";				//....
		}
		else{	//If you enter in a wrong URL it will give this message to help you.
			resp = "Please Enter: Aaron, Monty or Hello";
		}
		response.write(resp);			//Write the response on the web page.
		response.end();
    } 
    catch (e) {
        response.writeHead(500, { 'content-type': 'text/plain' });
        response.write('ERROR:' + e);
        response.end('\n');
    }

});
server.listen(port);

console.log('The server has run');		//This is for the cmd prompt. Runs once at the start.

function checkURL(request){
	var phrase = url.parse(request.url, true).query;
	// this checks for a query with a property called 'req' and returns its value.
	return phrase.req;
}
