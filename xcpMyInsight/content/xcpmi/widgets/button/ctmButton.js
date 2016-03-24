/**
 * @class xcpmi.widget.button.CustomButton
 * @extends xcp.widget.button.Button
 * Allows users to initiate an action such as submitting a form or starting a search.
 * @xtype custom_button
 */
Ext.define("xcpmi.widgets.button.ctmButton", {
    extend: "xcp.widget.button.Button",
    alias: "widget.ctmButton",
    
    config: {
    	debug: true
    },
    
    constructor: function(config) {
    	this.callParent(arguments);
    	this.log("constructor", arguments);
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
    	this.callParent(arguments);
    	console.log('CLICK!!');
    }
});
