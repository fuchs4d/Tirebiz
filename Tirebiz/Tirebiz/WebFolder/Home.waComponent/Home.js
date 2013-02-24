	
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	sources.app_Name.sync();  // update datasource
	sources.webuser_current_user.serverRefresh(); // Update datasource in component


	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		if (data.userData.textFlow_1_contentName) { // content to display defined
			ds.Content.find('Name = :1', {
				params: [data.userData.textFlow_1_contentName],     
				onSuccess: function(event) {
					$$(getHtmlId('textFlow_1')).setValue(event.entity.Text.getValue());
				} // end onSuccess
			}); // end .find()
		}; // end if content to display defined
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
