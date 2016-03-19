(function(){
	var header = function(){
		var init = function(){

			return{
				closeModals:closeModals
			}
		};

		var closeModals = function(){
			$(".reveal-modal").foundation('reveal', 'close');
		}

		return {
			init: init
		}
	};

	(function(){
		FoundationHelper = header().init();
	})();
})();