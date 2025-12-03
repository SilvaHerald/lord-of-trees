<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          h1 {
            color: #2563eb;
            margin-bottom: 10px;
            font-size: 2em;
          }
          .description {
            color: #666;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
          }
          .info {
            background: #eff6ff;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 30px;
            border-left: 4px solid #2563eb;
          }
          .info p {
            margin: 5px 0;
            font-size: 0.9em;
          }
          .item {
            margin-bottom: 30px;
            padding-bottom: 30px;
            border-bottom: 1px solid #e5e7eb;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item h2 {
            margin-bottom: 8px;
          }
          .item h2 a {
            color: #1e40af;
            text-decoration: none;
          }
          .item h2 a:hover {
            color: #2563eb;
            text-decoration: underline;
          }
          .item-meta {
            color: #6b7280;
            font-size: 0.9em;
            margin-bottom: 10px;
          }
          .item-description {
            color: #374151;
            line-height: 1.7;
          }
          .categories {
            margin-top: 10px;
          }
          .category {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.85em;
            margin-right: 6px;
            margin-top: 6px;
          }
          .rss-icon {
            display: inline-block;
            background: #f97316;
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9em;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <xsl:value-of select="/rss/channel/title"/>
          </h1>
          <p class="description">
            <xsl:value-of select="/rss/channel/description"/>
          </p>

          <div class="info">
            <p><strong>📡 This is an RSS feed.</strong> Subscribe by copying the URL into your RSS reader.</p>
            <p><strong>Link:</strong> <xsl:value-of select="/rss/channel/link"/></p>
          </div>

          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <h2>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <div class="item-meta">
                <xsl:value-of select="pubDate"/>
              </div>
              <div class="item-description">
                <xsl:value-of select="description"/>
              </div>
              <xsl:if test="category">
                <div class="categories">
                  <xsl:for-each select="category">
                    <span class="category">
                      <xsl:value-of select="."/>
                    </span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
