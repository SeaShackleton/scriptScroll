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
&#8226; PIE (<a href='https://github.com/lojjic/PIE' target='_blank'>https://github.com/lojjic/PIE</a>)<br /><br />
<strong>
  Use
</strong>
<br />
<pre>
  <div id="elementToScroll">
    <!--CONTENT HERE-->
  </div>
  <script type="text/javascript">
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
  </script>
</pre>
