(function() {
	var header = function(){
		var init = function(){
			$('.off-canvas-list li').on('click.toggleCanvas', function(){
				$(".exit-off-canvas").click();
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