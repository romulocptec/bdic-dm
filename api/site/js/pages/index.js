var _valida_form = function (form){
	$(form+" .validate" ).each(function( index ) {
		if($(this).val() == ""){
			Materialize.toast('Os campos devem estar preenchidos!', 4000);
			return false;
		}
		if($(this).attr('class').search("invalid") != -1 && $(this).attr('type') == "email"){
			Materialize.toast('O email informado não é valido!', 4000);
			return false;
		}			
	});
}	
index = function(){
	var _init = function (){
		//carrega conteudo do modal do login
		 $.ajax({
            type: 'GET',
			async: false,
            url: 'modal-login.html',
            success: function (data) {
				$("#modal-user-login").html(data);
            }
        });
		//identifica div como modal
		$('.modal-trigger').leanModal();		
	}
	var _api_user_login = function (){
		_valida_form('#formLogin');
		
		var requestData = JSON.stringify($('#formLogin').serializeObject());
        var baseUrl = location.protocol + "//" + location.host;
		
		$.ajax({
			url: '/api/user/login',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: requestData
		}).done(function(data, textStatus, jqXHR) {
			if(data.userType == "admin")
                location.href = baseUrl + "/indexadmin.html";
			else
                location.href = baseUrl + "/indexclient.html";
		}).fail(function(jqXHR, textStatus, errorThrown) {
			$('#modal-user-login-fail').openModal();
		});
	}
	var _api_user_resetpassword = function(form){

		var requestData = JSON.stringify($('#formResetPWS').serializeObject());

		$.ajax({
			url: '/api/user/resetpassword',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			data: requestData
		}).done(function(data, textStatus, jqXHR) {
            
            console.log(data.status);
            
            if(data.status == "error"){
                console.log(data.error);
                console.log(data.message);
                $('#modal-user-resetpassword-fail').openModal();
            } else {
                $('#modal-user-resetpassword-success').openModal();
            }
		}).fail(function(jqXHR, textStatus, errorThrown) {
			$('#modal-user-resetpassword-fail').openModal();
		});
	}
	var _api_user_changepassword = function (form){
		alert("Tela sem implementação");
	}
	return {
		init:_init,
		api_user_login: _api_user_login,
		api_user_resetpassword: _api_user_resetpassword,
		api_user_changepassword: _api_user_changepassword
	}
}();