xcp.widget.form.ValueDisplay.override({
    hideEmptyLabel: false,

    initComponent: function() {
        this.callParent(arguments);

        // set the a blank value before rendering for performance.
        // the blank value gives the widget a height.
        this.setValue("&nbsp;"); // Don't display expression value in design time.
    }
});

/**
 * @class xcpmi.widgets.form.designer.ValueDisplay
 * @extends xcp.widget.form.designer.ValueDisplay
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Button
 * @param {cmp} runtime component.
 */
Ext.define('xcpmi.widgets.form.designer.ValueDisplay', {
	extend: 'xcp.widget.form.designer.ValueDisplay',
	constructor: function(cmp){
		xcpmi.widgets.form.designer.ValueDisplay.superclass.constructor.call(this, cmp);
		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "debug"},
								               {"name": "furl"},
								               {"name": "fwidth"},
								               {"name": "fheight"}
											  ]
							}]
						},
						{
	                        "name": xcp.Strings.widget.form.designer.ValueDisplay.behaviorTabLabel,
	                        "sections":[{
	                            "name": "behavior",
	                            "label": xcp.Strings.widget.form.designer.ValueDisplay.behaviorSectionLabel,
	                            "properties": [
	                                {"name": "publish", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.UIEventPublishPropertyEditor"},
	                                {"name": "subscribe", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.UIEventSubscribePropertyEditor"}
	                            ]
	                        }]
	                    }]
		};
	},
	addCanvasDisplayText : function (value){
		if ((value == null) || (value == "")){
			return "";
		}
		return "&#060;".concat(value,"&#062;");
	},
	updateComponent: function(propertiesJSONObject) {
		if (propertiesJSONObject) {
			console.log('updateComponent()');
			console.log(propertiesJSONObject);
			if(propertiesJSONObject.name == 'furl') {
				//Do nothing;
			}
		}
	}
});

xcp.designer.ComponentMgr.registerType("mi_value_display",xcpmi.widgets.form.designer.ValueDisplay);
