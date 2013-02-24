
function import_Tire_Sizes_Main() {
	var lines = loadText(ds.getModelFolder().path + 'Import Datafiles/Tire sizes.txt' ).split('\n');
	// Now, loop for each entry in the array
	lines.forEach(function (oneLine) {
		oneLine = oneLine.trim(); // strip leading and trailing spaces
		var tire_Entity = new ds.Tire();
		tire_Entity.Width_mm = oneLine.slice(0, 3);
		tire_Entity.Series = oneLine.slice(4, 6);
		tire_Entity.Inch = oneLine.slice(7, 9);
		var ok_Flag = (tire_Entity.Width_mm >= 105) && (tire_Entity.Width_mm <= 350) && (tire_Entity.Series >= 25) && (tire_Entity.Series <= 95) && (tire_Entity.Inch  >= 10) && (tire_Entity.Inch <= 24);
		if (ok_Flag) {
			tire_Entity.Cargo_LT = (oneLine.slice(10, 12) == 'C ');
			tire_Entity.Offroad_4x4 = (oneLine.slice(10, 12) == 'OR');
			tire_Entity.Diameter_mm = Math.round(tire_Entity.Inch * 25.4 + 2 * tire_Entity.Series / 100 * tire_Entity.Width_mm);
			
			// relate Frequency
			if (oneLine.search(/0% bis 0.5%/) > 0) {
				tire_Entity.Frequency = 1;
			}
			else if (oneLine.search(/0.5% bis 1.5%/) > 0) {
				tire_Entity.Frequency = 2;
			}
			else if (oneLine.search(/1.5% bis 5%/) > 0) {
				tire_Entity.Frequency = 3;
			}
			else if (oneLine.search(/5% bis 10%/) > 0) {
				tire_Entity.Frequency = 4;						
			}
			else if (oneLine.search(/er 10%/) > 0) {
				tire_Entity.Frequency = 5;
			};
				
			
			try {
				tire_Entity.save();
			}
			catch (e) {
				console.log('catched.');
			};
		};
	});
}

var toDelete = ds.Tire.all();
toDelete.remove();

import_Tire_Sizes_Main();
