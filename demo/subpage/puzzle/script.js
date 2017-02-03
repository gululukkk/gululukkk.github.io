	var clip_div = document.getElementsByClassName("clip"),
		j = -1;

	$("div.clip").each(function() {
		var i = $(this).index();
			o = i + 1,
		j++;
		if ( j > 3) { j = 0;}
		if (o / 4 > 4) {
			clip_div[i].style.backgroundPosition = (-213 * j)+"px"+" "+"-428px";
		} else if (o / 4 > 3) {
			clip_div[i].style.backgroundPosition = (-213 * j)+"px"+" "+"-321px";
		} else if (o / 4 > 2) {
			clip_div[i].style.backgroundPosition = (-213 * j)+"px"+" "+"-214px";
		} else if (o / 4 > 1) {
			clip_div[i].style.backgroundPosition = (-213 * j)+"px"+" "+"-107px";
		} else if (o / 4 >= 0) {
			clip_div[i].style.backgroundPosition = (-213 * j)+"px"+" "+"0";
		}
	})


	var img_box = document.getElementsByClassName("img-box")[0],
		btn = document.getElementsByClassName("btn")[0];

		btn.onclick = function() {
			for ( var i = clip_div.length - 1;i >= 0; i--) {
				var index = Math.ceil(Math.random() * 20);
				img_box.insertBefore(clip_div[i],clip_div[index]);
			}
		}
