index = function(){
	var _init = function (){
		// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
		$('.modal-trigger').leanModal();		
	}
	return {
		init:_init
	}
}();
