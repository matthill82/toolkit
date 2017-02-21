//    <pagination
//            p-page-size="4"
//            p-prev-label="Prev"
//            p-prev-icon="cwsicon"
//            p-next-label="Next"
//            p-next-icon="cwsicon"
//            p-show-all-label="Show all results"
//            p-show-x-per-page="Show 4 per page"
//            p-pages-summary-format="Page {1} of {2}"
//            p-go-to-label="Go to"
//        >
//    </pagination>


angular.module('uitoolkit')
    .directive('pagination', function($sce) {
        return {
            replace: true,
            scope: true,
            templateUrl: '/components/ng-components/pagination/pagination.html',
            link: function (scope, element, attr) {
                scope.prevLabel = attr.pPrevLabel || '';
                scope.prevIcon = attr.pPrevIcon || '';

                scope.nextLabel = attr.pNextLabel || '';
                scope.nextIcon = attr.pNextIcon || '';

                scope.showAllLabel = attr.pShowAllLabel;

                scope.resultsPerPage = attr.pPageSize;

                scope.pagination = scope.pagination || {};
                scope.pagination.pageSize = attr.pPageSize;

                scope.paginationMode = 'paged';

                scope.paginationGoToLabel = attr.pGoToLabel;
                scope.paginationGoToPage = attr.pGoToLabel;

                scope.showXPerPage = attr.pShowXPerPage;

                scope.pagesSummaryFormat = attr.pPagesSummaryFormat;

                scope.pagesNumbers = [];


                function animateToTop() {
                    $('html,body').animate({ scrollTop: 0 }, 400);
                }

                function updatePagesSummary() {
                    var html = scope.pagesSummaryFormat
                                .replace('{1}', '<strong class="current-page">' + scope.pagination.currentPage + '</strong>')
                                .replace('{2}', scope.pagination.totalPages);
                    scope.pagesSummary = $sce.trustAsHtml(html);
                }

                function updatePagesDropDown() {
                    scope.pagesNumbers.length = scope.pagination.totalPages;
                }

                //
                // Watchers
                //
                scope.$watch('pagination', function() {
                            updatePagesSummary();
                            updatePagesDropDown();
                        }, true);


                //
                // Click handlers
                //
                scope.paginationUpdate = function (delta) {
                    scope.pagination.currentPage = scope.pagination.currentPage + delta;
                    animateToTop();
                }

                scope.changePaginationMode = function (setMode) {
                    if (setMode === 'all') {
                        scope.paginationMode = 'all';
                        scope.pagination.currentPage = 1;
                        scope.pagination.totalPages = 1;
                        scope.pagination.pageSize = scope.pagination.totalItems;
                    } else {
                        scope.paginationMode = 'paged';
                        scope.pagination.pageSize = attr.pPageSize;
                        animateToTop();
                    }
                }

                scope.paginationDropdownChange = function() {
                    scope.pagination.currentPage = parseInt(this.paginationGoToPage);
                    this.paginationGoToPage = scope.paginationGoToLabel;
                    animateToTop();
                }
            }
        };
    });
