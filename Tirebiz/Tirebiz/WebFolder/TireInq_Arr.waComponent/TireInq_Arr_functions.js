// functions component Tire Inquiries Arrays

var jqx_arrQualityChoice_Name = new Array(); // Quality array needed for grid column menu
var jqx_arrRel_Quality_Group_Name = new Array(); // Qualty group array of jqx combobox

var qualityArrays_Choice_Load = function () {
	ds.Quality.Load_Choice_Arrays(
		{
			onSuccess: function(event) {
				component_Main_arrQualityChoice = event.result;
				arrQuality_Loaded = true; // // Flag Quality arrays loaded
				sources.component_Main_arrQualityChoice.sync();
				
				// Arrayindex default Quality in Quality arrays
				for (var i = 0, len = component_Main_arrQualityChoice.length; i < len; i++) {
					if (component_Main_arrQualityChoice[i].Default_Quality) { // Default Quality
						arrQuality_Default_arrIndex = i; // Arrayindex default Quality in Quality arrays
						i = len;
					}; // end if Default Quality
				}; // end for
				
				// Quality array needed for grid column menu
		        for (var i = 0, len = component_Main_arrQualityChoice.length; i < len; i++) {
					jqx_arrQualityChoice_Name[i] = component_Main_arrQualityChoice[i].Name
				}; // end for	
			} // end onSuccess:
		}
	); // end .Load_Webuser_Related()
}; // end var

// load relations Quality-Group for a Quality-ID
var rel_Quality_Group_Load = function (Quality_ID_to_Load) {
	rel_Quality_Group_is_loading = true; // Flag loading in progress Relations-Inquiry
	console.log ('loading rel_Quality_Group_Load: ' + Quality_ID_to_Load);
	ds.Rel_Quality_Group.Load_Choice_Arrays_for_Quality(
		{
			onSuccess: function(event) {
					component_Main_arrRel_Quality_Group = event.result;
					sources.component_Main_arrRel_Quality_Group.sync();
					rel_Quality_Group_Quality_ID_Loaded = Quality_ID_to_Load; // Relations-ID Inquire-Tire loaded Relation
					rel_Quality_Group_is_loading = false; // Flag loading in progress Relations-Inquiry
					
					// jqx combobox Quality group
					var theme = getTheme();
			        for (var i = 0, len = component_Main_arrRel_Quality_Group.length; i < len; i++) {
						jqx_arrRel_Quality_Group_Name[i] = component_Main_arrRel_Quality_Group[i].Name
					}; // end for	
					$('#component_Main_jqxComboBox_tireGroup').jqxComboBox({ source: jqx_arrRel_Quality_Group_Name, width: '288', height: '24px', theme: theme });	
					$('#component_Main_jqxComboBox_tireGroup').on('select', function (event) {
	                    if ( event.args != undefined) {
	                    	var selected_Arrayindex = event.args.index;
							component_Main_choosen_Sizes = component_Main_arrRel_Quality_Group[selected_Arrayindex].Size_List;
							sources.component_Main_choosen_Sizes.sync();
                   		 }; // end if  event.args != undefined
               		 }); // end ComboBox .on select
			}, // end onSuccess:
			onError: function (event) {
				console.log ('Error rel_Quality_Group_Load: ' + Quality_ID_to_Load + ' event: ' + event);
			} // end onError:
		},Quality_ID_to_Load,true);
}; // end var

var tireGroupArrays_Choice_Load = function () {
	ds.TireGroup.Load_Choice_Arrays(
		{
			onSuccess: function(event) {
				component_Main_arrTireGroup = event.result;
				arrTireGroup_Loaded = true; // // Flag Quality arrays loaded
				sources.component_Main_arrTireGroup.sync();
		} // end onSuccess:
		}
	); // end .Load_Webuser_Related()
}; // end var

