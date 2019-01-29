define([
    "sap-web-ide-markdown-preview/js/showdown.min"
], function(showdown) {
    return {
    	_cachedViewerTemplate: null,
    	
        showPreviewPage: function() {
            var that = this,
            	filename;

            this.context.service.content.getCurrentDocument()
                .then(function(document) {
                    filename = document.getName();
                    var fileExtension = filename.split(".").pop();

                    if (fileExtension === "md") {
                        return document.getContent();
                    } else {
                        throw new Error("Not a .md file");
                    }
                })
                .then(function(content) {
                    var htmlTemplate = that._getViewerTemplate();
                    var markdownHtml = that._prepareMarkdownHtml(content);
                    var finalHtml = htmlTemplate.replace("MARKDOWN_CONTENT", markdownHtml);
                    that._openPreviewWindow(finalHtml, filename);
                    that.context.service.log.info("Markdown Preview", "File preview opened").done();
                })
                .catch(function(error) {
                    that.context.service.log.info("Markdown Preview", "File preview failed: " + error).done();
                })
        },

        _prepareMarkdownHtml: function(markdownContent) {
            var converter = new showdown.Converter();
            converter.setFlavor("github");
            var markdownHtml = converter.makeHtml(markdownContent);

            return markdownHtml;
        },

        _getViewerTemplate: function() {
        	var that = this;
        	
        	if(this._cachedViewerTemplate) {
        		return this._cachedViewerTemplate;
        	}
        	
            //workaround - no text.js plugin for require present in the IDE API?
            //don't know how to get the plugin path in the "right" way, but works...
            var basePath = this.context.i18n.bundles.i18n.replace("i18n/i18n.properties", "");
            var htmlTemplate;

            $.ajax({
                url: basePath + "htmlTemplate/viewer.html",
                async: false,
                success: function(data) {
                    that._cachedViewerTemplate = data;
                },
                error: function(error) {
                    this.context.service.log.info("Markdown Preview", "File preview failed: " +
                        error).done();
                }
            });

            return htmlTemplate;
        },

        _openPreviewWindow: function(html, filename) {
            var previewWindow = window.open("");
            previewWindow.document.write(html);
            previewWindow.document.title = this.context.i18n.getText("previewWindowTitle", [filename]);
            previewWindow.document.close();
        }
    }
});