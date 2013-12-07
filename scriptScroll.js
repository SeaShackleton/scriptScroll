(function($){	
	$.fn.scriptScroll = function(info){
		'use strict';
		var defaults = {
			trackColor: '#888888',
			handleColor: '#555555',
			trackOpposing: false,
			scrollVertical: true,
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
			var $e = $(this), interactedToTop,currentPos = 0, scrollingContainer, scrolling,track,handle; 
			$e.handleTop = function(top){
				handle.css("top",top+"px");						
			};
			$e.handleLeft = function(top){
				handle.css("left",top+"px");						
			};
			$e.onScroll = function(e){
				var elementHeight = $e.height(), scrollingHeight = scrolling.innerHeight();
				//FIREFOX
				if(e.originalEvent.detail){
					if(e.originalEvent.detail > 0) {
						if(options.scrollVertical === false){
							//horizontal
							scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()+options.scrollSpeed);
							$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));						
						}else{
							//vertical
							scrollingContainer.scrollTop(scrollingContainer.scrollTop()+options.scrollSpeed);
							$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));
						}
					}else {
						if(options.scrollVertical === false){
							//horizontal
							scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()-options.scrollSpeed);
							$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));								
						}else{
							//vertical
							scrollingContainer.scrollTop(scrollingContainer.scrollTop()-options.scrollSpeed);
							$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));						
						}
					}				
				}
				//IE OPERA SAFARI
				if(e.originalEvent.wheelDelta){
					if(e.originalEvent.wheelDelta < 0) {
						if(options.scrollVertical === false){
							//horizontal
							scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()+options.scrollSpeed);
							$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));	
							
						}else{
							//vertical
							scrollingContainer.scrollTop(scrollingContainer.scrollTop()+options.scrollSpeed);
							$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));
						}
					}else {
						if(options.scrollVertical === false){
							//horizontal
							scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()-options.scrollSpeed);
							$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));							
						}else{
							//vertical
							scrollingContainer.scrollTop(scrollingContainer.scrollTop()-options.scrollSpeed);
							$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));						
						}
					}				
				
				}			
				track.css("top", $e.scrollTop());
			};
			$e.init = function(){
				if($e.css("overflow") != 'hidden'){
					$e.css("overflow","hidden");
				}
				if($e.css("position") != 'relative'){
					$e.css("position","relative");
				}
				
				if(options.scrollVertical === false){
					//HORIZONTAL SCROLL
					//DEFINE THE SCROLLINT CONTAINER
					$e.wrapInner( $('<div>',{'class':'scrolling'}).css({position:'relative', height:'120px'})  );
					scrolling = $e.find('.scrolling');
					scrollingContainer = $('<div>',{'class':'scrollingContainer'}).css({backgroundColor:'pink', overflow:'hidden',  'white-space':'nowrap'});
					$e.append(scrollingContainer);
					scrollingContainer.scrollLeft(0);
					scrollingContainer.append(scrolling);
					track = $("<div>",{'class':'scrollingTrack', css:{width:$e.width(), backgroundColor: options.trackColor, height:'10px', top:"0px", right:"0px", position:"relative"}});
					handle = $("<div>",{'class':"scrollHandle", css:{height:'100%', width:(($e.innerWidth() / scrolling.get(0).scrollWidth) * track.innerWidth()), backgroundColor: options.handleColor, marginTop:'0px', cursor:'pointer'}});
					track.append(handle);						
					$e.append(track);
					if(options.trackOpposing === false){
						$e.prepend(track);
						scrollingContainer.css('margin-top',options.contentPadding);
					}else{
						scrollingContainer.css('margin-bottom',options.contentPadding);
						$e.append(track);
					}
					//IF THERE IS DATA AVAILABLE, ADD IT TO THE END OF THE CURRENT CONTENT WITHIN scrolling
					if(options.data.length > 0){
						scrolling.append(options.data);
					} 
					handle.draggable({ 
						axis: "x", 
						containment: "parent",
						drag: function(event, ui) {
							currentPos = (ui.position.left / (track.innerWidth()-handle.innerWidth())) *(scrolling.get(0).scrollWidth-$e.css("width").replace("px",""));
							interactedToTop = currentPos;
							scrollingContainer.scrollLeft(currentPos);	
						} 
					});		
				}else{
					//VERTICAL SCROLL
					$e.wrapInner( $('<div>',{'class':'scrolling'}).css({ width: ($e.width() - options.handleWidth - options.contentPadding),  position:'relative'})  );
					scrolling = $e.find('.scrolling');
					scrolling.css('height',scrolling.get(0).scrollHeight);
					scrollingContainer = $('<div>',{'class':'scrollingContainer'}).css({overflow:'hidden', height:'100%', width:($e.width()-options.handleWidth-options.contentPadding)});
					$e.append(scrollingContainer);
					scrollingContainer.append(scrolling);
					track = $("<div>",{'class':'scrollingTrack', css:{height: $e.height(), backgroundColor: options.trackColor, width: options.handleWidth, top:"0px", right:"0px", position:"absolute"}});
					handle = $("<div>",{'class':"scrollHandle", css:{width:'100%', height:(($e.innerHeight() / scrolling.get(0).scrollHeight) * track.innerHeight()), backgroundColor: options.handleColor, marginTop:'0px', cursor:'pointer'}});
					track.append(handle);						
					$e.append(track);
					if(options.trackOpposing === false){
						$e.prepend(track);
						//scrollingContainer.css('margin-right',options.contentPadding)
					}else{
						scrollingContainer.css('margin-left',options.contentPadding);
						$e.append(track);
					}
					//IF THERE IS DATA AVAILABLE, ADD IT TO THE END OF THE CURRENT CONTENT WITHIN scrolling
					if(options.data.length > 0){
						scrolling.append(options.data);
					} 
					handle.draggable({ 
						axis: "y", 
						containment: "parent",
						drag: function(event, ui) {
							currentPos = (ui.position.top / (track.innerHeight()-handle.innerHeight())) *(scrolling.get(0).scrollHeight-$e.height());
							interactedToTop = currentPos;
							scrollingContainer.scrollTop(currentPos);		
						} 
					});						
				}				
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
