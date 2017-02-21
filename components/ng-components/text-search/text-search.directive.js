/* List specific global vars below to prevent issues with JSHint */
/* global angular:true */

angular.module('uitoolkit')
        .directive('textSearch', function () {

                return {
                    restrict: 'E',
                    replace: true,
                    scope: true,
                    controller: 'TextSearchController',
                    controllerAs: 'TextSearchController',
                    templateUrl: '/components/ng-components/text-search/text-search.html',
                    link: function (scope, element, attr) {

                        scope.clearSearchIcon = attr.tsClearSearchIcon;
                        
                        scope.maxAmount = attr.tsMaxAmount;
                        scope.searchTitle = attr.tsSearchTitle;
                        scope.searchBoxWidth = attr.tsSearchBoxWidth;
                        scope.searchPlaceholderText = attr.tsSearchPlaceholderText;
                        scope.searchIcon = attr.tsSearchIcon;
                        scope.initialState = attr.tsInitialState;
                        scope.searchAfterCharacterCount = attr.tsSearchAfterCharacterCount || 3;
                     
                  
                        var initialData = {
                            initialState: scope.initialState
                        };
                        scope.$emit(window.ENUMS.EVENTS.EMIT.CONNECT_SEARCH, initialData);
                        //TODO: need to get this from somewhere else.
                         var trade_marks={
                                'apple':'Apple',
                                'iphone':'iPhone',
                                'ipad':'iPad',
                                'samsung':'Samsung',
                                'ipod':'iPod'
                            };
                            
                        scope.$watch('search',function(value){
                           if (typeof value !== 'undefined') 
                           { 
                               scope.search=replaceOnceUsingDictionary(trade_marks,value);
                           }
                        });
                        function replaceOnceUsingDictionary(dictionary, content, replacehandler) {
                            if (typeof replacehandler !== 'function') {
                                // Default replacehandler function.
                                replacehandler = function(key, dictionary){
                                    return dictionary[key];
                                }
                            }

                            var patterns = [], // \b is used to mark boundaries 'foo' doesn't match food
                                patternHash = {},
                                oldkey, key, index = 0,
                                output = [];
                            for (key in dictionary) {
                                // Case-insensitivity:
                                key = (oldkey = key).toLowerCase();
                                dictionary[key] = dictionary[oldkey];

                                // Sanitize the key, and push it in the list
                                patterns.push('\\b(?:' + key.replace(/([[^$.|?*+(){}])/g, '\\$1') + ')\\b');

                                // Add entry to hash variable, for an optimized backtracking at the next loop
                                patternHash[key] = index++;
                            }
                            var pattern = new RegExp(patterns.join('|'), 'gi'),
                                lastIndex = 0;

                            // We should actually test using !== null, but for foolproofness,
                            //  we also reject empty strings
                             var keyar=pattern.exec(content)
                       
                           if(keyar){
                            while (keyar) {
                                // Case-insensitivity
                               
                                key = keyar[0].toLowerCase();

                                // Add to output buffer
                                output.push(content.substring(lastIndex, pattern.lastIndex - key.length));
                                // The next line is the actual replacement method
                                output.push(replacehandler(key, dictionary));

                                // Update lastIndex variable
                                lastIndex = pattern.lastIndex;

                                // Don't match again by removing the matched word, create new pattern
                                patterns[patternHash[key]] = '^';
                                pattern = new RegExp(patterns.join('|'), 'gi');

                                // IMPORTANT: Update lastIndex property. Otherwise, enjoy an infinite loop
                                pattern.lastIndex = lastIndex;
                                keyar=pattern.exec(content)
                               
                            }
                        }
                            output.push(content.substring(lastIndex, content.length));
                            return output.join('');
                        }

                    }
                };
            })
        ;
