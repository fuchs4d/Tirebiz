// Webuser functions generic to all projects

// update display for logged in and not logged in Webuser
var webuser_Display_Log_In_Out = function (logged_In_Flag, logged_In_Webuser_Entity){
	// logged_In_Flag: true = Webuser logged in, false = not logged in
	if(logged_In_Flag) {
		sources.webuser_current_user.setCurrentEntity(logged_In_Webuser_Entity);
		// sources.webuser_current_user.serverRefresh(); // Update display
		if (!sources.webuser_current_user.Temporary_User) { // not a temporary user	
			if (!button_wu_Login_Disabled) { // Status Webuser Logout Button not disabled - workaround bug 2xdisabled
				$$('wu_Login').disable(); // disable login button
				button_wu_Login_Disabled = true; // Status Webuser Login Button - workaround bug 2xdisabled
			};				
			$$('wu_Logout').enable(); // enable logout button
			button_wu_Logout_Disabled = false; // Status Webuser Logout Button - workaround bug 2xdisabled
			if (!button_wu_Register_Disabled) { // Status Webuser Register Button not disabled - workaround bug 2xdisabled
				$$('wu_Register').disable(); // disable register button
				button_wu_Register_Disabled = true; // Status Webuser Register Button - workaround bug 2xdisabled
			};
		}
		else { // temporary user
			$$('wu_Login').enable(); // enable login button
			button_wu_Login_Disabled = false; // Status Webuser Login Button - workaround bug 2xdisabled
			if (!button_wu_Logout_Disabled) { // Status Webuser Logout Button not disabled - workaround bug 2xdisabled			
				$$('wu_Logout').disable(); // disable logout button
				button_wu_Logout_Disabled = true; // Status Webuser Logout Button - workaround bug 2xdisabled
			};
			$$('wu_Register').enable(); // enable register button
			button_wu_Register_Disabled = false; // Status Webuser Register Button - workaround bug 2xdisabled
		};
	}
	else {
		sources.webuser_current_user.Create_Temp_Webuser({onSuccess:function(event) {
			sources.webuser_current_user.setCurrentEntity(event.result);
			// sources.webuser_current_user.serverRefresh(); // Update display
			$$('wu_Login').enable(); // enable login button
			button_wu_Login_Disabled = false; // Status Webuser Login Button - workaround bug 2xdisabled
			if (!button_wu_Logout_Disabled) { // Status Webuser Logout Button not disabled - workaround bug 2xdisabled			
				$$('wu_Logout').disable(); // disable logout button
				button_wu_Logout_Disabled = true; // Status Webuser Logout Button - workaround bug 2xdisabled
			};
			$$('wu_Register').enable(); // enable register button
			button_wu_Register_Disabled = false; // Status Webuser Register Button - workaround bug 2xdisabled
			
    		}, onError: function() {
    			alert('OnError');
    		}
   		 });
	}; // end if(logged_In_Flag)
	webuser_current_ID_Loaded = sources.webuser_current_user.ID // currently loaded Webuser ID 
};

// Logout Webuser
var webuser_Logout = function () {
	sources.webuser_current_user.Logout({onSuccess:function(event)
		{  
		webuser_Display_Log_In_Out(false); // Update display
    	} });
};
	