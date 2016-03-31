xcp.widget.form.ValueDisplay.override({
    hideEmptyLabel: false,

    initComponent: function() {
        this.callParent(arguments);

        // set the a blank value before rendering for performance.
        // the blank value gives the widget a height.
        this.valueType = "NOTSTRING";
        this.setValue("&nbsp;"); // Don't display expression value in design time.
    },

    /**
     * Ensures that the widget won't shrunk to zero size when the label is empty.
     */
    setFieldLabel: function(label) {
        if (typeof this._initialLabelSeparator === "undefined") {
            this._initialLabelSeparator = this.labelSeparator || '';
        }
        if (!label) {
            this.labelSeparator = "";
        } else {
            this.labelSeparator = this._initialLabelSeparator;
        }
        return this.callParent(arguments);
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
								"properties": [{"name": "fieldLabel"},
								               {"name": "debug"}
											  ]
							},
							{
								"name" : "value",
								"label": xcp.Strings.widget.form.designer.ValueDisplay.valueSectionLabel,
								"properties": [
								               {"name": "valueType", "editor" : "com.emc.xcp.uitemplate.ui.property.section.special.DataTypePropertyEditor"}
								              ]
							}]
						},
						  {
							  "name": "style",
							  "sections": [{
									"name" : "format",
									"label": xcp.Strings.widget.form.designer.ValueDisplay.formatSectionLabel,
									"properties": [
									               {"name": "cls", "editor" : "com.emc.xcp.uitemplate.ui.property.linkpart.CSSClassPropertyEditor"},
									               {"name": "format", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.formatter.ValueFormatEditor"}
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
		if ((value == null) || (value =="")){
			return "";
		}
		return "&#060;".concat(value,"&#062;");
	},
	updateComponent: function(propertiesJSONObject) {
		if (propertiesJSONObject) {
			console.log('updateComponent()');
			console.log(propertiesJSONObject);
			if(propertiesJSONObject.name === 'fieldLabel') {
				this.cmp.setFieldLabel(propertiesJSONObject.value);
			} else if(propertiesJSONObject.name === 'cls') {
				//remove the old cls class
	            var oldClsClass = propertiesJSONObject.oldValue;
	            if(oldClsClass != undefined && oldClsClass !== '') {
	                this.cmp.removeCls(oldClsClass);
	            }
	            // Add the new cls class
	            this.cmp.addCls(propertiesJSONObject.value);
			} 
		}
	}
});

xcp.designer.ComponentMgr.registerType("mi_value_display",xcpmi.widgets.form.designer.ValueDisplay);
