var http = require('http');
var url = require('url');
var mysql =  require('mysql');
var util = require('util');

var ipAddress = '127.0.0.1';
var serverPort = '8000';
var dbPort = '4040'; 

var userName = 'root';
var pw = '0910111214';
var db = 'assemble';

var server = http.createServer(function (request, response)
{
    try {
        //info should be pulled from a file
        var connectionString = 'mysql://' + userName + ':' + pw + '@'+ ipAddress + ':' + dbPort + '/' + db;
        var connection = mysql.createConnection(connectionString);
    
        //connect to db
        connection.connect(function(err) {
        if(err) {
            console.log(getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(getCurrentTime() + 'Connected to db');
            }
        });

        //randomize a fake dice roll
        var diceRoll = Math.floor((Math.random() * 6) + 1); 
        var testResult  = { number: diceRoll };

        var currentId = 50;
        var tempEntry  = { idTest: currentId, number: diceRoll };

        //add a random entry and a temp temp entry for updating
        dbInsert(connection, 'test', testResult, tempEntry);
        dbSelect(connection, 'test'); 

        var newNumber = 13;
        var updateItem = [ { number: newNumber }, { idTest: currentId } ];
        //update the entry 50's number to 13
        dbUpdate(connection, 'test', updateItem);
        dbSelect(connection, 'test'); 
      
        var deleteEntry  = { idTest:  currentId};
        //delete entry 50
        dbDelete(connection, 'test', deleteEntry);
        dbSelect(connection, 'test'); 

        console.log();

        //close connection to db
        connection.end(function(err){
            // Do something after the connection is gracefully terminated.
        });

        response.writeHead(200, {"Content-Type": "text/plain"});
        var req = checkURL(request);
        var resp;
        if(req === "Hello"){
            resp = "World";
        } else {
            resp = "Please Enter: Aaron, Monty or Hello";
        }
        response.write(resp);
        response.end();
    } 
    catch (e) {
        response.writeHead(500, { 'content-type': 'text/plain' });
        response.write('ERROR:' + e);
        response.end('\n');
    }
});
server.listen(serverPort);

process.stdout.write('\033c');
console.log(getCurrentTime() + 'The server is operating on port ' + serverPort);

function dbUpdate(db, table) {
    for (var i = 2; i < arguments.length; i++) {
        var queryString = 'UPDATE ' + table + ' SET ? WHERE ?';
        var query = db.query(queryString, arguments[i], function(err, result) {
            if(err) {
                console.log(getCurrentTime() + 'Failed to update value in db');
            } else {  
                console.log(query.sql); 
            }
        });
    }
}

function dbDelete(db, table) {
    for (var i = 2; i < arguments.length; i++) {
        var queryString = 'DELETE FROM ' + table + ' WHERE ?';
        var query = db.query(queryString, arguments[i], function(err, result) {
            if(err) {
                console.log(getCurrentTime() + 'Failed to delete value from db');
            } else {  
                console.log(query.sql); 
            }
        });
    }
}

function dbInsert(db, table) {
    for (var i = 2; i < arguments.length; i++) {
        var queryString = 'INSERT INTO ' + table + ' SET ?';
        var query = db.query(queryString, arguments[i], function(err, result) {
            if(err) {
                console.log(getCurrentTime() + 'Failed to add value to db');
            } else {  
                console.log(query.sql); 
            }
        });
    }
}

function dbSelect(db, table) {
    var queryString = 'SELECT ';  
    if(arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            queryString = queryString + arguments[i];
            if((arguments.length - 1) != i) {
                queryString = queryString + ','; 
            }
        }
        queryString = queryString + ' FROM '+ table;  
    } else {
        queryString = queryString + '* FROM '+ table; 
    }

    var query = db.query(queryString, function(err, rows){
        if(err) {
            console.log(getCurrentTime() + 'Failed to query db');
            console.log(query.sql); 
        } else {
            console.log(query.sql); 
            console.log(rows);
        }
    });
}

function getCurrentTime() {
    var dateInfo = new Date();
    var hrs = dateInfo.getHours();
    var AMPM = 'AM';
    if (hrs >= 12) {
    hrs = hrs - 12;
        AMPM = 'PM';
    }
    if (hrs == 0)
        hrs = 12;

    var mins = dateInfo.getMinutes();
    if (mins < 10) {
        mins = '0' + mins;
    }

    var secs = dateInfo.getSeconds();
    if (secs < 10) {
        secs = '0' + secs;
    }

    var curTime = hrs + ':' + mins + ':' + secs + ' ' + AMPM + ' - ';

    return curTime;
}

function checkURL(request){
    var phrase = url.parse(request.url, true).query;
    // this checks for a query with a property called 'req' and returns its value.
    return phrase.req;
}
