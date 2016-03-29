/**
 * @class xcpmi.widgets.button.Button
 * @extends xcp.widget.button.Button
 * Allows users to initiate an action such as submitting a form or starting a search.
 * @xtype mi_button
 */
Ext.define("xcpmi.widgets.button.Button", {
    extend: "xcp.widget.button.Button",
    alias: "widget.mi_button",
    xcpeventconfig: [
                     'miclick',
                     'click',
                     'hide',
                     'show'
    ],
    
    statics: {
    	getClickedId: function(context, compId) {
    		console.log("getClickedId()", arguments);
    		var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.log("Could not find MyInsight button with id : " + compId);
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
    },
    
    initComponent: function() {
    	this.addEvents(
    			'miclick'
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
    
    onClick: function() {
    	console.log('CLICK!!');
    	this.log("onClick()", arguments);
    	this.fireEvent('miclick', 'Hi event!');
    }
});
