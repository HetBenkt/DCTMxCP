/**
 * @class xcpmi.widget.form.CustomValueDisplay
 * @extends xcp.widget.form.ValueDisplay
 * A read-only display of the label and value of an attribute.
 * @xtype custom_value_display
 */
Ext.define("xcpmi.widgets.form.ctmValueDisplay", {
    extend: "xcp.widget.form.ValueDisplay",
    alias: "widget.ctmValueDisplay",
    
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

    resetWidgetHeight : function(){
    	this.callParent(arguments);
    },
    setValue: function(value) {
    	this.callParent(arguments);
    },

    resolvePickListValue: function(value) {
    	this.callParent(arguments);
    },

    getValue: function() {
    	this.callParent(arguments);
    } 
});
