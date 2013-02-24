
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button_Save = {};	// @button
	var tireEvent = {};	// @dataSource
// @endregion// @endlock

	function diameter_mm_set () { // calculate and set tire diameter in mm
		if(sources.tire.Inch > 0 & sources.tire.Series > 0 & sources.tire.Width_mm > 0){
			sources.tire.Diameter_mm = Math.round(sources.tire.Inch * 25.4 + 2 * sources.tire.Series / 100 * sources.tire.Width_mm);
		}
		else {
			sources.tire.Diameter_mm = 0;
		};
		sources.tire.autoDispatch();
	};
	
	var tire_Sortorder = '' // Tire sort order
	function tireSort (sortorder) {
		switch (sortorder) {
			case 'by inch width series':
				sources.tire.orderBy ('Inch,Width_mm,Series,Cargo_LT,Offroad_4x4');
			break;
		};
	};

// eventHandlers// @lock

	button_Save.click = function button_Save_click (event)// @startlock
	{// @endlock
		WAF.sources.tire.save( {
			onError: function(error) {
				var customError = error['error'][0];
				if(customError.errCode == 1) {
					alert(customError.message);
				};
			}
		});
	};// @lock

	tireEvent.onCollectionChange = function tireEvent_onCollectionChange (event)// @startlock
	{// @endlock
		if(!tire_Sortorder) { // no sort order defined on page load
			tire_Sortorder = 'by inch width series';
			tireSort (tire_Sortorder);
		};
	};// @lock

	tireEvent.onInchAttributeChange = function tireEvent_onInchAttributeChange (event)// @startlock
	{// @endlock
		diameter_mm_set();
	};// @lock

	tireEvent.onSeriesAttributeChange = function tireEvent_onSeriesAttributeChange (event)// @startlock
	{// @endlock
		diameter_mm_set();
	};// @lock

	tireEvent.onWidth_mmAttributeChange = function tireEvent_onWidth_mmAttributeChange (event)// @startlock
	{// @endlock
		diameter_mm_set();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button_Save", "click", button_Save.click, "WAF");
	WAF.addListener("tire", "onCollectionChange", tireEvent.onCollectionChange, "WAF");
	WAF.addListener("tire", "onInchAttributeChange", tireEvent.onInchAttributeChange, "WAF", "Inch");
	WAF.addListener("tire", "onSeriesAttributeChange", tireEvent.onSeriesAttributeChange, "WAF", "Series");
	WAF.addListener("tire", "onWidth_mmAttributeChange", tireEvent.onWidth_mmAttributeChange, "WAF", "Width_mm");
// @endregion
};// @endlock
