//<specs-slider-buttons-group
//        ssbg-feature-point-mapping="Search Attribute||Graphics card" // data_point
//        ssbg-title="Graphics card"                                   // label
//        ssbg-mode="single"                                           // ['single', 'multi']
//        ssbg-hint-modal-icon="cwsicon cwsicon-circle-info"            //hint modal open icon
//        ssbg-hint-modal-title="Touch Screen"                              //hint modal title
//      ssbg-hint-modal-close-icon="cwsicon cwsicon-close"                  //hint modal close icon
//      ssbg-hint-modal-content-url="/dsa/pages/hint-content/social.html"   //hint modal content url
//    >
//</specs-slider-buttons-group>

angular.module('uitoolkit')
    .directive('specsSliderButtonsGroup', function() {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/specs-slider/specs-slider-buttons-group/specs-slider-buttons-group.html',
            link: function (scope, element, attr) {
                scope.title               = attr.ssbgTitle;
                scope.featurePointMapping = attr.ssbgFeaturePointMapping.split('||');
                scope.isMultiSelect       = attr.ssbgMode === 'multi';
                scope.hintModalTitle = attr.ssbgHintModalTitle;
                scope.hintModalIcon = attr.ssbgHintModalIcon;
                scope.hintModalCloseIcon = attr.ssbgHintModalCloseIcon;
                scope.hintModalContentUrl = attr.ssbgHintModalContentUrl;
                scope.hintModalEnabled = attr.hasOwnProperty('ssbgHintModalContentUrl'); //returns true if modalcontenturl
                scope.hintModalSize = attr.ssbgHintModalSize;

                scope.modalOpen = false;
                var modalBackgroundClass = 'bootstrap-dialog';

                scope.openModal = function openModal() {
                    // hintContent = hintContent || '';
                    // $ctrl.modalContentUrl = $filter('htmlEntities')(hintContent);
                    // $ctrl.modalCloseIcon = closeIcon;
                    // $ctrl.modalTitle = modalTitle;
                    scope.modalOpen = true;
                }

                scope.closeModal = function closeModal(e) {
                    console.log('close it');
                    var elementClass = e.target.className;
                    console.log('elementClass',elementClass);
                    if (elementClass.indexOf(modalBackgroundClass) > -1) {
                        scope.modalOpen = false;
                    }
                }
            }
        };
    });
