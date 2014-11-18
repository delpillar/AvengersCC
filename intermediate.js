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
            console.log(JSON.stringify(eventEntry));            
            base.dbUpdate('events', eventEntry, response);
        }
        
    viewSchedule:
        function (parameters, response) {
            var scheduleEntry = 'SELECT * FROM userevents WHERE users_id = ' + parameters.usersid + ' AND events_id= ' + parameters.eventsid;

            base.dbSelect(scheduleEntry, response);
        }        
} 