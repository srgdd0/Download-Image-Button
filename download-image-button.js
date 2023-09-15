jQuery(document).ready(function($) {
    console.log("Waiting for details block...");

    function addButton() {
        if ($(".download-attachment").length) return;

        var downloadButton = $('<button>', {
            type: "button",
            class: "button button-small download-attachment",
            text: "download attachment"
        }).click(downloadImage);

        var detailsBlock = $(".details");

        if (detailsBlock.length) {
            detailsBlock.append(downloadButton);
        }
    }

    function downloadImage() {
        var imageUrl = $("#attachment-details-two-column-copy-link").val();

        var fileName = imageUrl.split('/').pop();


        fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {

            var blobUrl = window.URL.createObjectURL(blob);
            
            var tempLink = document.createElement('a');
            tempLink.href = blobUrl;
            tempLink.download = fileName;
            tempLink.click();
            
            window.URL.revokeObjectURL(blobUrl);
        })
        .catch(error => {
            console.error("There was an error downloading the image:", error);
        });
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                addButton();
            }
        });
    });

    var config = { attributes: true, childList: true, characterData: true, subtree: true };

    observer.observe(document.body, config);
});
