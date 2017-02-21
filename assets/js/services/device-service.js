angular
    .module('uitoolkit')
    .service('DeviceService', DeviceService);

/**
 *
 * @param $http
 * @param $q
 * @param {ToastService} ToastService
 * @param config
 * @constructor
 */
function DeviceService($http, $q, ToastService, config) {
    var QC_OPTION_SEPARATOR = '\|\-\-\|'; //|--|
    var QC_ATT_SEPARATOR = '\|\|'; // ||
    var QC_OPTION_CATEGORY_SEPARATOR = '\:\:\:'; // :::

    var devicePromises = {};
    //----
    // Just a stub service - should be replaced with real code that calls honeyBee Product Search Micro Service
    //-----

    this.findAllProducts = findAllProducts;
    this.findAllPropositions = findAllPropositions;
    this.findAllFacets = findAllFacets;
    this.findProductsFiltered = findProductsFiltered;
    this.getProductDetails = getProductDetails;
    this.getProductDetailsCached = getProductDetailsCached;
    this.findProductsByName = findProductsByName;
    this.getAllPlansForDevice = getAllPlansForDevice;
    this.getUniquePlanForDevice = getUniquePlanForDevice;
    this.getUniquePlansForDevice = getUniquePlansForDevice;
    this.getAllFacetsForDevice = getAllFacetsForDevice;
    this.findPropositionById = findPropositionById;
    this.getAllPlansForDeviceAndFacets = getAllPlansForDeviceAndFacets;
    this.findSearchProductsFiltered = findSearchProductsFiltered;
    this.getAllDevicesByCategoriesOrId = getAllDevicesByCategoriesOrId;
    this.elasticQuery = elasticQuery;
    this.getRecommendations = getRecommendations;
    this.findByQueryAndCategories = findByQueryAndCategories;
    this.findByIds = findByIds;


                function getAllDevicesByCategoriesOrId(deviceIds, category1, category2, size) {
                    var paramsAr=[];
                    var postData;

                    if (category1) {
                        paramsAr.push('{"match":{"device.category1":"' + category1 + '"}}');
                    }
                    if(category2){
                         paramsAr.push('{"match":{"device.category2":"' + category2 + '"}}');
                    }
                    if (deviceIds) {
                        if(deviceIds.length > 0){
                            for (var i =0; i < deviceIds.length; i++) {
                                paramsAr.push('{"match":{"device.id":"' + deviceIds[i] + '"}}');
                            }
                        } else {
                            paramsAr.push('{"match":{"device.id":"' + deviceIds + '"}}');
                        }
                    }

                    var aggr = '"aggs": {"devices": {"terms": {"field": "device.id"},"aggs": {"item": {"top_hits": {"size": '+ size + '}}}}}';

                    postData = '{"query":{"bool":{"should":[' + paramsAr.toString() + ']}},"size":0,' + aggr + '}';


                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function findAllProducts(deviceCategory) {

                    var postData = '{"size":10, "query": { "match_all": {} },"aggs": {"devices": {"terms": {"field": "device.id"},"aggs": {"item": {"top_hits": {"size": 1}}}}} }';

                      var paramsAr=[]
                    if (deviceCategory.deviceCategory)
                    {
                        paramsAr.push('{"match":{"device.category1":"' + deviceCategory.deviceCategory + '"}}')
                    }
                    if(deviceCategory.contractType){
                         paramsAr.push('{"match":{"tariff.supportedContractTypes":"' + deviceCategory.contractType + '"}}')

                    }
                    if (deviceCategory)
                    {
                        postData = '{"query":{"bool":{"must":['+paramsAr.toString()+']}},"aggs": {"devices": {"terms": {"field": "device.id"},"aggs": {"item": {"top_hits": {"size": 1}}}}}}'
                    }

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }
                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }





                function findSearchProductsFiltered(query_data) {

                    var postData = {
                        "query": {
                            "multi_match": {
                                "fields": ["device.name", "device.manufacturer", "device.model"],
                                "query": query_data.query,
                                "type": "phrase_prefix"
                            }
                        },
                        "aggs": {
                            "devices": {
                                "terms": {
                                    "field": "device.id"
//                                    "order": {"_term": "asc"}
                                },
                                "aggs": {"item": {
                                        "top_hits": {
                                            "size": query_data.maxAmount
                                        }
                                    }
                                }
                            }
                        }
                    };

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: JSON.stringify(postData).toString(),
                        params: {
                            action: 'post'
                        }
                    });
                    return (request.then(handleSuccess, handleError));


                }



                function findProductsFiltered(filterData, deviceCategory) {

                    var postData = '{"size":10, "query": { "match_all": {} },"aggs": {"devices": {"terms": {"field": "device.id"},"aggs": {"item": {"top_hits": {"size": 1}}}}} }';
                    var paramsAr=[]
                    if (deviceCategory.deviceCategory)
                    {
                        paramsAr.push('{"match":{"device.category1":"' + deviceCategory.deviceCategory + '"}}')
                    }
                    if(deviceCategory.contractType){
                         paramsAr.push('{"match":{"tariff.supportedContractTypes":"' + deviceCategory.contractType + '"}}')

                    }
                    if(deviceCategory){
                      postData = '{"query":{"bool":{"must":['+paramsAr.toString()+']}},"aggs": {"devices": {"terms": {"field": "device.id"},"aggs": {"item": {"top_hits": {"size": 1}}}}}}';

                    }

                    if (filterData !== null) {
                        postData = constructQuestionFilteredQuery(filterData, deviceCategory);
                    }

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function getAllPlansForDevice(deviceId, deviceColor) {
                    deviceId = deviceId.replace(/^"(.*?)"$/g, "\$1");
                    deviceColor = deviceColor.replace(/^"(.*?)"$/g, "\$1");

                    var postData = '{"query":{"bool":{"must":[{"bool":{"must":[{"match":{"device.id":"';
                    postData = postData + deviceId;
                    postData = postData + '"}}]}},{"bool":{"must":[{"match":{"device.colour":"';
                    postData = postData + deviceColor;
                    postData = postData + '"}}]}}]}}}';

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function getUniquePlansForDevice(tariffCodes, deviceId, deviceColor) {
                    var postData = constructQueryForUniquePlans(tariffCodes, deviceId, deviceColor);

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function getUniquePlanForDevice(tariffCode, deviceId, deviceColor) {
                    var postData = '{"query":{"bool":{"must":[{"bool":{"must":[{"match":{"device.id":"';
                    postData = postData + deviceId;
                    postData = postData + '"}}]}},{"bool":{"must":[{"match":{"device.colour":"';
                    postData = postData + deviceColor;
                    postData = postData + '"}}]}},{"bool":{"must":[{"match":{"offering.id":"';
                    postData = postData + tariffCode;
                    postData = postData + '"}}]}}]}}}';

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function findAllPropositions() {
                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function findPropositionById(id) {
                    var regexp = /^"?(.+?)"?$/;
                    var idNoQuotes = id.replace(regexp, '$1');

                    var postData = '{"query":{"bool":{"must":[{"bool":{"must":[{"match":{"id":"';
                    postData = postData + idNoQuotes;
                    postData = postData + '"}}]}}]}}}';

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function findProductsByName(productsArray) {
                    var postData = generateQuery(productsArray);

                    var request = $http({
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function constructQueryForUniquePlans(tariffCodes, deviceId, deviceColor) {
                    var postData = '{"query":{"bool":{"must":[{"bool":{"must":[{"match":{"device.id":"';
                    postData = postData + deviceId;
                    postData = postData + '"}}]}},{"bool":{"must":[{"match":{"device.colour":"';
                    postData = postData + deviceColor;
                    postData = postData + '"}}]}},{"bool":{"should":[';

                    var matchQuery = getMatchOnTariffCodes(tariffCodes);

                    postData = postData + matchQuery;
                    postData = postData + ']}}]}}}';

                    return postData;
                }


                function getMatchOnTariffCodes(tariffCodes) {
                    var matchQuery = '';
                    if (tariffCodes !== null) {
                        for (var t = 0; t < tariffCodes.length; t++) {
                            matchQuery = matchQuery + '{ "match" :{ "offering.id" :"'
                            matchQuery = matchQuery + tariffCodes[t];
                            matchQuery = matchQuery + '"}}';

                            if (t + 1 === tariffCodes.length) {
                                matchQuery = matchQuery + '';
                            } else {
                                matchQuery = matchQuery + ',';
                            }
                        }
                    }
                    return matchQuery;
                }


                function constructQuestionFilteredQuery(selectedData, deviceCategory) {

                    //This will retrieve the value from the state manager or pass it in to this function.
                    var catOn = false;
                    var featurequery;
                    // var testData = 'Games:::[{\x22attribute\x22:\x22Display || Screen Size\x22,\x22rule\x22:\x22<=\x22,\x22value\x22:\x226\x22},{\x22attribute\x22:\x22Battery || Standby time\x22,\x22rule\x22:\x22>=\x22,\x22value\x22:\x2210\x22},{\x22attribute\x22:\x22Battery || Talk Time\x22,\x22rule\x22:\x22>=\x22,\x22value\x22:\x226\x22},{\x22attribute\x22:\x22Camera || Camera quality\x22,\x22rule\x22:\x22>=\x22,\x22value\x22:\x2210MP\x22}]|--|Camera:::[{\x22attribute\x22:\x22Call || Voice dialling\x22,\x22rule\x22:\x22=\x22,\x22value\x22:\x22true\x22}]|--|Chat:::[{\x22attribute\x22:\x22Call || Speakerphone\x22,\x22rule\x22:\x22=\x22,\x22value\x22:\x22true\x22}]';

                    //Work:::[{"attribute":"Body and screen || Device weight","rule":"\\u003e\\u003d","value":"194"}]|--|Games:::[{"attribute":"Processor and Memory || RAM","rule":"\\u003c\\u003d","value":"2"},{"attribute":"Processor and memory || Processor speed","rule":"\\u003e\\u003d","value":"3"}]

                    // first, separate each individual question group by |--|
                    //second, separate each category from query by :::
                    // third, disregard category name and parseJson on the query.
                    // fourth, separate by comma and map values into the query.
                    if (selectedData != null) {
                        //selectedData = JSON.stringify(selectedData);//selectedData = '"'+selectedData+'"';
                        var searchField;

                        var questionFeatures = selectedData.split(QC_OPTION_SEPARATOR);
                        var query = '{"query" : { "bool" : {  "must" : [ ';
                        if (deviceCategory && !catOn) {
                            query = query + '{ "match" : { "device.category1" :';
                            query = query + '"' + deviceCategory.deviceCategory + '"' + '}},';
                            catOn = true;
                        }

                        for (var c = 0; c < questionFeatures.length; c++) {
                            var questionCats = questionFeatures[c];

                            var categoryFeatures = questionCats.split(QC_OPTION_CATEGORY_SEPARATOR);

                            var queryEnd = '] } },"size":0,' + generateAggr() + '}';//'] } },"sort": { "device.name" : { "order": "desc" } } }';

                            query = query + '{';


                            //DEVICES (device.manufacturer)


                            //TARIFFS


                          //FEATURES ONLY
                            if (categoryFeatures.length > 0) {
                                var jsonArray = categoryFeatures[1];
                                //jsonArray=unescape(jsonArray);
                                //jsonArray = JSON.stringify(jsonArray);
                                //console.log('1jsonarray'+jsonArray);
                                //var modJson = '"' + jsonArray.replace(/([^\\]|^)\\x/g, '$1\\u00') + '"';
                                //var decodedString = $.parseJSON('"' + jsonArray.replace(/([^\\]|^)\\x/g, '$1\\u00') + '"');
                                //var decodedString = $.parseJSON(jsonArray.replace(/([^\\]|^)\\x/g, '$1\\u00') );

                                var modJson = '"' + jsonArray.replace(/([^\\]|^)\\x/g, '$1\\u00') + '"';
                                // console.log('modJson'+modJson);
                                var decodedString = $.parseJSON(jsonArray);
                            //    console.log(decodedString)
                                //console.log('------decoded: '+decodedString);
                                //decodedString = $.parseJSON(decodedString);
                                //console.log('------decoded2: '+decodedString);
                                //var decodedString = $.parseJSON(jsonArray);
                                //console.log('jsonArray'+decodedString);
                                //var decodedString = $.parseJSON(decodedString);

                                for (var q = 0; q < decodedString.length; q++) {
                                    query = query + '"bool" : { "must" : [ ';

                                    var attributes = decodedString[q].attribute.split(QC_ATT_SEPARATOR);

                                    if (attributes.length > 1) {
                                        featurequery = constructQuestionsFeatureMatch(decodedString, attributes, q);
                                        query = query + featurequery;
                                    } else {
                                        featurequery = constructQuestionsDataPointMatch(decodedString, attributes, q);
                                        query = query + featurequery;
                                        //var trimmedAttribute = attributes[0].trim();
                                        //query = query + '{ "match" : { "' + trimmedAttribute + '" :';
                                        //query = query + '"Apple"' + '}}';
                                        //console.log('query3'+query);
                                    }



                                    query = query + '] ';

                                    if (q + 1 === decodedString.length) {
                                        query = query + '} }';
                                    } else {
                                        query = query + '} },{';
                                    }

                                }

                            }

                            if (c + 1 === questionFeatures.length) {
                                query = query + '';
                            } else {
                                query = query + ',';
                            }
                        }

                        query = query + queryEnd;
                        //console.log(query); //Uncommented for Krishna

                        return query;
                    }
                }



                function constructQuestionsDataPointMatch(decodedString, attributes, q) {
                    var query = '';
                    var trimmedAttribute = attributes[0].trim();

                    /*query = query + '{ "match" : { "device.features.category" :';

                    query = query + '"' + trimmedAttribute + '"' + '}},';

                    if (attributes.length > 1) {
                        query = query + '{ "match" : { "device.features.name" :';
                        var trimmedAttributeName = attributes[1].trim();
                        query = query + '"' + trimmedAttributeName + '"' + '}},';
                    }*/

                    if (decodedString[q].rule.indexOf('eq') > -1) {
                        query = query + '{ "match" : { "'+trimmedAttribute+'" :';
                        query = query + '"' + decodedString[q].value + '"' + '}}';
                    } else {
                        query = query + '{ "range" : { "'+trimmedAttribute+'" :';
                        query = query + '{ "' + decodedString[q].rule + '"' + ': ' + decodedString[q].value + '}}}';
                    }

                    return query;
                }


                function constructQuestionsFeatureMatch(decodedString, attributes, q) {
                    var query = '';
                    var trimmedAttribute = attributes[0].trim();

                    query = query + '{ "match" : { "device.features.category" :';

                    query = query + '"' + trimmedAttribute + '"' + '}},';

                    if (attributes.length > 1) {
                        query = query + '{ "match" : { "device.features.name" :';
                        var trimmedAttributeName = attributes[1].trim();
                        query = query + '"' + trimmedAttributeName + '"' + '}},';
                    }

                    if (decodedString[q].rule.indexOf('eq') > -1) {
                        query = query + '{ "match" : { "device.features.value" :';
                        query = query + '"' + decodedString[q].value + '"' + '}}';
                    } else {
                        query = query + '{ "range" : { "device.features.value" :';
                        query = query + '{ "' + decodedString[q].rule + '"' + ': ' + decodedString[q].value + '}}}';
                    }

                    return query;
                }


                function generateAggr(size) {
                    size = size || 10;

                    var aggr = '"aggs": {"devices": {"terms": {"field": "device.id", "size":' +  size + '},"aggs": {"item": {"top_hits": {"size": 1}}}}}';
                    return aggr;
                }


                function generateQuery(productsArray) {
                    var matchQuery = [];

                    for (var i = 0; i < productsArray.length; i++) {
                        matchQuery.push('{"bool":{"must":[{"match":{"device.id":"' + productsArray[i] + '"}}]}}')
                    }

                    var query = '{"query":{"bool":{"should":[' + matchQuery + ']}},"size":' + 0 + ',' + generateAggr(matchQuery.length) + '}';
                    return query;

                }


                function generateDeviceSelectionQuery(deviceId) {
                    var regexp = /^"?(.+?)"?$/;
                    deviceId = deviceId.replace(regexp, '$1');
                    var q = '{"query":{"bool":{"must":[{"match":{"device.id":"';
                    q = q + deviceId;
                    q = q + '"}}]}}}';
                    return q;
                }


                function findAllFacets() {
                    var request = $http({
                        method: 'get',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: '../components/ng-components/facets/button-select/facets.json',
                        params: {
                            action: 'get'
                        }
                    });


                    return (request.then(handleSuccess, handleError));
                }


                function getProductDetails(deviceId) {
                    var postData = generateDeviceSelectionQuery(deviceId);
                    var request = $http({
                        method: 'POST',
                        url: config.psi_url,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: postData
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function getAllFacetsForDevice(deviceId, deviceColor, planType, facets) {
                    deviceId = deviceId.replace(/^"(.*?)"$/g, "\$1");
                    deviceColor = deviceColor.replace(/^"(.*?)"$/g, "\$1");

                    var postData = '';

                    postData += '{';
                    postData += '   "query":{';
                    postData += '      "bool":{';
                    postData += '         "must":[';
                    postData += '            {';
                    postData += '               "bool":{';
                    postData += '                  "must":[';
                    postData += '                     {';
                    postData += '                        "match":{';
                    postData += '                           "device.id":"' + deviceId + '"';
                    postData += '                        }';
                    postData += '                     }';
                    postData += '                  ]';
                    postData += '               }';
                    postData += '            },';
                    postData += '            {';
                    postData += '               "bool":{';
                    postData += '                  "must":[';
                    postData += '                     {';
                    postData += '                        "match":{';
                    postData += '                           "device.colour":"' + deviceColor + '"';
                    postData += '                        }';
                    postData += '                     }';
                    postData += '                  ]';
                    postData += '               }';
                    postData += '            }';
                    if (planType) {
                        postData += '            ,{';
                        postData += '                "match":{';
                        postData += '                    "tariff.supportedContractTypes":"' + planType + '"';
                        postData += '                }';
                        postData += '            }';
                    }
                    postData += '         ]';
                    postData += '      }';
                    postData += '   },';
                    postData += '   "size": 0,';
                    postData += '   "aggs": {';
                    for (var fieldName in facets) {
                        postData += '       "' + fieldName + '": {';
                        postData += '           "terms": {';
                        postData += '               "field": "' + fieldName + '"';
                        postData += '           }';
                        postData += '       },';
                    }
                    postData = postData.slice(0, -1);
                    postData += '   }';
                    postData += '}';

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function getAllPlansForDeviceAndFacets(deviceId, deviceColor, planType, facets, pagination, sort) {
                    var i;

                    deviceId = deviceId.replace(/^"(.*?)"$/g, "\$1");
                    deviceColor = deviceColor.replace(/^"(.*?)"$/g, "\$1");

                    var postData = '';

                    postData += '{';
                    if (sort && sort.criteria) {
                        postData += '   "sort": [';
                        postData += '       {';
                        postData += '           "' + sort.criteria + '" : "' + sort.order + '"';
                        postData += '       }';
                        postData += '   ],';
                    }
                    postData += '   "query":{';
                    postData += '      "bool":{';
                    postData += '         "must":[';
                    postData += '            {';
                    postData += '               "bool":{';
                    postData += '                  "must":[';
                    postData += '                     {';
                    postData += '                        "match":{';
                    postData += '                           "device.id":"' + deviceId + '"';
                    postData += '                        }';
                    postData += '                     }';
                    postData += '                  ]';
                    postData += '               }';
                    postData += '            },';
                    postData += '            {';
                    postData += '               "bool":{';
                    postData += '                  "must":[';
                    postData += '                     {';
                    postData += '                        "match":{';
                    postData += '                           "device.colour":"' + deviceColor + '"';
                    postData += '                        }';
                    postData += '                     }';
                    postData += '                  ]';
                    postData += '               }';
                    postData += '            },';

                    if (planType) {
                        postData += '            {';
                        postData += '               "bool":{';
                        postData += '                  "must":[';
                        postData += '                     {';
                        postData += '                        "match":{';
                        postData += '                           "tariff.supportedContractTypes":"' + planType + '"';
                        postData += '                        }';
                        postData += '                     }';
                        postData += '                  ]';
                        postData += '               }';
                        postData += '            },';
                    }

                    if (Object.keys(facets).length !== 0) {

                        for (var facetGroupName in facets) {
                            var facetGroup = facets[facetGroupName];

                            var rules = [];
                            for (i = 0; i < facetGroup.length; i++) {
                                if (facetGroup[i].active === true && facetGroup[i].role !== 'any') {
                                    rules.push(facetGroup[i]);
                                }
                            }

                            if (facetGroup.length && ((facetGroup[0].role === 'any' && rules.length === facetGroup.length - 1) ||
                                                      (facetGroup[0].role === undefined && rules.length === facetGroup.length) ||
                                                      (facetGroup[0].role === 'any' && facetGroup[0].logic) )) {
                                // Skip a group if all the options are selected except when it's a slider
                                continue;
                            }

                            if (rules.length) {
                                postData += '            {';
                                postData += '               "bool":{';

                                if (rules[0].logic) {
                                    // Slider facet
                                    var r = rules[0];
                                    postData += '                  "must":[';
                                    postData += '                      {';
                                    postData += '                          "range": {';
                                    postData += '                              "' + facetGroupName + '": {';
                                    postData += '                                  "' + r.logic + '": ' + r.key;
                                    postData += '                              }';
                                    postData += '                          }';
                                    postData += '                      }';
                                    postData += '                  ]';
                                    postData += '              }';
                                    postData += '          },';
                                } else {
                                    // Buttons/Dropdown facet
                                    postData += '                  "should":[';
                                    for (i = 0; i < rules.length; i++) {
                                        postData += '                     {';
                                        postData += '                        "match":{';
                                        postData += '                           "' + facetGroupName + '":"' + rules[i].key + '"';
                                        postData += '                        }';
                                        postData += '                     },';
                                    }
                                    postData = postData.slice(0, -1);

                                    postData += '                  ],';
                                    postData += '                  "minimum_should_match": 1';
                                    postData += '               }';
                                    postData += '            },';
                                }
                            }
                        }
                        postData = postData.slice(0, -1);

                        postData += '         ]';
                        postData += '      }';
                        postData += '   },';
                    }

                    postData += '   "from": ' + pagination.pageSize * (pagination.currentPage - 1) + ',';
                    postData += '   "size": ' + pagination.pageSize + ',';
                    postData += '   "aggs": {';
                    postData += '       "serviceProvider":{';
                    postData += '           "terms":{';
                    postData += '              "field":"serviceProvider"';
                    postData += '           }';
                    postData += '        },';
                    postData += '        "device.id":{';
                    postData += '           "terms":{';
                    postData += '              "field":"device.id"';
                    postData += '           }';
                    postData += '        }';
                    postData += '    }';
                    postData += '}';

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                function elasticQuery(queryData) {
                    var i,j,r,q,rule,subrule,key,value,postData = {};


                    //
                    // Sort
                    //
                    // sort: [
                    //      {
                    //         'tariff.textAllowance.number': 'desc'
                    //      },
                    //      {
                    //         'tariff.textAllowance.number': 'desc'
                    //      }
                    // ]
                    if (queryData.sort && queryData.sort.length) {
                        postData.sort = queryData.sort;
                    }


                    //
                    // Query
                    //
                    // query: [
                    //      {
                    //          'device.id': device.name
                    //      },
                    //      {
                    //          minimum_should_match:2,
                    //          should: [
                    //              {
                    //                  'device.colour': 'white'
                    //              },
                    //              {
                    //                  'device.colour': 'black',
                    //                  boost: 3,
                    //              }
                    //          ]
                    //      }
                    // ]
                    if (queryData.query) {
                        postData.query = {bool:{must:[]}};

                        q = postData.query.bool.must;

                        for (i=0; i<queryData.query.length; i++) {

                            if (queryData.query[i].should) {
                                // SHOULD
                                rule = {bool:{should:[]}};
                                rule.bool.minimum_should_match = queryData.query[i].minimum_should_match;

                                for (j=0; j<queryData.query[i].should.length; j++) {
                                    subrule = {match:{}};

                                    r = queryData.query[i].should[j];

                                    if (r.boost) {
                                        for (key in r) {
                                            if (key!== 'boost') {
                                                subrule.match[key] = {
                                                    query: r[key],
                                                    boost: r.boost
                                                }
                                            }
                                        }

                                    } else {
                                        subrule.match = r;
                                    }

                                    rule.bool.should.push(subrule);
                                }

                                q.push(rule);

                            } else {
                                // MUST
                                if (queryData.query[i].range) {
                                    // RANGE
                                    rule = {bool:{must:[]}};
                                    rule.bool.must.push(queryData.query[i]);
                                    q.push(rule);

                                } else {
                                    // MATCH
                                    rule = {bool:{must:[{match:{}}]}};

                                    for (key in queryData.query[i]) {
                                        value = queryData.query[i][key].replace(/^"(.*?)"$/g, "\$1");
                                        rule.bool.must[0].match[key] = value;
                                        q.push(rule);
                                    }
                                }
                            }
                        }

                    } else {
                        postData.query = { 'match_all' : {} };
                    }


                    //
                    // Size
                    //
                    // size: 7
                    if (queryData.size !== undefined) {
                        postData.size = queryData.size;
                    }


                    //
                    // From
                    //
                    // from: 3
                    if (queryData.from !== undefined) {
                        postData.from = queryData.from;
                    }


                    //
                    // Aggregations
                    //
                    // aggs: ['device.id', 'serviceProvider']
                    if (queryData.aggs && queryData.aggs.length) {
                        postData.aggs = {};
                        for (i=0; i<queryData.aggs.length; i++) {
                            postData.aggs[queryData.aggs[i]] = {'terms':{'field':queryData.aggs[i]}};
                        }
                    }


                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    //return postData;
                    return (request.then(handleSuccess, handleError));
                }


                function getRecommendations(data) {
                    var selections     = data.selections;
                    var mappings       = data.mappings;
                    var featureGroupMappings = data.featureGroupMappings;
                    var deviceCategory = data.deviceCategory;
                    var postData       = {
                                            query: {
                                                bool: {
                                                    must: []
                                                }
                                            },
                                            size: 1000
                                         };

                    //console.log(data);

                    // Add device category to the query:
                    postData.query.bool.must.push({match:{'device.category1': deviceCategory}})

                    for (var c in selections) {
                        for (var g in selections[c]) {
                            //Skip if no sections in this group
                            if (!selections[c][g].length) { continue; }

                            var newRule = {
                                            bool: {
                                                must: [
                                                    {
                                                        match:{
                                                            "device.features.name": featureGroupMappings[g]
                                                        }
                                                    }
                                                ],
                                                should: [],
                                                minimum_should_match: 1
                                            }
                                        };


                            for (var i = 0; i < selections[c][g].length; i++) {
                                for (var id in mappings[c][g]) {
                                    var mf = mappings[c][g][id];

                                    if (mf.groupValue === selections[c][g][i] &&
                                        mf.filterType === 'hard') {
                                            newRule.bool.should.push({match:{'device.features.id': mf.featureId}});
                                    }
                                }
                            }

                            // And only rules that have should statements (skip soft filters)
                            if (newRule.bool.should.length) {
                                postData.query.bool.must.push(newRule);
                            }
                        }
                    }

//                    console.log(postData);

                    var request = $http({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: config.psi_url,
                        data: postData,
                        params: {
                            action: 'post'
                        }
                    });

                    return (request.then(handleSuccess, handleError));
                }


                // ---
                // PRIVATE METHODS.
                // ---

                function transformUnicode(value) {

                }


                function handleError(response) {
                    // The API response from the server should be returned in a
                    // nomralized format. However, if the request was not handled by the
                    // server (or what not handles properly - ex. server error), then we
                    // may have to normalize it on our end, as best we can.
                    if (!angular.isObject(response.data) || !response.data.message) {
                        ToastService.error('Error loading Devices', 'An unknown error occurred.', {timeOut: 2000});

                        return ($q.reject('An unknown error occurred.'));
                    }
                    // Otherwise, use expected error message.
                    ToastService.error('Error loading Devices', 'Devices could not be loaded', {timeOut: 5000});

                    return ($q.reject(response.data.message));
                }

                // I transform the successful response, unwrapping the application data
                // from the API response payload.
                function handleSuccess(response) {
                    return (response.data);
                }

    /**
     * @param {{query: string, maxAmount: number}} queryData
     * @param {[string]} deviceCategories
     * @param {promise} canceller
     * @returns {promise}
     */
    function findByQueryAndCategories(queryData, deviceCategories, canceller) {
        var categories = [];
        var parameters;
        var query;

        deviceCategories.forEach(function (deviceCategory) {
            categories.push({term: {'device.category1': deviceCategory}});
        });

        var searchTerms = queryData.query;
        var searchType = 'phrase_prefix';

        if (searchTerms.indexOf(' ') > -1) { //if the terms contain a space, use cross_fields
            searchType = 'cross_fields';
        }

        query = {
            size: queryData.maxAmount,
            query: {
                bool: {
                    must: [
                        {
                            bool: {
                                should: categories,
                                minimum_number_should_match: 1
                            }
                        },
                        {
                            multi_match: {
                                fields: [
                                    'device.id',
                                    'device.name',
                                    'device.manufacturer',
                                    'device.model'
                                ],
                                query: queryData.query,
                                type: searchType
                            }
                        }
                    ]
                }
            },
            aggs: {
                devices: {
                    terms: {
                        field: 'device.id'
                    },
                    aggs: {
                        item: {
                            top_hits: {
                                size: 1
                            }
                        }
                    }
                }
            }
        };

        parameters = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            url: config.psi_url,
            data: query,
            params: {
                action: 'post'
            }
        };

        if (canceller) {
            parameters.timeout = canceller.promise;
        }

        return $http(parameters).then(handleSuccess, handleError);
    }

    /**
     * @param {string[]|string} deviceIds
     * @returns {Promise<{queryResult: []}>}
     */
    function findByIds(deviceIds) {
        var query;

        if (!angular.isArray(deviceIds)) {
            deviceIds = [deviceIds];
        }

        query = {
            query: {
                bool: {
                    filter: {
                        terms: {
                            'device.id': deviceIds
                        }
                    }
                }
            },
            size: deviceIds.length
        };

        return $http.post(
            config.psi_url,
            query,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    action: 'post'
                }
            }
        ).then(handleSuccess, handleError);
    }

    /**
     * Uses cached promise for specified deviceId if available.
     *
     * @param {string} deviceId
     * @returns {Promise}
     */
    function getProductDetailsCached(deviceId) {
        if (!devicePromises.hasOwnProperty(deviceId)) {
            devicePromises[deviceId] = $http.post(config.psi_url, generateDeviceSelectionQuery(deviceId))
                .then(function (response) {
                    if (response.data && response.data.queryResult && response.data.queryResult.length) {
                        return response.data.queryResult;
                    }

                    return $q.reject('No results');
                }, handleError);
        }

        return devicePromises[deviceId];
    }
}
