var base = require('./base.js');

exports.assemble = {
    addSchedule : 
        function (parameters) {
            var userEventEntry = { availability: JSON.stringify(parameters.availability),
                                   Users_id: parameters.usersid, 
                                   Events_id: parameters.eventsid };
            
            base.dbInsert('userevents', userEventEntry);

            return JSON.stringify({ msgType: 'updateSchedule', status: 'complete' })    
        }
} 