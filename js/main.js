$(document).ready(function() {
	$("input").focus();

	//starts the search on submit by calling the api and displaying the array results
	$('form').on("submit",function(event){
		event.preventDefault();

		var searchQuery = $(this).find('input').val();
			if (searchQuery === '') {
				alert("Please enter an artist or song title to begin");
			}
			else {

				$.ajax({
				   	url: "http://api.soundcloud.com/tracks?client_id=03e4633e2d85874a921380e47cac705d&q=" + searchQuery,
				    success: function success(results) {
				    
				    var displayArray = results;
				    
				    displayArray.forEach(function(music){

				    	var displayTitleString = music.title;
				    	var displayTitleWithBreak = displayTitleString.replace("-", "<br>");
				    	
				    	if (music.artwork_url === null) {
				    		$(".displayWrapper").append("<div class = 'col-xs-6'><img data-soundcloud = " + music.id + " src ='http://placehold.it/300x300'><figcaption>" + displayTitleWithBreak + "</figcaption></div>");
				    	}
				    	else{    		

				    	var artWorkURL = music.artwork_url;
				    	var displayArtWorkURL = artWorkURL.replace("large", "t300x300");

				    		$(".displayWrapper").append("<div class = 'col-xs-6'><img data-soundcloud = " + music.id + " src=" + displayArtWorkURL + "><figcaption>" + displayTitleWithBreak + "</figcaption></div>");
						}	 

				    });

					$('input').val('');
					$('form').on('submit',function(){
						$('.displayWrapper').html('');
					});

					}	
				});
			}	
	});

	$('.displayWrapper').on('click', 'img', function(e) {
		var id = $(this).data('soundcloud');
		console.log(id);
		$('audio').attr('src', function() {
  		return "http://api.soundcloud.com/tracks/" + id + "/stream?client_id=03e4633e2d85874a921380e47cac705d";
		});
	});

});	





















