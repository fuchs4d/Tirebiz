// Load and restore components on index page

// load main component
var index_comp_Main_Load = function(componentToLoad,contentName) {
	if (!componentToLoad) {
		componentToLoad = 'Home'; // No main component specified: default
		contentName = 'Welcome'; // default content name in main TextFlow
	};
	var comp_Main_Initialized = false; // Initialized Flag for use inside component
	$$('component_Main').loadComponent({path: componentToLoad+'.waComponent', userData: {textFlow_1_contentName: contentName}});
	sessionStorage.setItem ('Index_Comp_Main_Comp_Loaded',componentToLoad); // save component name in SessionStorage
	sessionStorage.setItem ('Index_Comp_Main_Content_1_Loaded',contentName); // save textFlow 1 name in SessionStorage
};

// restore main component
var index_comp_Main_Restore = function () {
	var Session_Stored_Comp_Main_Comp = sessionStorage.getItem('Index_Comp_Main_Comp_Loaded');
	var Session_Stored_Comp_Main_Content_1 = sessionStorage.getItem('Index_Comp_Main_Content_1_Loaded');
	index_comp_Main_Load (Session_Stored_Comp_Main_Comp,Session_Stored_Comp_Main_Content_1); // load main component
};
