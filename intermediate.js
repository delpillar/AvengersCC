var base = require('./base.js');

exports.assemble = {
    addSchedule: 
        function (parameters, response) {
            var scheduleEntry = { 
                                    availability: JSON.stringify(parameters.availability),
                                    Users_id: parameters.usersid, 
                                    Events_id: parameters.eventsid
                                };
            
            base.dbTransaction('dbInsert', 'userevents', null, scheduleEntry, response);
        },

    addEvent:
        function (parameters, response) {
            var eventEntry = { 
                                name: parameters.eventName,
                                start_date: parameters.eventStartDate, 
                                end_date: parameters.eventEndDate,
                                description: parameters.eventDescription
                            };

            base.dbTransaction('dbInsert', 'events', null, eventEntry, response);
        },
    
    addUser: //call function to add new users to database
        function(parameters, response) {
            var userEntry = {
                                name: parameters.userName,
                                password: parameters.userPassword,
                                email: parameters.userEmail,
                                default_availability: JSON.stringify(parameters.availability)
                            };
            
            base.dbTransaction('dbInsert', 'users', null, userEntry, response);
        },
    
    updateSchedule:
        function (parameters, response) {
            var scheduleEntry = [ { 
                                    availability: JSON.stringify(parameters.availability)
                                },
                                { 
                                    Users_id: parameters.usersid,
                                },{
                                    Events_id: parameters.eventsid
                                } ];

            base.dbTransaction('dbUpdate', 'userevents', null, scheduleEntry, response);
        },    

    updateUser:
        function (parameters, response) {
            var userEntry = [ { 
                                name: parameters.username,
                                password: parameters.password, 
                                email: parameters.email,
                                default_availability: JSON.stringify(parameters.defaultAvailability),
                                token: parameters.token
                            },
                            { 
                                id: parameters.usersid
                            } ];

            base.dbTransaction('dbUpdate', 'users', null, userEntry, response);
        },

    updateEvent:
        function (parameters, response) {
            var eventEntry = [ { 
                                name: parameters.eventName,
                                start_date: parameters.eventStartDate, 
                                end_date: parameters.eventEndDate,
                                description: parameters.eventDescription
                            },
                            { 
                                id: parameters.eventsid
                            } ];

            base.dbTransaction('dbUpdate', 'events', null, eventEntry, response);
        },
    
    viewEvent: // View all the schedules in an appointed event
        function (parameters, response) {
            var eventEntry = 'SELECT * FROM Events WHERE id = ' + parameters.eventsid;
            
            base.dbTransaction('dbSelect', null, eventEntry, null, response);
        },
    
    viewSchedule:
        function (parameters, response) {
            var scheduleEntry = 'SELECT * FROM userevents WHERE users_id = ' + parameters.usersid + ' AND events_id= ' + parameters.eventsid;

            base.dbTransaction('dbSelect', null, scheduleEntry, null,  response);
        },
    
    viewUser: // call function to view user all information
        function (parameters , response) {
            var userEntry = 'SELECT * FROM Users WHERE id = ' +  parameters.usersid;
            
            base.dbTransaction('dbSelect', null, userEntry, null, response)
    }
} 