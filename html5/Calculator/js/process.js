$(document).ready(function() {
    //Start JS

    //Clear Button
    $('#reset_text_btn').click(function() {
        $('#input_box').val('');
    });

    //Number button click
    $('#zero_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '0';
        $('#input_box').val(tmp);
    });
    $('#one_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '1';
        $('#input_box').val(tmp);
    });
    $('#two_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '2';
        $('#input_box').val(tmp);
    });
    $('#three_btn').click(function() { 
        var tmp = $('#input_box').val();
        tmp = tmp + '3';
        $('#input_box').val(tmp);
    });
    $('#four_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '4';
        $('#input_box').val(tmp);
    });
    $('#five_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '5';
        $('#input_box').val(tmp);
    });
    $('#six_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '6';
        $('#input_box').val(tmp);
    });
    $('#seven_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '7';
        $('#input_box').val(tmp);
    });
    $('#eight_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '8';
        $('#input_box').val(tmp);
    });
    $('#nine_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '9';
        $('#input_box').val(tmp);
    });
    $('#dot_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '.';
        $('#input_box').val(tmp);
    });

    //Operator button click
    $('#divide_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '/';
        $('#input_box').val(tmp);
    });
    $('#multiply_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '*';
        $('#input_box').val(tmp);
    });
    $('#minus_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '-';
        $('#input_box').val(tmp);
    });
    $('#plus_btn').click(function() {
        var tmp = $('#input_box').val();
        tmp = tmp + '+';
        $('#input_box').val(tmp);
    });

    //Equal button click Show result
    $('#equal_btn').click(function() {
        //Check Handle Condition

        //Empty Box
        if ($('#input_box').val() == "") {
            return;
        }

        var tmp = $('#input_box').val();
        var result;

        //Check for only number expression.
        try {
            result = parseFloat(eval(tmp)).toFixed(2);
        } catch (err) {
            alert("Wrong Expression !!");
            console.log(err);
        }

        //Show Result
        $('#input_box').val(result);
    });

    //Keyboard press down
    $('#body_html').keydown(function(e) {
        //Check Accept Only Number and dot(.) symbol
        if (e.keyCode == 49 || e.keyCode == 50 || e.keyCode == 51 || e.keyCode == 52 || e.keyCode == 53 || e.keyCode == 54 ||
            e.keyCode == 55 || e.keyCode == 56 || e.keyCode == 57 || e.keyCode == 48 || e.keyCode == 190) {
            //Get Value from keydown
            var keydown = String.fromCharCode(e.keyCode);
            if (e.keyCode == 190) {
                keydown = '.';
            }

            var tmp = $('#input_box').val();
            tmp = tmp + keydown;
            $('#input_box').val(tmp);

            console.log('in 1st condition');
        } else if (e.keyCode == 13) {
            //Calculate Value
            if ($('#input_box').val() == "") {
                return;
            }

            var tmp = $('#input_box').val();
            var result;

            //Check for only number expression.
            try {
                result = parseFloat(eval(tmp)).toFixed(2);
            } catch (err) {
                alert("Wrong Expression !!");
                console.log(err);
            }

            //Show Result
            $('#input_box').val(result);

            console.log(e.keyCode + " " + String.fromCharCode(e.keyCode));
        } else if (e.keyCode == 8) {
        	var tmp = $('#input_box').val();
            tmp = tmp.substring(0, tmp.length-1);
            $('#input_box').val(tmp);
        } else {
            //console.log("RETURN " + e.keyCode + " " + String.fromCharCode(e.keyCode));
            return;
        }
    });
});