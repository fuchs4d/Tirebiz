
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Specials';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	content_Specials_Loaded = false; // Flag Content entities loaded	

	// @region namespaceDeclaration// @startlock
	var contentEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	contentEvent.onCurrentElementChange = function contentEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if (!content_Specials_Loaded) { // Content entities not loaded
			content_Specials_Loaded = true;
			if (data.userData.textFlow_1_contentName) { // content to display defined
				sources.component_Main_content.query('Groupname = :1', {
					params: [data.userData.textFlow_1_contentName],
					orderBy: 'Sortindex asc',     
					onSuccess: function(event) {
						console.log('Success');
					}, // end onSuccess
					onError: function(error) {
						console.log('Error');
					} // end onSuccess
				}); // end .query()
			}; // end if content to display defined
		}; // end if Content entities not loaded
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_content", "onCurrentElementChange", contentEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock



	};// @lock


}// @startlock
return constructor;
})();// @endlock
