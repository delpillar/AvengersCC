var mysql = require('mysql');
var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');

var page = 'index.html';

var ipAddress = '127.0.0.1';
var serverPort = '8000';
var dbPort = '4040'; 

var userName = 'root';
var pw = '0910111214';
var db = 'assemble';

var connectionString = 'mysql://' + userName + ':' + pw + '@' + ipAddress + ':' + dbPort + '/' + db;
var connection = mysql.createConnection(connectionString);

//connect to db
connection.connect(function(err) {
    if(err) {
        console.log(getCurrentTime() + 'Failed to connect to db');
    } else { 
        console.log(getCurrentTime() + 'Connected to db');
    }
});

var server = http.createServer(function (request, response) {
    try {
        var id = url.parse(request.url).pathname;
        if (id.charAt(0) === '/') id = id.slice(1);
        if (id.charAt(id.length - 1) === '/') id = id.slice(0, id.length - 1);

        if (id === page || id === '') {
            fs.readFile(__dirname + '/' + page, function (err, data) {
                if (err) console.log(err);
                
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(data);
                response.end();
            });
        } else if(request.url.indexOf('.css') != -1) { 
            fs.readFile(__dirname + '/' + id, function (err, data) {
                if (err) console.log(err);
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(data);
                response.end();
            });
        } else if(request.url.indexOf('.js') != -1) { 
            fs.readFile(__dirname + '/' + id, function (err, data) {
                if (err) console.log(err);
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(data);
                response.end();
            });    
        } else if (request.method === 'POST') {
                var data = '';
                
                request.addListener('data', function (chunk) { data += chunk; });
                request.addListener('end', function () {
                    var parameters = JSON.parse(data);

                    if(parameters.msgType === 'updateSchedule')
                    {
                        var userEventEntry = { availability: JSON.stringify(parameters.availability),
                                               Users_id: parameters.usersid, 
                                               Events_id: parameters.eventsid };
                        
                        dbInsert(connection, 'userevents', userEventEntry);
            
                        response.writeHead(200, { 'content-type': 'text/plain' });
                        response.write(JSON.stringify({ msgType: 'updateSchedule', status: 'complete' }));
                        response.end();
                    }

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
console.log(getCurrentTime() + 'The server is operating on port ' + serverPort);

function dbConnect() {
    //info should be pulled from a file
    var connectionString = 'mysql://' + userName + ':' + pw + '@' + ipAddress + ':' + dbPort + '/' + db;
    var connection = mysql.createConnection(connectionString);

    //connect to db
    connection.connect(function(err) {
        if(err) {
            console.log(getCurrentTime() + 'Failed to connect to db');
            return connection;
        } else { 
            console.log(getCurrentTime() + 'Connected to db');
            return;
        }
    });
}

function dbDisconnect() {
    //close connection to db
    connection.end(function(err){
        // Do something after the connection is gracefully terminated.
    });
}

//var updateItem = [ { number: newNumber }, { idTest: currentId } ];
//dbUpdate(connection, 'test', updateItem);
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

//var deleteEntry  = { idTest:  currentId};
//dbDelete(connection, 'test', deleteEntry);
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

//var testResult  = { number: diceRoll };
//var tempEntry  = { idTest: currentId, number: diceRoll };
//dbInsert(connection, 'test', testResult, tempEntry);
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

//dbSelect(connection, 'test'); 
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
    if (hrs === 0)
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
