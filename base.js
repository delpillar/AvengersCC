var mysql = require('mysql');

var ipAddress = '127.0.0.1';
var dbPort = '4040'; 

var userName = 'root';
var pw = '0910111214';
var db = 'assemble';

var dbQueue = [];

//info should be pulled from a file
var connectionString = 'mysql://' + userName + ':' + pw + '@' + ipAddress + ':' + dbPort + '/' + db;
var connection;

//exports.dbCommands = {
dbCommands = {
    dbSelect: 
        function (table, selectStmt, value) {
            return selectStmt;
    },
    dbUpdate: 
        function (table, selectStmt, value) {
            var queryString = 'UPDATE ' + table + ' SET ? WHERE ?';
            if(value.length === 3) {
                queryString = queryString + ' AND ?';
            }
            return queryString;
    },
    dbInsert: 
        function (table, selectStmt, value) {
            return 'INSERT INTO ' + table + ' SET ?';
    },
    dbDelete:
        function (table, selectStmt, value) {
            var queryString = 'DELETE FROM ' + table + ' WHERE ?';
            if(value.length === 3) {
                queryString = queryString + ' AND ?';
            }
            return queryString;
    }
}

exports.dbTransaction = function (transaction, table, selectStmt, value, response) {
    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');
            var queryString = dbCommands[transaction](table, selectStmt, value);
            var query = connection.query(queryString, value, function(err, result){
                if(err) {
                    console.log(exports.getCurrentTime() + 'Failed to query db');
                    exports.dbDisconnect();   

                    handleReturn(response, transaction, 'failed', null);
                } else {
                    console.log(query.sql); 
                    exports.dbDisconnect();   
        
                    handleReturn(response, transaction, 'successful', result);
                }
            });

        }
    });
}

function handleReturn(response, returnType, cmdStatus) {
    var responseText;

    responseText = JSON.stringify({ 
                                    msgType: returnType, 
                                    data: arguments[3],
                                    status: cmdStatus 
                                });   

    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write(responseText);
    response.end();
}

exports.dbConnect = function () {
    connection = mysql.createConnection(connectionString);
}

exports.dbDisconnect = function () {
    //close connection to db
    connection.end(function(err){
        // Do something after the connection is gracefully terminated.
    });
}

exports.getCurrentTime = function () {
    var dateInfo = new Date();
    var hrs = dateInfo.getHours();
    var ampm = 'AM';
    if (hrs >= 12) {
        hrs = hrs - 12;
        ampm = 'PM';
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

    var curTime = hrs + ':' + mins + ':' + secs + ' ' + ampm + ' - ';

    return curTime;
}

exports.checkURL = function (request) {
    var phrase = url.parse(request.url, true).query;
    // this checks for a query with a property called 'req' and returns its value.
    return phrase.req;
}
