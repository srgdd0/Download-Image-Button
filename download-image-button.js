jQuery(document).ready(function($) {
    console.log("Waiting for details block...");

    // Функция для создания и добавления кнопки
    function addButton() {
        // Если кнопка уже существует, не добавляем её снова
        if ($(".download-attachment").length) return;

        // Создание кнопки для скачивания изображения
        var downloadButton = $('<button>', {
            type: "button",
            class: "button button-small download-attachment",
            text: "download attachment"
        }).click(downloadImage);

        // Найдем блок с классом "copy-to-clipboard-container" внутри элемента с классом "setting"
        var container = $(".setting[data-setting='url'] .copy-to-clipboard-container");

        // Если блок существует, добавим кнопку в него
        if (container.length) {
            container.append(downloadButton);
        }
    }

    // Функция для загрузки изображения
    function downloadImage() {
        // Получаем URL изображения напрямую из элемента с классом "attachment-details-copy-link"
        var imageUrl = $(".attachment-details-copy-link").val();

        // Если значение пустое, завершаем выполнение функции
        if (!imageUrl || imageUrl === "") {
            console.error("Image URL not found or empty");
            return;
        }

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

    // Инициализация мутационного наблюдателя
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                addButton();
            }
        });
    });

    // Настройка наблюдателя
    var config = { attributes: true, childList: true, characterData: true, subtree: true };

    // Начать наблюдение за DOM
    observer.observe(document.body, config);
});
