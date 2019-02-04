define([], function() {
    return function CurrentProject(contextService) {
        this.contextService = contextService;

        CurrentProject.prototype.getMdPreviewConfig = function() {
            return this.contextService.content.getCurrentDocument()
                .then(function(document) {
                    return document.getProject()
                })
                .then(function(project) {
                    return project.getFolderContent();
                })
                .then(function(folderRootContent) {
                    var mdPreviewConfig = folderRootContent.find(function(element) {
                        return element.getTitle() === ".mdpreview";
                    });

                    if (mdPreviewConfig) {
                        return mdPreviewConfig.getContent();
                    } else {
                        return null;
                    }
                })
        }
    }
});