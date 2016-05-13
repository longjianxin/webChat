$(function(){
	/*****************常规操作******************/
	$(".btn-min").on("click",function(e){				
		if ($(".online-box").hasClass("layout-bottom")) { 
			$(".online-box").removeClass("layout-bottom");
		}else{
			$(".online-box").removeClass("layout-max"); 
			
			$(".online-box,.userlist,.message").removeAttr("style");
			
			$(".online-box").addClass("layout-bottom");
		}
	});

	$(".btn-max").on("click",function(e){ 
		if ($(".online-box").hasClass("layout-max")) {
			$(".online-box").removeClass("layout-max");


			$(".online-box,.userlist,.message").removeAttr("style");

		}else{
			$(".online-box").removeClass("layout-bottom");
			$(".online-box").addClass("layout-max");
			$(".online-box").css({
				width:'100%',
				height:$(document).height(),
			});

			$(".userlist").css({
				height:$(document).height()-50,
			});


			$(".message").css({
				height:$(document).height()-250,
			});
		} 
	});

	$(".btn-close").on("click",function(e){
		
	});
});