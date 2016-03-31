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
    	//Javascript aan de MyInsight kant
    	//var tagId = parent.Ext.dom.Query.select('.MI')[0].getAttribute('id');
    	//parent.Ext.getCmp(tagId).fireEvent('mi_event', 'test');

    	if (config && config.valueType && config.valueType != undefined) {
            config.cls += ' xcp_value_display-' + config.valueType;
        }
    	
    	console.log('constructor!!');
    	this.log("constructor()", arguments);
    	this.fireEventFromMI('mi_event', 'Hi event!');
    	
    	this.callParent(arguments);
    	//get id from widget
    	//MI URL ophalen uit config van widget in designer  met als parameter dat ID; kan wellicht worden opgebouwd via een HHTP request richting de server (zie Brava! widget)
    	//Set deze URL waarde als input value voor zichtzelf.
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
    },
    
  //private
    _updateFormatCls:function() {

        //Set the format class, if available on the input element.
        if (this.formatCls) {
            this.inputEl.addCls(this.formatCls);
        }
    }
});
