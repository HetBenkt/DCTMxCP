/**
 * @class xcpmi.widgets.button.Button
 * @extends xcp.widget.button.Button
 * Allows users to initiate an action such as submitting a form or starting a search.
 * @xtype mi_button
 */
Ext.define("xcpmi.widgets.button.Button", {
    extend: "xcp.widget.button.Button",
    alias: "widget.mi_button",
    
    config: {
    	debug: true
    },
    
    constructor: function(config) {
    	xcpmi.widgets.button.Button.superclass.constructor.apply(this, [config]);
    },
    
    log: function() {
    	if (this.getDebug() == true) {
    		var id;
    		
    		if (this.id)
    			id = this.id;
    		else
    			id = this.alias[0];
    		
    		console.log(id + ':', arguments);
    	}
    },
    
    onClick: function() {
    	console.log('CLICK!!');
    	this.log("onClick()", arguments);
    }
});
