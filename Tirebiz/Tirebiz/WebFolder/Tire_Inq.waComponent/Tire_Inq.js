
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Tire_Inq';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	tireInq_Webuser_ID_Loaded = -1; // Webuser ID of currently loaded TireInquiries
	rel_Inquiry_Tire_ID_Loaded = -1; // Relations-ID Inquire-Tire loaded Relations
		
	sources.component_Main_tireInquiry.declareDependencies('Quality');
	sources.component_Main_rel_Inquiry_Tire.declareDependencies('Tire');
	
	ds.Quality.find('Default_Quality == :1', {
		onSuccess: function (event) {
			Quality_Default_Entity = event.entity;
		}, // end onSuccess:
		onError: function (event) {
			alert('onError');
		}, // end onEror:
		params: [true]
	});
	
	// @region namespaceDeclaration// @startlock
	var rel_Inquiry_TireEvent = {};	// @dataSource
	var button_rel_Inquiry_Tire_Drop_All = {};	// @button
	var button_rel_Inquiry_Tire_Choose_All = {};	// @button
	var button_rel_Inquiry_Tire_Drop_Selection = {};	// @button
	var button_rel_Inquiry_Tire_Choose_Selection = {};	// @button
	var button_Remove_TireInq = {};	// @button
	var button_New_TireInq = {};	// @button
	var quality_combobox = {};	// @combobox
	var tireInquiryEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	rel_Inquiry_TireEvent.onPercentage_LimitAttributeChange = function rel_Inquiry_TireEvent_onPercentage_LimitAttributeChange (event)// @startlock
	{// @endlock
		rel_Inquiry_Tire_Percentage_Changed();
	};// @lock

	rel_Inquiry_TireEvent.onSelectedAttributeChange = function rel_Inquiry_TireEvent_onSelectedAttributeChange (event)// @startlock
	{// @endlock
		rel_Inquiry_Tire_Percentage_Changed();
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
		var remove_OK = confirm ('Really delete inquiry ' + sources.component_Main_tireInquiry.Name + '?');
		if (remove_OK) {
			sources.component_Main_tireInquiry.removeCurrent();
		}; // end if remove_OK
	};// @lock

	button_New_TireInq.click = function button_New_TireInq_click (event)// @startlock
	{// @endlock
		tireInquiry_Element_Add(); // add element sources.component_Main_tireInquiry
		sources.component_Main_tireInquiry.Modified_by_User = true;
		sources.component_Main_tireInquiry.save();
	};// @lock

	quality_combobox.change = function quality_combobox_change (event)// @startlock
	{// @endlock
		if (sources.component_Main_tireInquiry.getPosition() != -1) { // tireInquiry selected		
			var selected_Key_ID = $$('component_Main_quality_combobox').getValue();
			if (selected_Key_ID != null) { 
				sources.component_Main_quality.selectByKey(selected_Key_ID);
				sources.component_Main_tireInquiry.Quality.set(sources.component_Main_quality);
				sources.component_Main_tireInquiry.save( {
					onSuccess: function (event) {
						rel_Inquiry_Tire_Load (sources.component_Main_tireInquiry.ID);
					},
					onError: function(error) {
						alert('OnError');
						debugger;
						var customError = error['error'][0];
						if(customError.errCode == 1) {
							alert(customError.message);
						};
					}
				});
			}; // end if (selected_Key_ID != null)
		}; // end if tireInquiry selected
	};// @lock

	tireInquiryEvent.onAttributeChange = function tireInquiryEvent_onAttributeChange (event)// @startlock
	{// @endlock
		console.log('tireInquiryEvent.onAttributeChange');
		if (this.Webuser == tireInq_Webuser_ID_Loaded) { // entity of loaded Webuser
			if (!this.Modified_by_User) {
				if (!this.Created_automatically) { // entity not created automatically
					this.Modified_by_User = true; // Modified Flag to takeover data userdata before login
					sources.component_Main_tireInquiry.save();
					console.log ('Modified_by_User set to true and saved, ID = ' + sources.component_Main_tireInquiry.ID);
				}
				else { // entity created automatically
					this.Created_automatically = false;
					console.log ('Created_automatically set to false, ID = ' + sources.component_Main_tireInquiry.ID);
				}; // end if entity not created automatically
			}; // end if Modified_by_User
		}; // end if entity of loaded Webuser
		
		if (sources.component_Main_tireInquiry.ID != rel_Inquiry_Tire_ID_Loaded) { // Load relations TireInuiry-Tires for current Tireinquiry
			rel_Inquiry_Tire_Load (sources.component_Main_tireInquiry.ID);
		}; // end Load relations TireInuiry-Tires for current Tireinquiry
	};// @lock

	tireInquiryEvent.onCurrentElementChange = function tireInquiryEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		console.log('onCurrentElementChange, ID = ' + sources.component_Main_tireInquiry.ID);
		if (tireInq_Webuser_ID_Loaded != webuser_current_ID_Loaded) {  // TireInquiries not loaded for current Webuser
			tireInq_Webuser_ID_Loaded = webuser_current_ID_Loaded;
			
			sources.component_Main_tireInquiry.query('TireInquiry.Webuser.ID == :1', {
				autoExpand: 'Quality',
				params: [webuser_current_ID_Loaded],
				onSuccess: function(event) {
					if (sources.component_Main_tireInquiry.length == 0) { // no TireInquiry exists
						tireInquiry_Element_Add(); // add element sources.component_Main_tireInquiry
						sources.component_Main_tireInquiry.Created_automatically = true;				
						sources.component_Main_tireInquiry.save();
						console.log('added: ID, ame: ' + sources.component_Main_tireInquiry.ID + ', ' + sources.component_Main_tireInquiry.Name);
					}; // end if
				}, // end onSuccess:
				orderBy: 'Name'
			}); // end .query
		}; // end if TireInquiries not loaded for current Webuser
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_rel_Inquiry_Tire", "onPercentage_LimitAttributeChange", rel_Inquiry_TireEvent.onPercentage_LimitAttributeChange, "WAF", "Percentage_Limit");
	WAF.addListener(this.id + "_rel_Inquiry_Tire", "onSelectedAttributeChange", rel_Inquiry_TireEvent.onSelectedAttributeChange, "WAF", "Selected");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Drop_All", "click", button_rel_Inquiry_Tire_Drop_All.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Choose_All", "click", button_rel_Inquiry_Tire_Choose_All.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Drop_Selection", "click", button_rel_Inquiry_Tire_Drop_Selection.click, "WAF");
	WAF.addListener(this.id + "_button_rel_Inquiry_Tire_Choose_Selection", "click", button_rel_Inquiry_Tire_Choose_Selection.click, "WAF");
	WAF.addListener(this.id + "_tireInquiry", "onAttributeChange", tireInquiryEvent.onAttributeChange, "WAF");
	WAF.addListener(this.id + "_button_Remove_TireInq", "click", button_Remove_TireInq.click, "WAF");
	WAF.addListener(this.id + "_button_New_TireInq", "click", button_New_TireInq.click, "WAF");
	WAF.addListener(this.id + "_quality_combobox", "change", quality_combobox.change, "WAF");
	WAF.addListener(this.id + "_tireInquiry", "onCurrentElementChange", tireInquiryEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
