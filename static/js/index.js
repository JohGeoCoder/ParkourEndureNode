(function(){
	var header = function(){
		var init = function(){
			$('.close-modal').on('click', modalClose);

			$("#spring2016ClassesModal").foundation('reveal', 'open');

			//startAnalytics();
		};

		var modalClose = function(){
			FoundationHelper.closeModals();
		};

		var startAnalytics = function(){
		    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		    ga('create', 'UA-68185666-1', 'auto');
		    ga('send', 'pageview');
		};

		return {
			init: init
		};
	}();

	$(function() {
		header.init();
	});

})();