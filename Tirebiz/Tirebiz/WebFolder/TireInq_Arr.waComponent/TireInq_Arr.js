
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {


	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'TireInq_Arr';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
	comp_Main_Initialized = true; // Initialized Flag for this component
	
	arrRel_Inq_Tire_Current_Element_Changed = false; // Flag event On Current Element Change just occured
	tireInq_Webuser_ID_Loaded = -1; // Webuser ID of currently loaded TireInquiries
	arrQuality_Loaded = false; // Flag Quality arrays loaded
	qualityArrays_Choice_Load(); // load Quality choice arrays
	arrQuality_Default_arrIndex = -1 // Arrayindex default Quality in Quality arrays
	rel_Inquiry_Tire_ID_Loaded = -1; // Relations-ID Inquire-Tire loaded Relations
	rel_Inquiry_Tire_is_loading = false; // Flag loading in progress Relations-Inquiry
	rel_Quality_Group_Quality_ID_Loaded = -1; // Relations-ID Inquire-Tire loaded Relations
	rel_Quality_Group_is_loading = false; // Flag loading in progress Relations-Inquiry
	webuser_Load_Finished_Flag = false; // Flag load finished for grid TiteInquiries
				
	$('#component_Main_text_Choosen_Sizes_List').attr('readonly','readonly');
					
	// @region namespaceDeclaration// @startlock
	var checkbox_Webuser_include_OR = {};	// @checkbox
	var checkbox_Webuser_include_C = {};	// @checkbox
	var button_rel_Inquiry_Tire_Drop_Text = {};	// @button
	var button_rel_Inquiry_Tire_Choose_Text = {};	// @button
	var arrRel_Inq_TireEvent = {};	// @dataSource
	var button_rel_Inquiry_Tire_Drop_All = {};	// @button
	var button_rel_Inquiry_Tire_Choose_All = {};	// @button
	var button_rel_Inquiry_Tire_Drop_Selection = {};	// @button
	var button_rel_Inquiry_Tire_Choose_Selection = {};	// @button
	var button_Remove_TireInq = {};	// @button
	var button_New_TireInq = {};	// @button
	var webuser_current_userEvent = {};	// @dataSource
	var arrTireInqEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	checkbox_Webuser_include_OR.change = function checkbox_Webuser_include_OR_change (event)// @startlock
	{// @endlock
		sources.webuser_current_user.save();
	};// @lock

	checkbox_Webuser_include_C.change = function checkbox_Webuser_include_C_change (event)// @startlock
	{// @endlock
		sources.webuser_current_user.save();
	};// @lock

	button_rel_Inquiry_Tire_Drop_Text.click = function button_rel_Inquiry_Tire_Drop_Text_click (event)// @startlock
	{// @endlock
		rel_Inquiry_Choose_by_Text(false); // Drop tire sizes by text in datasource arrTireInq.Choosen_Displaystring
	};// @lock

	button_rel_Inquiry_Tire_Choose_Text.click = function button_rel_Inquiry_Tire_Choose_Text_click (event)// @startlock
	{// @endlock
		rel_Inquiry_Choose_by_Text(true); // Choose tire sizes by text in datasource arrTireInq.Choosen_Displaystring
	};// @lock

	arrRel_Inq_TireEvent.onCurrentElementChange = function arrRel_Inq_TireEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
 		arrRel_Inq_Tire_Current_Element_Changed = true; // Flag event On Current Element Change just occured
	};// @lock

	arrRel_Inq_TireEvent.onPercentage_LimitAttributeChange = function arrRel_Inq_TireEvent_onPercentage_LimitAttributeChange (event)// @startlock
	{// @endlock
		if (arrRel_Inq_Tire_Current_Element_Changed) { // just after event On Current Element Change
			arrRel_Inq_Tire_Current_Element_Changed = false;
		} // end if just after event On Current Element Change
		else { // not just after event On Current Element Change
			console.log ('before call rel_Inquiry_Tire_Save');
			var arrIdx = sources.component_Main_arrRel_Inq_Tire.getPosition();
			component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Calculation = component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Limit;
			if (component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Calculation < 0) component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Calculation = 0
			else if (component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Calculation > component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Frequency) component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Calculation = component_Main_arrRel_Inq_Tire[arrIdx].Percentage_Frequency;
			rel_Inquiry_Tire_Displ_Arr_Update(); // Update calculated values		
			rel_Inquiry_Tire_Save(); // save on server
		}; // end else not just after event On Current Element Change
	};// @lock

	button_rel_Inquiry_Tire_Drop_All.click = function button_rel_Inquiry_Tire_Drop_All_click (event)// @startlock
	{// @endlock
		rel_Inquiry_Tire_Choose ('All Rows',false);	
	};// @lock

	button_rel_Inquiry_Tire_Choose_All.click = function button_rel_Inquiry_Tire_Choose_All_click (event)// @startlock
	{// @endlock
		rel_Inquiry_Tire_Choose ('All Rows',true);	
	};// @lock

	button_rel_Inquiry_Tire_Drop_Selection.click = function button_rel_Inquiry_Tire_Drop_Selection_click (event)// @startlock
	{// @endlock
		rel_Inquiry_Tire_Choose ('Selected Rows',false);
	};// @lock

	button_rel_Inquiry_Tire_Choose_Selection.click = function button_rel_Inquiry_Tire_Choose_Selection_click (event)// @startlock
	{// @endlock
		rel_Inquiry_Tire_Choose ('Selected Rows',true);	
	};// @lock

	button_Remove_TireInq.click = function button_Remove_TireInq_click (event)// @startlock
	{// @endlock
		// var index_to_Remove = sources.component_Main_arrTireInq.getSelection(); wakanda grid version
		var index_to_Remove = $('#component_Main_jqxGrid_TireInq').jqxGrid('getselectedrowindex'); // jqx version
		if ((index_to_Remove >=0) && (index_to_Remove < component_Main_arrTireInq.length)) { // Arrayindex to remove valid
			var remove_OK = confirm ('Really delete inquiry ' + component_Main_arrTireInq[index_to_Remove].Name + '?');
			if (remove_OK) {
				tireInq_Element_Remove(index_to_Remove);
			}; // end if remove_OK
		}; // end if Arrayindex to remove valid
	};// @lock

	button_New_TireInq.click = function button_New_TireInq_click (event)// @startlock
	{// @endlock
		tireInq_Element_Add();
	};// @lock

	webuser_current_userEvent.onCurrentElementChange = function webuser_current_userEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if (tireInq_Webuser_ID_Loaded != webuser_current_ID_Loaded) {  // TireInquiries not loaded for current Webuser
			tireInq_Webuser_Load (webuser_current_ID_Loaded); // load TireInquiries for current Webuser
		}; // end if TireInquiries not loaded for current Webuser
	};// @lock

	arrTireInqEvent.onBeforeCurrentElementChange = function arrTireInqEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
		console.log ('arrTireInqEvent.onBeforeCurrentElementChange');
	};// @lock

	arrTireInqEvent.onTire_QuantityAttributeChange = function arrTireInqEvent_onTire_QuantityAttributeChange (event)// @startlock
	{// @endlock
		if (sources.component_Main_arrTireInq.ID != null && webuser_Load_Finished_Flag && !rel_Inquiry_Tire_is_loading && comp_Main_Initialized) { // initialized and current element not changing
			console.log('Quantity changed. sources.component_Main_arrTireInq.ID: ' + sources.component_Main_arrTireInq.ID);
			component_Main_arrTireInq[sources.component_Main_arrTireInq.getPosition()].Modified_by_User = true;
			tireInq_Webuser_Save(); // save on server
		}; // end if initialized and current element not changing
	};// @lock

	arrTireInqEvent.onNameAttributeChange = function arrTireInqEvent_onNameAttributeChange (event)// @startlock
	{// @endlock
		if (sources.component_Main_arrTireInq.ID != null && webuser_Load_Finished_Flag && !rel_Inquiry_Tire_is_loading && comp_Main_Initialized) { // initialized and current element not changing
			console.log('Name changed. sources.component_Main_arrTireInq.ID: ' + sources.component_Main_arrTireInq.ID);
			component_Main_arrTireInq[sources.component_Main_arrTireInq.getPosition()].Modified_by_User = true;
			tireInq_Webuser_Save(); // save on server
		}; // end if initialized and current element not changing
	};// @lock

	arrTireInqEvent.onCurrentElementChange = function arrTireInqEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('arrTireInqEvent.onCurrentElementChange' + '. sources.component_Main_arrTireInq.ID: ' + sources.component_Main_arrTireInq.ID +', rel_Inquiry_Tire_ID_Loaded: ' +rel_Inquiry_Tire_ID_Loaded);
		if (sources.component_Main_arrTireInq.ID != null && sources.component_Main_arrTireInq.ID != rel_Inquiry_Tire_ID_Loaded && !rel_Inquiry_Tire_is_loading) { // Load relations TireInuiry-Tires for current Tireinquiry
			rel_Inquiry_Tire_Load (sources.component_Main_arrTireInq.ID);
		}; // end if Load relations TireInuiry-Tires for current Tireinquiry
		if (sources.component_Main_arrTireInq.Quality.ID != null && sources.component_Main_arrTireInq.Quality.ID != rel_Quality_Group_Quality_ID_Loaded && !rel_Quality_Group_is_loading) { // Load relations TireGroup-Quality for current Tireinquiry
			rel_Quality_Group_Load (sources.component_Main_arrTireInq.Quality.ID);
		}; // end if Load relations TireGroup-Quality for current Tireinquiry
	};// @lock

	WAF.addListener("webuser_current_user", "onCurrentElementChange", webuser_current_userEvent.onCurrentElementChange, "WAF");

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_checkbox_Webuser_include_OR", "change", checkbox_Webuser_include_OR.change, "WAF");
	WAF.addListener(this.id + "_checkbox_Webuser_include_C", "change", checkbox_Webuser_include_C.change, "WAF");
	WAF.addListener(this.id + "_arrTireInq", "onBeforeCurrentElementChange", arrTireInqEvent.onBeforeCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Drop_Text", "click", button_rel_Inquiry_Tire_Drop_Text.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Choose_Text", "click", button_rel_Inquiry_Tire_Choose_Text.click, "WAF");
	WAF.addListener(this.id + "_arrRel_Inq_Tire", "onCurrentElementChange", arrRel_Inq_TireEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_arrRel_Inq_Tire", "onPercentage_LimitAttributeChange", arrRel_Inq_TireEvent.onPercentage_LimitAttributeChange, "WAF", "Percentage_Limit");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Drop_All", "click", button_rel_Inquiry_Tire_Drop_All.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Choose_All", "click", button_rel_Inquiry_Tire_Choose_All.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Drop_Selection", "click", button_rel_Inquiry_Tire_Drop_Selection.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Choose_Selection", "click", button_rel_Inquiry_Tire_Choose_Selection.click, "WAF");
	WAF.addListener(this.id + "_button_Remove_TireInq", "click", button_Remove_TireInq.click, "WAF");
	WAF.addListener(this.id + "_button_New_TireInq", "click", button_New_TireInq.click, "WAF");
	WAF.addListener(this.id + "_arrTireInq", "onTire_QuantityAttributeChange", arrTireInqEvent.onTire_QuantityAttributeChange, "WAF", "Tire_Quantity");
	WAF.addListener(this.id + "_arrTireInq", "onNameAttributeChange", arrTireInqEvent.onNameAttributeChange, "WAF", "Name");
	WAF.addListener(this.id + "_webuser_current_user", "onCurrentElementChange", webuser_current_userEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_arrTireInq", "onCurrentElementChange", arrTireInqEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
