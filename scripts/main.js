require(['config'],function(c){
	require(['jquery', 'scriptScroll'],function($,scriptScroll) {


		$("#scrollThese").scriptScroll({
			trackColor:'#eeeeee',
			scrollSpeed: 100,
			handleWidth: 10,
			handleCornerRadius: 36,
			trackCornerRadius: 36,
			contentPadding:12,
			trackOpposing:true,
			data: "an extra bit"
		});				
		$("#scrollThat").scriptScroll({
			trackColor:'#fff',
			scrollSpeed: 100,
			trackOpposing: true,
			contentPadding: 35,
			handleImage: 'img/handleHorizontal.png',
			scrollVertical: false,
			onScrollReturn: function(data){
				console.log(data);
			}
		});
	});
});