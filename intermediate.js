var base = require('./base.js');

exports.assemble = {
    addSchedule: 
        function (parameters, response) {
            var userEventEntry = { 
                                    availability: JSON.stringify(parameters.availability),
                                    Users_id: parameters.usersid, 
                                    Events_id: parameters.eventsid
                                };
            
            base.dbInsert('userevents', userEventEntry, response);
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
            console.log(JSON.stringify(userEntry));            
            base.dbUpdate('users', userEntry, response);
        }

} 