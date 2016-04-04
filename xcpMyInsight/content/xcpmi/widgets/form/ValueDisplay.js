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
    		console.log("getClickedId()", arguments[1]);
    		var comp = context.getComponent(compId);
            var value = '';
            if (!comp) {
                console.log("Could not find MyInsight valueDisplay with id : " + compId);
            } else {
                console.log(comp.id);
            	value = comp.id;
            }
            return xcp.core.expr.BaseExpression.sanitizeObjectUri(value, context);
    	}
    },    
    
    config: {
    	debug: true
    },
    
    constructor: function(config) {
    	console.log('constructor START');
		debugger;
    	//Javascript in MyInsight report
    	//var tagId = parent.Ext.dom.Query.select('.MI')[0].getAttribute('id');
    	//parent.Ext.getCmp(tagId).fireEvent('mi_event', 'test');
    	
    	//get id from widget
    	var clsValue = config.cls;
    	console.log(clsValue);
		
    	//get prefix myInsight URL
    	//http://{host_name}:{port}/eDRG
    	var urlValue = config.url;
    	console.log(urlValue);
		
    	//Rewrite URL with correct paramaters; they should come from a server call
    	//http://{host_name}:{port}/eDRG?clsValue=MI&user=dmadmin&repository=MY_REPO&ticket=admin
    	
    	/*
		//Does not support async calls!
    	Ext.Ajax.request({
    	    async: false,
			url: 'http://172.25.180.131:8081/MyInsight/currentuser',
    	    callback: function(options, success, response) {
				console.log(JSON.parse(response.responseText).properties.login_name);
			}
    	});
    	*/
    	
    	var xhr = new XMLHttpRequest();
		var dataUser = undefined;
		var dataRepo = undefined;
		var flag = 0;
		var urlCurrentUser = 'http://172.25.180.131:8081/MyInsight/currentuser';
		var urlRepositoryName = 'http://172.25.180.131:8081/MyInsight/repositories/xcp_repository';
    	xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				if(flag == 0) {
					dataUser = JSON.parse(xhr.responseText).properties.login_name;
					console.log(dataUser);
				}
				else {
					dataRepo = JSON.parse(xhr.responseText).properties.name;
					console.log(dataRepo);
				}
			}
		}
    	
    	//xCP designer only likes asynch calls like this
		xhr.open("GET", urlCurrentUser, true);
		xhr.send();
		flag = 1;
    	//xCP designer only likes asynch calls like this
		xhr.open("GET", urlRepositoryName, true);
		xhr.send();

		console.log(dataUser);
		console.log(dataRepo);
    	
		urlValue += '?clsValue='+clsValue+'&user='+dataUser+'&repository='+dataRepo+'&ticket=admin';
		console.log(urlValue);
		
    	//Set the new URL value as value for the widget
    	//TODO
    	
    	if (config && config.valueType && config.valueType != undefined) {
            config.cls += ' xcp_value_display-' + config.valueType;
        }
    	
    	this.log("constructor", arguments);
    	this.callParent(arguments);
    	console.log('constructor END');
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
    
    //private
    _updateFormatCls:function() {

        //Set the format class, if available on the input element.
        if (this.formatCls) {
            this.inputEl.addCls(this.formatCls);
        }
    }
});
