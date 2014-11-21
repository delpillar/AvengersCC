var base = require('./base.js');

exports.assemble = {
    addSchedule: function (parameters, response) {
        var scheduleEntry = { 
            availability: JSON.stringify(parameters.availability),
            Users_id: parameters.usersid, 
            Events_id: parameters.eventsid
        };

        var transactionData = {
            cmdType: 'dbInsert',
            table: 'userevents',
            selectStmt: 'null',
            entry: scheduleEntry
        };
            
            base.dbQueueAdd(transactionData, response);
    },
    addEvent: function (parameters, response) {
        var eventEntry = {
            name: parameters.eventName,
            start_date: parameters.eventStartDate,
            end_date: parameters.eventEndDate,
            description: parameters.eventDescription
        };

        var transactionData = {
            cmdType: 'dbInsert',
            table: 'events',
            selectStmt: 'null',
            entry: eventEntry
        };

        base.dbQueueAdd(transactionData, response);
    },
    
    addUser: function(parameters, response) {
        var userEntry = {
            name: parameters.userName,
            password: parameters.userPassword,
            email: parameters.userEmail,
            default_availability: JSON.stringify(parameters.availability)
        };

        var transactionData = {
            cmdType: 'dbInsert',
            table: 'users',
            selectStmt: 'null',
            entry: userEntry
        };
        
        base.dbQueueAdd(transactionData, response);
    },
    
    updateSchedule: function (parameters, response) {
        var scheduleEntry = [ 
        { 
            availability: JSON.stringify(parameters.availability)
        },
        { 
            Users_id: parameters.usersid,
        },
        {
            Events_id: parameters.eventsid
        } 
        ];

        var transactionData = {
            cmdType: 'dbUpdate',
            table: 'userevents',
            selectStmt: 'null',
            entry: scheduleEntry
        };

        base.dbQueueAdd(transactionData, response);
    },    

    updateUser: function (parameters, response) {
        var userEntry = [ 
        { 
            name: parameters.username,
            password: parameters.password, 
            email: parameters.email,
            default_availability: JSON.stringify(parameters.defaultAvailability),
            token: parameters.token
        },
        { 
            id: parameters.usersid
        } 
        ];

        var transactionData = {
            cmdType: 'dbUpdate',
            table: 'users',
            selectStmt: 'null',
            entry: userEntry
        };

        base.dbQueueAdd(transactionData, response);
    },

    updateEvent: function (parameters, response) {
        var eventEntry = [ 
        { 
            name: parameters.eventName,
            start_date: parameters.eventStartDate, 
            end_date: parameters.eventEndDate,
            description: parameters.eventDescription
        },
        { 
            id: parameters.eventsid
        } 
        ];

        var transactionData = {
            cmdType: 'dbUpdate',
            table: 'events',
            selectStmt: 'null',
            entry: eventEntry
        };

        base.dbQueueAdd(transactionData, response);
    },

    viewEvent: function (parameters, response) {
        var eventEntry = 'SELECT * FROM Events WHERE id = ' + parameters.eventsid;

        var transactionData = {
            cmdType: 'dbSelect',
            table: null,
            selectStmt: eventEntry,
            entry: null
        };
        
        base.dbQueueAdd(transactionData, response);
    },

    updateUser: function (parameters, response) {
        var userEntry = [
        {
            name: parameters.username,
            password: parameters.password,
            email: parameters.email,
            default_availability: JSON.stringify(parameters.defaultAvailability),
            token: parameters.token
        },
        {
            id: parameters.usersid
        }
        ];

        base.dbUpdate('users', userEntry, response);
    },

    viewSchedule: function (parameters, response) {
        var scheduleEntry = 'SELECT * FROM userevents WHERE users_id = ' + parameters.usersid + ' AND events_id= ' + parameters.eventsid;

        var transactionData = {
            cmdType: 'dbSelect',
            table: null,
            selectStmt: scheduleEntry,
            entry: null
        };

        base.dbQueueAdd(transactionData, response);
    },
    
    viewEvent: function (parameters, response) {
        var eventEntry = 'SELECT * FROM Events WHERE id = ' + parameters.eventsid;

        var transactionData = {
            cmdType: 'dbSelect',
            table: null,
            selectStmt: eventEntry,
            entry: null
        };
        
        base.dbQueueAdd(transactionData, response);
    },

    viewUser: function (parameters , response) {
        var userEntry = 'SELECT * FROM Users WHERE id = ' +  parameters.usersid;

        var transactionData = {
            cmdType: 'dbSelect',
            table: null,
            selectStmt: userEntry,
            entry: null
        };
        
        base.dbQueueAdd(transactionData, response);
    }
}
