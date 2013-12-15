require(['config'],function(c){
	require(['jquery', 'scriptScroll'],function($,scriptScroll) {
		$("#scrollThis").scriptScroll({
			trackColor:'#eeeeee',
			scrollSpeed: 100,
			handleWidth: 10,
			handleCornerRadius: 36,
			handleImage: 'handle.png',
			trackCornerRadius: 36,
			contentPadding:12,
			trackOpposing:true,
			data: "an extra bit",
			onScrollReturn: function(data){
				console.log(data);
			}
		});
		$("#scrollWideHandle").scriptScroll({
			trackColor:'#eeeeee',
			scrollSpeed: 100,
			handleWidth: 10,
			handleImage: 'handleHorizontalPink.png',
			contentPadding:12,
			trackOpposing:true,
			data: "an extra bit",
			onScrollReturn: function(data){
				console.log(data);
			}
		});
		$("#scrollThat").scriptScroll({
			trackColor:'#fff',
			scrollSpeed: 100,
			trackOpposing: true,
			contentPadding: 35,
			handleImage: 'handleHorizontal.png',
			scrollVertical: false,
			onScrollReturn: function(data){
				console.log(data);
			}
		});
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
	});
});