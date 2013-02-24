
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var tireGroup_Sizes = {};	// @textField
// @endregion// @endlock

// eventHandlers// @lock

	tireGroup_Sizes.change = function tireGroup_Sizes_change (event)// @startlock
	{// @endlock
		sources.tireGroup.save();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("tireGroup_Sizes", "change", tireGroup_Sizes.change, "WAF");
// @endregion
};// @endlock
