angular
    .module('uitoolkit')
    .controller('GraphController', GraphController);

/**
 *
 * @param {$element} $element
 * @constructor
 */
function GraphController($element) {
    var $ctrl = this;
    var canvas;
    var ctx;
    var x;
    var y;
    var degrees;
    var arcSize;
    var radius;
    var startAngle = -(Math.PI/2);
    var lineWidth = 12;

    $ctrl.canvasSide = 50;

    $ctrl.$onInit = $onInit;



    /**
     *
     */
    function $onInit() {
        canvas = $element.find('canvas')[0];

        if ($ctrl.canvasSize === 'S') {
            lineWidth = 9;
            $ctrl.canvasSide = 40;

            canvas.width = $ctrl.canvasSide;
            canvas.height = $ctrl.canvasSide;
        }

        ctx = canvas.getContext('2d');
        x = Math.floor($ctrl.canvasSide / 2);
        y = Math.floor($ctrl.canvasSide / 2);
        degrees = $ctrl.canvasPosition * 360/6;
        arcSize = (degrees * Math.PI/180) - Math.PI/2;
        radius = Math.min(x, y) * 0.75;


        drawArc(0.2, 10);
        drawArc(1, arcSize);
    }

    /**
     *
     * @param alpha
     * @param arcSize
     */
    function drawArc(alpha, arcSize) {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, arcSize, false);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = $ctrl.canvasColor;
        ctx.stroke();
    }
}

