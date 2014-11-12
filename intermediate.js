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
    
    addUser:
        function(parameters, response){
            var userEntry = {
                name: parameters.userName,
                password: parameters.userPassword,
                email: parameters.userEmail,
                default_availability: JSON.stringify(parameters.availability)
            };
            base.dbInsert('users',userEntry,response);
        },
    
    viewUser:
        function (parameters , response) {
            var userReadInfo = { 
                Users_id: parameters.usersid 
            };

            var queryString = 
                'SELECT * FROM Users WHERE id = ' +  userReadInfo;
            // dbSelect function uses queryString and responds back with DB data in a JSON format(?)
            base.dbSelect(queryString, response);
        },
    
    viewEventSchedules: // View all the schedules in an appointed event
        function (parameters, response) {
            var eventSchedules = {
                 Events_id: parameters.eventsid
            };
         
            var queryString = 
                'SELECT start_date, end_date FROM Events WHERE id = ' + eventSchedules;
            base.dbSelect(queryString, response);
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