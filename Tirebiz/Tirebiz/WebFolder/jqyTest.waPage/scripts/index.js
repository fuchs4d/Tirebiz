
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

	      	var theme = getTheme();
	        var source = new Array();
	        for (i = 0; i < 3; i++) {
	        	var movie = 'avatar.png';
	            var title = 'Avatar';
	            var year = 2009;
	            switch (i) {
	            	case 1:
	               		movie = 'endgame.png';
	                 	title = 'End Game';
	                    year = 2006;
	                    break;
	                 case 2:
	                     movie = 'priest.png';
	                     title = 'Priest';
	                     year = 2011;
	                  	break;           
	             }; // end switch
	              var html = "<div style='padding: 0px; margin: 0px; height: 95px; float: left;'><img width='60' style='float: left; margin-top: 4px; margin-right: 15px;' src='../../images/" + movie + "'/><div style='margin-top: 10px; font-size: 13px;'>" + "<b>Title</b><div>" + title + "</div><div style='margin-top: 10px;'><b>Year</b><div>" + year.toString() + "</div></div></div>";
	              // source[i] = { html: html, title: title };
	               source[i] = title;
	           }; // end for
	           // Create a jqxComboBox
	          $("#jqxWidget").jqxComboBox({ source: source, selectedIndex: 0, width: '250', height: '25px', theme: theme });        
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