var tireInq_Webuser_Load = function (Webuser_ID_to_load) {
	webuser_Load_Finished_Flag = false; // Flag load finished for grid TiteInquiries
	ds.TireInquiry.Load_Webuser_Related(
		{
			onSuccess: function(event) {
				component_Main_arrTireInq = event.result;
				sources.component_Main_arrTireInq.sync();
				webuser_Load_Finished_Flag = true; // Flag load finished for grid TiteInquiries
				console.log('end OnSuccess .Load_Webuser_Related');
				
				// jqx datagrid tireinquies         	
				var jqx_theme = getTheme();				
				var jqx_source_arrTireInq = {
	                localdata: component_Main_arrTireInq,
	                datatype: "array",
	                datafields:
	                [
	                    { name: 'ID', type: 'number' },
	                    { name: 'Name', type: 'string' },
	                    { name: 'Quality_Name', type: 'string' },
	                    { name: 'Tire_Quantity', type: 'number' },
	                    { name: 'Choosen_Tires_Percentage', type: 'number' },
	                    { name: 'Price_Unit_Displaystring', type: 'string' }
	                 ]
            	}; // end var source
            	var jqx_dataAdapter_arrTireInq = new $.jqx.dataAdapter(jqx_source_arrTireInq);

	            $('#component_Main_jqxGrid_TireInq').jqxGrid(
	            {
	                width: 815, height: 125,
	                source: jqx_dataAdapter_arrTireInq,
	                theme: jqx_theme,
	                selectionmode: 'singlerow',
	                columnsresize: true,
	                editable: true,
	                columns: [
	                  { text: 'ID', dataField: 'ID', editable: false, width: 44 },
	                  { text: 'Name', dataField: 'Name', width: 200 },
	                  { text: 'Quality (choose in cell menu)', dataField: 'Quality_Name', columntype: 'combobox',
	                  	createeditor: function (row, column, editor) {
                            editor.jqxComboBox({ source: jqx_arrQualityChoice_Name });},
                         cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                            // return the old value, if the new value is empty.
                            if (newvalue == "") return (oldvalue);								                          	
                         }, // end cellvaluechanging:
                         width: 250 },
	                  { text: 'Quantity', dataField: 'Tire_Quantity', width: 80 },
	                  { text: '%', dataField: 'Choosen_Tires_Percentage', cellsformat: 'f1', editable: false, width: 45 },
	                  { text: 'Unit Price', dataField: 'Price_Unit_Displaystring', editable: false, width: 194 }
	                ]
	            }); // end .jqxGrids
	            
	            $("#component_Main_jqxGrid_TireInq").bind('rowselect', function (event) {
					var selectedRowIndex = event.args.rowindex;
					sources.component_Main_arrTireInq.select(selectedRowIndex);
				}); // end .bind('rowselect'
				
	            $("#component_Main_jqxGrid_TireInq").bind('cellendedit', function (event) {
					var args = event.args;
					var columnDataField = args.datafield;
					var rowIndex = args.rowindex;
					var newValue = args.value;
					var oldValue = args.oldvalue;
					
					if (newValue !== oldValue) { // cell value changed
						switch (columnDataField) {
							case ('Name'):
								component_Main_arrTireInq[sources.component_Main_arrTireInq.getPosition()].Name = newValue;
								component_Main_arrTireInq[sources.component_Main_arrTireInq.getPosition()].Modified_by_User = true;
								tireInq_Webuser_Save(); // save on server
								break;
							case ('Quality_Name'):
								var selected_Arrayindex = -1;
								for (var i = 0, i_len = component_Main_arrQualityChoice.length; i < i_len; i++) {
									if (component_Main_arrQualityChoice[i].Name == newValue) { 
										selected_Arrayindex = i;
										break; // exit for loop
									}; // end if
								}; // end for i
								if (selected_Arrayindex != -1) { // Selected arrayindex OK
									var selected_Key_ID = component_Main_arrQualityChoice[selected_Arrayindex].ID;
									if (selected_Key_ID != null) { 
										if (sources.component_Main_arrTireInq.Quality.ID != selected_Key_ID) { // Quality changed
											console.log('Quality combobox changed, selected_Key_ID: ' + selected_Key_ID);
											component_Main_arrTireInq[rowIndex].Quality.ID = selected_Key_ID;
											component_Main_arrTireInq[rowIndex].Modified_by_User = true;
											tireInq_Webuser_Save(sources.component_Main_arrTireInq.ID); // save on server
											sources.component_Main_arrTireInq.sync();
										}; // end if Quality changed
									}; // end if (selected_Key_ID != null)
								}; // end if Selected arrayindex OK	
								break;
							case ('Tire_Quantity'):
								component_Main_arrTireInq[sources.component_Main_arrTireInq.getPosition()].Tire_Quantity = newValue;
								component_Main_arrTireInq[sources.component_Main_arrTireInq.getPosition()].Modified_by_User = true;
								tireInq_Webuser_Save(); // save on server
								break;
						}; // end switch
					}; // end if cell value changed			
				}); // end $("#jqxgrid").bind('cellendedit'
            
			} // end onSuccess:
		},Webuser_ID_to_load
	); // end .Load_Webuser_Related()
	tireInq_Webuser_ID_Loaded = Webuser_ID_to_load; // Webuser ID of currently loaded TireInquiries
}; // end var

