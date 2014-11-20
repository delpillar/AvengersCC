var base = require('./base.js');

exports.assemble = {
    addSchedule:
        function (parameters, response) {
            var scheduleEntry = {
                                    availability: JSON.stringify(parameters.availability),
                                    Users_id: parameters.usersid,
                                    Events_id: parameters.eventsid
                                };

            base.dbInsert('userevents', scheduleEntry, response);
        },

    addEvent:
        function (parameters, response) {
            var eventEntry = {
                                name: parameters.eventName,
                                start_date: parameters.eventStartDate,
                                end_date: parameters.eventEndDate,
                                description: parameters.eventDescription
                            };

            base.dbInsert('events', eventEntry, response);
        },

    addUser: //call function to add new users to database
        function(parameters, response) {
            var userEntry = {
                                name: parameters.userName,
                                password: parameters.userPassword,
                                email: parameters.userEmail,
                                default_availability: JSON.stringify(parameters.availability)
                            };

            base.dbInsert('users',userEntry,response);
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

            base.dbUpdate('userevents', scheduleEntry, response);
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

            base.dbUpdate('users', userEntry, response);
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

            base.dbUpdate('events', eventEntry, response);
        },

    viewEvent: // View all the schedules in an appointed event
        function (parameters, response) {
            var eventEntry = 'SELECT * FROM Events WHERE id = ' + parameters.eventsid;

            base.dbSelect(eventEntry, response);
        },

    viewSchedule:
        function (parameters, response) {
            var scheduleEntry = 'SELECT * FROM userevents WHERE users_id = ' + parameters.usersid + ' AND events_id= ' + parameters.eventsid;

            base.dbSelect(scheduleEntry, response);
        },

    viewUser: // call function to view user all information
        function (parameters , response) {
            var userEntry = 'SELECT * FROM Users WHERE id = ' +  parameters.usersid;

            base.dbSelect(userEntry, response)
    }
}