
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'WU_Register_Dialog';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var Button_Register_Register = {};	// @button
	var Button_WU_Register_Cancel = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	Button_Register_Register.click = function Button_Register_Register_click (event)// @startlock
	{// @endlock
		var ok_Flag = true;
		var id_login_Name = getHtmlId('login_Name_ID');
		var val_login_Name = $$(id_login_Name).getValue();
		if(!val_login_Name){
			alert('No name entered');
			ok_Flag = false;
			$$(id_login_Name).focus();
		};
		if(ok_Flag) {
			var id_login_Email = getHtmlId('login_Email_ID');
			var val_login_Email = $$(id_login_Email).getValue();
			if(!val_login_Email){
				alert('No email entered');
				ok_Flag = false;
				$$(id_login_Email).focus();
			};
		}; // ok_Flag
		if(ok_Flag) {
			var id_login_Password = getHtmlId('login_Password_ID');
			var val_login_Password = $$(id_login_Password).getValue();
			if(!val_login_Password){
				alert('No Password entered.');
				ok_Flag = false;
				$$(id_login_Password).focus();
			};
		}; // ok_Flag
		if(ok_Flag) {
			sources.webuser_current_user.Register_New_Webuser({onSuccess:function(event)
		      {        
				if(!event.result.error_text) { // webuser logged in
					var result_Entity = event.result;
					webuser_Display_Log_In_Out (true,result_Entity); // update display for logged in and not logged in Webuser
					$$(id_login_Name).setValue('');
					$$(id_login_Password).setValue('');
					$$(id_login_Email).setValue('');
					$$(id).removeComponent(); // close modal dialog
				}
				else {
					alert(event.result.error_text);
					$$(id_login_Name).focus();
				};
    		  }, onError: function() {
    		  		alert('OnError');
    		  	}
    		 }, val_login_Name, val_login_Email, val_login_Password);
		}; // ok_Flag
	};// @lock

	Button_WU_Register_Cancel.click = function Button_WU_Register_Cancel_click (event)// @startlock
	{// @endlock
		var id_login_Name = getHtmlId('login_Name_ID');
		$$(id_login_Name).setValue('');
		var id_login_Password = getHtmlId('login_Password_ID');
		$$(id_login_Password).setValue('');
		var id_login_Email = getHtmlId('login_Email_ID');
		$$(id_login_Email).setValue('');
		$$(id).removeComponent(); // close modal dialog
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_Button_Register_Register", "click", Button_Register_Register.click, "WAF");
	WAF.addListener(this.id + "_Button_WU_Register_Cancel", "click", Button_WU_Register_Cancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