var tireInq_Webuser_Save = function (rel_Inquiry_Tire_Inq_ID_to_Load) {
	webuser_Load_Finished_Flag = false; // Flag load finished for grid TiteInquiries
	ds.TireInquiry.Webuser_Related_Save(
		{
			onSuccess: function(event) {
				tireInq_Webuser_Load (webuser_current_ID_Loaded); // load TireInquiries for current Webuser
				if (rel_Inquiry_Tire_Inq_ID_to_Load) rel_Inquiry_Tire_Load(rel_Inquiry_Tire_Inq_ID_to_Load);
			} // end onSuccess:
		},component_Main_arrTireInq // attribute arrays
	); // end .Load_Webuser_Related()
}; // end var

// add new element datasource tireInquiry
var tireInq_Element_Add = function () {
	var newEntity = ds.TireInquiry.newEntity();
	newEntity.Webuser.ID = webuser_current_ID_Loaded;
	newEntity.Name.setValue('temporary');
	newEntity.Tire_Quantity.setValue(111);
	console.log('Before .save()');
	newEntity.save( {
		onSuccess: function(event) {
			console.log('Success tireInq_Element_Add .save()');
			var index = component_Main_arrTireInq.length;
			component_Main_arrTireInq[index] = {};
			component_Main_arrTireInq[index].ID = event.entity.ID.getValue();
			// make unique name with padded number of inquiry
			var increment_Counter = 0;
			var unique_Value_Flag = true;
			do {
				increment_Counter += 1;
				component_Main_arrTireInq[index].Name = 'Inquiry ' + (sources.component_Main_arrTireInq.length+increment_Counter);
				// test for unique value
				unique_Value_Flag = true;
				for (var i = 0, len = component_Main_arrTireInq.length; i < len; i++) {
					if (i !== index) { // not testing itself
						if (component_Main_arrTireInq[i].Name == component_Main_arrTireInq[index].Name) { // Test if new name already exists
							unique_Value_Flag = false; 
							i = len;
						}; // end if
					}; // end if not testing itself
				}; // end for	
			} while (!unique_Value_Flag);
			component_Main_arrTireInq[index].Tire_Quantity = 1000;
			component_Main_arrTireInq[index].Quality = {ID:null,Name:''};
			if (arrQuality_Default_arrIndex != -1) { // Default quality defined
				component_Main_arrTireInq[index].Quality.ID = component_Main_arrQualityChoice[arrQuality_Default_arrIndex].ID;
				component_Main_arrTireInq[index].Quality.Name = component_Main_arrQualityChoice[arrQuality_Default_arrIndex].Name;
			}; // end if Default Quality defined
			sources.component_Main_arrTireInq.sync();
			sources.component_Main_arrTireInq.select(index);
			$('#component_Main_jqxGrid_TireInq').jqxGrid('selectrow',index); // select added row in jqx grid
			tireInq_Webuser_Save(event.entity.ID.getValue()); // save on server	and reload relations
		}, // end onSuccess:
		onError: function(err) {
			console.log('Error tireInq_Element_Add .save()');
		}
	}); // end .save()
}; // end var

// remove element datasource tireInquiry
var tireInq_Element_Remove = function (index_to_Remove) {
	ds.TireInquiry.Remove_Entity_ID(component_Main_arrTireInq[index_to_Remove].ID); // remove entity on server
	component_Main_arrTireInq.splice(index_to_Remove,1); // remove array elements
	sources.component_Main_arrTireInq.sync();
}; // end var

