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
			if ($.easing.hnlInertia === undefined) {
				$.easing.hnlInertia = function (x, t, b, c, d) {
					var ts = (t /= d) * t,
						tc = ts * t;
					return b + c * (-1 * ts * ts + 4 * tc + -6 * ts + 4 * t);
				};
			}			
			this.each(function(){
				var $e = $(this), interactedToTop, currentPos = 0, scrollingContainer, scrolling, track, handle, imgObj; 
				var touchStart, touchDistance, distance, touchStartToOrigin, acceleration, inertia, animationOptions;
				var mulitplier = 1;
				$e.handleTop = function(top){
					handle.css("top",top+"px");						
					$e.onCallBack(scrollingContainer.scrollTop());					
				};
				$e.handleLeft = function(left){
					handle.css("left",left+"px");
					$e.onCallBack(scrollingContainer.scrollLeft());					
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
						if(options.scrollVertical === false){
							//horizontal
							switch(e.type){
								case 'touchstart':
									if(scrollingContainer.is(':animated')){
										scrollingContainer.stop(true,false);
										mulitplier += 0.5;
									}else{
										mulitplier = 1;
									}
									touchStart=e;
									touchStartToOrigin = scrollingContainer.scrollLeft();
									break;
								case 'touchmove':
									distance = touchStart.originalEvent.touches[0].pageX - e.originalEvent.touches[0].pageX;
									touchDistance= touchStartToOrigin + distance;
									acceleration = Math.abs(distance/(e.originalEvent.timeStamp-touchStart.originalEvent.timeStamp));
									animationOptions = {
										duration:0
									};
									scrollingContainer.animate({scrollLeft:touchDistance},animationOptions);
									$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));									
									break;
								case 'touchend':
									inertia = Math.pow(acceleration,2) * scrollingContainer.width();
									inertia = (inertia  >  scrollingContainer.width()) ? scrollingContainer.innerWidth()/2 : inertia;
									inertia = (distance<0)? -mulitplier*inertia : mulitplier*inertia;
									console.log(acceleration)
									if(e.originalEvent.timeStamp-touchStart.originalEvent.timeStamp > 100 && inertia !== 0 && acceleration > 1.2){
										touchDistance = touchStartToOrigin + distance + inertia;										
										animationOptions = {
											duration: scrollingContainer.width() * 1.2,
											progress: function(){$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));},
											easing: 'hnlInertia',
											complete: function(){
												touchDistance,inertia,acceleration,touchStartToOrigin,distance = 0;
												mulitplier = 1;
											}
										};	
									}else{
										animationOptions = {
											duration: 0,
											progress: function(){$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));},
											complete: function(){
												touchDistance,inertia,acceleration,touchStartToOrigin,distance = 0;
												mulitplier = 1;
											}
										};									
									}
									scrollingContainer.animate({scrollLeft:touchDistance},animationOptions);
									$e.handleLeft((scrollingContainer.scrollLeft() / (scrolling.get(0).scrollWidth- $e.width()) )*(track.innerWidth() - handle.innerWidth() ));									
									break;
								default:
									return false;								
							}
							$e.onCallBack(scrollingContainer.scrollLeft());							
						}else{
							//vertical
							switch(e.type){
								case 'touchstart':
									if(scrollingContainer.is(':animated')){
										scrollingContainer.stop(true,false);
										mulitplier += 0.5;
									}else{
										mulitplier = 1;
									}
									touchStart=e;
									touchStartToOrigin = scrollingContainer.scrollTop();
									break;
								case 'touchmove':
									distance = touchStart.originalEvent.touches[0].pageY - e.originalEvent.touches[0].pageY;
									touchDistance= touchStartToOrigin + distance;
									acceleration = Math.abs(distance/(e.originalEvent.timeStamp-touchStart.originalEvent.timeStamp));
									animationOptions = {
										duration:0
									};
									scrollingContainer.animate({scrollTop:touchDistance},animationOptions);
									$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));									
									break;
								case 'touchend':
									inertia = Math.pow(acceleration,2) * scrollingContainer.height();
									inertia = (inertia  >  scrollingContainer.height()) ? scrollingContainer.innerHeight() : inertia;
									inertia = (distance<0)? -mulitplier*inertia : mulitplier*inertia;
									if(e.originalEvent.timeStamp-touchStart.originalEvent.timeStamp > 100 && inertia !== 0 && acceleration > 1.2){
										touchDistance = touchStartToOrigin + distance + inertia;										
										animationOptions = {
											duration: scrollingContainer.height() * 1.2,
											progress: function(){$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));},
											easing: 'hnlInertia',
											complete: function(){
												touchDistance,inertia,acceleration,touchStartToOrigin,distance = 0;
												mulitplier = 1;
											}
										};	
									}else{
										animationOptions = {
											duration: 0,
											progress: function(){$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));},
											complete: function(){
												touchDistance,inertia,acceleration,touchStartToOrigin,distance = 0;
												mulitplier = 1;
											}
										};									
									}
									scrollingContainer.animate({scrollTop:touchDistance},animationOptions);
									$e.handleTop((scrollingContainer.scrollTop() / (scrolling.get(0).scrollHeight- $e.height()) )*(track.innerHeight() - handle.innerHeight() ));									
									break;
								default:
									return false;								
							}
							$e.onCallBack(scrollingContainer.scrollTop());
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