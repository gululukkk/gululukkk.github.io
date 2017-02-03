	var $class_List_a = $(".class-list > a");

		$class_List_a.hover(function() {
			$(this).next().css({"display":"block",});
		})

	$class_List_a.click(function() {
		var $sib_nav = $(this).next(),
			other_nav = $(this).siblings("nav"),
			a_length = $sib_nav.children("a").length,
			child_List_Height = a_length * 33,
			addHeight = 0;
		for (var i = other_nav.length - 1; i >= 0;i--) {
			addHeight += other_nav.eq(i).height();
		}

		function changeThisUlHeight() {
			$sib_nav.stop(true)
				.animate({"height":child_List_Height - 33,},200)
				.animate({"height":child_List_Height - 1,},41)
				.animate({"height":child_List_Height - 51,},"slow")
				.animate({"height":child_List_Height - 33,},"fast");
			}

			if ($sib_nav.height() != 0){
				$sib_nav.stop(true)
					.animate({"height":"0"},"slow");
			} else if (addHeight == 0) {
				changeThisUlHeight();
			} else {
				other_nav.stop(true)
					.animate({"height":"0"},"slow",changeThisUlHeight);
				}				
			})