var rel_Inquiry_Tire_jqxGrid_Header_Sort = function (column, direction) {	
	var new_Sort_Direction = 'asc'; // new sort direction asc or desc
	if (direction == 'descending') new_Sort_Direction = 'desc'
	else if (direction == null) column = 'Tire_Displaystring';
	
	var selector = column += (' ' + new_Sort_Direction);
	rel_Inquiry_Tire_Arr_Sort(selector); // sort arrays
	sources.component_Main_arrRel_Inq_Tire.sync();
	$("#component_Main_jqxGrid_rel_Inquiry_Tire").jqxGrid('updatebounddata');
};  // end var rel_Inquiry_Tire_jqxGrid_Header_Sort

// jqx datagrid relations Inquiry-Tire
var jqx_theme = getTheme();				
var jqx_source_rel_Inquiry_Tire = {
	localdata: component_Main_arrRel_Inq_Tire,
	sort: rel_Inquiry_Tire_jqxGrid_Header_Sort,
    datatype: "array",
    datafields:
    [
        { name: 'Selected', type: 'bool' },
        { name: 'Tire_Displaystring', type: 'string' },
        { name: 'Tire_Diameter_mm', type: 'number' },
        { name: 'Tire_Frequency_Name', type: 'string' },
       	{ name: 'Percentage_Frequency', type: 'number' },
        { name: 'Percentage_Limit', type: 'number' },	
        { name: 'Percentage_Calculation', type: 'number' },
        { name: 'Percentage_Shipment', type: 'number' }
     ]
}; // end var source
var jqx_dataAdapter_rel_Inquiry_Tire = new $.jqx.dataAdapter(jqx_source_rel_Inquiry_Tire, {async: false});
	            	
$('#component_Main_jqxGrid_rel_Inquiry_Tire').jqxGrid( {
	width: 815, height: 207,
    source: jqx_dataAdapter_rel_Inquiry_Tire,
    theme: jqx_theme,
    sortable: true,
    selectionmode: 'multiplerowsextended',
    editmode: 'click',
    columnsresize: true,
    editable: true,
    columns: [
		{ text: '•', dataField: 'Selected', editable: true, columntype: 'checkbox', width: 18 },
        { text: 'Size', dataField: 'Tire_Displaystring', editable: false, width: 156 },
        { text: 'Diameter mm', dataField: 'Tire_Diameter_mm', editable: false, width: 100 },
        { text: 'Frequency', dataField: 'Tire_Frequency_Name', editable: false, width: 90 },
        { text: '% on street', dataField: 'Percentage_Frequency', cellsformat: 'f1', editable: false, width: 100 },
        { text: 'Limit % street', dataField: 'Percentage_Limit', cellsformat: 'f1', editable: true, width: 106 },
        { text: '% from street', dataField: 'Percentage_Calculation', cellsformat: 'f1', editable: false, width: 106 },
     	{ text: '% in shipment', dataField: 'Percentage_Shipment', cellsformat: 'f1', editable: false, width: 110 }
     ] // end columns:
}); // end .jqxGrid	    

$("#component_Main_jqxGrid_rel_Inquiry_Tire").bind('cellendedit', function (event) {
	var args = event.args;
	var columnDataField = args.datafield;
	var rowIndex = args.owner._clickedrowindex;
	var newValue = args.value;
	var oldValue = args.oldvalue;

	if (newValue !== oldValue) { // cell value changed		
		switch (columnDataField) {
			case ('Selected'):
				var selected_Array_Indexes = new Array(); // array selected grid lines (array indexes)
				selected_Array_Indexes[0] = rowIndex;
				rel_Inquiry_Tire_Choose ('From Array', newValue, selected_Array_Indexes);
				break;
			case ('Percentage_Limit'):
				component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Limit = newValue;
				component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Calculation = component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Limit;
				if (component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Calculation < 0) component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Calculation = 0
				else if (component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Calculation > component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Frequency) component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Calculation = component_Main_arrRel_Inq_Tire[rowIndex].Percentage_Frequency;
				rel_Inquiry_Tire_Displ_Arr_Update(); // Update calculated values		
				rel_Inquiry_Tire_Save(); // save on server
				break;
		}; // end switch
	}; // end if cell value changed			
}); // end $("#jqxgrid").bind('cellendedit' 

