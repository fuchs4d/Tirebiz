
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuItem_Locations = {};	// @menuItem
	var menuItem_About = {};	// @menuItem
	var menuItem_InqTires_Arr = {};	// @menuItem
	var webuser_current_userEvent = {};	// @dataSource
	var menuItem_Home = {};	// @menuItem
	var wu_Register = {};	// @button
	var wu_Logout = {};	// @button
	var documentEvent = {};	// @document
	var wu_Login = {};	// @button
// @endregion// @endlock
	app_Name = 'Tirebiz';     // global application name
	sources.app_Name.sync();  // update datasource
	
	webuser_current_ID_Loaded = -1; // currently loaded Webuser ID
	button_wu_Login_Disabled = false; // Status Webuser Login Button - workaround bug 2xdisabled
	button_wu_Logout_Disabled = false; // Status Webuser Logout Button - workaround bug 2xdisabled
	button_wu_Register_Disabled = false; // Status Webuser Register Button - workaround bug 2xdisabled
	
	Quality_Default_Entity = null; // default quality entity
	
	index_comp_Main_Restore(); // load/restore main component
	
	if (sources.component_Main_tireInquiry) {
		sources.component_Main_tireInquiry.declareDependencies('Quality');
	};


// eventHandlers// @lock

	menuItem_Locations.click = function menuItem_Locations_click (event)// @startlock
	{// @endlock
		index_comp_Main_Load ('Locations'); // load component Home with text 'Specials"
	};// @lock

	menuItem_About.click = function menuItem_About_click (event)// @startlock
	{// @endlock
		index_comp_Main_Load ('Home','About'); // load component Home with text 'About'
	};// @lock

	menuItem_InqTires_Arr.click = function menuItem_InqTires_Arr_click (event)// @startlock
	{// @endlock
		index_comp_Main_Load ('TireInq_Arr'); // load main component 'Tire'
		//location.reload(); // reload page - workaround wakanda component bug
	};// @lock

	webuser_current_userEvent.onCurrentElementChange = function webuser_current_userEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if(webuser_current_ID_Loaded != sources.webuser_current_user.ID) {
			// In case of page reload: try to reload saved Webuser in Server sessionStorage
			sources.webuser_current_user.Login_Session_Restore_Webuser({onSuccess:function(event)
		     {  
		      	if(event.result) { // Webuser restored
		      		webuser_Display_Log_In_Out (true,event.result); // update display for logged in and not logged in Webuser
		      	}
		      	else { // No Webuser restored
		      		webuser_Display_Log_In_Out (false); // update display for logged in and not logged in Webuser
		      	};
		      	
		      	// force reload of relations
		      	if (sources.component_Main_tireInquiry) { // Webcomponent TireInquiry loaded
		      		sources.component_Main_tireInquiry.newEntity(); // force reload of relations		      	
		      	}; // Webcomponent TireInquiry loaded
    		}, onError: function() {
		      	webuser_Display_Log_In_Out (false); // update display for logged in and not logged in Webuser
    		}});
		}; // end if
	};// @lock

	menuItem_Home.click = function menuItem_Home_click (event)// @startlock
	{// @endlock
		index_comp_Main_Load ('Home','Welcome'); // load main component 'Home' with Welcome text
	};// @lock

	wu_Register.click = function wu_Register_click (event)// @startlock
	{// @endlock
		// Webuser Register modal Dialog
		$$('wu_Log_Dialogs_Component').loadComponent('WU_Register_Dialog.waComponent');
	};// @lock

	wu_Logout.click = function wu_Logout_click (event)// @startlock
	{// @endlock
		// Logout Webuser
		webuser_Logout();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	wu_Login.click = function wu_Login_click (event)// @startlock
	{// @endlock
		// Webuser Login modal Dialog
		$$('wu_Log_Dialogs_Component').loadComponent('wu_Log_Dialogs_Component.waComponent');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuItem_Locations", "click", menuItem_Locations.click, "WAF");
	WAF.addListener("menuItem_About", "click", menuItem_About.click, "WAF");
	WAF.addListener("menuItem_InqTires_Arr", "click", menuItem_InqTires_Arr.click, "WAF");
	WAF.addListener("webuser_current_user", "onCurrentElementChange", webuser_current_userEvent.onCurrentElementChange, "WAF");
	WAF.addListener("menuItem_Home", "click", menuItem_Home.click, "WAF");
	WAF.addListener("wu_Register", "click", wu_Register.click, "WAF");
	WAF.addListener("wu_Logout", "click", wu_Logout.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("wu_Login", "click", wu_Login.click, "WAF");
// @endregion
};// @endlock
