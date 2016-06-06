(function(){
	var header = function(){
		var init = function(){
			$('.close-modal').on('click', modalClose);
			//$("#ImportantMessageModal").foundation('reveal', 'open');
		};

		var modalClose = function(){
			FoundationHelper.closeModals();
		};

		return {
			init: init
		};
	}();

	$(function() {
		header.init();
	});

})();