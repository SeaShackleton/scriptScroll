(function($){	
	$.fn.scriptScroll = function(info){
		'use strict';
		var defaults = {
			trackColor: '#888888',
			handleColor: '#555555',
			trackLeft: true,
			scrollVertical: true,
			scrollHorizontal: false,
			handleCornerRadius: 0,
			trackCornerRadius: 0,
			handleImage: false,
			handleWidth: 6,
			contentPadding: 5,
			data: null,
			scrollSpeed: 25
		};		
		var options = {};
		$.extend(options,defaults,info);
		this.each(function(){
			var $e = $(this), interactedToTop,currentPos = 0, scrollingContainer,track,handle;
			$e.handleTop = function(top){
				handle.css("top",top+"px");						
			};
			$e.onScroll = function(e){
				var elementHeight = $e.height(), scrollingHeight = scrollingContainer.innerHeight();
				//FIREFOX
				if(e.originalEvent.detail){
					if(e.originalEvent.detail > 0) {			
						$e.scrollTop($e.scrollTop()+options.scrollSpeed);
						interactedToTop = (($e.scrollTop() / (scrollingHeight- elementHeight) )*(track.innerHeight() - handle.innerHeight() ));
						$e.handleTop(interactedToTop);
					}else {
						$e.scrollTop($e.scrollTop()-options.scrollSpeed);
						interactedToTop = (($e.scrollTop() / (scrollingHeight- elementHeight) )*(track.innerHeight() - handle.innerHeight() ));				
						$e.handleTop(interactedToTop);
					}				
				}
				//IE OPERA SAFARI
				if(e.originalEvent.wheelDelta){
					if(e.originalEvent.wheelDelta < 0) {			
						$e.scrollTop($e.scrollTop()+options.scrollSpeed);
						interactedToTop = (($e.scrollTop() / (scrollingHeight- elementHeight) )*(track.innerHeight() - handle.innerHeight() ));
						$e.handleTop(interactedToTop);
					}else {
						$e.scrollTop($e.scrollTop()-options.scrollSpeed);
						interactedToTop = (($e.scrollTop() / (scrollingHeight- elementHeight) )*(track.innerHeight() - handle.innerHeight() ));				
						$e.handleTop(interactedToTop);
					}				
				
				}
				track.css("top", $e.scrollTop());
				
				return false;
			};
			$e.init = function(){
				if($e.css("overflow") != 'hidden'){
					$e.css("overflow","hidden");
				}
				if($e.css("position") != 'relative'){
					$e.css("position","relative");
				}
				
				//CREATE THE CONTAINER TO BE SCROLLED AND ADD THE APPROPRIATE CONTENT
				$e.wrapInner( $('<div>',{'class':'scrolling'}).css({ width: ($e.width() - options.handleWidth - options.contentPadding), "margin-right": "20px", position:'relative'})  );
				//DEFINE THE SCROLLINT CONTAINER
				scrollingContainer = $e.find('.scrolling');
				
				
				//IF THERE IS DATA AVAILABLE, ADD IT TO THE END OF THE CURRENT CONTENT WITHIN scrollingContainer
				if(options.data.length > 0){
					scrollingContainer.append(options.data);
				}
				
				
				
				
				track = $("<div>",{'class':'scrollingTrack', css:{height: $e.height(), backgroundColor: options.trackColor, width: options.handleWidth, top:"0px", right:"0px", position:"absolute"}});
				handle = $("<div>",{'class':"scrollHandle", css:{width:'100%', height:(($e.innerHeight() / scrollingContainer.outerHeight()) * track.innerHeight()), backgroundColor: options.handleColor, marginTop:'0px', cursor:'pointer'}});
				$e.append(track);


				handle.css({ 
					'-moz-border-radius':options.handleCornerRadius, 
					'-webkit-border-radius':options.handleCornerRadius, 
					'-khtml-border-radius':options.handleCornerRadius, 
					'border-radius':options.handleCornerRadius
				});
				track.css({ 
					'-moz-border-radius':options.trackCornerRadius, 
					'-webkit-border-radius':options.trackCornerRadius, 
					'-khtml-border-radius':options.trackCornerRadius, 
					'border-radius':options.trackCornerRadius 
				});


				handle.draggable({ 
					axis: "y", 
					containment: "parent",
					drag: function(event, ui) {
						currentPos = (ui.position.top / (track.innerHeight()-handle.innerHeight())) *(scrollingContainer.innerHeight()-$e.css("height").replace("px",""));
						interactedToTop = currentPos;
						$e.scrollTop(currentPos);
						track.css("top", $e.scrollTop());				
					} 
				});			
				track.append(handle);
				
				//BIND SCROLL EVENTS
				//FIREFOX
				$e.bind('DOMMouseScroll', function(e){
					$e.onScroll(e);
				});
				//IE OPERA SAFARI
				$e.bind('mousewheel', function(e){
					$e.onScroll(e);
				});
			};
			$e.init();
		});
		// return for jQuery chaining
		return this; 
	};
})(jQuery);
