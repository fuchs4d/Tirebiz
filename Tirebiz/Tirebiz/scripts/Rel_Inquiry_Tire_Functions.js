// functions datastore class Rel_Inquiry_Tire

// create related entities TireInquiry - Tire
var Rel_Inq_Tire_Create_Entities = function (TireInquiry_ID) {
	console.log('Rel_Inq_Tire_Create_Entities: ' + TireInquiry_ID);
// Built collection for Tireinquiry
	var OK_Flag = !!TireInquiry_ID;
	if (OK_Flag) {
		var result = ds.Rel_Inquiry_Tire.createEntityCollection();
		var TireInquiry_Entity = ds.TireInquiry.find('ID = :1',TireInquiry_ID);
		OK_Flag = !!TireInquiry_Entity
	};
	if (OK_Flag) {
		var Quality_Entity = TireInquiry_Entity.Quality;
		OK_Flag = !!Quality_Entity;
	};
	if (OK_Flag) {
		var frequency_Perc_Sum_Tires_all = 0; // Percentage frequency of all tires
		var frequency_Perc_Sum_Tires_in_Quality = 0; // Percentage frequency of tires in quality
		var allTires = ds.Tire.all();
		for (var Tire_Entity = allTires.first(); Tire_Entity != null; Tire_Entity = Tire_Entity.next())
     	{
     		var add_Tire = true; // Flag add tire to result collection or not
     		if (Quality_Entity.Series_lowest > 0) {
     			add_Tire = (Tire_Entity.Series >= Quality_Entity.Series_lowest);
     		};	
     		if (add_Tire) {
     			if (Quality_Entity.Series_highest > 0) {
     				add_Tire = (Tire_Entity.Series <= Quality_Entity.Series_highest);
     			}; // end if add_Tire
     		};
     		var Rel_Inquiry_Tire_Entity = ds.Rel_Inquiry_Tire.find('TireInquiry.ID = :1 & Tire.ID = :2',TireInquiry_Entity.ID,Tire_Entity.ID);
     		frequency_Perc_Sum_Tires_all += Tire_Entity.Frequency.Percentage; // Percentage frequency of all tires
     		if (add_Tire) { 
     			if (!Rel_Inquiry_Tire_Entity) { // relation entity does not exist yet
     				Rel_Inquiry_Tire_Entity = ds.Rel_Inquiry_Tire.createEntity();
     				Rel_Inquiry_Tire_Entity.TireInquiry = TireInquiry_Entity;
     				Rel_Inquiry_Tire_Entity.Tire = Tire_Entity;
     				Rel_Inquiry_Tire_Entity.Selected = true;
     			}; // end if relation entity does not exist yet
     			Rel_Inquiry_Tire_Entity.Percentage_Frequency = Tire_Entity.Frequency.Percentage;
     			Rel_Inquiry_Tire_Entity.save();
				frequency_Perc_Sum_Tires_in_Quality += Tire_Entity.Frequency.Percentage; // Percentage frequency in Quality

     			result.add(Rel_Inquiry_Tire_Entity);
     		}	
     		else { // do not add Tire
     			if (Rel_Inquiry_Tire_Entity) { // relation entity does exist but does not fit quality
     				Rel_Inquiry_Tire_Entity.remove();
     			} // end if	relation entity does exist but does not fit quality  					
     		}; // end if add_Tire	
     	}; // end for
     				
     	// correct frequency percentage in Rel_Inquiry_Tire entities
     	if (frequency_Perc_Sum_Tires_in_Quality > 0) { // avoid division by zero
     		var correction_Factor = 0; // correction factor frequency percentage
     		correction_Factor = 100 / frequency_Perc_Sum_Tires_in_Quality;
     		result.forEach(function(Rel_Inquiry_Tire_Entity) {
     			Rel_Inquiry_Tire_Entity.Percentage_Frequency = Rel_Inquiry_Tire_Entity.Percentage_Frequency * correction_Factor;
     		}); // end result.forEach()
		}; // end if avoid division by zero
     }; // end if OK_Flag
}; // end var