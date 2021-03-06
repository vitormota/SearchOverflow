<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"  
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/"> 
        <add>
        <xsl:for-each select="//row">
            <doc>
                <xsl:apply-templates select="./@*"/>             
            </doc>
        </xsl:for-each>
        </add>
    </xsl:template>
    
    <xsl:template match="@Id">
        <field name="id">
            <xsl:value-of select="."/>
        </field> 
    </xsl:template>
    
    <xsl:template match="@Date">
        <field name="Date">
            <xsl:value-of select="."/>Z</field> 
    </xsl:template>
    
    <xsl:template match="@*">
        <field name="{local-name()}">
            <xsl:value-of select="."/>
        </field> 
    </xsl:template>
    
</xsl:stylesheet>