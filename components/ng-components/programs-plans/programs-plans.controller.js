angular.module('uitoolkit')
    .controller('ProgramsPlansController', ProgramsPlansController);

function ProgramsPlansController($log, USRefAppService, WaysToBuyService) {

    $log.info(USRefAppService);

    var $ctrl = this;

    $ctrl.$onInit = function WaysToBuyController$onInit() {
        WaysToBuyService.getLocalJson('/recommend/us-ref-app/programs-plans.json').then(function (d) {
            $ctrl.data = d;
        });
    };

    /**
     * This is the payload scheme that must be sent to the API
     * {
            "account": {
                "subscriber": {
                    "selectedDevice": {
                        "retailerSrp": {
                            "amount": 949,
                            "currencyCode": "USD"
                        },
                        "voluntaryDownPayment": {
                            "amount": 250,
                            "currencyCode": "USD"
                        }
                    }
                }
            }
        }

     */
}
