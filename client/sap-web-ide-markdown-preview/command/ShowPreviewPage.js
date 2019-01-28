define({
    execute: function() {
        return this.context.service.viewer.showPreviewPage();
    },

    isAvailable: function() {
        return this.context.service.content.getCurrentDocument().then(function(document) {
            if (document.getName().split(".").pop() === "md") {
                return true;
            } else {
                return false;
            }
        });
    },

    isEnabled: function() {
        return true;
    }
});