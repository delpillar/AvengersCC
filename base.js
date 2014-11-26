var mysql = require('mysql');

var ipAddress = '127.0.0.1';
var dbPort = '4040'; 

var userName = 'root';
var pw = '0910111214';
var db = 'assemble';

var dbQueue = [];
var dbAccess = true;

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

    if(dbAccess) {
        dbQueueCheck();        
    }
}

function dbQueueCheck() {
    if(dbQueue.length > 0) {
        var queueItem = dbQueue[0];
        dbQueue.splice(0, 1);

        var data = queueItem.dbData;
        var response = queueItem.response;

        dbTransaction(data.msgType, data.cmdType, data.table, data.selectStmt, data.entry, response);
    }
}

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

function dbTransaction(msgType, transaction, table, selectStmt, value, response) {
    //connect to db
    dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');
            var queryString = dbCommands[transaction](table, selectStmt, value);
            var query = connection.query(queryString, value, function(err, result){
                var results;
                var status;
                if(err) {
                    console.log(exports.getCurrentTime() + transaction + ' failed');
                    results = null;
                    status = 'failed';
                    //handleReturn(returnMsgType, response, transaction, 'failed', null);
                } else {
                    console.log(exports.getCurrentTime() + transaction + ' successful');
                    results = result;
                    status = 'successful';
                }
                handleReturn(response, msgType, status, results);
                dbDisconnect();   
                dbQueueCheck();
            });
        }
    });
}

function handleReturn(response, returnMsgType, cmdStatus) {
    var responseText;

    responseText = JSON.stringify({ 
                                    msgType: returnMsgType, 
                                    data: arguments[3],
                                    status: cmdStatus 
                                });   

    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write(responseText);
    response.end();
}

function dbConnect() {
    connection = mysql.createConnection(connectionString);
    dbAccess = false;
}

function dbDisconnect() {
    //close connection to db
    connection.end(function(err){
        if(dbQueue.length === 0) {
            dbAccess = true;
        }
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
