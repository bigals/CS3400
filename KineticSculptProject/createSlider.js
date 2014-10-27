var sliderCount = 0;
var sliderValueArray = [];

function grabSliderValues(){
for( i=0; i<sliderCount; i++){
var slideValue = $('#s'+i+'Slider').slider( "option", "value" );
sliderValueArray[i] = slideValue;
alert(sliderValueArray[i]);



}
sliderCount=0;
};
 $('#sliderVariables').submit(function (e) {

  grabSliderValues();
  });
  
$(document).ready(function(){



//Create sliders
	$('.Slider').each(function(idx, elm) {
    			var name = elm.id.replace('Slider', '');
				sliderCount++;
			$('#' + elm.id).slider({
			        startValue: 0,
		        	min: 0,
		        	max: 179,
		        	//step: .5,
		        	slide: function(event, ui) {
		        	    $('#' + name).val(ui.value);
						
						
		        	}
		    	});
				
		});
		

     });
		