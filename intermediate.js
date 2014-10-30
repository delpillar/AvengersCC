var base = require('./base.js');

exports.assemble = {
    addSchedule: 
        function (parameters) {
            var userEventEntry = { 
                                    availability: JSON.stringify(parameters.availability),
                                    Users_id: parameters.usersid, 
                                    Events_id: parameters.eventsid
                                };
            
            base.dbInsert('userevents', userEventEntry);

            return JSON.stringify({ 
                                    msgType: 'addSchedule', 
                                    status: 'complete' 
                                });    
        },

    addEvent:
        function (parameters) {
            var eventEntry = { 
                                name: parameters.eventName,
                                start_date: parameters.eventStartDate, 
                                end_date: parameters.eventEndDate,
                                description: parameters.eventDescription
                            };

            base.dbInsert('events', eventEntry);

            return JSON.stringify({ 
                                    msgType: 'addEvent', 
                                    status: 'complete' 
                                });    

        }
} 