window.setInterval(function(){
    if ($("#mailing-list-name").val().length == 0){
        $(".initial-hide").hide();

    }
}, 300);

$("#mailing-list-name").on("keyup paste", function(){
    var name = $("#mailing-list-name").val();
    console.log(name.length);
    var email = name + $("#domain").text();
    function validation_in_progress() {
        console.log(email);
    }

    function validation_success(data) {
        console.log(data);
        if (data.is_valid) good_email();
        else bad_email();
    }

    function validation_error(error_message) {
        console.log(error_message);
        $(".initial-hide").hide();
        $("form .error").toggle();
        $("form .error").text(error_message);
        return;

    }

    function loading_validation(){
        //$(".initial-hide").hide();
       // $("form .spinner").toggle();
    }

    function good_email(){
        $(".initial-hide").hide();
        $("#confirm-button").toggle();
        if (email.length > 20){
            $("#confirm-button p").html("Create Mailing List");
        }
        else $("#confirm-button p").html("Create <tt>" + email + "</tt>");

    }

    function bad_email(){
        $(".initial-hide").hide();
        $("form .error").toggle();
        $("form .error").text(email + " is not a valid email address.");
    }

    function taken_email(){
        $(".initial-hide").hide();
        $("form .error").toggle();
        $("form .error").text(email + " is already taken.");
    }

    listAvailable(email, loading_validation, bad_email, taken_email, good_email);       
});

$("#confirm-button").click(function(){
    $(".initial-hide").hide();
    $("form .spinner").toggle();

});




