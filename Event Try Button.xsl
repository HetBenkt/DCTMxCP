<?xml version="1.0"?>
<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    
    <xsl:template match="/">
        <html>
            <body>
                <h2><xsl:value-of select="/result/settings/reportname"/></h2>
                <button onclick="myFunction()">Try it</button>
                <script>
                    function myFunction() {
	                   //var tagId = parent.Ext.dom.Query.select('.MI')[0].getAttribute('id');
	                   //parent.Ext.getCmp(tagId).fireEvent('mi_event', 'test');
	                   parent.parent.Ext.getCmp('mi_value_display-1034').fireEvent('mi_event', 'test');
                    }
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>