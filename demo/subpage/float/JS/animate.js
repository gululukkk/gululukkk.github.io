$(".mainSmall-box").parent("div").hover(function() {
	$(this).children(".mainSmall-box").animate({"margin-top":"14px",},"fast");
},function() {
	$(this).children(".mainSmall-box").css({"margin-top":"61px",});
});

$(".mainSmall-box").parents(".mainTall").hover(function() {
	$(this).find(".mainSmall-box").animate({"margin-top":"14px",},"fast");
},function() {
	$(this).find(".mainSmall-box").css({"margin-top":"61px",});
});