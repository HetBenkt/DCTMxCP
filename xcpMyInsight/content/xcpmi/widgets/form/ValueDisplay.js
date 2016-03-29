/**
 * @class xcpmi.widgets.form.ValueDisplay
 * @extends xcp.widget.form.ValueDisplay
 * A read-only display of the label and value of an attribute.
 * @xtype mi_value_display
 */
Ext.define("xcpmi.widgets.form.ValueDisplay", {
    extend: "xcp.widget.form.ValueDisplay",
    alias: "widget.mi_value_display",
    xcpeventconfig: [
                     'mi_event'
    ],
    
    statics: {
    	getClickedId: function(context, compId) {
    		console.log("getClickedId()", arguments);
    		var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.log("Could not find MyInsight valueDisplay with id : " + compId);
            } else {
            	value = arguments[0];
                console.log(comp);
            }
            return xcp.core.expr.BaseExpression.sanitizeObjectUri(value, context);
    	}
    },    
    
    config: {
    	debug: true
    },
    
    constructor: function(config) {
    	this.callParent(arguments);
    	console.log('constructor!!');
    	this.log("constructor()", arguments);
    	this.fireEventFromMI('mi_event', 'Hi event!');
    },
    
    initComponent: function() {
    	this.addEvents(
    			'mi_event'
    	);
    	this.callParent(arguments);
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
    
    fireEventFromMI: function() {
    	console.log('fireEventFromMI()');
    	this.fireEvent('mi_event', 'Hi event!');
    }    
});
