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
    },
    
	setValue: function(value) {
		//Javascript in MyInsight report
    	//parent.Ext.getCmp(tagId).fireEvent('mi_event', 'test');
		
		//get id from widget
		var tagId = this.id;
		console.log(tagId);
		
		//get prefix myInsight URL
		//http://{host_name}:{port}/eDRG
		var urlValue = this.url;
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
		
		//xCP designer only likes asynch calls with TRUE; FALSE will make the page hang in designer; Might be a firewall thing
		xhr.open("GET", urlCurrentUser, true);
		xhr.send();
		flag = 1;
		//xCP designer only likes asynch calls with TRUE; FALSE will make the page hang in designer; Might be a firewall thing
		xhr.open("GET", urlRepositoryName, true);
		xhr.send();

		console.log(dataUser);
		console.log(dataRepo);
		
		var urlValueOld = urlValue;
		urlValue += '?tagId='+tagId+'&user='+dataUser+'&repository='+dataRepo+'&ticket=admin';
		console.log(urlValue);
		
		var oldRawValue = this.getRawValue();

        //Apply formatting if configured.
        xcpmi.widgets.form.ValueDisplay.superclass.setValue.apply(this, arguments);
        value = xcp.formatter.Util.formatWidgetValues(this, value,
                            xcp.Strings.widget.form.ValueDisplay.trueStr,
                            xcp.Strings.widget.form.ValueDisplay.falseStr);

        //Set the new URL value as value for the widget
		if(oldRawValue == '' || urlValueOld == undefined) {
			this.setRawValue(value);
		} else {
			this.setRawValue('<IFRAME style="height:300px; width:400px;" src="'+urlValue+'"></IFRAME>');
		}

        if (this.rendered && !this.isDestroyed && !this.width && this.getRawValue() != oldRawValue) {
            this.updateLayout();
        }
    }
});
