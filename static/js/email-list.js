(function(){
	var header = function(){
		var init = function(){
			$('#email-list .close-modal').on('click', closeModals);
		};

		var closeModals = function(){
			FoundationHelper.closeModals();
		};

		return{
			init: init
		};
	};

	$(function(){
		header().init();
	});

})();