$(document).ready(function() {
    
    $('#cnclBtn').click(function() {
        document.getElementById("nField").value = "";
        document.getElementById("eField").value = "";
        document.getElementById("pField").value = "";
        document.getElementById("cField").value = "";
        
        document.getElementById("eField").disbaled = true;
        document.getElementById("pField").disbaled = true;
        document.getElementById("cField").disbaled = true;
    });
    
    $('input[name~="state"]').change(function() {
        //do change of state radio buttons handleing here
        $('#colors').empty();       //Empty the options from the datalist
        
        //based on the value of the checked box chnage the dropdown list
        switch(this.value) {
                case '1':
                    //State 1 - clear the color choice field, and switch colors to Brown,Gold,Green, and White
                    document.getElementById("cField").value = "";
                    $('#colors').append('<option value="Brown"><option value="Gold"><option value="Green"><option value="White">');
                    break;
                case '2':
                    //State 2 - clear the color choice field, and switch colors to Blue, Maize, Red, and Silver
                    document.getElementById("cField").value = "";
                    $('#colors').append('<option value="Blue"><option value="Maize"><option value="Red"><option value="Silver">');
                    break;
                case '3':
                    //State 3 - clear the color choice field, and switch colors to Black, Teal, Orange, Pink
                    document.getElementById("cField").value = "";
                    $('#colors').append('<option value="Black"><option value="Teal"><option value="Orange"><option value="Pink">');
                    break;
        }
    });
    
    //value changed event handler for the Name input field
    $('#nField').change(function() {
        if(this.value !== "")                                    //Make sure Input fields value contains some text
        {
            document.getElementById('eField').disabled = false;
        }
        else {
            //highlight the name field red, and create an alert for empty text
            $('#nField').css("border", "2px solid red");
        }
    });
    
    //value changed event handler for the Email input field
    $('#eField').change(function() {
        var emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        //Make sure the email field contains something, and is valid with the regular exression test
        if((this.value !== "") && (emailRegEx.test(this.value)))  
        {
            $('#pField').removeAttr('disabled'); //Enable the phone number field
        }
        else
        {
            //highlight the email field red, and create an alert for invalid/empty text
            $('#eField').css("border", "2px solid red");
        }
    });
    
    //value changed event handler for the Phone Number input field
    $('#pField').change(function() {
         var phoneRegEx = /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/g;
        //Make sure the phone number field contains something, and is valid with the regular expression test
        if((this.value !== "") && (phoneRegEx.test(this.value)))  
        {
            $('#cField').removeAttr('disabled');  //Enable the color choice field
        }
        else {
            //highlight the phone field red, and create an alert for invalid/empty text
        }
    });
    
    //value changed event handler for the Color Choice input field
    $('#cField').change(function() {
        if(this.value !== "")                                    //Make sure the phone number field contains something
        {
            $('#subBtn').removeAttr('disabled');              //Enable the color choice field
        }
        else {
            //highlight the color choice field and create an alert for empty choice field
        }
    });
});