
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button_Save = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button_Save.click = function button_Save_click (event)// @startlock
	{// @endlock
		sources.content.save();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button_Save", "click", button_Save.click, "WAF");
// @endregion
};// @endlock
