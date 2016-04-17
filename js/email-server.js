// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
const url = 'http://127.0.0.1:8000';

function listAvailable(address, loading_cb, invalid_cb, exists_cb, available_cb){
        
        var xhr = createCORSRequest('GET', url+'/available/'+encodeURI(address));
        xhr.onload = function(){
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (!response.is_valid) invalid_cb();
            else if (response.exists) exists_cb();
            else available_cb();
        }
        xhr.send();
        loading_cb();
}
function validateEmail(address, loading_cb, valid_cb, invalid_cb){
        
        var xhr = createCORSRequest('GET', url+'/validate/'+encodeURI(address));
        xhr.onload = function(){
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            if (response.is_valid) valid_cb();
            else invalid_cb();
        }
        xhr.send();
        loading_cb();
}

function mailingListExists(address, exists, not_exists) {
    console.log("HEY");
    var url = 'http://127.0.0.1:8000/exists/' + encodeURI(address);

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        console.log('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        if (response.exists) exists();
        else not_exists();
    };

    xhr.onerror = function() {
        $('#output').html("Error occured. Trying again...");
    };

    xhr.send("hello from the fornt end");
}
// Make the actual CORS request.
function createMailingList(mailing_list) {
    var url = 'http://127.0.0.1:8000/quote';

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
    };

    xhr.onerror = function() {
        $('#output').html("Error occured. Trying again...");
    };

    xhr.send("hello from the fornt end");
}

//createMailingList();
