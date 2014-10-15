$(document).ready(function() {
    $('#eventLog').text(" ");
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
        var eventText = $('#eventLog').text();
        //based on the value of the checked box chnage the dropdown list
        switch(this.value) {
                case '1':
                    //State 1 - clear the color choice field, and switch colors to Brown,Gold,Green, and White
                    document.getElementById("cField").value = "";
                    $('#eventLog').text(eventText + "\n State Changed to State 1");
                    $('#colors').append('<option value="Brown"><option value="Gold"><option value="Green"><option value="White">');
                    break;
                case '2':
                    //State 2 - clear the color choice field, and switch colors to Blue, Maize, Red, and Silver
                    document.getElementById("cField").value = "";
                    $('#eventLog').text(eventText + "\n State Changed to State 2");
                    $('#colors').append('<option value="Blue"><option value="Maize"><option value="Red"><option value="Silver">');
                    break;
                case '3':
                    //State 3 - clear the color choice field, and switch colors to Black, Teal, Orange, Pink
                    document.getElementById("cField").value = "";
                    $('#eventLog').text(eventText + "\n State Changed to State 3");
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
            document.getElementById("eField").value = "";
            document.getElementById("pField").value = "";
            document.getElementById("cField").value = "";
        
            document.getElementById("eField").disabled = true;
            document.getElementById("pField").disabled = true;
            document.getElementById("cField").disabled = true;
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
            document.getElementById("pField").disabled = true;          //Ensure the lower inputs get disabled and cleared
            document.getElementById("cField").disabled = true;
            document.getElementById("pField").value = "";
            document.getElementById("cField").value = "";
            alert("The Email you entered is invalid please enter it in the form yourUserName@yourDomain.com");
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
            document.getElementById("cField").disabled = true;
            document.getElementById("cField").value = "";
            alert("The phone number you entered is invalid please enter it in the form XXX-XXX-XXXX");
        }
    });
    
    //value changed event handler for the Color Choice input field
    $('#cField').change(function() {
        var eventT = $('#eventLog').text();
        if(this.value !== "")                                    //Make sure the phone number field contains something
        {
            $('#subBtn').removeAttr('disabled');              //Enable the color choice field
            $('#eventLog').text(eventT + "\n Color Choice Chosen to be " + this.value);
        }
        else {
            //highlight the color choice field and create an alert for empty choice field
            document.getElementById('subBtn').disabled = true;
            $('#cField').removeAttr('disabled');
            alert('Please enter a valid color choice from the drop down menu');
        }
    });
});