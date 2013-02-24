// Functions data class Rel_Quality_Group

// make tire sizes entities for Quality entity
var Rel_Quality_Group_Entities_Make_for_Quality = function (Quality_Entity) {
	var TireGroup_Coll = ds.TireGroup.all();
	for (var TireGroup_Entity = TireGroup_Coll.first(); TireGroup_Entity != null; TireGroup_Entity = TireGroup_Entity.next()) {
		Rel_Quality_Group_Entity_Make (Quality_Entity,TireGroup_Entity);
     }; // end for
}; // end var

// make tire sizes entities for TireGroup entity
var Rel_Quality_Group_Entities_List_Make_for_TireGroup = function (TireGroup_Entity) {  
    var Quality_Coll = ds.Quality.all();
	for (var Quality_Entity = Quality_Coll.first(); Quality_Entity != null; Quality_Entity = Quality_Entity.next()) {
		Rel_Quality_Group_Entity_Make (Quality_Entity,TireGroup_Entity);
     }; // end for
}; // end var

// create entities Rel_Inquiry_Tire_Entity for Quality and TireGroup
var Rel_Quality_Group_Entity_Make = function (Quality_Entity, TireGroup_Entity) {
	var Rel_Quality_Group_Entity = ds.Rel_Quality_Group.find ('Quality.ID = :1 & TireGroup.ID = :2',Quality_Entity.ID,TireGroup_Entity.ID);
	var new_Entity = !Rel_Quality_Group_Entity;
	if (new_Entity) {
		Rel_Quality_Group_Entity = ds.Rel_Quality_Group.createEntity();
		Rel_Quality_Group_Entity.Quality = Quality_Entity;
		Rel_Quality_Group_Entity.TireGroup = TireGroup_Entity;
	}; // end if new_Entity
	
	// make size list for Quality and TireGroup
	Rel_Quality_Group_Entity.Size_List = '';
	var OK_Flag = !!TireGroup_Entity.Size_List
	if (OK_Flag) {
		var pattern = /[\t\n\r]/g; // Tab, LF, CR
		var textData = TireGroup_Entity.Size_List.replace(pattern,',');
		var pattern = /[ \/]/g; // Space, /
		var textData = textData.replace(pattern,''); // remove spaces, /
		var arrData = textData.split(',');
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
						OK_Flag = (element_Series >= 30) && (element_Series <=85) && (element_Inch >= 10) && (element_Inch <= 22);
					}; // end OK_Flag
					if (OK_Flag) {
						var add_Tire = true; // Flag add tire to result
			     		if (Quality_Entity.Series_lowest > 0) {
			     			add_Tire = (element_Series >= Quality_Entity.Series_lowest);
			     		};	
			     		if (add_Tire) {
			     			if (Quality_Entity.Series_highest > 0) {
			     				add_Tire = (element_Series <= Quality_Entity.Series_highest);
			     			}; // end if add_Tire
			     		};
			     		if (add_Tire) {
			     			var element_Displaystring = element_Width_mm + '/' + element_Series + '/' + element_Inch;
							if (element_Series == 80) {
								element_Displaystring += ' (' + element_Width_mm +'R' + element_Inch + ')';
							};
							if (element_C_LT) {
								element_Displaystring += ' C';
							};
							if (element_Offroad_4x4) {
								element_Displaystring += ' OR';
							};
			     			if (Rel_Quality_Group_Entity.Size_List) Rel_Quality_Group_Entity.Size_List += ','
			     			Rel_Quality_Group_Entity.Size_List += element_Displaystring;
			     		}; // end if add_Tire
					}; // end if OK_Flag
					break; // switch case

				case 'Inch':
					element_Inch = parseInt(arrElement);
					OK_Flag = (element_Inch >= 10) && (element_Inch <= 22);
					if (OK_Flag) {
		     			if (Rel_Quality_Group_Entity.Size_List) Rel_Quality_Group_Entity.Size_List += ','
		     			Rel_Quality_Group_Entity.Size_List += element_Inch;
					}; // end if OK_Flag
					break; // switch case	
			}; // end switch
		}; // end for i
	}; // end if OK_Flag
	
	if (Rel_Quality_Group_Entity.Size_List) { // at leas 1 size for quality
		Rel_Quality_Group_Entity.save();
	}
	else { // no size for quality
		if (!new_Entity) Rel_Quality_Group_Entity.remove(); // remove if no sizes for quality	
	};
}; // end var