$(document).ready(function () {
	
	var content = $(".tse-content").height();
	var alto = content = content / 3;

	$("#home-nav").on("click", function (e) {
		e.preventDefault();
		// var section1 = $("#section1").offset().top;
		$('.tse-scroll-content').animate({ scrollTop: 0 }, 500);
		// $("html, body").animate({ scrollTop: $('.portfolio-filter').offset().top }, 500);

	});


	$("#map-nav").on("click", function (e) {
		e.preventDefault();
		// var section2 = $("#section2").offset().top;
		$('.tse-scroll-content').animate({ scrollTop: alto }, 500);

		//$('#section2').animate();
		// $('.tse-scroll-content').animate({ scrollTop: $('#section2').offset().top }, 500);
	});

	$("#message-nav").on("click", function (e) {
		e.preventDefault();
		// var section3 = $("#section3").offset().top;
		$('.tse-scroll-content').animate({ scrollTop: (alto * 2) }, 500);

		//$('#section3').animate();
		// $('.tse-scroll-content').animate({ scrollTop: $('#section3').offset().top }, 500);
	});

	$('#to-contacto').on('click', function(){
		$('.tse-scroll-content').animate({ scrollTop: (alto * 2) }, 500);
	});
});
