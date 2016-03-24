/**
 * @class xcpmi.widget.button.designer.CustomButton
 * @extends xcp.widget.button.designer.Button
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Button
 * @param {cmp} runtime component.
 */
Ext.define('xcpmi.widgets.button.ctmButtonDesigner', {
	extend: 'xcp.widget.button.designer.Button',
	constructor: function(cmp){
		this.callParent(arguments);
		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "text"}, {"name": "debug"}]
							},
							{
								"name" : "action",
								"label": xcp.Strings.widget.button.designer.Button.actionPropertiesLabel,
								"properties": [{"name": "action", "editor": "genericAction"}]
							}]
						},
						{
							"name": "style",
							"sections": [{
								"name" : "format",
								"label": xcp.Strings.widget.button.designer.Button.formatSectionLabel,
								"properties": [
								               {"name": "width", 	"editor": {"name": "sizeWithSuffixEditor", "suffixText": "px"}, "reCreateCmpOnChange": true},
								               {"name": "cls", 		"editor": "com.emc.xcp.uitemplate.ui.property.linkpart.CSSClassPropertyEditor"},
								               {"name": "format", 	"editor": "com.emc.xcp.uitemplate.ui.property.section.special.formatter.ValueFormatEditor"}
								              ]
								}]
						},
						{
							"name": xcp.Strings.widget.button.designer.Button.behaviorTabLabel,
							"sections":[{
								"name": "behavior",
								"label": xcp.Strings.widget.button.designer.Button.behaviorSectionLabel,
								"properties": [
                                    {"name": "publish", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.UIEventPublishPropertyEditor"},
                                    {"name": "subscribe", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.UIEventSubscribePropertyEditor"}
								]
						    }]
						}]
		};
	},
	updateComponent: function(propertiesJSONObject) {
		this.callParent(arguments);
		javaLog("xcp.widget.designer.Plaintext", "updateComponent", "log");
		if(propertiesJSONObject && propertiesJSONObject.name === 'width') {
			this.cmp.setWidth(propertiesJSONObject.value);
		}
	}
});

xcp.designer.ComponentMgr.registerType("ctmButton",xcpmi.widgets.button.ctmButtonDesigner);
