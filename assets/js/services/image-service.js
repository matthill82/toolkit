angular
    .module('uitoolkit')
    .service('ImageService', ImageService);

/**
 * @param {UtilityService} UtilityService
 * @constructor
 */
function ImageService(UtilityService) {
    this.findDeviceImage = findDeviceImage;
    this.findImageUrlBySize = findImageUrlBySize;

    /**
     * Try to find specified image in device
     *
     * Searching "device.imagery" or "device.available_colours" if a
     * colourIndex is specified.
     *
     * @param {object} device
     * @param {number=0} imageIndex
     * @param {number|string=} colourIndex
     * @returns {*}
     */
    function findDeviceImage(device, imageIndex, colourIndex) {
        imageIndex = imageIndex || 0;

        if (!device) {
            return;
        }

        if (!UtilityService.isNumeric(colourIndex) && angular.isArray(device.imagery)) {
            return device.imagery[imageIndex];
        }

        colourIndex = parseInt(colourIndex);

        if (angular.isArray(device.available_colours)
            && device.available_colours[colourIndex]
            && angular.isArray(device.available_colours[colourIndex].imagery)
            && device.available_colours[colourIndex].imagery.length
        ) {
            return device.available_colours[colourIndex].imagery[imageIndex];
        }

    }

    /**
     * @param {Array} images
     * @param {String} size
     */
    function findImageUrlBySize(images, size) {
        var i = 0;

        if (images && images.length > 0) {
            if (size) {
                while (i < images.length) {
                    if (images[i].description === size) {
                        return images[i].url;
                    }
                    i++;
                }
            }

            // Fallback to the first image available
            return images[0].url;
        }

        return '';
    }
}
