var ip = '127.0.0.1';
var port = '8000';
var address = ip + ':' + port;

function runClient() {

    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); };
    }
    var currentTime = Date.now();

    var updateScheduleParameters = { 
                                        msgType: 'addSchedule', 
                                        usersid: '1',
                                        eventsid: '1', 
                                        availability: [ { start: currentTime, end: currentTime },
                                                        { start: currentTime, end: currentTime } ] 
                                };

    send(updateScheduleParameters);                                                


    //run readUserInfo event
    var readUserInfoParameters = { usersid: '1' };
    send(readUserInfoParameters);


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