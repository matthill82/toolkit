describe('QuestionsContainerService', function () {
    var mockStateManagement;
    /** @type QuestionsContainerService */
    var QuestionsContainerService;

    beforeEach(module('uitoolkit'));

    beforeEach(function () {
        mockStateManagement = {
            getBasket: function () {
                // ('questions')
            },
            setBasketItem: function () {
                // 'questions', questionTitle + ::: + dataPointFeatures
            },
            removeBasketItem: function () {
                // 'questions', questionTitle + ::: + dataPointFeatures
            }
        };

        spyOn(mockStateManagement, 'getBasket');
        spyOn(mockStateManagement, 'setBasketItem');
        spyOn(mockStateManagement, 'removeBasketItem');

        module(function ($provide) {
            $provide.value('StateManagement', mockStateManagement);
        });
    });

    beforeEach(inject(function (_QuestionsContainerService_) {
        QuestionsContainerService = _QuestionsContainerService_;
    }));

    it('.updateLocalStorage()', function () {
        expect(QuestionsContainerService.updateLocalStorage).toBeDefined();
    });

    it('call setBasketItem if basket is empty', function () {
        mockStateManagement.getBasket = function () {
            return null;
        };

        QuestionsContainerService.updateLocalStorage('title', 'features');

        expect(mockStateManagement.setBasketItem).toHaveBeenCalledWith('questions', 'title:::"features"');
    });


    it('call setBasketItem if basket is not empty but doesn\'t contain the current item' , function () {
        mockStateManagement.getBasket = function () {
            return ['title1:::"features1"'];
        };

        QuestionsContainerService.updateLocalStorage('title2', 'features2');

        expect(mockStateManagement.setBasketItem).toHaveBeenCalledWith('questions', 'title2:::"features2"');
    });

    it('call removeBasketItem if basket contain the current item' , function () {
        mockStateManagement.getBasket = function () {
            return ['title1:::"features1"', 'title2:::"features2"'];
        };

        QuestionsContainerService.updateLocalStorage('title1', 'features1');

        expect(mockStateManagement.removeBasketItem).toHaveBeenCalledWith('questions', 'title1:::"features1"');
    });
});
