/**
 * @class xcpmi.widgets.form.ValueDisplay
 * @extends xcp.widget.form.ValueDisplay
 * A read-only display of the label and value of an attribute.
 * @xtype mi_value_display
 */
Ext.define("xcpmi.widgets.form.ValueDisplay", {
    extend: "xcp.widget.form.ValueDisplay",
    alias: "widget.mi_value_display",
    
    config: {
    	debug: true
    },
    
    constructor: function(config) {
    	xcpmi.widgets.form.ValueDisplay.superclass.constructor.apply(this, [config]);
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
    }
});
