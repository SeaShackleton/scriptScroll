!function(global){
	'use strict';
	var wrap = function($){
		$.fn.scriptScroll = function(info){
			var defaults = {
				trackColor: '#888888',
				handleColor: '#555555',
				trackOpposing: false,
				scrollVertical: true,
				handleCornerRadius: 0,
				trackCornerRadius: 0,
				handleImage: false,
				returnArray: [],			
				handleWidth: 6,
				contentPadding: 0,
				data: null,
				scrollSpeed: 25,
				onScrollReturn: null
			};		 
			var options = {};
			$.extend(options,defaults,info);
			this.each(function(){
				var $e = $(this), interactedToTop, currentPos = 0, scrollingContainer, scrolling, track, handle, imgObj; 
				$e.handleTop = function(top){
					handle.css("top",top+"px");						
				};
				$e.handleLeft = function(top){
					handle.css("left",top+"px");						
				};
				$e.onCallBack = function(origin){
					if (typeof options.onScrollReturn == 'function') {
						options.returnArray.length = 0;
						options.returnArray.push({fromOrigin:origin});
						options.onScrollReturn.apply(this,options.returnArray);
					}
				};
				$e.onScroll = function(e){
					//MOBILE
					if(e.originalEvent.touches){
						console.log(e.originalEvent.touches[0].pageX)
						console.log(e.originalEvent.touches[0].pageY)
						if(options.scrollVertical === false){
							//horizontal
							switch(e.type){
								case 'touchstart':
									//console.log(e.type);
									break;
								case 'touchmove':
									//console.log(e.type);
									break;
								case 'touchend':
									//console.log(e.type);
									break;
								default:
									return false;								
							}							
						}else{
							//vertical
							switch(e.type){
								case 'touchstart':
									//console.log(e.type);
									break;
								case 'touchmove':
									//console.log(e.type);
									break;
								case 'touchend':
									//console.log(e.type);
									break;
								default:
									return false;								
							}
						
						}
					}
					//FIREFOX
					if(e.originalEvent.detail){
						if(e.originalEvent.detail > 0) {
							if(options.scrollVertical === false){
								//horizontal
								scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()+options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollLeft());
								$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));						
							}else{
								//vertical
								scrollingContainer.scrollTop(scrollingContainer.scrollTop()+options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollTop());
								$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));
							}
						}else {
							if(options.scrollVertical === false){
								//horizontal
								scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()-options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollLeft());
								$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));								
							}else{
								//vertical
								scrollingContainer.scrollTop(scrollingContainer.scrollTop()-options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollTop());
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
								$e.onCallBack(scrollingContainer.scrollLeft());
								$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));	
								
							}else{
								//vertical
								scrollingContainer.scrollTop(scrollingContainer.scrollTop()+options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollTop());
								$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));
							}
						}else {
							if(options.scrollVertical === false){
								//horizontal
								scrollingContainer.scrollLeft(scrollingContainer.scrollLeft()-options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollLeft());
								$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));							
							}else{
								//vertical
								scrollingContainer.scrollTop(scrollingContainer.scrollTop()-options.scrollSpeed);
								$e.onCallBack(scrollingContainer.scrollTop());
								$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));						
							}
						}				
					
					}			
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
						scrollingContainer = $('<div>',{'class':'scrollingContainer'}).css({overflow:'hidden',  'white-space':'nowrap'});
						$e.append(scrollingContainer);
						scrollingContainer.scrollLeft(0);
						scrollingContainer.append(scrolling);
						track = $("<div>",{'class':'scrollingTrack', css:{width:$e.width(), backgroundColor: options.trackColor, height:'10px', top:"0px", right:"0px", position:"relative"}});
						if(options.handleImage === false){
							handle = $("<div>",{'class':"scrollHandle", 
								css:{
									height:'100%', 
									width:(($e.innerWidth() / scrolling.get(0).scrollWidth) * track.innerWidth()), 
									backgroundColor: options.handleColor, 
									marginTop:'0px', 
									cursor:'pointer'
								}
							});
						}else{
							handle = $("<div>",{'class':"scrollHandle", 
								css:{
									height:'100%',
									backgroundImage: 'url('+options.handleImage+')',
									backgroundRepeat: 'no-repeat',
									marginTop:'0px',
									cursor:'pointer'
								}
							});
							imgObj = new Image();
							imgObj.onload = function(){
								track.css('height',this.height);
								handle.css('width',this.width);
								
								//alert(this.width)							
							};
							imgObj.src = options.handleImage;					
						}
						track.append(handle);						
						$e.append(track);
						if(options.trackOpposing === false){
							$e.prepend(track);
							scrollingContainer.css('padding-top',options.contentPadding);
						}else{
							scrollingContainer.css('padding-bottom',options.contentPadding);
							$e.append(track);
						}
						//IF THERE IS DATA AVAILABLE, ADD IT TO THE END OF THE CURRENT CONTENT WITHIN scrolling
						if(!options.data){
							scrolling.append(options.data);
						} 
						handle.draggable({ 
							axis: "x", 
							containment: "parent",
							drag: function(event, ui) {
								currentPos = (ui.position.left / (track.innerWidth()-handle.innerWidth())) *(scrolling.get(0).scrollWidth-$e.css("width").replace("px",""));
								interactedToTop = currentPos;
								scrollingContainer.scrollLeft(currentPos);	
								$e.onCallBack(currentPos);
							} 
						});		
					}else{
						//VERTICAL SCROLL
						
						$e.wrapInner( $('<div>',{'class':'scrolling'}).css({position:'relative'})  );
						scrolling = $e.find('.scrolling');
						scrolling.css('height',scrolling.get(0).scrollHeight);
						scrollingContainer = $('<div>',{'class':'scrollingContainer'}).css({overflow:'hidden', height:'100%', position:'relative',  display: 'inline-block', width:($e.width()-options.handleWidth-options.contentPadding)});
						scrollingContainer.append(scrolling);
						$e.append(scrollingContainer);
						
						track = $("<div>",{'class':'scrollingTrack', css:{height: $e.height(), backgroundColor: options.trackColor, width: options.handleWidth, 'white-space': 'nowrap', display: 'inline-block', position:"relative"}});
						if(options.handleImage === false){
							handle = $("<div>",{'class':"scrollHandle", 
								css:{
									width:'100%',
									height:(($e.innerHeight() / scrolling.get(0).scrollHeight) * track.innerHeight()),
									backgroundColor: options.handleColor,
									marginTop:'0px',
									cursor:'pointer'
								}
							});
						}else{
							handle = $("<div>",{'class':"scrollHandle", 
								css:{
									width:'100%',
									backgroundImage: 'url('+options.handleImage+')',
									backgroundRepeat: 'no-repeat',
									marginTop:'0px',
									cursor:'pointer'
								}
							});
							imgObj = new Image();
							imgObj.onload = function(){
								track.css('width',this.width);
								handle.css('height',this.height);
								scrollingContainer.css('width', ($e.width()-options.handleWidth-options.contentPadding - this.width) )
								//alert(this.width)							
							};
							imgObj.src = options.handleImage;					
						}
						track.append(handle);				
						$e.append(track);
						
						
						if(options.trackOpposing === false){
							$e.prepend(track);
							scrollingContainer.css('padding-left',options.contentPadding);
						}else{
							scrollingContainer.css('padding-right',options.contentPadding);
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
								$e.onCallBack(currentPos);
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
						e.bubbles=false;
						console.log(e)
						e.preventDefault();
						$e.onScroll(e);
					});
					//IE OPERA SAFARI
					$e.bind('mousewheel', function(e){
						e.preventDefault();
						$e.onScroll(e);
					});
					
					//START OF MOBILE
					$e.bind('touchstart touchmove touchend', function(e){
						e.preventDefault();
						$e.onScroll(e);
					})
				};
				$e.init();
			});
			// return for jQuery chaining
			return this; 
		};
	};
	if (typeof define === 'function' && define.amd) {
		//THIS IS AMD
		define(['jquery', 'jquery-ui'], wrap);
	}else{
		//THIS IS NOT AMD
		wrap(global.jQuery);
	};
}(this);