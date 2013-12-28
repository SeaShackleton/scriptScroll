scriptScroll
============
scriptScroll is a jQuery scroll plugin which supports AMD and mobile inertia scrolling
<br />
<br />
<strong>
  Dependencies
</strong>
<br />
&#8226; jQuery (built with v1.8.3)<br />
&#8226; jQuery UI (built with v.1.10.3 for draggable)<br />
&#8226; PIE (<a href='https://github.com/lojjic/PIE' target='_blank'>https://github.com/lojjic/PIE</a>- used to get cross-browser round corners)

<strong>
	HTML
</strong>

```html
<div id="elementToScroll" style="height:300px; width:200px;">
	<!--YOUR CONTENT HERE-->
</div>
```
You do not need to define the track, handle, or the area that is going to be scrolled. The plugin does this for you.
<br /><br />
<strong>
	JavaScript
</strong>
<br />
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
<br />
<strong>
Options
</strong>

<br />
<b>trackColor</b>: 
This will define the background color of the track, or what is known as the parent of the handle. This defaults to '#888888'.
<br />

<b>handleColor</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to '#555555'.
<br />

<b>trackOpposing</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to '#555555'.
<br />

<b>trackOpposing</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to false.
<br />

<b>scrollVertical</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to true.
<br />

<b>handleCornerRadius</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to 0px.
<br />

<b>trackCornerRadius</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to 0px.
<br />

<b>handleImage</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to false.
<br />

<b>handleWidth</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to 6px.
<br />

<b>contentPadding</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to 0px.
<br />

<b>data</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to null.
<br />

<b>scrollSpeed</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to 25px.
<br />

<b>onScrollReturn</b>: 
This will define the background color of the handle, the draggable element inside the track. This defaults to null.
<br />

	
