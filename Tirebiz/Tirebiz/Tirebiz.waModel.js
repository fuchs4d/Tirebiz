
guidedModel =// @startlock
{
	Rel_Quality_Group :
	{
		methods :
		{// @endlock
			Load_Choice_Arrays_for_Quality:function(Quality_ID)
			{// @lock
				var Rel_Quality_Group_Coll = ds.Rel_Quality_Group.query('Quality.ID = :1',Quality_ID);
				var resultArrays = Rel_Quality_Group_Coll.toArray('ID,TireGroup.Name,Size_List','TireGroup.Name');
				// promote related arrays to base level
				for (var i = 0, len = resultArrays.length; i < len; i++) {
					resultArrays[i].Name = [];
					resultArrays[i].Name = resultArrays[i].TireGroup.Name;
					delete resultArrays[i].TireGroup;
				}; // end for
				return resultArrays;
			}// @startlock
		}
	},
	TireGroup :
	{
		events :
		{
			onSave:function()
			{// @endlock
				include ('scripts/Rel_Quality_Group.js'); 
				Rel_Quality_Group_Entities_List_Make_for_TireGroup (this); // make tire sizes entities for TireGroup entity
			},// @startlock
			onRemove:function()
			{// @endlock
				this.Rel_Quality_GroupCollection.remove();
			}// @startlock
		}
	},
	TireRange :
	{
		Name :
		{
			onGet:function()
			{// @endlock
				include ('scripts/TireRange_Functions.js'); 
				return TireRange_Name_OnGet(this);
			}// @startlock
		}
	},
	Quality :
	{
		events :
		{
			onSave:function()
			{// @endlock
				include ('scripts/Rel_Quality_Group.js'); 
				Rel_Quality_Group_Entities_Make_for_Quality (this); // make tire sizes entities for Quality entity
			},// @startlock
			onRemove:function()
			{// @endlock
				this.Rel_Quality_Group_Collection.remove();
			}// @startlock
		},
		methods :
		{// @endlock
			Load_Choice_Arrays:function()
			{// @lock
				return ds.Quality.all().toArray('ID,Name,Default_Quality','Name');
			}// @startlock
		}
	},
	Rel_Inquiry_Tire :
	{
		Percentage_Calculation :
		{
			onGet:function()
			{// @endlock
				var result = null;
				if (this.Selected) { // Selected by User
					result = this.Percentage_Frequency;
					if ((this.Percentage_Limit > 0 && this.Percentage_Limit <= this.Percentage_Frequency)) result = this.Percentage_Limit;
				}; // end if Selected by User
				return result;
			}// @startlock
		},
		methods :
		{// @endlock
			TireInquiry_Save_Arrays:function(attributeArrays)
			{// @lock
				// delete calculated and read-only attributes
				for (var i = 0, len = attributeArrays.length; i < len; i++) {
					var Rel_Inquiry_Tire_Entity = ds.Rel_Inquiry_Tire.find('ID = :1',attributeArrays[i].ID);
					if (Rel_Inquiry_Tire_Entity) { // entity defined
						Rel_Inquiry_Tire_Entity.Selected = attributeArrays[i].Selected;
						Rel_Inquiry_Tire_Entity.Percentage_Limit = attributeArrays[i].Percentage_Limit;
						Rel_Inquiry_Tire_Entity.save();
					}; // end if entity defined
				}; // end for
			},// @lock
			Built_Collection_TireInquiry:function(TireInquiry_ID,return_Arrays_Flag)
			{// @lock
				var OK_Flag = !!TireInquiry_ID;
				if (OK_Flag) {
					include ('scripts/Rel_Inquiry_Tire_Functions.js');
					Rel_Inq_Tire_Create_Entities(TireInquiry_ID); // create related entities TireInquiry - Tire					  			
	     			
	     			var result = ds.Rel_Inquiry_Tire.query('TireInquiry.ID = :1',TireInquiry_ID);
					if (!return_Arrays_Flag) { // version return entities
						return result;
					} // end if version return entities
					else { // version return arrays
						//var resultArrays = result.toArray('ID,Tire.Diameter_mm,Tire.Displaystring,Tire.Frequency.Name,Tire.Inch,Selected,Percentage_Frequency,Percentage_Limit,Percentage_Calculation,Tire.Series','Tire.Inch,Tire.Width_mm,Tire.Series,Tire.Cargo_LT,Tire.Offroad_4x4');
						var resultArrays = result.toArray('ID,Tire.Diameter_mm,Tire.Displaystring,Tire.Frequency.Name,Tire.Inch,Selected,Percentage_Frequency,Percentage_Limit,Percentage_Calculation,Tire.Width_mm,Tire.Series,Tire.Cargo_LT,Tire.Offroad_4x4');
						// promote related arrays to base level
						for (var i = 0, len = resultArrays.length; i < len; i++) {
							resultArrays[i].Tire_Displaystring = [];
							resultArrays[i].Tire_Displaystring = resultArrays[i].Tire.Displaystring;
							resultArrays[i].Tire_Diameter_mm = [];
							resultArrays[i].Tire_Diameter_mm = resultArrays[i].Tire.Diameter_mm;
							resultArrays[i].Tire_Frequency_Name = [];
							resultArrays[i].Tire_Frequency_Name = resultArrays[i].Tire.Frequency.Name;
							resultArrays[i].Tire_Inch = [];
							resultArrays[i].Tire_Inch = resultArrays[i].Tire.Inch;						
							resultArrays[i].Tire_Width_mm = [];
							resultArrays[i].Tire_Width_mm = resultArrays[i].Tire.Width_mm;
							resultArrays[i].Tire_Series = [];
							resultArrays[i].Tire_Series = resultArrays[i].Tire.Series;
							resultArrays[i].Tire_Cargo_LT = [];
							resultArrays[i].Tire_Cargo_LT = resultArrays[i].Tire.Cargo_LT;
							resultArrays[i].Tire_Offroad_4x4 = [];
							resultArrays[i].Tire_Offroad_4x4 = resultArrays[i].Tire.Offroad_4x4;
							delete resultArrays[i].Tire;
						}; // end for
						return resultArrays;
					}; // end else version return arrays
				}; // end if OK_Flag
			}// @startlock
		}
	},
	TireInquiry :
	{
		Name :
		{
			events :
			{
				onValidate:function(attributeName)
				{// @endlock
					if (!this.Name) this.Name = 'Inquiry';
				}// @startlock
			}
		},
		Price_Unit_Displaystring :
		{
			onGet:function()
			{// @endlock
				var result = '';
				var quality_Base_Price_Defined = false;
				if (this.Quality) quality_Base_Price_Defined = !!this.Quality.Base_Price;
				if (quality_Base_Price_Defined) { // Base price defined in Quality
					if (this.Choosen_Tires_Percentage >= 99.98) {
						result = (this.Quality.Base_Price * 0.9).toFixed(2) + ' 10% discounted';
					}
					else {
						if ((this.Choosen_Tires_Percentage >= 80) && (this.Choosen_Tires_Percentage < 100)) {
							result = this.Quality.Base_Price.toFixed(2) + ' base price';
						}
						else {
							var min_Perc_reached = true;
							if (this.Quality.Minimum_Percentage > 0) { // Minimum percentage defined in Quality
								min_Perc_reached = (this.Choosen_Tires_Percentage >= this.Quality.Minimum_Percentage);
							}; // end if Minimum percentage defined in Quality
							if (min_Perc_reached) {
								result = this.Quality.Base_Price / this.Choosen_Tires_Percentage;
								result = (result * 100).toFixed(2);
							}
							else {
								result = this.Quality.Minimum_Percentage + '% not reached';
							};
						};
					};
				}
				else { // no base price defined in Quality
					result = 'No price defined';
				}; // end if Base price defined in Quality
				return result;
			}// @startlock
		},
		Choosen_Displaystring :
		{
			onGet:function()
			{// @endlock
				var result = '';
				var Tire_Coll = ds.Tire.query('rel_Inquiry_TireCollection.TireInquiry.ID = :1 & rel_Inquiry_TireCollection.Selected = :2 order by Inch asc Width asc Series asc Cargo_LT asc Offroad_4x4 asc',this.ID,true);
     			
     			for (var Tire_Entity = Tire_Coll.first(); Tire_Entity != null; Tire_Entity = Tire_Entity.next()) {
					if (result) result += ', ';
					result += Tire_Entity.Displaystring;
     			}; // end for
				return result;
			}// @startlock
		},
		Choosen_Tires_Percentage :
		{
			onGet:function()
			{// @endlock
				return this.rel_Inquiry_TireCollection.query('Selected = true').sum('Percentage_Calculation');
			}// @startlock
		},
		methods :
		{// @endlock
			Remove_Entity_ID:function(ID_to_remove)
			{// @lock
				var entity_to_remove = ds.TireInquiry.find('ID = :1',ID_to_remove);
				if (entity_to_remove) entity_to_remove.remove();
			},// @lock
			Webuser_Related_Save:function(attributeArrays)
			{// @lock
				for (var i = 0, len = attributeArrays.length; i < len; i++) {
					var tireInq_Entity = ds.TireInquiry.find('ID = :1',attributeArrays[i].ID);
					if (!tireInq_Entity && attributeArrays[i].Name) { // ID does not exist and Name defined: create new entity
						var Session_Stored_Webuser_ID = sessionStorage.getItem("Webuser_Logged_In_ID");
						tireInq_Entity = ds.TireInquiry.createEntity();
						tireInq_Entity.Webuser = Session_Stored_Webuser_ID;
					}; // end if ID does not exist and Name defined: create new entity
					if (tireInq_Entity) { // entity defined
						tireInq_Entity.Name = attributeArrays[i].Name;
						tireInq_Entity.Quality = attributeArrays[i].Quality.ID;
						tireInq_Entity.Tire_Quantity = attributeArrays[i].Tire_Quantity;
						tireInq_Entity.Modified_by_User = attributeArrays[i].Modified_by_User;
						tireInq_Entity.save();
					}; // end if entity defined
				}; // end for

			},// @lock
			Load_Webuser_Related:function(Webuser_ID)
			{// @lock
				// Find default Quality
				var default_Quality_Entity = ds.Quality.find('Default_Quality = :1',true);
				var tireInq_Coll = ds.TireInquiry.query('Webuser.ID = :1',Webuser_ID);
				if (tireInq_Coll.length == 0) { // No TireInquiry exists for Webuser
					tireInq_New_Entity = ds.TireInquiry.createEntity();
					tireInq_New_Entity.Name = 'Inquiry 1';
					tireInq_New_Entity.Tire_Quantity = 1000;
					tireInq_New_Entity.Webuser = Webuser_ID;
					tireInq_New_Entity.Quality = default_Quality_Entity;
					tireInq_New_Entity.Created_automatically = true;
					tireInq_New_Entity.save();
					tireInq_Coll.add(tireInq_New_Entity);
					include ('scripts/Rel_Inquiry_Tire_Functions.js');
					Rel_Inq_Tire_Create_Entities(tireInq_New_Entity.ID); // create related entities TireInquiry - Tire					  			
				}; // end if // No TireInquiry exists for Webuser
				var resultArrays = tireInq_Coll.toArray('ID,Name,Tire_Quantity,Quality.ID,Quality.Name,Choosen_Tires_Percentage,Choosen_Displaystring,Price_Unit_Displaystring,Modified_by_User','Name','withKey');
				// flaten Quality.ID and Quality.Name for use in jqx grid
				for (var i = 0, len = resultArrays.length; i < len; i++) {
					resultArrays[i].Quality_ID = [];
					resultArrays[i].Quality_Name = [];
					if (resultArrays[i].Quality) { // Quality defined
						resultArrays[i].Quality_ID = resultArrays[i].Quality.ID;
						resultArrays[i].Quality_Name = resultArrays[i].Quality.Name;
					} // end if Quality defined
					else { // Quality undefined
						resultArrays[i].Quality_ID = default_Quality_Entity.ID;
						resultArrays[i].Quality_Name = 'Quality undefined on server';
					}; // end else Quality undefined
				}; // end for
				return resultArrays;
			}// @startlock
		},
		events :
		{
			onRemove:function()
			{// @endlock
				this.rel_Inquiry_TireCollection.remove();
			},// @startlock
			onValidate:function()
			{// @endlock
				if (!this.Webuser) { // No Webuser related
					var Session_Stored_Webuser_ID = sessionStorage.getItem("Webuser_Logged_In_ID");
					this.Webuser = Session_Stored_Webuser_ID // relate current Webuser
				};	
			}// @startlock
		}
	},
	Tire :
	{
		events :
		{
			onValidate:function()
			{// @endlock
				var ok_Flag = (this.Inch > 0 && this.Series > 0 && this.Width_mm > 0);
				if(!ok_Flag) return {error: 1, errorMessage: 'Tire specifications not complete.'};
				if(ok_Flag) {
					var queryString = 'Width_mm = :1 & Series = :2 & Inch = :3 & Cargo_LT = :4 & Offroad_4x4 = :5';
					var result = ds.Tire.find(queryString,this.Width_mm,this.Series,this.Inch,this.Cargo_LT,this.Offroad_4x4);
					if(result) { // an entity with this specifications already exists
						if(result.ID != this.ID) { // another entity with same specifications
							return {error: 2, errorMessage: 'A tire ' + this.Displaystring + ' already exists.'};
						};
					};
				};
			}// @startlock
		},
		Displaystring :
		{
			onGet:function()
			{// @endlock
				var result = '';
				if (this.Width_mm && this.Series && this.Inch) {
					var result = this.Width_mm + '/' + this.Series + '/' + this.Inch;
					if (this.Series == 80) {
						result += ' (' + this.Width_mm +'R' + this.Inch + ')';
					};
					if (this.Cargo_LT) {
						result += ' C';
					};
					if (this.Offroad_4x4) {
						result += ' OR';
					};
				};
				return result;
			}// @startlock
		}
	},
	Webuser :
	{
		events :
		{
			onInit:function()
			{// @endlock
				this.Tire_Selection_incl_C_Tires = true;
				this.Tire_Selection_incl_OR_Tires = true;
			}// @startlock
		},
		entityMethods :
		{// @endlock
			Get_Webuser_TireInquiry_Coll:function()
			{// @lock
				if (this.tireInquiryCollection.length == 0) { // no TireInquiry still exists for Webuser
					// Create a a first default TireInquiry
					new_TireInquiry = ds.TireInquiry.createEntity();
					new_TireInquiry.Name = 'First inquiry';
					new_TireInquiry.Tire_Quantity = 1000;
					new_TireInquiry.Quality = 1;
					new_TireInquiry.Webuser = this;					
					new_TireInquiry.save();
					
					this.refresh();
				};
				return this.tireInquiryCollection;
			}// @startlock
		},
		methods :
		{// @endlock
			Create_Temp_Webuser:function()
			{// @lock
				new_Webuser = ds.Webuser.createEntity();
				new_Webuser.Temporary_User = true;
				new_Webuser.Name = 'Temporary user ' + new_Webuser.ID;
				new_Webuser.Email = 'Temporary user ' + new_Webuser.ID;
				new_Webuser.Password = 'Temporary user ' + new_Webuser.ID;
				new_Webuser.save();
					
				ds.Webuser.Save_Current_Webuser_ID(new_Webuser.ID); // save Webuser ID in SessionStorage
					
				return new_Webuser;	
			},// @lock
			Save_Current_Webuser_ID:function(login_Webuser_ID)
			{// @lock
				// Webuser: Save logged in Webuser in sessionStorage
				sessionStorage.setItem ("Webuser_Logged_In_ID",login_Webuser_ID); // save Webuser ID in SessionStorage
			},// @lock
			Register_New_Webuser:function(login_name,login_email,login_password)
			{// @lock
				// Register new Webuser
				// return of result object with entity and error text to client does not work
				var result = {       // result object returned to client
					entity: null, // new added entity
					error_text: '' // error text if new Webuser could not be created
				};
				var new_Webuser = null // new Webuser entity to return. Version with object and error text does not work
				
				var ok_Flag = true;
				ok_Flag = !!(login_name);
				if(!ok_Flag) {
					result.error_text = 'No name passed.';
				};
				if(ok_Flag) {
					var existing_Webuser = ds.Webuser.find('Name = :1',login_name);
					if(existing_Webuser) {
						ok_Flag = false;
						result.error_text = 'A User with name ' + login_name + ' already exists.';
					};
				};
				if(ok_Flag) {
					ok_Flag = !!(login_email);
					if(!ok_Flag) {
						result.error_text = 'No email passed.';
					};
				};
				if(ok_Flag) {
					var existing_Webuser = ds.Webuser.find('Email = :1',login_email);
					if(existing_Webuser) {
						ok_Flag = false;
						result.error_text = 'A User with email ' + login_email + ' already exists.';
					};
				};
				if(ok_Flag) {
					ok_Flag = !!(login_password);
					if(!ok_Flag) {
						result.error_text = 'No password passed.';
					};
				};
				
				if(ok_Flag) {
					// Create new Webuser
					new_Webuser = ds.Webuser.createEntity();
					new_Webuser.Name = login_name;
					new_Webuser.Email = login_email;
					new_Webuser.Password = login_password;
					new_Webuser.save();
					
					// Webuser dataclass functions generic to all projects
					include ('scripts/gWebuser_Functions.js'); 
					Webuser_Logged_In_Take_Over_Temp_User(new_Webuser.ID); // Take over relations of prior temporary Webuser
					ds.Webuser.Save_Current_Webuser_ID(new_Webuser.ID); // save Webuser ID in SessionStorage
					
					return new_Webuser;				}
				else
				{
					return result;
				};
			},// @lock
			Logout:function()
			{// @lock
				// Logout current Webuser
				sessionStorage.removeItem ("Webuser_Logged_In_ID") ; // remove Webuser ID in SessionStorage
				
			},// @lock
			Login_Session_Restore_Webuser:function()
			{// @lock
				// Restore Webuser for current session
				var login_Webuser = null; // Webuser entity to return to client
				var Session_Stored_Webuser_ID = sessionStorage.getItem("Webuser_Logged_In_ID");
				if(Session_Stored_Webuser_ID) {// Webuser stored
					login_Webuser = ds.Webuser.find('ID = :1',Session_Stored_Webuser_ID);
				};
				return login_Webuser;

				
			},// @lock
			Login_Name_PW:function(login_name,login_password)
			{// @lock
				var login_Webuser = ds.Webuser.find('Name = :1 & Password = :2',login_name,login_password);
				if(!login_Webuser) { // No Webuser with passed name and password
					login_Webuser = ds.Webuser.find('Email = :1 & Password = :2',login_name,login_password); // try email and password
				};
				if(!!login_Webuser) { // Webuser exists
					include ('scripts/gWebuser_Functions.js'); 
					Webuser_Logged_In_Take_Over_Temp_User(login_Webuser.ID); // Take over relations of prior temporary Webuser

					ds.Webuser.Save_Current_Webuser_ID(login_Webuser.ID); // save Webuser ID in SessionStorage
					return login_Webuser;
				}
				else { // Webuser does not exist
					return null;
				}; // end if Webuser exists
			}// @startlock
		}
	}
};// @endlock
