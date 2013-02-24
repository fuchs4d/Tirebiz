// function TireInquirie component page

// load relations Inquiry-Tire for a TireInquiry-ID
var rel_Inquiry_Tire_Load = function (TireInquiry_ID_to_Load) {
	console.log ('loading rel_Inquiry_Tire_Load: ' + TireInquiry_ID_to_Load);
	rel_Inquiry_Tire_ID_Loaded = TireInquiry_ID_to_Load; // Relations-ID Inquire-Tire loaded Relation
	ds.Rel_Inquiry_Tire.Built_Collection_TireInquiry(
		{
			autoExpand: 'Tire',
			onSuccess: function(event) {
				sources.component_Main_rel_Inquiry_Tire.query('TireInquiry.ID = :1',
					{
						autoexpand: 'Tire',
						params: [TireInquiry_ID_to_Load],
						onSuccess: function (event) {
							console.log ('rel_Inquiry_Tire_ID_Loaded: ' + rel_Inquiry_Tire_ID_Loaded);
						}, // end onSuccess:
						onError: function (event) {
							console.log ('setEntityCollection: rel_Inquiry_Tire_ID_Loaded: ' + rel_Inquiry_Tire_ID_Loaded);
						}, // end onError
						orderBy: 'Tire.Inch asc,Tire.Width_mm asc,Tire.Series asc,Tire.Cargo_LT asc,Tire.Offroad_4x4 asc'					}
				); // end .setEntityCollection
			}, // end onSuccess:
			onError: function (event) {
				console.log ('Error rel_Inquiry_Tire_ID_Loaded: ' + rel_Inquiry_Tire_ID_Loaded);
			}
		},TireInquiry_ID_to_Load,false);
};

// Choose/drop tire size
var rel_Inquiry_Tire_Choose = function (mode, selected_Value_to_set) {
	switch (mode) {
		case ('Selected Rows'):
			var rel_Inquiry_Tire_Cur_Selection = sources.component_Main_rel_Inquiry_Tire.getSelection();
			var rel_Inquiry_Tire_Sel_Rows = rel_Inquiry_Tire_Cur_Selection.getSelectedRows();
			break;
		case ('Toggle double clicked Row'):
			var rel_Inquiry_Tire_Cur_Selection = sources.component_Main_rel_Inquiry_Tire.getSelection();
			var rel_Inquiry_Tire_Sel_Rows = rel_Inquiry_Tire_Cur_Selection.getSelectedRows();
			break;
		case 'All Rows':
			var rel_Inquiry_Tire_Sel_Rows = new Array(sources.component_Main_rel_Inquiry_Tire.length);
			for(var i = 0, len = rel_Inquiry_Tire_Sel_Rows.length; i < len; i++) {
				rel_Inquiry_Tire_Sel_Rows[i] = i;
			}; // end for
			break;
	}; // end switch
	
	for(var i = 0, len = rel_Inquiry_Tire_Sel_Rows.length; i < len; i++) {
		sources.component_Main_rel_Inquiry_Tire.select(rel_Inquiry_Tire_Sel_Rows[i],{
			onSuccess: function(event) {
				console.log('onSuccess .select');
				if (sources.component_Main_rel_Inquiry_Tire.Selected != selected_Value_to_set) { // saved selection value different
					sources.component_Main_rel_Inquiry_Tire.Selected = selected_Value_to_set;
					sources.component_Main_rel_Inquiry_Tire.save( {
						onSuccess: function(event) {
							if (event.userData.onLastEntity) {
								sources.component_Main_tireInquiry.serverRefresh();
								console.log('sources.component_Main_tireInquiry refreshed');
							};
						}, // end onSuccess:
						userData: {onLastEntity: i == len-1}
					}); // end .save()
				}; // saved selection value different
			} // end onSuccess:
		}); // end .select()
	}; // end for
}; // end var rel_Inquiry_Tire_Choose

var rel_Inquiry_Tire_Percentage_Changed = function() {
	sources.component_Main_rel_Inquiry_Tire.save( {
		onSuccess: function(event) {
			sources.component_Main_tireInquiry.serverRefresh();
			console.log('sources.component_Main_tireInquiry refreshed');
		} // end onSuccess:
	}); // end .save()
}; // end var rel_Inquiry_Tire_Percentage_Changed

// add new element datasource tireInquiry
var tireInquiry_Element_Add = function () {
	sources.component_Main_tireInquiry.addNewElement();
	sources.component_Main_tireInquiry.Name = 'Inquiry ' + sources.component_Main_tireInquiry.length;
	sources.component_Main_tireInquiry.Tire_Quantity = 1000;
	sources.component_Main_tireInquiry.Quality.set(Quality_Default_Entity);
	sources.component_Main_tireInquiry.Webuser = webuser_current_ID_Loaded;	
	sources.component_Main_tireInquiry.Modified_by_User = false;
	sources.component_Main_tireInquiry.Created_automatically = false;				
};
