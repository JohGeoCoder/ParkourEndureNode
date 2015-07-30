(function() {
	var header = function(){
		var init = function(){
			$('.off-canvas-list li').on('click.toggleCanvas', function(){
				$(".exit-off-canvas").click();
			});

			$('.link').on('click', function(){
				$('.top-bar-section li').removeClass('active');
			});
		};
		
		return{
			init:init
		};
	}();
	
	$(function() {
		header.init();
	});
	
})();