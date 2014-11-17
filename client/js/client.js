//these are placeholder values for initial testing purposes

var ip = '127.0.0.1';
var port = '8000';
var address = ip + ':' + port;

var oneDay = 86400;

function runClient() {

    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); };
    }
    var currentTime = Date.now();
    var tomorrow = currentTime + oneDay;

    var addScheduleParameters = { 
                                    msgType: 'addSchedule', 
                                    usersid: '1',
                                    eventsid: '1', 
                                    availability: [ { start: currentTime, end: currentTime },
                                                    { start: currentTime, end: currentTime } ] 
                                };

    var addEventParameters = { 
                                msgType: 'addEvent', 
                                eventName: 'meeting',
                                eventStartDate: currentTime, 
                                eventEndDate: tomorrow,
                                eventDescription: 'this meeting needs to be today'
                            };

    var updateUserParameters = { 
                                    msgType: 'updateUser', 
                                    username: 'kevp',
                                    password: '123', 
                                    email: 'kevp@assemble.com',
                                    defaultAvailability: addScheduleParameters.availability,
                                    token: 'BCE',
                                    usersid: '1'
                                };

    send(updateUserParameters);                                                
    //send(addEventParameters);                                                
    //send(addScheduleParameters);                                                

}

function send(msgParameters) {
    var sendRequest = new XMLHttpRequest();

    sendRequest.onreadystatechange = function(event) {
        if (sendRequest.readyState === 4) { 
            if (sendRequest.status === 200) {
                //response from server
                handleData(sendRequest.responseText);
            }
        }
    };

    sendRequest.open('POST', address, true);
    sendRequest.send(JSON.stringify(msgParameters));
}

function handleData(response) {
    document.getElementById('return').innerHTML = response;
}