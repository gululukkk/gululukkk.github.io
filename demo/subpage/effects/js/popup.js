function AjaxPopup() {
	$(".open").click(function () {
		$(".login").slideDown(300);
		$(".shade").fadeIn(500);
		return false;
	});

	$(".close").click(function () {
		$(".login").slideUp(300);
		$(".shade").fadeOut(500);
		return false;
	});

	var $name_Prompt = $(".info > .prompt").eq(0),
		$pwd_Prompt = $(".info > .prompt").eq(1);

	$("#name").keyup(function () {
		var name = $(this).val();
		REGphone = /^1\d{10}$/,
			REGmail = /\w+@\w+.com/
		REGname = /^[a-zA-Z]{4,8}$/;

		function AjaxRequest(name) {
			var XHR = new XMLHttpRequest(),
				XHR_url = "ajax.php?q=" + name;

			function setSpanText() {

				if (XHR.readyState == 4 && XHR.status == 200) {
					var filter_Text = XHR.responseText;

					$("#name-filter").text(filter_Text);
				}

			}

			XHR.onreadystatechange = setSpanText;
			XHR.open("GET", XHR_url, true);
			XHR.send(null);
		}

		if (name == "") {
			$name_Prompt.css({
					"color": "#000",
				})
				.text("请输入可用的用户名");
			$("#name-filter").text("");
			return false;
		}

		AjaxRequest(name);

		if (!REGphone.test(name) && !REGmail.test(name) && !REGname.test(name)) {
			$name_Prompt.css({
				"color": "#f00",
			}).text("格式不正确!")
		} else {
			$name_Prompt.css({
				"color": "#008000",
			}).text("格式正确!");
		}

	});

	$("#password").keyup(function () {
		var pwd_Length = $(this).val().length;
		if (pwd_Length < 8 && pwd_Length != 0) {
			$pwd_Prompt.css({
					"color": "#f00",
				})
				.text("密码长度太短了(至少要8个以上)");
		} else if (pwd_Length == 0) {
			$pwd_Prompt.css({
					"color": "#000",
				})
				.text("请输入正确的密码");
		} else {
			$pwd_Prompt.text("");
		}
	});

	$("#login").click(function () {

		if ($name_Prompt.text() == "格式正确" && $pwd_Prompt.text() == "") {

		} else {
			confirm("请正确填写用户名和密码!");
		}
	});
}

AjaxPopup();