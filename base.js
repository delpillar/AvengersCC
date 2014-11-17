var mysql = require('mysql');

var ipAddress = '127.0.0.1';
var dbPort = '4040'; 

var userName = 'root';
var pw = '0910111214';
var db = 'assemble';

//info should be pulled from a file
var connectionString = 'mysql://' + userName + ':' + pw + '@' + ipAddress + ':' + dbPort + '/' + db;
var connection;

exports.dbConnect = function () {
    connection = mysql.createConnection(connectionString);
}

exports.dbDisconnect = function () {
    //close connection to db
    connection.end(function(err){
        // Do something after the connection is gracefully terminated.
    });
}

//var updateItem = [ { number: newNumber }, { idTest: currentId } ];
//dbUpdate('test', updateItem);
exports.dbUpdate = function (table, value, response) {
    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');

            var queryString = 'UPDATE ' + table + ' SET ? WHERE ?';

            if(value.length === 3) {
                queryString = 'UPDATE ' + table + ' SET ? WHERE ? AND ?';
            }
            var query = connection.query(queryString, value, function(err, result) {
                if(err) {
                    console.log(exports.getCurrentTime() + 'Failed to update value in db');
                } else {  
                    console.log(query.sql); 
                }
                handleReturn(response, 'update');
            });
            exports.dbDisconnect();   
        }
    });
}

//var deleteEntry  = { idTest:  currentId};
//dbDelete('test', deleteEntry);
exports.dbDelete = function (table, value, response) {
    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');
            var queryString = 'DELETE FROM ' + table + ' WHERE ?';
            var query = connection.query(queryString, value, function(err, result) {
                if(err) {
                    console.log(exports.getCurrentTime() + 'Failed to delete value from db');
                } else {  
                    console.log(query.sql); 
                }
                handleReturn(response, 'delete');
            });
            exports.dbDisconnect();   
        }
    });
}

//var testResult  = { number: diceRoll };
//var tempEntry  = { idTest: currentId, number: diceRoll };
//dbInsert('test', tempEntry, response);
exports.dbInsert = function (table, value, response) {
    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');
            var queryString = 'INSERT INTO ' + table + ' SET ?';
            var query = connection.query(queryString, value, function(err, result) {
                if(err) {
                    console.log(exports.getCurrentTime() + 'Failed to add value to db');
                } else {  
                    console.log(query.sql); 
                }
                handleReturn(response, 'insert');
            });
            exports.dbDisconnect();   
        }
    });
}

//dbSelect('test'); 
exports.dbSelect = function (queryString, response) {
    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');
            var query = connection.query(queryString, function(err, rows){

                if(err) {
                    console.log(exports.getCurrentTime() + 'Failed to query db');
                    console.log(query.sql); 
                } else {
                    console.log(query.sql); 
                    exports.dbDisconnect();   
        
                    handleReturn(response, 'select', rows);
                }
            });

        }
    });
}

function handleReturn(response, returnType) {
    var responseText;

    if(arguments.length < 3) {
        responseText = JSON.stringify({ 
                                        msgType: returnType, 
                                        status: 'complete' 
                                    });   
    } else {
        responseText = JSON.stringify({ 
                                        msgType: returnType, 
                                        data: arguments[2],
                                        status: 'complete' 
                                    });   
    }

    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write(responseText);
    response.end();
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
