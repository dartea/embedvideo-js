/*
== embedvideo-js == 
version: 1.0.0
author: DARTEA (http://www.dartea.com) 
*/

/*
Copyright 2015 DARTEA

This program is free software: you can redistribute it and/or modify 
it under the terms of the Apache v2 License. 

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  

You should have received a copy of the Apache v2 License 
along with this program.  If not, see http://www.apache.org/licenses/LICENSE-2.0.html
*/
var embedvideo = (function(){  //closure

		//return the constructor
		return function(url,autoplay)
		{
			if (typeof url === "undefined" || url === null) { 
		  	 	throw new Error('Embedvideo URL is not valid');
			}

			if (typeof autoplay === "undefined" || autoplay === null) { 
		    	autoplay = true;
			}

			//private attribute
			var aparser,embedcode,platform,videoID;

			//associative array for  find  platform name by domaine name (domaine : platform)
			var platformbydomaine = {
						'youtube'		: 'youtube',
						'youtu'			: 'youtube',
						'vimeo'			: 'vimeo',
						'dailymotion'	: 'dailymotion',
						'dai'			: 'dailymotion'
						// ...  if need add here other domaine/platform
						}

			var aparser = document.createElement('a'); ///remplacer cette partie avec le $.attr('href') du lien video
			aparser.href = url.replace('www.','');
			var domaine = aparser.hostname.split(".")[0];
			platform = platformbydomaine[domaine];
			

			switch(platform)
			{

					case 'youtube':

						var args = aparser.search.split('&');
						for(var i in args)
						{
							if(args[i].indexOf('v=')!= -1)
							{
								
								videoID = args[i].replace('?v=','');
								videoID = videoID.replace('v=','');

							}

							if(args[i].indexOf('list=')!= -1)
							{
								
								video_id = args[i].replace('?list=','');
								video_id = video_id.replace('list=','');
							}
						}
						
						if(typeof videoID === "undefined" && videoID!='')videoID=aparser.pathname.replace('/','').replace('v/','').replace('embed/','');
						if(args[i].indexOf('list=')!= -1)
						{
							embedcode ='<iframe width="100%" height="100%" src="//www.youtube.com/embed/videoseries?list='+video_id+'&autoplay='+play+'&rel=0&theme=light&showinfo=0&autohide=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						}else{
							embedcode ='<iframe width="100%" height="100%" src="//www.youtube.com/embed/'+videoID+'?autoplay='+autoplay+'&rel=0&theme=light&showinfo=0&autohide=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
						}

					break;


					case 'vimeo':

						videoID=aparser.pathname.replace('/','');
						if(videoID.indexOf('/') != -1) //channel format
						{
							var str = videoID.split('/');
							videoID = str[(str.length-1)];
						}
						embedcode ='<iframe src="//player.vimeo.com/video/'+videoID+'?autoplay='+autoplay+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
					break;


					case 'dailymotion':
						var patharr=aparser.pathname.split('/');
						console.log(patharr);
						console.log(patharr.length);
						if(patharr.length>2)
						{
							videoID = patharr[patharr.length-1].split('_')[0];//full link
						}else{
							videoID = patharr[1];//permlink format 
						}
						embedcode ='<iframe  src="http://www.dailymotion.com/embed/video/'+videoID+'?autoPlay='+autoplay+'"  width="100%" height="100%"  allowfullscreen webkitallowfullscreen mozallowfullscreen frameborder="0"></iframe>';
				
					break;

					default:

						embedcode = "<!-- embedvideo : platform not found for "+url+" - "+domaine+"! actually only youtube,vimeo and dailymotion are supported-->";

					break;

			}//end switch

			return embedcode;
			
			
		}//end constructor
	

})();





