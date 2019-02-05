define([
    "sap-web-ide-markdown-preview/js/lib/showdown.min",
    "sap-web-ide-markdown-preview/js/lib/purify.min",
    "sap-web-ide-markdown-preview/js/CurrentProject"
], function(showdown, purify, CurrentProject) {
    return {
        _cachedViewerTemplate: null,

        showPreviewPage: function() {
            var that = this,
                currentProject = new CurrentProject(this.context.service),
                filename,
                fileContent;

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
                    fileContent = content;
                    return currentProject.getMdPreviewConfig();
                })
                .then(function(config) {
                    var defaultConfig = {
                        flavor: "github"
                    };

                    if (config) {
                        try {
                            var configObject = JSON.parse(config);
                            return configObject;
                        } catch (error) {
                            that.context.service.log.info("Markdown Preview",
                                ".mdpreview error, using default values: " + error).done();
                            //use default values
                            return defaultConfig;
                        }
                    }

                    return defaultConfig;
                })
                .then(function(configObject) {
                    var htmlTemplate = that._getViewerTemplate();
                    var markdownHtml = that._prepareMarkdownHtml(fileContent, configObject);
                    //markdownHtml = purify.sanitize(markdownHtml);
                    var finalHtml = htmlTemplate.replace("MARKDOWN_CONTENT", markdownHtml);
                    that._openPreviewWindow(finalHtml, filename);
                    that.context.service.log.info("Markdown Preview", "File preview opened").done();
                })
                .catch(function(error) {
                    that.context.service.log.info("Markdown Preview", "File preview failed: " + error).done();
                })
        },

        _prepareMarkdownHtml: function(markdownContent, configObject) {
            var converter;

            if (configObject.showdownConfig) {
                converter = new showdown.Converter(configObject.showdownConfig);
            } else {
                converter = new showdown.Converter();
                converter.setFlavor(configObject.flavor);
            }

            return converter.makeHtml(markdownContent);
        },

        _getViewerTemplate: function() {
            var that = this;

            if (!this._cachedViewerTemplate) {
                //workaround - no text.js plugin for require present in the IDE API?
                //don't know how to get the plugin path in the "right" way, but works...
                var basePath = this.context.i18n.bundles.i18n.replace("i18n/i18n.properties", "");

                $.ajax({
                    url: basePath + "htmlTemplate/viewer.html",
                    async: false,
                    success: function(data) {
                        that._cachedViewerTemplate = data;
                    },
                    error: function(error) {
                        this.context.service.log.info("Markdown Preview",
                            "File preview failed: " +
                            error).done();
                    }
                });
            }

            return this._cachedViewerTemplate;
        },

        _openPreviewWindow: function(html, filename) {
            var previewWindow = window.open("");
            previewWindow.document.write(html);
            previewWindow.document.title = this.context.i18n.getText("previewWindowTitle", [filename]);
            previewWindow.document.close();
        }
    }
});