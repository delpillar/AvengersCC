var ip = '127.0.0.1';
var port = '8000';
var address = ip + ':' + port;

function runClient() {

    if (!Date.now) {
        Date.now = function() { return new Date().getTime(); };
    }
    var currentTime = Date.now();

    var updateScheduleParameters = { msgType: 'updateSchedule', 
                                     usersid: '1',
                                     eventsid: '1', 
                                     availability: [{ start: currentTime, end: currentTime },
                                                    { start: currentTime, end: currentTime }] };

    var response = send(updateScheduleParameters);                                                
}

function send(msgParameters) {
    var sendRequest = new XMLHttpRequest();
    
    sendRequest.onreadystatechange = function() {
        if (sendRequest.readyState !== 4)
        return;         

        if (sendRequest.status === 200) {
            //response from server
            var responseText = JSON.parse(sendRequest.responseText);

            return responseText;
        }
    };

    sendRequest.open('POST', address, true);
    sendRequest.send(JSON.stringify(msgParameters));
}