// load relations Inquiry-Tire for a TireInquiry-ID
var rel_Inquiry_Tire_Load = function (TireInquiry_ID_to_Load) {
	rel_Inquiry_Tire_is_loading = true; // Flag loading in progress Relations-Inquiry
	console.log ('loading rel_Inquiry_Tire_Load: ' + TireInquiry_ID_to_Load);
	ds.Rel_Inquiry_Tire.Built_Collection_TireInquiry(
		{
			autoExpand: 'Tire',
			onSuccess: function(event) {
					component_Main_arrRel_Inq_Tire = event.result;
					rel_Inquiry_Tire_Arr_Sort('Tire_Displaystring asc'); // Sort arrays
					rel_Inquiry_Tire_ID_Loaded = TireInquiry_ID_to_Load; // Relations-ID Inquire-Tire loaded Relation
					rel_Inquiry_Tire_is_loading = false; // Flag loading in progress Relations-Inquiry		            
		            rel_Inquiry_Tire_Displ_Arr_Update(); // Update Display Arrays relations Inquiry-Tire
			}, // end onSuccess:
			
			onError: function (event) {
				console.log ('Error rel_Inquiry_Tire_ID_Loaded: ' + rel_Inquiry_Tire_ID_Loaded + ' event: ' + event);
			} // end onError:
		},TireInquiry_ID_to_Load,true);
}; // end var

