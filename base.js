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

function QueueItem(newData, newResponse) {
    this.dbData = newData;
    this.response = newResponse;
}


exports.dbQueueAdd = function (data, response) {
    var queueItem = new QueueItem(data, response);
    dbQueue.push(queueItem);

    console.log('dbQueue.length: ' + dbQueue.length);
    if(dbQueue.length === 1) {
        exports.dbQueueCheck();        
    }
}

exports.dbQueueCheck = function () {
    if(dbQueue.length > 0) {
        var queueItem = dbQueue[0];
        dbQueue.splice(0, 1);

        var data = queueItem.dbData;
        var response = queueItem.response;

        dbTransaction(data.cmdType, data.table, data.selectStmt, data.entry, response);
        console.log('dbQueue.length: ' + dbQueue.length);
    }
}



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

function dbTransaction(transaction, table, selectStmt, value, response) {
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
                    console.log(exports.getCurrentTime() + transaction + ' failed');
                    exports.dbDisconnect();   

                    handleReturn(response, transaction, 'failed', null);
                } else {
                    console.log(exports.getCurrentTime() + transaction + ' successful');
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
