
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'wu_Log_Dialogs_Component';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var Button_Login = {};	// @button
	var Button_Cancel = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	Button_Login.click = function Button_Login_click (event)// @startlock
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
			var id_login_Password = getHtmlId('login_Password_ID');
			var val_login_Password = $$(id_login_Password).getValue();
			if(!val_login_Password){
				alert('No password entered');
				ok_Flag = false;
				$$(id_login_Password).focus();
			};
		}; // ok_Flag
		if(ok_Flag) {
			sources.webuser_current_user.Login_Name_PW({onSuccess:function(event)
		      {        
				if(event.result) { // webuser logged in
					var result_Entity = event.result;
					webuser_Display_Log_In_Out (true,result_Entity); // update display for logged in and not logged in Webuser
					$$(id_login_Name).setValue('');
					$$(id_login_Password).setValue('');
					$$(id).removeComponent(); // close modal dialog
				}
				else {
					alert('No webuser with with entered name/email and password found.');
					$$(id_login_Name).focus();
				};
    		  } }, val_login_Name, val_login_Password);
		}; // ok_Flag
	};// @lock

	Button_Cancel.click = function Button_Cancel_click (event)// @startlock
	{// @endlock
		var id_login_Name = getHtmlId('login_Name_ID');
		$$(id_login_Name).setValue('');
		var id_login_Password = getHtmlId('login_Password_ID');
		$$(id_login_Password).setValue('');
		$$(id).removeComponent(); // close modal dialog
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_Button_Login", "click", Button_Login.click, "WAF");
	WAF.addListener(this.id + "_Button_Cancel", "click", Button_Cancel.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
