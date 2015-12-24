$(document).ready(function() {
    $('#detail_div').hide();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function clearText(){
        $('#purchase_txt').val("");
        $('#cash_txt').val("");
        $('#change_txt').val("");
    }

    $('#clearTextbtn').click(function() {
        clearText();
        $('#detail_div').hide();
    });

    $('#calculateChange').click(function() {
        var purchase_value = $('#purchase_txt').val();
        var cash_value = $('#cash_txt').val();
        var change_value = $('#change_txt').val();

        if (parseFloat(purchase_value) > parseFloat(cash_value)) {
            alert("NOT ENOUGHT MONEY!!");
            clearText();
            return;
        }
        if (purchase_value == "" || cash_value == "") {
            alert("PLEASE FILL IN ALL FIELDS!!");
            return;
        }

        if (isNaN(purchase_value) == true || isNaN(cash_value) == true) {
            alert("PLEASE PUT ONLY NUMBERIC TYPE!!");
            clearText();
            return;
        }
        var tmp = parseFloat(cash_value) - parseFloat(purchase_value);

        change_value = numberWithCommas((parseFloat(cash_value) - parseFloat(purchase_value)).toFixed(2));
        $('#change_txt').val(change_value);
        $('#change_detail_txt').html("" + change_value);
        
        //SET DIV RESULT
        $('#purchase_detail_txt').html(numberWithCommas(parseFloat((purchase_value)).toFixed(2)));
        $('#cash_detail_txt').html(numberWithCommas(parseFloat((cash_value)).toFixed(2)));
        
        var vat7Percent = parseFloat(purchase_value) * 0.07;

        $('#amount_detail_txt').html(numberWithCommas((tmp - vat7Percent).toFixed(2)));
        $('#vat_detail_txt').html(numberWithCommas(parseFloat(vat7Percent).toFixed(2)));
        $('#detail_div').css("display","block");
    });

});