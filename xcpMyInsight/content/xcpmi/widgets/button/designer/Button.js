/**
 * @class xcpmi.widgets.button.designer.Button
 * @extends xcp.widget.button.designer.Button
 * Design time base component, wrapper runtime component.
 * @constructor Creates a new design-time Button
 * @param {cmp} runtime component.
 */
Ext.define('xcpmi.widgets.button.designer.Button', {
	extend: 'xcp.widget.button.designer.Button',
	constructor: function(cmp){
		this.callParent(arguments);
		
		this.propertyConfig = {
				"tabs": [{
						"name": "general",
						"sections": [{
								"name" : "basic",
								"properties": [{"name": "text"}, {"name": "debug"}]
							}]
						},
						{
							"name": "style",
							"sections": [{
								"name" : "format",
								"label": "Format",
								"properties": [
								               {"name": "width", 	"editor": {"name": "sizeWithSuffixEditor", "suffixText": "px"}, "reCreateCmpOnChange": true}
								              ]
								}]
						},
						{
							"name": xcp.Strings.widget.button.designer.Button.behaviorTabLabel,
							"sections":[{
	                            "name": "behavior",
	                            "label": xcp.Strings.widget.button.designer.Button.behaviorSectionLabel,
	                            "properties": [
	                                {"name": "hidden", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"},
	                                {"name": "disabled", "editor": "com.emc.xcp.uitemplate.ui.property.section.special.expr.BooleanExpressionPropertyEditor"}
	                            ]
	                        }]
						}]
		};
	},
	updateComponent: function(propertiesJSONObject) {
		if (propertiesJSONObject) {
			javaLog("xcp.widget.designer.Plaintext", "updateComponent", "log");
			console.log('updateComponent()');
			console.log(propertiesJSONObject);
			if(propertiesJSONObject.name === 'width') {
				this.cmp.setWidth(propertiesJSONObject.value);
			} else if(propertiesJSONObject.name === 'text') {
				this.cmp.setText(propertiesJSONObject.value);
			}  
		}
	}
});

xcp.designer.ComponentMgr.registerType("mi_button",xcpmi.widgets.button.designer.Button);
