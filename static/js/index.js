(function(){
	var header = function(){
		var init = function(){
			$(".close-modal").on('click', modalClose);

			$("#spring2016ClassesModal").foundation('reveal', 'open');
		};

		var modalClose = function(){
			$("#spring2016ClassesModal").foundation('reveal', 'close');
		}

		return {
			init: init
		};
	}();

	$(function() {
		header.init();
	});

})();