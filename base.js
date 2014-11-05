var mysql = require('mysql');

var ipAddress = '127.0.0.1';
var dbPort = '4040'; 

var userName = 'root';
//var pw = '0910111214';
var pw = 'tungaw27';
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
exports.dbUpdate = function (db, table) {
    var valuesCount = arguments.length;
    var values = arguments;

    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');

            for (var i = 1; i < valuesCount; i++) {
                var queryString = 'UPDATE ' + table + ' SET ? WHERE ?';
                var query = connection.query(queryString, values[i], function(err, result) {
                    if(err) {
                        console.log(exports.getCurrentTime() + 'Failed to update value in db');
                    } else {  
                        console.log(query.sql); 
                    }
                });
            }
            exports.dbDisconnect();   
        }
    });
}

//var deleteEntry  = { idTest:  currentId};
//dbDelete('test', deleteEntry);
exports.dbDelete = function (db, table) {
    var valuesCount = arguments.length;
    var values = arguments;

    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');

            for (var i = 1; i < valuesCount; i++) {
                var queryString = 'DELETE FROM ' + table + ' WHERE ?';
                var query = connection.query(queryString, values[i], function(err, result) {
                    if(err) {
                        console.log(exports.getCurrentTime() + 'Failed to delete value from db');
                    } else {  
                        console.log(query.sql); 
                    }
                });
            }
            exports.dbDisconnect();   
        }
    });
}

//var testResult  = { number: diceRoll };
//var tempEntry  = { idTest: currentId, number: diceRoll };
//dbInsert('test', testResult, tempEntry);
exports.dbInsert = function (table) {
    var valuesCount = arguments.length;
    var values = arguments;

    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');

            for (var i = 1; i < valuesCount; i++) {
                var queryString = 'INSERT INTO ' + table + ' SET ?';
                var query = connection.query(queryString, values[i], function(err, result) {
                    if(err) {
                        console.log(exports.getCurrentTime() + 'Failed to add value to db');
                    } else {  
                        console.log(query.sql); 
                    }
                });
            }
            exports.dbDisconnect();   
        }
    });
}

//dbSelect('test'); 
exports.dbSelect = function (db, table) {
    var valuesCount = arguments.length;
    var values = arguments;

    //connect to db
    exports.dbConnect();

    connection.connect(function(err) {
        if(err) {
            console.log(exports.getCurrentTime() + 'Failed to connect to db');
        } else { 
            console.log(exports.getCurrentTime() + 'Connected to db');

            var queryString = 'SELECT ';  
            if(valuesCount > 1) {
                for (var i = 2; i < valuesCount; i++) {
                    queryString = queryString + values[i];
                    if((valuesCount - 1) != i) {
                        queryString = queryString + ','; 
                    }
                }
                queryString = queryString + ' FROM '+ table;  
            } else {
                queryString = queryString + '* FROM '+ table; 
            }

            var query = connection.query(queryString, function(err, rows){
                if(err) {
                    console.log(exports.getCurrentTime() + 'Failed to query db');
                    console.log(query.sql); 
                } else {
                    console.log(query.sql); 
                    console.log(rows);
                }
            });

            exports.dbDisconnect();   
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
