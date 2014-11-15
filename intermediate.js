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
    
   viewUser:
    function (parameters , response) {
        var queryString = 'SELECT * FROM Users WHERE id = ' +  parameters.usersid;
        base.dbSelect(queryString, response)
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
        }        
} 