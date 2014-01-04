scriptScroll
============
scriptScroll is a jQuery scroll plugin which supports AMD and mobile inertia scrolling
<br />
<br />
###   Dependencies
&#8226; jQuery (built with v1.8.3)<br />
&#8226; jQuery UI (built with v.1.10.3 for draggable)<br />
&#8226; PIE (<a href='https://github.com/lojjic/PIE' target='_blank'>https://github.com/lojjic/PIE</a>- used to get cross-browser round corners)

### HTML

```html
<div id="elementToScroll" style="height:300px; width:200px;">
	<!--YOUR CONTENT HERE-->
</div>
```
You do not need to define the track, handle, or the area that is going to be scrolled. The plugin does this for you.
<br /><br />
### JavaScript
<pre>
$("#elementToScroll").scriptScroll({
	trackColor:'#ffffff',
	scrollSpeed: 100,
	handleWidth: 10,
	handleCornerRadius: 36,
	trackCornerRadius: 36,
	contentPadding:30,
	trackOpposing:true,    
	handleImage: 'path/to/image',
	onScrollReturn: function(data){
	console.log(data);
	}			
});
</pre>
### trackColor: 
This will define the background color of the track, or what is known as the parent of the handle. This defaults to '#888888'.
<br />

### handleColor: 
This will define the background color of the handle, the draggable element inside the track. This defaults to '#555555'.
<br />

### trackOpposing: 
When set to 'false', the track will be positioned on the left or top based on wither the scroll is vertical or horizontal respectfully.
<br />

### scrollVertical: 
When set to 'false', the plugin is assuming that the content is going to scroll horizontallly. When set to 'true', the plugin is assuming that the content is going to scroll vertically. This defaults to 'true'.
<br />

### handleCornerRadius: 
This option takes 'ints' and 'strings' and defines the radius of all of the angeles within the draggable handle element. This defaults to 0px. <b>Note:</b> If you set the trackCornerRadius option, it is recomended to set this option.
<br />

### trackCornerRadius: 
This option takes 'ints' and 'strings' and defines the radius of all of the angeles within the track element. This defaults to 0px. <b>Note:</b> If you set the handleCornerRadius option, it is recomended to set this option.
<br />

### handleImage: 
This will define the background color of the handle, the draggable element inside the track. This defaults to false.
<br />

### handleWidth: 
This will define the 'src' to the image you would like used as the handle of the scroller. For this to properly work, you must resize the image to the exact dimentions you would like for it to appear upon the scroller.
<br />

### contentPadding: 
This will define the distance of the content away from the scroller. 
<br />

### data: 
This is an optional value and will append any data you would like to add to the scrolling element. This defaults to null.
<br />

### scrollSpeed: 
This will define the amount of pixels scrolled when a user scrolls with mouse or touchpad upon the scrolling element.  This option has no affect upon using the handle or mobile swipe to scroll.
<br />

### onScrollReturn: 
This will define an applied funtion returning the distance in pixels, either from the top or left; determined by  wither the element is defined as scrolling vertical or horizontal respectfully.
<br />

	
