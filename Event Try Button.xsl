<?xml version="1.0"?>
<xsl:stylesheet xmlns="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    
    <xsl:variable name="reportname"><xsl:value-of select="/result/settings/reportname"/></xsl:variable>
    <xsl:variable name="tagID"><xsl:value-of select="/result/settings/variable[@name='tagID']"/></xsl:variable>
    
    <xsl:template match="/">
        <html>
            <body>
                <h2><xsl:value-of select="$reportname"/></h2>
                <button onclick="myFunction()">Try it</button>
                <script>
                    function myFunction() {
	                   //var tagId = parent.Ext.dom.Query.select('.MI')[0].getAttribute('id');
	                   //parent.Ext.getCmp(tagId).fireEvent('mi_event', 'test');
	                   parent.parent.Ext.getCmp('<xsl:value-of select="$tagID"/>').fireEvent('mi_event', 'test');
                    }
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>