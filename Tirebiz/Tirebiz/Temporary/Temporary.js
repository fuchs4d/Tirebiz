tireGroup_Combobox.change = function tireGroup_Combobox_change (event)
	{
		if (sources.component_Main_arrTireInq.ID != null && sources.component_Main_arrTireInq.Quality.ID == rel_Quality_Group_Quality_ID_Loaded && !rel_Quality_Group_is_loading) { // Combobox initialzed
			if (webuser_Load_Finished_Flag) { // initialized 
				var arrTireInq_Index = sources.component_Main_arrTireInq.getPosition();
				if (arrTireInq_Index != -1) { // tireInquiry selected		
					var selected_Value = $$('component_Main_tireGroup_Combobox').getValue();
					if (selected_Value != null) { 
						var selected_Arrayindex = -1;
						for (var i = 0, i_len = component_Main_arrRel_Quality_Group.length; i < i_len; i++) {
							if (component_Main_arrRel_Quality_Group[i].ID == selected_Value) { 
								selected_Arrayindex = i;
								break; // exit for loop
							}; // end if
						}; // end for i
						console.log('TireGroup combobox changed, selected_Arrayindex: ' + selected_Arrayindex);
						component_Main_choosen_Sizes = component_Main_arrRel_Quality_Group[selected_Arrayindex].Size_List;
						sources.component_Main_choosen_Sizes.sync();
					}; // end if (selected_Key_ID != null)
				}; // end if tireInquiry selected
			}; // end if initialized
		}; // end if Flag Combobox initialized
	};