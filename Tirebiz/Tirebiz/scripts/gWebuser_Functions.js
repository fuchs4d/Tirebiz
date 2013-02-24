// Webuser dataclass functions generic to all projects

// Take over relations of prior temporary Webuser after logging in
var Webuser_Logged_In_Take_Over_Temp_User = function (new_Webuser_ID) {
	var Session_Stored_old_Webuser_ID = sessionStorage.getItem("Webuser_Logged_In_ID");
	if (Session_Stored_old_Webuser_ID) { // Session hat old Webuser
		if (Session_Stored_old_Webuser_ID != new_Webuser_ID) { // different Webusers
			old_Webuser = ds.Webuser.find('ID = :1',Session_Stored_old_Webuser_ID);
			if (old_Webuser) { // old Webuser exists
				if (old_Webuser.Temporary_User) { // old Webuser is a temporary one
					// Take over TireInquiries
					Sel_Tireinquiry = ds.TireInquiry.query ('Webuser.ID = :1',old_Webuser.ID);
					Sel_Tireinquiry.forEach(
						function (Ent_Tireinquiry) {
							if (Ent_Tireinquiry.Modified_by_User) { // modified by Webuser
								Ent_Tireinquiry.Webuser = new_Webuser_ID;
							};
						}
					); // end .forEach()
				}; // end if old Webuser is a temporary one
			}; // end if old Webuser exists 
		}; // end if different Webusers
	}; // end if Session hat old Webuser
} // end var
