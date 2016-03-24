/**
 * @class xcpmi.widget.form.designer.CustomValueDisplay
 * @extends xcp.widget.form.designer.ValueDisplay
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Button
 * @param {cmp} runtime component.
 */
Ext.define('xcpmi.widgets.form.ctmValueDisplayDesigner', {
	extend: 'xcp.widget.form.designer.ValueDisplay',
	constructor: function(cmp){
		this.callParent(arguments);
		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "fieldLabel"}, {"name": "debug"}]
							},
							{
								"name" : "value",
								"label": xcp.Strings.widget.form.designer.ValueDisplay.valueSectionLabel,
								"properties": [
								               {"name": "value", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.ExpressionPropertyEditor"},
								               {"name": "valueType", "editor" : "com.emc.xcp.uitemplate.ui.property.section.special.DataTypePropertyEditor"},
								               {"name": "isRepeating"},
								               {"name": "repeatingAttributeFormat", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.formatter.RepeatingAttributeFormatterPropertyEditor"}
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
		this.callParent(arguments);
		javaLog("xcp.widget.designer.Plaintext", "updateComponent", "log");
	}
});

xcp.designer.ComponentMgr.registerType("ctmValueDisplay",xcpmi.widgets.form.ctmValueDisplayDesigner);