// Sort Display Arrays relations Inquiry-Tire
var rel_Inquiry_Tire_Arr_Sort = function (Sortorder) {
	if (!Sortorder) Sortorder == 'Tire_Displaystring asc';
		switch (Sortorder) {
			case ('Selected asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = (a.Selected ? '1' : '0') + (a.Tire_Inch + a.Tire_Displaystring);
					var val_b = (b.Selected ? '1' : '0') + (b.Tire_Inch + b.Tire_Displaystring);
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Selected desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = (a.Selected ? '1' : '0') + (a.Tire_Inch + a.Tire_Displaystring);
					var val_b = (b.Selected ? '1' : '0') + (b.Tire_Inch + b.Tire_Displaystring);
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;
			case ('Tire_Displaystring asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = a.Tire_Inch + a.Tire_Displaystring;
					var val_b = b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Tire_Displaystring desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = a.Tire_Inch + a.Tire_Displaystring;
					var val_b = b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;
			case ('Tire_Diameter_mm asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = a.Tire_Inch + (a.Tire_Diameter_mm + a.Tire_Displaystring);
					var val_b = b.Tire_Inch + (b.Tire_Diameter_mm + b.Tire_Displaystring);
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Tire_Diameter_mm desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = a.Tire_Inch + (a.Tire_Diameter_mm + a.Tire_Displaystring);
					var val_b = b.Tire_Inch + (b.Tire_Diameter_mm + b.Tire_Displaystring);
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;	
			case ('Tire_Frequency_Name asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Frequency) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Frequency) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Tire_Frequency_Name desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Frequency) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Frequency) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;	
			case ('Percentage_Frequency asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Frequency) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Frequency) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Percentage_Frequency desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Frequency) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Frequency) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;	
			case ('Percentage_Limit asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Limit) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Limit) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Percentage_Limit desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Limit) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Limit) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;
			case ('Percentage_Calculation asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Calculation) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Calculation) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Percentage_Calculation desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Calculation) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Calculation) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;	
			case ('Percentage_Shipment asc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Shipment) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Shipment) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return 1;
					if(val_a < val_b) return -1;
					return 0;
				}); // end function
				break;
			case ('Percentage_Shipment desc'):
				component_Main_arrRel_Inq_Tire.sort(function (a,b) {
					var val_a = format('00.00',a.Percentage_Shipment) + a.Tire_Inch + a.Tire_Displaystring;
					var val_b = format('00.00',b.Percentage_Shipment) + b.Tire_Inch + b.Tire_Displaystring;
					if(val_a > val_b) return -1;
					if(val_a < val_b) return 1;
					return 0;
				}); // end function
				break;			
		}; // end switch
}; // end var

var rel_Inquiy_Tire_Grid_Header_Click = function (event) {
	// get colomn number: dataclass of clicked column: waf-dataGrid-col-2
	var dataclass = event.dom[0].classList[2];
	var indexLastMinus = dataclass.lastIndexOf('-');
	var column = parseInt(dataclass.substring(indexLastMinus + 1));
	var grid_Sort_Indicators = $$('component_Main_dataGrid_rel_Inquiry_Tire').getSortIndicator();
	var new_Sort_Direction = 'asc'; // new sort direction asc or desc
	if ((grid_Sort_Indicators.colNb == column) && (grid_Sort_Indicators.order == 'asc')) {
		new_Sort_Direction = 'desc';
	}; // end if
	
	var selector = ''; // selector parameter for sort function
	switch (column) {
		case (0):
			selector = 'Selected';
			break;
		case (1):
			selector = 'Tire_Displaystring';
			break;
		case (2):
			selector = 'Tire_Diameter_mm';
			break;
		case (3):
			selector = 'Tire_Frequency_Name';
			break;
		case (4):
			selector = 'Percentage_Frequency';
			break;
		case (5):
			selector = 'Percentage_Limit';
			break;
		case (6):
			selector = 'Percentage_Calculation';
			break;
		case (7):
			selector = 'Percentage_Shipment';
			break;
	}; // end switch
	selector = selector += (' ' + new_Sort_Direction);
	
	rel_Inquiry_Tire_Arr_Sort(selector); // sort arrays
	sources.component_Main_arrRel_Inq_Tire.sync();
	jqx_source_rel_Inquiry_Tire.localdata = component_Main_arrRel_Inq_Tire;
	$("#component_Main_jqxGrid_rel_Inquiry_Tire").jqxGrid('databind',jqx_source_rel_Inquiry_Tire);
}; // end var

// Update Display Arrays relations Inquiry-Tire
var rel_Inquiry_Tire_Displ_Arr_Update = function () {
	for (var i = 0, len = component_Main_arrRel_Inq_Tire.length; i < len; i++) {
		component_Main_arrRel_Inq_Tire[i].Select_Display = [];
		component_Main_arrRel_Inq_Tire[i].Select_Display = (component_Main_arrRel_Inq_Tire[i].Selected ? '•' : '');
		if (component_Main_arrRel_Inq_Tire[i].Selected) {
			component_Main_arrRel_Inq_Tire[i].Percentage_Calculation = component_Main_arrRel_Inq_Tire[i].Percentage_Frequency;
			if ((component_Main_arrRel_Inq_Tire[i].Percentage_Limit > 0 && component_Main_arrRel_Inq_Tire[i].Percentage_Limit <= component_Main_arrRel_Inq_Tire[i].Percentage_Frequency)) component_Main_arrRel_Inq_Tire[i].Percentage_Calculation = component_Main_arrRel_Inq_Tire[i].Percentage_Limit;			
		} // end if		
		else { // not selected
			component_Main_arrRel_Inq_Tire[i].Percentage_Calculation = null;
		}; // end else
	}; // end for
	
	var Perc_Shipment_Correction_Factor = 1; // correction factor percentage shipment
	var Choosen_Tires_Percentage_Sum = 0; // SumPercentage choosen tires
	for (var i = 0, len = component_Main_arrRel_Inq_Tire.length; i < len; i++) {
		Choosen_Tires_Percentage_Sum += component_Main_arrRel_Inq_Tire[i].Percentage_Calculation;
	}; // end for
	if (Choosen_Tires_Percentage_Sum > 0) Perc_Shipment_Correction_Factor = 100 / Choosen_Tires_Percentage_Sum;

	for (var i = 0, len = component_Main_arrRel_Inq_Tire.length; i < len; i++) {
		component_Main_arrRel_Inq_Tire[i].Percentage_Shipment = [];
		if (component_Main_arrRel_Inq_Tire[i].Selected) {
			component_Main_arrRel_Inq_Tire[i].Percentage_Shipment = component_Main_arrRel_Inq_Tire[i].Percentage_Calculation * Perc_Shipment_Correction_Factor;		
		} // end if		
		else { // not selected
			component_Main_arrRel_Inq_Tire[i].Percentage_Shipment = null;
		}; // end else
	}; // end for
	
	sources.component_Main_arrRel_Inq_Tire.sync();
	
	jqx_source_rel_Inquiry_Tire.localdata = component_Main_arrRel_Inq_Tire;
	$("#component_Main_jqxGrid_rel_Inquiry_Tire").jqxGrid('updatebounddata');
 // refresh jqx grid
}; // end var

// Choose/drop tire size
var rel_Inquiry_Tire_Choose = function (mode, selected_Value_to_set, array_Indexes_to_Select) {
	switch (mode) {
		case ('Selected Rows'):
			// var rel_Inquiry_Tire_Sel_Rows = $$('component_Main_dataGrid_rel_Inquiry_Tire').getSelectedRows(); wakanda grid
			var rel_Inquiry_Tire_Sel_Rows = $('#component_Main_jqxGrid_rel_Inquiry_Tire').jqxGrid('getselectedrowindexes'); // jqx grid
			break;
		case 'All Rows':
			var rel_Inquiry_Tire_Sel_Rows = new Array(sources.component_Main_arrRel_Inq_Tire.length);
			for(var i = 0, len = rel_Inquiry_Tire_Sel_Rows.length; i < len; i++) {
				rel_Inquiry_Tire_Sel_Rows[i] = i;
			}; // end for
			break;
		case 'From Array':
			var rel_Inquiry_Tire_Sel_Rows = array_Indexes_to_Select;
	}; // end switch
	
	for (var i = 0, len = rel_Inquiry_Tire_Sel_Rows.length; i < len; i++) {
			component_Main_arrRel_Inq_Tire[rel_Inquiry_Tire_Sel_Rows[i]].Selected = selected_Value_to_set;
	}; // end for
	
	if (len > 0) { // 1 or more elements to save/update
		rel_Inquiry_Tire_Displ_Arr_Update(); // Update Display Arrays relations Inquiry-Tire
		// $$('component_Main_dataGrid_rel_Inquiry_Tire').setSelectedRows(rel_Inquiry_Tire_Sel_Rows); // wakanda grid: reselect grid rows
			
		rel_Inquiry_Tire_Save(); // save arrays on server
	}; // end if 1 or more elements to save/update
}; // end var rel_Inquiry_Tire_Choose

var rel_Inquiry_Tire_Save = function () {
	ds.Rel_Inquiry_Tire.TireInquiry_Save_Arrays(
		{
			onSuccess: function(event) {
				console.log('OnSuccess ds.Rel_Inquiry_Tire.TireInquiry_Save_Arrays');
				tireInq_Webuser_Load (webuser_current_ID_Loaded); // reload TireInquiries for current Webuser
				// reselect tireInq row here
			}, // end onSuccess:
			onError: function(event) {
				console.log('onError ds.Rel_Inquiry_Tire.TireInquiry_Save_Arrays');
			} // end onError:
		},component_Main_arrRel_Inq_Tire // attribute arrays
	); // end .Load_Webuser_Related()
}; // end var

// Choose tire sizes by text in datasource sources.component_Main_arrTireInq.Choosen_Displaystring
var rel_Inquiry_Choose_by_Text = function (Selection_Mode) { // Selection Mode: True = choose, False = drop
	var pattern = /[\t\n\r]/g; // Tab, LF, CR
	var textData = component_Main_choosen_Sizes.replace(pattern,',');
	var pattern = /[ \/]/g; // Space, /
	var textData = textData.replace(pattern,''); // remove spaces, /
	var arrData = textData.split(',');
	var array_Indexes_to_Select = []; // arrayindexes component_Main_arrRel_Inq_Tire to select
	var save_Flag = false; // Flag minimum one change to save
	for (var i = 0, len = arrData.length; i < len; i++) {
		var arrElement = arrData[i];
		var element_Pos_Bracket_Open = arrElement.indexOf('('); // remove padded (155R80)
		var element_Pos_Bracket_Close = arrElement.indexOf(')');
		if ((element_Pos_Bracket_Open > 0) && (element_Pos_Bracket_Close > element_Pos_Bracket_Open)) {
			arrElement = arrElement.substring(0,element_Pos_Bracket_Open) + arrElement.substring(element_Pos_Bracket_Close + 1);
		};
		
		var element_Type = ""; // Definition Type 'Single' or 'Inch'
		if (arrElement.length >= 6) element_Type = 'Single'
		else if (arrElement.length = 2) element_Type = 'Inch';
		var OK_Flag = true;
		switch (element_Type) {
			case 'Single':
				var element_Width_mm = 0;
				var element_Series = 0;
				var element_Inch = 0;
				var element_C_LT = false;
				var element_Offroad_4x4 = false;
				
				element_Width_mm = arrElement.substring(0,3);
				OK_Flag = ((element_Width_mm >= 105) && (element_Width_mm <= 395))
				if (OK_Flag) {
					var element_Pos_R = arrElement.indexOf('R');
					if (arrElement[element_Pos_R-1] == 'O') element_Pos_R = -1; // ignore R in OR (Offroad)
					switch (element_Pos_R) {
						case -1: // R not included
							element_Series = arrElement.substring(3,5);
							element_Inch = arrElement.substring(5,7);
							break;
						case  5: // R included like 16580R13
							element_Series = arrElement.substring(3,5);
							element_Inch = arrElement.substring(6,8);
							break;
						case 3: // R included like 165R13
							element_Series = 80;
							element_Inch = arrElement.substring(4,6);
					}; // end switch					
					element_C_LT = (arrElement.indexOf('C')!= -1) || (arrElement.indexOf('LT') != -1);
					element_Offroad_4x4 = (arrElement.indexOf('OR') != -1) || (arrElement.indexOf('4x4') != -1)
					console.log('arrElement: ' + arrElement + '; Width, Series, Inch, C, OR: ' + element_Width_mm +', ' + element_Series + ', ' + element_Inch +', ' + element_C_LT + ', ' + element_Offroad_4x4);
					
					var match = false; // match Flag
					for (var k = 0, k_len = component_Main_arrRel_Inq_Tire.length; k < k_len; k++) {
						match = (component_Main_arrRel_Inq_Tire[k].Tire_Width_mm == element_Width_mm) && (component_Main_arrRel_Inq_Tire[k].Tire_Series == element_Series) && (component_Main_arrRel_Inq_Tire[k].Tire_Inch == element_Inch) 
						if (match) {
							if ((component_Main_arrRel_Inq_Tire[k].Tire_Width_mm == 195) && (component_Main_arrRel_Inq_Tire[k].Tire_Series == 70) && (component_Main_arrRel_Inq_Tire[k].Tire_Inch == 15)) {
								//debugger;
							}; // end if
							if (element_C_LT || !sources.webuser_current_user.Tire_Selection_incl_C_Tires) { // no include C-Tires
								match = component_Main_arrRel_Inq_Tire[k].Tire_Cargo_LT == element_C_LT;
							}; // end if no include C-Tires
						}; // end if match
						if (match) {
							if (element_Offroad_4x4 || !sources.webuser_current_user.Tire_Selection_incl_OR_Tires) { // no include OR-Tires
								match = component_Main_arrRel_Inq_Tire[k].Tire_Offroad_4x4 == element_Offroad_4x4;
							}; // end if no include OR-Tires
						}; // end if match
						
						if (match) { // match for choosen tire	
							if (component_Main_arrRel_Inq_Tire[k].Selected != Selection_Mode) { // size selection not equal selection mode
								array_Indexes_to_Select.push(k);
								save_Flag = true; // Flag minimum one change to save
								console.log('save_Flag');
							}; // end if size selection not equal selection mode
						}; // end if match for choosen tire
					}; // end for k
				}; // end OK_Flag
				break; // switch case
				
			case 'Inch':
				element_Inch = parseInt(arrElement);
				OK_Flag = (element_Inch >= 10) && (element_Inch <= 22);
				if (OK_Flag) {
					console.log('element_Inch: ' + element_Inch);
					for (var k = 0, k_len = component_Main_arrRel_Inq_Tire.length; k < k_len; k++) {
						if (component_Main_arrRel_Inq_Tire[k].Tire_Inch == element_Inch)  { // match for choosen tire
							if (component_Main_arrRel_Inq_Tire[k].Selected != Selection_Mode) { // size selection not equal selection mode
								array_Indexes_to_Select.push(k);
								save_Flag = true; // Flag minimum one change to save
								console.log('save_Flag');
							}; // end if size selection not equal selection mode
						}; // end if match for choosen tire
					}; // end for k
				}; // end if OK_Flag
				break; // switch case	
			}; // end switch
	}; // end for i
	if (save_Flag) rel_Inquiry_Tire_Choose('From Array',Selection_Mode,array_Indexes_to_Select);
}; // end var



