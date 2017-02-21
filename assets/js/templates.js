angular.module('uitoolkit').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/components/ng-components/accessories-cross-sell-item/accessories-cross-sell-item.html',
    "<div class=\"{{ :: $ctrl.AccessoriesCrossSellContainerController.cssColumnClass }}\" ng-if=$ctrl.AccessoriesCrossSellContainerController.accessoriesForCategories[$ctrl.category2]><div class=\"accessoriesCrossSellItem richtext__info-box\" ng-repeat=\"item in $ctrl.AccessoriesCrossSellContainerController.accessories | filter: { device: { id: $ctrl.AccessoriesCrossSellContainerController.accessoriesForCategories[$ctrl.category2] } } | limitTo: 1\"><div class=accessoriesCrossSellItem__category ng-click=$ctrl.categoryOnClick()>{{ :: $ctrl.categoryLabel }}</div><div class=\"accessoriesCrossSellItem__title accessoriesCrossSellItem__title--brand\">{{ item.device.manufacturer }}</div><div class=\"accessoriesCrossSellItem__title accessoriesCrossSellItem__title--name\">{{ item.device.name }}</div><div class=accessoriesCrossSellItem__image ng-click=$ctrl.imageOnClick(item.device.id)><img ng-src=\"{{ item.device.imagery[0].url }}\" alt=\"{{ item.device.brand }} {{ item.device.name }}\"></div><div class=accessoriesCrossSellItem__price><uit-price-format number=item.offering[0].upfrontPrice.net.value></uit-price-format></div><uit-product-select on-select=$ctrl.select(item) on-is-selected=$ctrl.isSelected(item) select-text=\"{{ :: $ctrl.AccessoriesCrossSellContainerController.basketCtaSelectLabel }}\" selected-text=\"{{ :: $ctrl.AccessoriesCrossSellContainerController.basketCtaSelectedLabel }}\"></uit-product-select></div></div>"
  );


  $templateCache.put('/components/ng-components/account-lookup/account-lookup.html',
    "<div class=\"hb value ng-scope\" ng-if=!node.schema.enum><span class=hb>{{:: $ctrl.MobileNumber}}</span> <span class=\"hb error\" ng-show=node.error>{{mobileNumber-validation-title}}</span> <input id=account.subscriber.mobileNumber ng-model=node.value class=hb ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node></div><div class=\"hb value ng-scope\" ng-if=!node.schema.enum><span class=hb>{{:: $ctrl.Pin}}</span> <span class=\"hb error ng-binding ng-hide\" ng-show=node.error>pin-validation-title</span> <input id=account.pin ng-model=node.value class=hb ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node></div>"
  );


  $templateCache.put('/components/ng-components/barcode-scanner-field/barcode-scanner-field.html',
    "<img class=barcodeScannerImg ng-src={{$ctrl.imgUrl}} ng-click=$ctrl.scanBarcode()>"
  );


  $templateCache.put('/components/ng-components/basket-advanced/basket-advanced-attachment/basket-advanced-attachment.html',
    "<div class=basket-advanced-attachment><img class=image ng-src=\"{{ :: $ctrl.basketItem.imageUrl | relativeUrl }}\" alt=\" \" ng-if=\"$ctrl.basketItem.imageUrl !== '-'\"><div class=details><div class=name>{{ :: $ctrl.basketItem.name }}</div><div class=monthly ng-if=\"$ctrl.basketItem.selectedOffering.offeringType == 'monthlyContract'\">{{ :: $ctrl.monthlyPaymentText }}<div class=monthly-price><uit-price-format number=\":: $ctrl.basketItem.price\"></uit-price-format></div></div><div class=product-code>{{ :: $ctrl.codeText }} {{ :: $ctrl.basketItem.id }}</div><uit-price-format class=item-price number=\":: $ctrl.basketItem.price\"></uit-price-format></div><a class=\"remove {{ :: $ctrl.removeIcon }}\" ng-click=$ctrl.remove()></a></div>"
  );


  $templateCache.put('/components/ng-components/basket-advanced/basket-advanced-proposition/basket-advanced-proposition.html',
    "<div class=basket-advanced-proposition><img class=image ng-src=\"{{ :: $ctrl.basketItem.imageUrl | relativeUrl }}\" alt=\" \"><div class=details><div class=name>{{ :: $ctrl.basketItem.name }}</div><div class=product-code>{{ :: $ctrl.codeText }} {{ :: $ctrl.basketItem.id }}</div><uit-price-format class=item-price number=\":: $ctrl.basketItem.price\"></uit-price-format></div></div>"
  );


  $templateCache.put('/components/ng-components/basket-advanced/basket-advanced.html',
    "<div class=basket-advanced-container><div class=basket-advanced><basket-advanced-proposition basket-item=\":: proposition\" code-text=\"{{ :: $ctrl.codeText }}\" ng-repeat=\"proposition in $ctrl.basket.propositions\"></basket-advanced-proposition><basket-advanced-attachment basket-item=\":: attachment\" class=basket-advanced-item-slide-up code-text=\"{{ :: $ctrl.codeText }}\" monthly-payment-text=\"{{ :: $ctrl.monthlyPaymentText }}\" ng-class=\"{'basket-advanced-attachment--last': $last}\" ng-repeat=\"attachment in $ctrl.basket.attachments | orderBy : $ctrl.orderFunc\" remove=$ctrl.removeAttachment(attachment) remove-icon=\"{{ :: $ctrl.removeIcon }}\"></basket-advanced-attachment></div></div>"
  );


  $templateCache.put('/components/ng-components/basket-builder/basket-builder.html',
    "<div class=\"fl fl--full-height fl--flex-direction-column fl--margin-top basketBuilder\"><div class=\"fl fl--margin-bottom\" ng-class=\"{'fl--flex-grow-2': $ctrl.panelOpen === 'device', 'fl--flex-grow-1': !$ctrl.panelOpen === 'device'}\"><div><uit-basket-builder-device propositions=\"{{:: $ctrl.devicePropositions }}\" journey-type=\"{{:: $ctrl.difJourneyType }}\" feature-icons=\"{{:: $ctrl.numberFeatureIcons }}\" button-label=\"{{:: $ctrl.deviceButtonLabel }}\" button-label-active=\"{{:: $ctrl.deviceButtonLabelActive }}\" button-active-icon=\"{{:: $ctrl.deviceButtonActiveIcon }}\" details-label=\"{{:: $ctrl.deviceDetailsLabel }}\" details-icon=\"{{:: $ctrl.deviceDetailsIcon }}\" details-link=\"{{:: $ctrl.deviceDetailsLink }}\" edit-label=\"{{:: $ctrl.deviceEditLabel }}\" edit-icon=\"{{:: $ctrl.deviceEditIcon }}\" edit-link=\"{{:: $ctrl.deviceEditLink }}\" image-link=\"{{:: $ctrl.deviceImageLink }}\" imei-link=\"{{:: $ctrl.deviceImeiLink }}\" not-started-label=\"{{:: $ctrl.deviceNotStartedLabel }}\" cta-link=\"{{:: $ctrl.deviceCtaLink }}\" in-progress-label=\"{{:: $ctrl.deviceInProgressLabel }}\" section-type=phone disabled-state=$ctrl.planDisabledState panel-open=$ctrl.panelOpen></uit-basket-builder-device></div></div><div class=fl ng-class=\"{'fl--flex-grow-2': $ctrl.panelOpen === 'plan', 'fl--flex-grow-1': !$ctrl.panelOpen === 'plan'}\"><div><uit-basket-builder-plan title=\"{{:: $ctrl.planTitle }}\" full-plan-label=\"{{:: $ctrl.planFullPlanLabel }}\" plan-feature-icon=\"{{:: $ctrl.planFeatureIcon }}\" not-started-label=\"{{:: $ctrl.planNotStartedLabel }}\" in-progress-label=\"{{:: $ctrl.planInProgressLabel }}\" cta-link=\"{{:: $ctrl.planCtaLink }}\" edit-link=\"{{:: $ctrl.planEditLink }}\" edit-label=\"{{:: $ctrl.planEditLabel }}\" edit-icon=\"{{:: $ctrl.planEditIcon }}\" full-plan-link=\"{{:: $ctrl.planFullPlanLink }}\" full-plan-icon=\"{{:: $ctrl.planFullPlanIcon }}\" journey-type=\"{{:: $ctrl.difJourneyType }}\" section-type=plan disabled-state=$ctrl.planDisabledState panel-open=$ctrl.panelOpen></uit-basket-builder-plan></div></div></div>"
  );


  $templateCache.put('/components/ng-components/basket-summary/basket-items/basket-items.html',
    "<div class=basketItems><div class=\"basketItems__extended-price clearfix\"><uit-price-format ng-if=\"$ctrl.items.data.offering[0].offeringType === 'monthlyContract'\" class=item-price number=\":: $ctrl.items.upfrontPrice\"></uit-price-format><uit-price-format ng-if=\"$ctrl.items.data.offering[0].offeringType === 'monthlyLease'\" class=item-price number=\":: $ctrl.items.price\"></uit-price-format><p class=basketItems__extended-pay-type ng-if=\"$ctrl.items.data.offering[0].offeringType == 'monthlyContract'\">{{ :: $ctrl.payMonthlyTitle }}</p><p class=basketItems__extended-pay-type ng-if=\"$ctrl.items.data.offering[0].offeringType == 'monthlyLease'\">{{ :: $ctrl.payTodayTitle }}</p></div><ul class=basketItems__list><li><h3 class=basketItems__total><uit-price-format class=basketItems__list-item-price--right number=\":: $ctrl.items.price\"></uit-price-format></h3><p class=basketItems__total-title>{{$ctrl.payTotalTitle}}</p></li><li class=\"fl fl--grid-row basketItems__list-item clearfix\"><div class=basketItems__list-item--left><p ng-if=$ctrl.items.data.device.model>{{:: $ctrl.items.data.device.model}} {{:: $ctrl.items.data.device.manufacturer}}</p></div><div class=basketItems__list-item--right><uit-price-format class=basketItems__list-item-price--right number=\":: $ctrl.items.upfrontPrice\"></uit-price-format></div></li><li class=\"fl fl--grid-row basketItems__list-item clearfix\" ng-if=$ctrl.items.data.tariff.name><div class=basketItems__list-item--left><p>{{ :: $ctrl.items.data.tariff.name }}</p></div><div class=basketItems__list-item--right><uit-price-format class=basketItems__list-item-price--right number=\":: $ctrl.items.price\"></uit-price-format></div></li><li ng-show=false class=\"fl fl--grid-row basketItems__list-item clearfix\"><div class=basketItems__list-item--left ng-init=\"$ctrl.initialState = false\"><div class=basketItems__list-pricing ng-click=\"$ctrl.initialState = !$ctrl.initialState\">{{ :: $ctrl.feesLabel }} <span class=\"basketItems__icon {{$ctrl.icon}}\" ng-class=\"{'basketItems__icon--rotate' : $ctrl.initialState}\"></span></div></div><div class=basketItems__list-item--right><uit-price-format ng-if=\"$ctrl.items.data.offering[0].offeringType === 'monthlyLease'\" class=basketItems__list-item-price--right number=\":: $ctrl.items.upfrontPrice\"></uit-price-format><uit-price-format ng-if=\"$ctrl.items.data.offering[0].offeringType === 'monthlyContract'\" class=basketItems__list-item-price--right number=\":: $ctrl.items.recurringPrice\"></uit-price-format></div></li><li class=basketItems--dropdown ng-show=$ctrl.initialState><div class=\"fl fl--grid-row basketItemss--dropdown-item clearfix\"><div class=basketItems__list-item--left><p>{{:: $ctrl.feesDropLabel1 }}</p></div><div class=basketItems__list-item--right><uit-price-format class=basketItems__list-item-price--right number=\":: $ctrl.items.fees.activation\"></uit-price-format></div></div><div class=\"fl fl--grid-row basketItemss--dropdown-item clearfix\"><div class=basketItems__list-item--left><p>{{:: $ctrl.feesDropLabel2 }}</p></div><div class=basketItems__list-item--right><uit-price-format class=basketItems__list-item-price--right number=\":: $ctrl.items.fees.taxes\"></uit-price-format></div></div></li></ul></div>"
  );


  $templateCache.put('/components/ng-components/basket-summary/basket-summary-advanced.html',
    "<div class=basketSummaryAdvanced><basket-summary-header header-title=\":: $ctrl.advancedTitle\" has-padding=true></basket-summary-header><div class=\"basketSummaryAdvanced__content basketSummaryAdvanced__content--scroll-y basketSummaryAdvanced__content--padding-top\"><div><basket-items ng-if=$ctrl.newBasket[0] items=$ctrl.newBasket[0] icon=\"cwsicon cwsicon-arrow-menu-down\" pay-total-title=\"Pay Today\" fees-label=\"Fees & Extras\" fees-drop-label-1=\"Activation Fee\" fees-drop-label-2=Taxes></basket-items><basket-items ng-if=$ctrl.newBasket[1] items=$ctrl.newBasket[1] icon=\"cwsicon cwsicon-arrow-menu-down\" pay-total-title=\"Pay Monthly\" fees-label=\"Fees & Extras\" fees-drop-label-1=\"Activation Fee\" fees-drop-label-2=Taxes></basket-items></div></div><basket-summary-checkout button-text=\" :: $ctrl.advancedButtonText\" button-path=\":: $ctrl.advancedButtonPath\" has-padding=true></basket-summary-checkout></div>"
  );


  $templateCache.put('/components/ng-components/basket-summary/basket-summary-checkout/basket-summary-checkout.html',
    "<div class=basketSummaryCheckout--full ng-class=\"{ 'has-padding' : $ctrl.hasPadding }\"><button ng-class=\"{ 'basketSummaryCheckout__button--disabled': $ctrl.isButtonEnabled }\" class=basketSummaryCheckout__button type=button value=\"{{ :: $ctrl.buttonText }}\">{{ :: $ctrl.buttonText }}</button></div>"
  );


  $templateCache.put('/components/ng-components/basket-summary/basket-summary-header/basket-summary-header.html',
    "<div class=basketSummaryHeader__fixed-container ng-class=\"{'has-padding' : $ctrl.hasPadding }\"><h6 class=basketSummaryHeader__title>{{ :: $ctrl.headerTitle }}</h6></div>"
  );


  $templateCache.put('/components/ng-components/basket-summary/basket-summary.html',
    "<div class=\"basket-summary-container hide-in-edit-design-aemmode\"><div class=basket-summary-panel><div class=basket-summary><div class=title>{{ :: $ctrl.titleText }}</div><div class=basket-summary-content><div class=savings><div class=label>{{ :: $ctrl.savingsText }}</div><div class=amount><uit-price-format class=item-price number=$ctrl.basket.saving></uit-price-format></div></div><div class=total><div class=label>{{ :: $ctrl.totalText }}</div><div class=amount><uit-price-format class=item-price number=$ctrl.basket.total></uit-price-format></div></div><a class=checkout ng-click=$ctrl.checkout()>{{ :: $ctrl.checkoutButtonText }}</a></div></div><div class=\"modal-backdrop fade in\" ng-class=\"{active: $ctrl.modalOpen}\"></div><div class=\"modal bootstrap-dialog fade in\" ng-class=\"{active: $ctrl.modalOpen}\" ng-click=\"$ctrl.modalOpen = false\" role=dialog><div class=\"modal-dialog {{ :: $ctrl.modalSize }} type-normal\"><div class=modal-content><div class=\"modal-header no-warning\"><button class=\"close {{ :: $ctrl.modalCloseIcon }} pull-right\" data-dismiss=modal ng-click=\"$ctrl.modalOpen = false\" type=button></button><h4 class=modal-title>{{ :: $ctrl.modalTitleText }}</h4></div><div class=\"modal-body modal-basket\"><ng-include ng-if=$ctrl.modalOpen src=$ctrl.modalContentUrl></ng-include></div></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/basket-total/basket-total.html',
    "<div class=basket-total><div class=savings><span class=label>{{ :: $ctrl.savingsText }}</span> <span class=amount><uit-price-format class=item-price number=$ctrl.basket.saving></uit-price-format></span></div><div class=total><span class=label>{{ :: $ctrl.totalText }}</span> <span class=amount><uit-price-format class=item-price number=$ctrl.basket.total></uit-price-format></span></div></div>"
  );


  $templateCache.put('/components/ng-components/basket/basket.html',
    "<div class=\"col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 dr-basket component\"><h1>{{mainTitle}}</h1><div class=basket-container ng-repeat=\"planItem in bc.planObj.queryResult | limitTo:1\"><div class=row><div class=\"col-lg-8 col-md-8 col-lg-offset-2 col-md-offset-2 basket-results\"><div class=row><div class=\"col-lg-3 col-md-3\"><img data-ng-src={{bc.imagePath}} alt={{bc.deviceObj.name}} title={{bc.deviceObj.name}}></div><div class=\"col-lg-9 col-md-9\"><h2>{{planItem.device.manufacturer}} {{planItem.device.name | htmlToPlaintext}}</h2><p class=device-details><span class=data>{{colourLabel}}:</span> {{bc.colourName}}</p><p class=device-details ng-if=\"bc.capacity !== ''\"><span class=data>{{capacityLabel}}:</span> {{bc.capacity}}</p><p class=device-details><span class=data>{{quantityLabel}}: </span>1</p></div></div></div></div><div class=row><div class=\"col-lg-9 col-md-9 col-sm-9 col-lg-offset-2 col-md-offset-2\"><div class=row><plan></plan></div></div></div><div class=basket-table-top></div><div class=\"row basket-plan-container\"><div class=\"col-lg-10 col-xs-10 col-lg-offset-1 col-md-offset-1 plan-payment\"><div class=row><div class=totals><div class=price><uit-price-format number=planItem.offering[0].upfrontPrice.net.value></uit-price-format></div><p class=total-pay>{{payTodayLabel}}</p></div></div></div></div></div><div class=\"row basket-plan-container plan-payment\" ng-hide=emptyBasket><div class=\"col-lg-12 col-md-12\"><div class=row><div class=\"col-lg-12 col-md-12\"><a class=\"btn btn-cws\" role=button ng-click=\"bc.completeTransaction(bc.device, ctaPath)\">{{ctaLabel}}</a></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/billing-details/billing-details.html',
    "<div class=billingDetails><h4 class=billingDetails__title>Billing details</h4><div class=billingDetails__row><div class=billingDetails__column><p class=billingDetails__details>{{:: $ctrl.account.billingName.firstName}} {{:: $ctrl.account.billingName.lastName}}</p><p class=billingDetails__details>{{:: $ctrl.account.mobileNumber}}</p><p class=billingDetails__details>{{:: $ctrl.account.email}}</p></div><div class=billingDetails__column><p class=billingDetails__details>{{:: $ctrl.account.billingAddress.line1}}</p><p class=billingDetails__details>{{:: $ctrl.account.billingAddress.line2}}</p><p class=billingDetails__details>{{:: $ctrl.account.billingAddress.zipCode}} {{:: $ctrl.account.billingAddress.city}}</p></div></div></div>"
  );


  $templateCache.put('/components/ng-components/breadcrumb/breadcrumb.html',
    "<div class=breadcrumb ng-class=\"{'breadcrumb--icons-theme' : $ctrl.themeIcons }\"><ul class=breadcrumb__list><li ng-class=\"{\n" +
    "                'breadcrumb__list-item--active': $index === $ctrl.activeItemIndex,\n" +
    "                'breadcrumb__list-item--complete': $index < $ctrl.activeItemIndex\n" +
    "            }\" ng-click=$ctrl.goTo($index) ng-repeat=\"item in $ctrl.breadcrumb\"><span ng-if=$ctrl.themeIcons class=breadcrumb__icon ng-class=\"{\n" +
    "            '{{$ctrl.completeIcon}}' : $index < $ctrl.activeItemIndex,\n" +
    "            '{{item.icon}}' : $index >= $ctrl.activeItemIndex\n" +
    "             }\"></span>{{ :: item.label}}</li></ul></div>"
  );


  $templateCache.put('/components/ng-components/bundle/bundle.html',
    "<div class=bundle><div class=row ng-if=$ctrl.bundle><div class=col-xs-4><h6 class=price-text>{{ :: $ctrl.priceText }}&nbsp;<uit-price-format class=bandle-main-price number=$ctrl.bundle.price></uit-price-format></h6><p class=separate-price>{{ :: $ctrl.separateText }}&nbsp;<uit-price-format number=$ctrl.bundle.productPrice></uit-price-format></p></div><div class=col-xs-4><h6 class=save-text><span class=you-save>{{ :: $ctrl.saveText }}&nbsp;<uit-price-format number=$ctrl.bundle.saving></uit-price-format></span></h6></div><div class=\"col-xs-4 bundle-upsell-message\" ng-if=$ctrl.upsellMessageSce><div class=more-text ng-bind-html=$ctrl.upsellMessageSce></div></div></div><div ng-if=!$ctrl.bundle class=bundle-no-selection ng-bind-html=$ctrl.noProductSelectedTextSce></div></div>"
  );


  $templateCache.put('/components/ng-components/button-next-previous/button-next-previous.html',
    "<div class=\"actions dr-button-next-previous component\"><a style=\"{{ :: $ctrl.xOffsetStyle }}\" ng-click=$ctrl.goToPage()><span class=\"{{ :: $ctrl.icon }}\" aria-hidden=true style=\"{{ :: $ctrl.iconStyle }}\"></span><span class=sr-only>{{ :: $ctrl.label }}</span></a></div>"
  );


  $templateCache.put('/components/ng-components/carousel-go-to/carousel-go-to.html',
    "<button class=\"carouselGoTo {{ :: $ctrl.icon }}\" ng-disabled=$ctrl.disabled() ng-click=$ctrl.go()>{{ :: $ctrl.text }}</button>"
  );


  $templateCache.put('/components/ng-components/carousel-indicator/carousel-indicator.html',
    "<ul class=\"carouselIndicator carouselIndicator--{{ $ctrl.indicatorTheme }}\"><li class=carouselIndicator__item ng-class=\"{'carouselIndicator__item--on': $ctrl.CarouselContainerController.visible.indexOf($index) > -1}\" ng-repeat=\"i in [] | addNumbers : $ctrl.CarouselContainerController.items\"></li></ul>"
  );


  $templateCache.put('/components/ng-components/contract-actions/contract-actions.html',
    "<div class=contractActions><div class=contractActions__buttons-container><a class=contractActions__button>Sign {{ $ctrl.contractType }} contract</a></div><div class=contractActions__buttons-container><a class=contractActions__button>Print</a> <a class=contractActions__button>Share</a></div></div>"
  );


  $templateCache.put('/components/ng-components/contract-review/contract-review.html',
    "<div class=contractReview><h4 class=contractReview__title>Let's review your contact</h4><div class=contractReview__contractsActions-container><div class=contractReview__contractActions-container ng-repeat=\"contractType in $ctrl.contractTypes\"><contract-actions contract-type=contractType></contract-actions></div></div></div>"
  );


  $templateCache.put('/components/ng-components/cta/cta.html',
    "<div class=\"btn-container {{ $ctrl.alignment }}\"><button class=\"btn btn-cws\" ng-click=$ctrl.goToPage() ng-disabled=$ctrl.isButtonDisabled>{{ $ctrl.label }}</button></div>"
  );


  $templateCache.put('/components/ng-components/customer-average-usage/customer-average-usage.html',
    "<div class=customerAverageUsage><uit-title-block title=\"{{ :: $ctrl.title}}\"></uit-title-block><div class=customerAverageUsage__details><uit-device-usage orientation=horizontal data=$ctrl.averageUsageList></uit-device-usage><a ng-show=false href=\"{{:: $ctrl.ctaPath }}\" class=customerAverageUsage__info-link><span class=\"customerAverageUsage__info-icon {{:: $ctrl.ctaIcon }}\"></span></a></div></div>"
  );


  $templateCache.put('/components/ng-components/customer-checkout-cta/customer-checkout-cta.html',
    "<div class=customerCheckoutCta><a href=# ng-class=\"{ 'customerCheckoutCta__button-disabled': !$ctrl.ctaEnabled }\"><h5>Continue</h5></a></div>"
  );


  $templateCache.put('/components/ng-components/customer-device/customer-device.html',
    "<div class=customerDevice><uit-title-block title=\"{{ :: $ctrl.title}}\"></uit-title-block><div class=customerDevice__image><div class=customerDevice__image-inner><product-image device-id=\"{{ :: $ctrl.proposition.device.internationalIdentifier}}\"></product-image></div></div><div class=customerDevice__details><div class=customerDevice__details-inner><h3>{{ :: $ctrl.proposition.device.model }}</h3><ul class=customerDevice__spec><li><span ng-if=$ctrl.proposition.device.capacity>{{ :: $ctrl.proposition.device.capacity.amount}} {{ :: $ctrl.proposition.device.capacity.unit}} </span><span ng-if=$ctrl.proposition.device.colour>{{ :: $ctrl.proposition.device.colour}}</span></li><li ng-if=$ctrl.offering.termLength>{{ :: $ctrl.offering.termLength}} {{ :: $ctrl.offering.termLengthUnits}} {{ :: $ctrl.offeringTypeMapping }}</li><li ng-if=$ctrl.offering.regularInstallmentAmount.net.value><uit-price-format number=\":: $ctrl.offering.regularInstallmentAmount.net.value\"></uit-price-format>/{{ ::$ctrl.offering.termLengthUnits}}</li></ul><uit-icon-list list=\"[{ icon: $ctrl.upgradeIcon, text: $ctrl.upgradeMessage }]\"></uit-icon-list></div></div></div>"
  );


  $templateCache.put('/components/ng-components/customer-identification/customer-identification.html',
    "<div class=customerIdentification><div class=customerIdentification__label>Customer name</div><div class=customerIdentification__details>{{$ctrl.account.identity.fullName}}</div><div class=customerIdentification__label>Cell number</div><div class=customerIdentification__details>{{$ctrl.mobileNumber}}</div><div class=customerIdentification__label>Billing name and address</div><div class=customerIdentification__details>{{$ctrl.account.identity.fullName}}</div><div class=customerIdentification__details>{{$ctrl.account.addresses.billing.buildingNumber}} {{$ctrl.account.addresses.billing.line1}}</div><div class=customerIdentification__details>{{$ctrl.account.addresses.billing.line2}}</div><div class=customerIdentification__details>{{$ctrl.account.addresses.billing.city}} {{$ctrl.account.addresses.billing.provinceCode}} {{$ctrl.account.addresses.billing.postalCode}}</div></div>"
  );


  $templateCache.put('/components/ng-components/customer-info-bar/customer-details/customer-details.html',
    "<ul class=customerInfoBar__details><li><span class=\"customerInfoBar__icon {{ :: $ctrl.customerIcon }}\"></span></li><li class=customerInfoBar__name>{{ :: $ctrl.fullName}}</li><li class=customerInfoBar__number>{{ :: $ctrl.mobile }}</li></ul>"
  );


  $templateCache.put('/components/ng-components/customer-info-bar/customer-info-bar.html',
    "<div class=customerInfoBar><customer-details cd-customer-icon=\":: $ctrl.customerIcon\"></customer-details><left-action ng-if=$ctrl.leftActions la-text=\":: $ctrl.leftActions[0].text\" la-icon=\":: $ctrl.leftActions[0].icon\" la-path=\":: $ctrl.leftActions[0].path\"></left-action><title-component tc-tag=h4 tc-title=\"{{:: $ctrl.title}}\" tc-alignment=center></title-component><print-icon ng-if=$ctrl.rightActions cp-icon=\":: $ctrl.rightActions[0].icon\" cp-path=\":: $ctrl.rightActions[0].path\"></print-icon></div>"
  );


  $templateCache.put('/components/ng-components/customer-plan/customer-plan.html',
    "<div class=customerPlan><uit-title-block title=\"{{ :: $ctrl.title}}\"></uit-title-block><div class=customerPlan__allowances><div class=customerPlan__data><h2 class=customerPlan__data-amount>{{ :: $ctrl.tariff.dataAllowance.number}}{{ :: $ctrl.tariff.dataAllowance.units}}</h2><span class=customerPlan__data-label>{{ :: $ctrl.dataPerMonthLabel}}</span></div><div class=customerPlan__units><uit-device-usage orientation=vertical data=$ctrl.deviceDataList></uit-device-usage></div></div><div class=customerPlan__details><div class=customerPlan__details-inner><h3>{{ :: $ctrl.tariff.name}}</h3><ul class=customerPlan__costs><li ng-if=$ctrl.offering.termLength>{{ :: $ctrl.offering.termLength}} {{ :: $ctrl.offering.termLengthUnits}} {{ :: $ctrl.offeringTypeMapping }}</li><li ng-if=$ctrl.offering.regularInstallmentAmount.net.value><uit-price-format number=\":: $ctrl.offering.regularInstallmentAmount.net.value\"></uit-price-format>/{{ :: $ctrl.offering.termLengthUnits}}</li></ul><uit-icon-list list=$ctrl.featureList></uit-icon-list></div></div></div>"
  );


  $templateCache.put('/components/ng-components/customer-upgrade/customer-upgrade.html',
    "<div class=customerUpgrade><img class=customerUpgrade__image src=\"{{ :: $ctrl.upgradeInfo.image }}\"><div class=customerUpgrade__details><h2>{{ :: $ctrl.upgradeInfo.title}}</h2><p>{{ :: $ctrl.upgradeInfo.message }}</p></div><div class=customerUpgrade__button-container><button ng-click=$ctrl.goToRoute($ctrl.upgradeInfo.buttonUrl) class=customerUpgrade__button>{{ :: $ctrl.upgradeInfo.buttonLabel }}</button></div></div>"
  );


  $templateCache.put('/components/ng-components/customer-visualisation/account-summary/account-summary.html',
    "<div class=customer ng-if=\"$ctrl.account !== undefined\"><h5 class=customer-heading-title>Customer Account Summary</h5><h6 class=block>Full Name</h6><p>{{ $ctrl.account.billingName.firstName + ' ' + $ctrl.account.billingName.lastName }}</p><h6>Billing Address</h6><p>{{$ctrl.account.billingAddress.line1}}</p><p>{{$ctrl.account.billingAddress.city}}</p><p>{{$ctrl.account.billingAddress.zipCode}}</p><h6>Device Availability</h6><p></p></div>"
  );


  $templateCache.put('/components/ng-components/customer-visualisation/current-device/current-device.html',
    "<div class=current-device ng-if=\"$ctrl.device !== undefined\"><h5 class=device-heading-title>Current Device</h5><h6 class=hb-node>Device name</h6><p>{{$ctrl.device.currentDevice.name}}</p><h6 class=hb-node>Retailer</h6><p>{{$ctrl.device.currentDevice.name}}</p><h6 class=hb-node>Activation Date</h6><p>{{$ctrl.device.currentDevice.activationDate}}</p><h6 class=hb-node>Start/End date</h6><p></p></div>"
  );


  $templateCache.put('/components/ng-components/customer-visualisation/customer-component-container.html',
    "<div class=\"wrapper col-sm-12 col-md-12\" ng-if=model.obj><customer-visualisation customer=model.obj></customer-visualisation></div>"
  );


  $templateCache.put('/components/ng-components/customer-visualisation/customer-visualisation.html',
    "<div class=container ng-if=model.obj><div class=\"col-sm-12 col-md-12\"><div class=row><div class=\"col-sm-6 col-md-6\"><current-device device=model.obj.subscriber></current-device></div><div class=\"col-sm-6 col-md-6\"><account-summary account=model.obj></account-summary></div></div><div><eligibility eligibility=model.obj></eligibility></div></div></div>"
  );


  $templateCache.put('/components/ng-components/customer-visualisation/eligibility/eligibility.html',
    "<div class=eligibility ng-if=\"$ctrl.eligibility !== undefined\"><div class=left-column><h5 class=eligibility-heading-title>Eligibility</h5><h6 class=hb-node>Loan eligibility</h6><p>{{:: $ctrl.eligibility.loanLeaseEligibilityInd}}</p><h6 class=hb-node>Lease eligibility</h6><p>{{:: $ctrl.eligibility.subscriber.loanLeaseEligibilityInd}}</p><h6 class=hb-node>Lease existing</h6><p ng-if=$ctrl.eligibility.subscriber.leaseExistInd></p></div><div class=right-column><h6 class=hb-node>Eligible from</h6><p>{{ :: $ctrl.eligibility.subscriber.eligibleDate}}</p><h6 class=hb-node>Eligible from</h6><p>{{ :: $ctrl.eligibility.subscriber.eligibleTierList[0].eligibleTierDate}}</p><h6 class=hb-node>Lease ends</h6><p ng-if=\"$ctrl.eligibility.subscriber.leaseExistInd === 'true'\"></p></div></div>"
  );


  $templateCache.put('/components/ng-components/device-benefits/device-benefits.html',
    "<ul class=benefits ng-if=$ctrl.benefits.length same-height=benefits><li ng-if=benefitCategory.length ng-repeat=\"benefitCategory in $ctrl.benefits | limitTo : $ctrl.benefitsLimit\"><span ng-repeat=\"benefit in :: benefitCategory\">{{ :: benefit.value }}&nbsp;</span></li></ul>"
  );


  $templateCache.put('/components/ng-components/device-carousel/device-carousel.html',
    "<div id=drcarousel ng-class=\"{'device-compare' : isCompare === 'true'}\" class=\"dr-device-carousel component\" data-compare={{isCompare}} ng-init=\"mycompare = isCompare\"><div ng-if=\"isCompare === 'true'\" id=device-compare><div class=\"dr-device-compare component\" ng-init=\"searchResults = loadCompareDevices()\"><h1>{{compareTitle | htmlToPlaintext}}</h1><div class=compare-buttons ng-if=\"compareResultsPathLabel !== ''\"><a class=\"btn btn-cws\" role=button ng-click=goTo(compareResultsPath)>{{compareResultsPathLabel}}</a></div><p ng-hide=thereAreCompareItems()>{{noResultsMsg}}</p></div></div><div ng-if=\"isCompare !== 'true'\"><div ng-init=\"searchResults = loadProductData(deviceCategory,planType,filterDevices, filterFeatures,useQuestions)\"></div></div><div class=\"component no-results\" ng-if=\"noResults === true\"><p>{{noResultsMsg}}</p></div><div class=row><div class=sticky><div class=\"sticky-box col-lg-3 col-md-3 col-sm-3 phone-top\" ng-repeat=\"deviceObj in searchResults\" ng-if=\"$index >= offset\" ng-init=\"device = deviceObj.item.hits.hits[0]._source.device\"><div class=sticky-item><div id=sticky-{{$index}}><div class=sticky-content data-device-name={{device.name}}><img data-ng-src={{device.available_colours[0].imagery[0].url}}><div class=sticky-device-name>{{device.model}}</div><div class=sticky-device-brand>{{device.manufacturer}}</div></div></div><a ng-class=\"{ active: getCompare(device.name)}\" class=compare ng-if=\"isCompare !== 'true'\" data-device={{device.name}} ng-click=addRemoveCompare(device)></a> <a ng-class=\"{ active: getCompare(device.name)}\" class=\"bin-compare {{removeCompareIcon}}\" ng-if=\"isCompare === 'true'\" data-device={{device.name}} ng-click=\"removeCompare($index, device)\"></a></div></div></div></div><div class=row ng-init=\"index=0\"><slick class=\"slick-carousel col col-xs-12\" ng-class=\"{'decrease-top-padding':noResults === true}\" style=\"visibility: hidden\" current-index=index infinite=false touch-move=true draggable=true touch-threshold=100 css-ease=none prev-arrow-class={{buttonLeftIcon}} next-arrow-class={{buttonRightIcon}} ng-if=searchResults.length init-onload=false slides-to-show={{slidesToShow}} slides-to-scroll={{slidesToScroll}} data=searchResults><device-results dr-cta-text={{viewDetailsText}} dr-hide-color-options={{hideColorOptions}} dr-device-link={{redirectUrl}} dr-available-colours-text={{deviceSwatchText}} dr-is-compare={{isCompare}} dr-remove-from-compare-icon={{removeCompareIcon}} dr-compare-icon={{addToCompareInactive}} dr-compare-active={{addToCompareActive}} dr-device-category={{deviceCategory}} dr-plan-type={{planType}}></device-results><input type=hidden id=slick-index value={{index}}></slick></div></div>"
  );


  $templateCache.put('/components/ng-components/device-carousel/device-results-category/device-results-category.html',
    "<div class=\"dr-device-results-category component\"><div class=\"summarybox summarybox-specs\"><div class=details><div class=text-icon><div class=\"icon {{icon}}\"></div><h3>{{categoryName}}</h3></div><div class=spec-items ng-repeat=\"(key, value) in device.features |  filter:{'category':  categoryName}:true | orderBy: 'name'\"><p class=item ng-hide=\"hideSpecificationItem(value.name, categoryItems)\"><span>{{value.name}}:</span> {{value.value}}{{value.unit}}</p></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-carousel/device-results/device-results.html',
    "<div class=\"results dr-device-results component\" ng-init=\"device = deviceObj.item.hits.hits[0]._source.device\" ng-class=\"{'not-visible-details': !showDetails}\" ng-repeat=\"deviceObj in searchResults\"><div class=content-slider><device-compare device=device dc-compare-inactive={{compareIcon}} dc-compare-active={{compareActive}} dc-is-compare={{isCompare}} dc-remove-icon={{removeFromCompareIcon}}></device-compare><a class=phone><img ng-src={{device.available_colours[0].imagery[0].url}} ng-click=\"goToNextPage(device.id,  deviceLink)\"></a><div class=\"summarybox main-summary\"><div class=sticky-anchor></div><div class=details><h2 class=compare-device-name>{{device.manufacturer}} {{device.name | htmlToPlaintext}}</h2><h3 ng-hide=hideColorOptions>{{availableColoursText}}</h3><ul class=color-boxes ng-hide=hideColorOptions><li ng-repeat=\"color in device.available_colours\" style=background-color:{{color.hex}}><p class=sr-only>{{color.name}}</p></li></ul></div><button class=\"btn btn-default large addThisPhone btn-details\" ng-hide=showDetails ng-click=goToSpecifications()>{{ctaText}}</button></div><div class=device-summary><div same-height=camera><device-results-category drc-same-height-hook=camera drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-photos\" drc-category-name=Camera drc-category-items=\"Camera quality||Front facing camera||Video camera quality\"></device-results-category></div><div same-height=screen><device-results-category drc-same-height-hook=screen drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-dimensions\" drc-category-name=\"Body and screen\" drc-category-items=\"Device weight||Screen sharpness||Touchscreen\"></device-results-category></div><div same-height=call><device-results-category drc-same-height-hook=call drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-call\" drc-category-name=Call drc-category-items=\"Voice recognition||Works in USA||Speakerphone\"></device-results-category></div><div same-height=battery><device-results-category drc-same-height-hook=battery drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-battery-larger\" drc-category-name=\"Battery life and operating system\" drc-category-items=\"Operating system\"></device-results-category></div><div same-height=processor><device-results-category drc-same-height-hook=processor drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-processor\" drc-category-name=\"Processor and memory\" drc-category-items=\"RAM||Memory card type||Internal phone memory||Processor name and model||Processor speed\"></device-results-category></div><div same-height=included><device-results-category drc-same-height-hook=included drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-open-box\" drc-category-name=\"In the box\" drc-category-items=\"USB cable||Charger\"></device-results-category></div><div same-height=connectivity><device-results-category drc-same-height-hook=connectivity drc-is-compare={{isCompare}} drc-category-icon=\"cwsicon cwsicon-signal-strength\" drc-category-name=Connectivity drc-category-items=4G||3G||Wi-fi||Bluetooth></device-results-category></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-compare/device-compare.html',
    "<div ng-class=\"{'not-visible': $ctrl.compareIsHidden == 'true'}\" ng-switch=\"$ctrl.isCompare == 'true' ? 'COMPARE_SCREEN' : 'STANDARD'\"><a class=\"compare-icon cwsicon {{ $ctrl.isInCompare() ? $ctrl.compareActive : $ctrl.compareInactive }}\" ng-click=$ctrl.addRemoveCompare() ng-switch-when=STANDARD></a> <a class=\"bin-compare {{ :: $ctrl.removeFromCompareIcon }}\" ng-click=$ctrl.removeCompare($event) ng-switch-when=COMPARE_SCREEN></a></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-cta/device-cta.html',
    "<div class=\"btn-cws demo-button\"><a class=\"btn btn-buy--block\" role=button ng-click=\"dd.addToBasket(dd.proposition, ctaPath)\">{{ctaLabel}}</a></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-details/device-details-computing.html',
    "<div class=\"component row device-details demo-details\"><div class=col-xs-7><a ng-click=\"dd.saveDevice(dd.device.id, buyLink)\"><img id=featureImg class=feature-img title={{dd.fullName}} ng-src={{dd.device.imagery[0].url}} alt={{dd.fullName}}></a><device-compare dc-compare-inactive=cwsicon-circle-heart dc-compare-active=cwsicon-circle-heart-sel dc-compare-ishidden=false></device-compare></div><div class=col-xs-4><h1 class=device-details--title>{{dd.device.manufacturer | htmlToPlaintext}} {{dd.device.name | htmlToPlaintext}}</h1><div class=btn-cws><a class=\"btn btn-buy--block\" role=button ng-click=\"dd.saveDevice(dd.device.id, buyLink)\">{{buyLabel}}</a></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-details/device-details.html',
    "<div class=\"component row\"><div class=col-xs-3><a ng-click=\"dd.saveDevice(dd.device.id, buyLink)\"><img id=featureImg class=feature-img title={{dd.fullName}} ng-src={{dd.featureImg}} alt={{dd.fullName}}></a></div><div class=\"col-xs-8 device-details\"><h1>{{dd.device.manufacturer | htmlToPlaintext}} {{dd.device.name | htmlToPlaintext}}</h1><p class=intro>{{dd.device.description}}</p><div class=device-details><h2 ng-if=\"dd.device.available_colours.length <= 1 && dd.capacitiesIsOneOrLess()\">{{colourSizeOneOptionMsg}}</h2><h2 ng-if=\"dd.device.available_colours.length <= 1 && !dd.capacitiesIsOneOrLess()\">{{colourSizeOneColourMsg}}</h2><h2 ng-if=\"dd.device.available_colours.length > 1 && dd.capacitiesIsOneOrLess()\">{{colourSizeOneCapacityMsg}}</h2><h2 ng-if=\"dd.device.available_colours.length > 1 && !dd.capacitiesIsOneOrLess()\">{{colourSizeMsg}}</h2><ul class=colors><li ng-repeat=\"color in dd.device.available_colours\" ng-class=\"{active: dd.isActiveColor($index)}\"><a href=javascript:; ng-click=dd.selectColor($index)><div class=circle style=background-color:{{color.hex}}></div><p>{{color.name}}</p></a></li></ul><ul class=capacity ng-if=dd.capacitiesExists()><li ng-repeat=\"capacity in dd.device.available_capacities\" ng-class=\"{active: dd.isActiveCapacity($index)}\"><a href=javascript:; ng-click=dd.selectCapacity($index)><p>{{capacity.amount}}{{capacity.unit}}</p></a></li></ul><ul class=capacity ng-if=\"dd.deviceHasCapacity() && (!dd.capacitiesExists())\"><li class=active><a href=javascript:;><p>{{dd.device.capacity[0].amount}}{{dd.device.capacity[0].unit}}</p></a></li></ul></div><h2>{{buyMsg}}</h2><p>{{phoneLabel}} {{dd.fullName}}</p><div class=btn-buy><a class=\"btn btn-cws\" role=button ng-click=\"dd.saveDevice(dd.device.id, buyLink, actionMode)\">{{buyLabel}}</a></div></div><div class=\"col-xs-1 device-details\"><div class=\"actions dr-button-next-previous component\"><a style={{fwdButtonXOffsetStyle}} ng-click=\"dd.saveDevice(dd.device.id, buyLink, true)\"><span class={{fwdButtonIcon}} aria-hidden=true style={{fwdButtonIconSizeStyle}}></span><span class=sr-only>{{fwdButtonLabel}}</span></a></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-features/device-features.html',
    "<div id=device-features class=\"col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 dr-device-features component\" ng-hide=dd.isNoKeyFeaturesToDisplay(dd.device.key_features) style=display:none><h1>{{featuresTitle | htmlToPlaintext}}</h1><div ng-repeat=\"feature in dd.device.key_features | limitTo : 1\"><div class=\"col-lg-5 col-md-5\"></div><div class=\"col-lg-5 col-md-5\"><h3>{{feature.name | htmlToPlaintext}}</h3><p>{{feature.description | htmlToPlaintext}}</p></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-image/device-image.html',
    "<div class=device-image ng-if=dd.fullName><a ng-click=\"dd.saveDevice(dd.device.id, buyLink)\"><img id=featureImg class=feature-img ng-src=\"{{ $ctrl.getImageUrl() }}\" alt={{dd.fullName}} title={{dd.fullName}}></a></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-images/device-images.html',
    "<div id=images-panel class=\"images-panel col-lg-10 col-md-10 col-lg-offset-1 col-md-offset-1 dr-device-images component\" ng-hide=dd.isNoImageryToDisplay(dd.device.imagery)><div id=mobile-accessories class=\"mobile-accessories col-lg-12 col-md-12 col-sm-12\"><ul><li ng-if=\"$index<5\" ng-repeat=\"image in dd.device.imagery\"><div class=image-outer><div class=image-inner><a href=javascript:; ng-click=\"dd.openLightbox(image.url, image.description, $index)\" data-toggle=modal data-target=#imgModal><img alt={{image.description}} title={{image.description}} data-ng-src={{image.url}}></a></div></div></li></ul></div><div class=\"modal-backdrop fade in\" ng-class=\"{active: dd.showLightbox()}\"></div><div class=\"modal bootstrap-dialog fade in\" id=clearModal role=dialog ng-class=\"{active: dd.showLightbox()}\"><div class=\"modal-dialog modal-lg type-normal\"><div class=modal-content><div class=modal-body><button type=button ng-click=dd.cancelLightbox() class=close ng-class=closeicon data-dismiss=modal></button> <img id=detail-image-{{dd.selected}} ng-click=\"dd.nextImage($event, 0)\" ng-swipe-right=dd.nextImage($event,-1) ng-swipe-left=dd.nextImage($event,1) ng-src={{dd.selectedLightboxImageUrl}}></div><div class=modal-footer><ul><li ng-if=\"$index<5\" ng-repeat=\"image in dd.device.imagery\"><div class=image-outer ng-class=\"{'active':$index == dd.selected}\"><div class=image-inner><a href=javascript:; ng-click=\"dd.openLightbox(image.url, image.description, $index)\" data-toggle=modal data-target=#imgModal><img ng-class=\"{'active':$index == dd.selected}\" class=images-link alt={{image.description}} title={{image.description}} data-ng-src={{image.url}}></a></div></div></li></ul></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-productcode/device-productcode.html',
    "<div class=\"col-sm-12 device-productcode\" ng-if=$ctrl.device.id><span class=productcode>{{:: $ctrl.pctext}}</span>{{$ctrl.device.id}}</div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-spec/device-spec.html',
    "<div id=technical-specifications class=\"technical-specifications dr-device-specs component\"><div class=\"box media-icon-{{ iconPosition }}\"><div class=\"spec-icon {{ iconClass }}\"></div><dl><dt>{{specCategory}}</dt><dd ng-repeat=\"feature in dd.device.features | filter: {'category': specCategory}\" ng-if=\"specCategoryItemsArray.indexOf(feature.name) !== -1\"><strong>{{feature.name}}:</strong> {{feature.value}}{{feature.unit}}</dd></dl></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-specs/device-specs.html',
    "<div id=technical-specifications class=\"col-lg-12 col-md-12 technical-specifications dr-device-specs component\"><h1>{{specTitle}}</h1><div class=\"col-lg-12 col-md-12\"><div class=columns ng-class=\"{'new-row': startNewRow($index, columnBreak) }\" ng-repeat=\"(key, value) in dd.device.features | groupBy: 'category'\"><h4 class=compreResultTopicHead>{{key}}</h4><div ng-repeat=\"feature in value\"><p><span class=spec-key>{{feature.name}}: </span>{{feature.value}}</p></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-stickers/device-stickers.html',
    "<div class=\"component sticker\"><img class=sticker--image ng-src=\"{{::ds.stickerArr[0].stickerImage | relativeUrl}}\" alt={{::ds.stickerArr[0].stickerName}} ng-if=ds.stickerArr[0].stickerImage></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-tags/device-tags.html',
    "<div class=\"row device-tags\"><div ng-repeat=\"tag in $ctrl.tagsData\" class=\"tag col-xs-6\"><img class=tag-{{$index}} ng-if=\"tag.tagImage != '-'\" ng-src={{tag.tagImage}} alt={{tag.tagText}}> <span class=tag-{{$index}} ng-hide=\"tag.tagImage != '-'\">{{tag.tagText}}</span></div></div>"
  );


  $templateCache.put('/components/ng-components/device-details/device-title/device-title.html',
    "<div class=device-details><div ng-if=dd.productNameLoaded><h1 class=device-details--title>{{dd.shortenText(dd.device.manufacturer + ' ' + dd.device.name, nameMaxLength, nameSymbolCutoff)}}</h1></div></div>"
  );


  $templateCache.put('/components/ng-components/device-icon-features/device-icon-features.html',
    "<div class=\"icons-features icons-features--{{$ctrl.align}}\"><div class=\"row icons-features__container\" ng-repeat=\"mappingRow in $ctrl.chunkedMappings\"><div class=featurecol style=\"flex: 0 0 {{ $ctrl.getGridColumnSize() + '%' }}\" ng-repeat=\"mapping in mappingRow\"><div ng-class=\"{'feature' : ! $parent.$last}\" class=text-center><div ng-if=\"mapping.featureIcon !== '-'\"><div class=\"text-center feature-icon cwsicon {{mapping.featureIcon}}\"></div></div><div ng-if=\"mapping.featureIcon === '-' && mapping.featureImage !== '-'\"><img class=feature-icon ng-src=\"{{:: mapping.featureImage | relativeUrl }}\"></div><div ng-if=\"mapping.useFeatureValue === 'false'\"><div class=feature-text>{{mapping.featureText}}</div></div><div ng-if=\"mapping.useFeatureValue === 'true'\"><div class=feature-text>{{mapping.featureValue}}</div></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-recommendations/device-recommendations.html',
    "<div class=device-recommendations><vertical-slider vs-direction=vertical vs-select-cta=\"{{:: $ctrl.selectCta}}\" vs-img-cta=\"{{:: $ctrl.imgCta}}\" vs-currency-rules=\"{{:: $ctrl.currencyRules}}\" vs-journey-type=\"{{:: $ctrl.journeyType}}\" vs-limit=10 vs-bracket=1 vs-button-text=\"{{:: $ctrl.buttonText}}\" vs-layout-type=details feature-feature-list=\"{{:: $ctrl.featureFeatureList}}\" feature-display=\"{{:: $ctrl.featureDisplay}}\"></vertical-slider><upsell-message um-data=$ctrl.upsellMessages.b12 price-currency-config=\"{{:: $ctrl.currencyRules}}\" ng-if=$ctrl.upsellMessages.b12.priceDelta></upsell-message><vertical-slider vs-direction=vertical vs-select-cta=\"{{:: $ctrl.selectCta}}\" vs-img-cta=\"{{:: $ctrl.imgCta}}\" vs-currency-rules=\"{{:: $ctrl.currencyRules}}\" vs-journey-type=\"{{:: $ctrl.journeyType}}\" vs-limit=1 vs-bracket=2 vs-button-text=\"{{:: $ctrl.buttonText}}\" vs-layout-type=details feature-feature-list=\"{{:: $ctrl.featureFeatureList}}\" feature-display=\"{{:: $ctrl.featureDisplay}}\"></vertical-slider><upsell-message um-data=$ctrl.upsellMessages.b23 price-currency-config=\"{{:: $ctrl.currencyRules}}\" ng-if=$ctrl.upsellMessages.b23.priceDelta></upsell-message><vertical-slider vs-direction=vertical vs-select-cta=\"{{:: $ctrl.selectCta}}\" vs-img-cta=\"{{:: $ctrl.imgCta}}\" vs-currency-rules=\"{{:: $ctrl.currencyRules}}\" vs-journey-type=\"{{:: $ctrl.journeyType}}\" vs-limit=1 vs-bracket=3 vs-button-text=\"{{:: $ctrl.buttonText}}\" vs-layout-type=details feature-feature-list=\"{{:: $ctrl.featureFeatureList}}\" feature-display=\"{{:: $ctrl.featureDisplay}}\"></vertical-slider><div class=\"hide-in-edit-design-aemmode device-recommendations-wait-animation\" ng-show=\"$ctrl.animationEnabled && $ctrl.showAnimation\"><div class=loading-text>{{ $ctrl.loadingText }}</div><img ng-src=\"{{:: $ctrl.animationPath}}\" alt=\"\"></div></div>"
  );


  $templateCache.put('/components/ng-components/device-tile/device-tile.html',
    "<div class=\"dr-mobile-image component\" ng-if=\"DeviceTileController.deviceObj != undefined\"><img class=feature-img title={{DeviceTileController.deviceObj.name}} data-ng-src={{DeviceTileController.imagePath}} alt={{DeviceTileController.deviceObj.name}}><div class=summarybox><div class=device-tile__details><h2>{{DeviceTileController.deviceObj.manufacturer | htmlToPlaintext}} {{DeviceTileController.deviceObj.name | htmlToPlaintext}}<div>Color: {{DeviceTileController.colourName}}</div><div>Capacity: {{DeviceTileController.capacity}}</div></h2></div></div></div>"
  );


  $templateCache.put('/components/ng-components/device-validation/device-validation.html',
    "<form ng-submit=validateAndSubmit()><div class=\"hb value ng-scope\" ng-if=!node.schema.enum><span class=hb>{{:: $ctrl.MobileNumber}}</span> <span class=\"hb error\" ng-show=node.error>{{mobileNumber-validation-title}}</span> <input id=account.subscriber.mobileNumber ng-model=node.value class=hb ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node></div><div class=\"hb value ng-scope\" ng-if=!node.schema.enum><span class=hb>{{:: $ctrl.Pin}}</span> <span class=\"hb error ng-binding ng-hide\" ng-show=node.error>pin-validation-title</span> <input id=account.pin ng-model=node.value class=hb ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node></div><input id=submit class=\"hb ng-scope\" type=submit value=Submit> <input id=clear class=\"hb ng-scope\" type=button ng-click=node.resetValue() value=clear></form>"
  );


  $templateCache.put('/components/ng-components/device-wave/device-wave.html',
    "<div class=\"phones-stack col-md-12 col-lg-12 dr-device-wave component\"><ul class=\"phones {{DeviceWaveController.running}}\"><li ng-repeat=\"phone in DeviceWaveController.phones\" ng-style=\"{ 'width' : 100/DeviceWaveController.phones.length+'%'}\"><a ng-click=DeviceWaveController.clickHandler(phone.id)><img ng-src=\"{{DeviceWaveController.stripName(phone['available_colours'][0]['imagery'][0]['url'])}}\" ng-mouseenter=\"DeviceWaveController.activePhone = phone.id\" ng-mouseleave=\"DeviceWaveController.activePhone = ''\" ng-class=\"{'active': DeviceWaveController.activePhone === phone.id,\n" +
    "                    'sub-left':DeviceWaveController.activePhone === DeviceWaveController.phones[$index+1].id,\n" +
    "                    'sub-right':DeviceWaveController.activePhone === DeviceWaveController.phones[$index-1].id}\"></a></li></ul><ul class=\"phones-flipped {{DeviceWaveController.running}}\"><li ng-repeat=\"phone in DeviceWaveController.phones\" ng-style=\"{ 'width' : 100/DeviceWaveController.phones.length+'%'}\"><a ng-click=DeviceWaveController.clickHandler(phone.id)><img ng-src=\"{{DeviceWaveController.stripName(phone['available_colours'][0]['imagery'][0]['url'])}}\" ng-mouseenter=\"DeviceWaveController.activePhone = phone.id\" ng-mouseleave=\"DeviceWaveController.activePhone = ''\" ng-class=\"{'active': DeviceWaveController.activePhone === phone.id,\n" +
    "                    'sub-left':DeviceWaveController.activePhone === DeviceWaveController.phones[$index+1].id,\n" +
    "                    'sub-right':DeviceWaveController.activePhone === DeviceWaveController.phones[$index-1].id}\"></a></li></ul></div>"
  );


  $templateCache.put('/components/ng-components/facets/facets-group/facets-group.html',
    "<div class=\"drctv-facets-group prsi\" ng-if=\"facets[facetGroupCriteria].length > 1 + (selectAnyEnabled ? 1 : 0)\" ng-class=\"'prsi-display-mode-'+displayMode+' prsi-show-icons-'+showIcons\"><h3 class=prsi-title>{{facetGroupTitle}}</h3><div class=prsi-list-wrapper><button class=prsi-dd-handle ng-show=\"displayMode === 'dropdown'\" ng-click=toggleDropdown()><span ng-if=selectedOption.active class=prsi-list><span ng-if=\"selectedOption.role === 'any'\" class=prsi-list-button><span ng-if=selectAnyIcon ng-class=selectAnyIcon></span> <span class=prsi-any-label>{{selectedOption.key}}</span> </span><span ng-if=\"selectedOption.role !== 'any'\" ng-switch=showIcons class=prsi-list-button><span ng-switch-when=true class=\"facet-icon {{ stringToClass(selectedOption.key) }}\"></span> <span ng-switch-when=false>{{selectedOption.key}}</span> </span></span><span ng-if=!selectedOption.active>{{dropdownLabel}} </span><span class=\"prsi-dd-handle-icon {{dropdownIcon}}\"></span></button><ul class=\"prsi-list row\" ng-show=optionsVisible><li ng-repeat=\"facetButton in facets[facetGroupCriteria] | limitTo: showHideTempLimit\" class=\"col-xs-4 col\" ng-class=\"{'active': facetButton.active}\"><button ng-switch=showIcons ng-if=\"facetButton.role !== 'any'\" ng-click=toggleActive($index) class=prsi-list-button><span ng-switch-when=true class=\"facet-icon {{ stringToClass(facetButton.key) }}\"></span> <span ng-switch-when=false>{{facetButton.key}}</span></button> <button ng-if=\"facetButton.role === 'any'\" ng-click=toggleActive($index) class=prsi-list-button><span ng-if=selectAnyIcon ng-class=selectAnyIcon></span> <span class=prsi-any-label>{{facetButton.key}}</span></button></li></ul></div><button class=prsi-show-hide-button ng-if=\"displayMode === 'buttons' && facets[facetGroupCriteria].length > showHideLimit\" ng-click=showHide()><span class=show-hide-icon ng-class=showHideIcon></span> {{showHideLabel}}</button></div>"
  );


  $templateCache.put('/components/ng-components/facets/facets-reset/facets-reset.html',
    "<div class=drctv-facets-reset><button ng-click=resetFilters() class=\"btn btn-cws\"><span class=reset-icon ng-class=icon ng-if=icon></span>{{label}}</button></div>"
  );


  $templateCache.put('/components/ng-components/facets/facets-slider/facets-slider.html',
    "<div class=\"drctv-facets-slider prsi\"><h3 class=prsi-title>{{ facetTitle }}</h3><rzslider class=rzslider-container rz-slider-model=sliderValue rz-slider-high=sliderConfig.max rz-slider-options=sliderConfig.options></rzslider></div>"
  );


  $templateCache.put('/components/ng-components/facets/sort-by/sort-by.html',
    "<div class=drctv-prop-sort-by><label for=sortby>{{title}}</label><select name=sortby id=sortby ng-model=sortByOptionIndex ng-change=sortByOptionUpdate()><option ng-repeat=\"option in sortByOptions\" value={{$index}}>{{option.label}}</option></select></div>"
  );


  $templateCache.put('/components/ng-components/fast-track-device-container/fast-track-device-container.html',
    "<div class=fast-track-device-container ng-show=$ctrl.componentVisible><ng-transclude></ng-transclude></div>"
  );


  $templateCache.put('/components/ng-components/fast-track-device-item/fast-track-device-item.html',
    "<button class=ftdb ng-click=$ctrl.goTo() ng-if=$ctrl.title><div class=ftdb__thumb><img class=ftdb__thumb__img ng-src=\"{{ :: $ctrl.deviceImgUrl }}\" alt=\"\"></div><div class=ftdb__text><div class=ftdb__text__message>{{ :: $ctrl.message }}</div><h2 class=ftdb__text__title>{{ :: $ctrl.title }}</h2><div class=ftdb__text__price><span class=ftdb__text__price__prefix>{{ :: $ctrl.pricePrefix }}</span> <span class=ftdb__text__price__value><uit-price-format number=\":: $ctrl.price\"></uit-price-format></span></div></div></button>"
  );


  $templateCache.put('/components/ng-components/fasttrack-container/fasttrack-container.html',
    "<div class=\"col-md-12 col-lg-12 dr-fasttrack-container component\"><div class=buttons-holder-div><h1>{{mainTitle}}</h1><div class=bs-glyphicons><ul class=bs-glyphicons-list><li ng-repeat=\"qitem in itemjson\"><div class=\"dr-fasttrack-icons component ng-isolate-scope\"><a ng-click=goToLink(iconCta)><span ng-if=\"qitem.iconClass !== ''\" class=\"{{qitem.iconClass | htmlEntities}}\" aria-hidden=true></span> <img ng-if=\"qitem.image !== ''\" ng-src=\"{{qitem.image | htmlEntities}}\"> <span class=\"title glyphicon-text\">{{ qitem.title | htmlEntities}}</span></a></div></li></ul></div></div></div>"
  );


  $templateCache.put('/components/ng-components/featured-product/featured-product.html',
    "<div class=featuredProduct><h2 class=featuredProduct__header>{{ $ctrl.brand || $ctrl.product.device.manufacturer }}</h2><h2 class=featuredProduct__header>{{ $ctrl.title || $ctrl.product.device.name }}</h2><p class=featuredProduct__description>{{ $ctrl.description }}</p><uit-price-format class=featuredProduct__price number=$ctrl.displayPrice></uit-price-format><uit-product-select on-select=$ctrl.select() on-is-selected=$ctrl.isSelected() select-text=\"{{ :: $ctrl.ctaSelectText }}\" selected-text=\"{{ :: $ctrl.ctaSelectedText }}\"></uit-product-select></div>"
  );


  $templateCache.put('/components/ng-components/graph-small/graph-small.html',
    "<graph canvas-color=\"{{ $ctrl.canvasColor }}\" canvas-id=\"{{ $ctrl.canvasId }}\" canvas-position=\"{{ $ctrl.canvasPosition }}\" canvas-size=S></graph>"
  );


  $templateCache.put('/components/ng-components/graph/graph.html',
    "<canvas ng-attr-id=\"{{ $ctrl.canvasId }}\" width=50 height=50></canvas>"
  );


  $templateCache.put('/components/ng-components/grid-product/grid-product.html',
    "<div class=\"container-fluid product-grid-container\"><div class=row><uit-product-item class=\"col-xs-4 product-grid\" ds-journey-type=\"{{ :: $ctrl.journeyType }}\" ng-if=$ctrl.products.length ng-repeat=\"product in $ctrl.products\" on-select=$ctrl.select(product) on-select-image=$ctrl.selectImage(product) on-is-selected=$ctrl.isSelected(product) features-array=$ctrl.features product=product select-text=\"{{ :: $ctrl.selectText }}\" selected-text=\"{{ :: $ctrl.selectedText }}\" pr-layout-type=\"{{ :: $ctrl.layoutType }}\"></uit-product-item></div></div>"
  );


  $templateCache.put('/components/ng-components/header/header.html',
    "<div class=header ng-class=\"{ 'header--fixed': $ctrl.headerType, 'header--relative': !$ctrl.headerType }\"><div class=header__left ng-controller=NavigationMenuController><span class=\"header__burger-menu {{ :: $ctrl.burgerIcon }}\" ng-class=\"{ 'cwsicon cwsicon-hamburger' : !$ctrl.burgerIcon }\" ng-click=$ctrl.openBurgerMenu()><span class=header__updates ng-class=\"{'header__found': $ctrl.updatesFound}\"></span></span><div ng-model=user ng-class=\"{'header__welcome-message--hide': !$ctrl.hasValidUser()}\" class=header__welcome-message><span class=header__avatar><img ng-class=\"{'header__disabled': $ctrl.hideAvatars === 'true'}\" ng-src=\"{{ :: $ctrl.defaultAvatar }}\"> </span><span class=header_text>{{ :: $ctrl.getAvatarMsg() }}</span><uit-insert-placeholder uip-style-class=header__name uip-sentence=$ctrl.avatarMsg uip-replace-text=$ctrl.user.meta.firstName></uit-insert-placeholder></div></div><div class=header__logo-container><img class=header__logo ng-class=\"{'header__active': $ctrl.showModalFlag, 'header__disabled': $ctrl.isModalHidden === 'true'}\" ng-click=\"$ctrl.openRestart($ctrl.isModalHidden, $ctrl.headerTemplate)\" ng-src=\"{{ :: $ctrl.logoImg }}\"></div><div class=header__right><span class=header__store-label><uit-insert-placeholder uip-style-class=header__store uip-sentence=$ctrl.storeLabel uip-replace-text=$ctrl.user.meta.depth1Name[0]></uit-insert-placeholder></span><a href ng-click=$ctrl.goToRoute($ctrl.basketLink)><span class=\"header__basket-icon {{ :: $ctrl.basketIcon }}\"></span></a></div></div>"
  );


  $templateCache.put('/components/ng-components/health-checks/health-check-endpoint/health-check-endpoint.html',
    "<div class=\"health-check-endpoint row\"><div class=col-xs-3>{{ $ctrl.requestTime | date : 'dd-MM-yyyy HH:mm:ss' }}</div><div class=col-xs-3>{{ :: $ctrl.name }}</div><div class=col-xs-2><span ng-if=$ctrl.status>{{ $ctrl.responseTime }} ms</span></div><div class=col-xs-4><div ng-if=$ctrl.status>{{ $ctrl.status > -1 ? $ctrl.status : '' }} {{ $ctrl.status > -1 ? $ctrl.statusText : $ctrl.HealthChecksController.applicationErrorStatusText }}<health-check-indicator level=$ctrl.getResponseTimeType()></health-check-indicator></div></div></div>"
  );


  $templateCache.put('/components/ng-components/health-checks/health-checks.html',
    "<div class=health-checks><div class=\"health-checks-header row\"><div class=col-xs-3>{{ :: $ctrl.headerTimeText }}</div><div class=col-xs-3>{{ :: $ctrl.headerNameText }}</div><div class=col-xs-2>{{ :: $ctrl.headerResponseTimeText }}</div><div class=col-xs-4>{{ :: $ctrl.headerResponseText }}</div></div><ng-transclude></ng-transclude><button class=\"health-checks-scan pull-right\" ng-click=$ctrl.scan() ng-disabled=$ctrl.scanning>{{ :: $ctrl.buttonScanText }}</button></div>"
  );


  $templateCache.put('/components/ng-components/hr-separator/hr-separator.html',
    "<hr style=width:{{HrSeparatorController.width}};height:{{HrSeparatorController.height}}px>"
  );


  $templateCache.put('/components/ng-components/http-logger-viewer/http-logger-viewer.html',
    "<div class=http-logger-viewer ng-switch=\":: $ctrl.isEnabled ? 'ENABLED' : 'DISABLED'\"><div ng-switch-when=ENABLED><div class=row><div class=\"col-xs-7 ellipsis\"><a ng-class=\"{asc: $ctrl.orderBy == 'url', desc: $ctrl.orderBy == '-url'}\" ng-click=\"$ctrl.orderBy = 'url'\">URL</a> <a ng-click=$ctrl.setUrlFilter() ng-if=$ctrl.filter.hostname title=\"Remove URL filter\">(Showing {{ $ctrl.filter.hostname }}{{ $ctrl.filter.pathname }})</a></div><div class=col-xs-2><a ng-class=\"{asc: $ctrl.orderBy == 'time', desc: $ctrl.orderBy == '-time'}\" ng-click=\"$ctrl.orderBy = 'time'\">Response Time</a></div><div class=col-xs-3><a ng-class=\"{asc: $ctrl.orderBy == 'status', desc: $ctrl.orderBy == '-status'}\" ng-click=\"$ctrl.orderBy = 'status'\">Response Code</a> <a ng-click=\"$ctrl.filter.status = undefined\" ng-if=$ctrl.filter.status title=\"Remove Response Code filter\">(Showing {{ $ctrl.filter.status}})</a></div></div><div class=row ng-repeat=\"log in $ctrl.log | filter : $ctrl.filter | orderBy : $ctrl.orderBy\"><div class=\"col-xs-7 ellipsis\"><a ng-click=$ctrl.setUrlFilter(log)>{{ :: log.method }} {{ :: log.url }}</a></div><div class=col-xs-2>{{ :: log.time }}ms</div><div class=col-xs-3><a ng-click=\"$ctrl.filter.status = $ctrl.filter.status == log.status ? undefined : log.status\">{{ :: log.status > -1 ? log.status : '' }} {{ :: log.status > -1 ? log.statusText : 'Application Error' }}</a><health-check-indicator level=\":: $ctrl.getResponseTimeType(log)\"></health-check-indicator></div></div></div><div ng-switch-when=DISABLED>The HTTP Logger is not enabled.</div></div>"
  );


  $templateCache.put('/components/ng-components/iframe-custom/iframe-custom.html',
    "<iframe ng-src=\"{{ :: $ctrl.trustSrc($ctrl.url) }}\" height=\"{{ :: $ctrl.height }}\" width=\"{{ :: $ctrl.width }}\" scrolling=\"{{ :: $ctrl.enableScrollbars }}\"></iframe>"
  );


  $templateCache.put('/components/ng-components/image-capture/image-capture.html',
    "<img ng-if=$ctrl.model class=imageCapture_img ng-src={{$ctrl.model}}> <img class=imageCapture_icon ng-src={{$ctrl.imgUrl}} ng-click=$ctrl.captureImage()>"
  );


  $templateCache.put('/components/ng-components/info-panel-item/info-panel-item.html',
    "<div class=\"row-no-gutter info-panel-item info-panel-item--{{::theme}} {{::background}}\"><div class=\"info-panel-item--flex info-panel-item--spacing-{{::spacing}}\"><div class=info-panel-item--icon><span class=\"cwsicon {{::icon}}\"></span></div><h4 class=\"h4 info-panel-item--title\" ng-bind=::title></h4><p class=info-panel-item--body ng-bind=::text></p></div></div>"
  );


  $templateCache.put('/components/ng-components/isite-video/isite-video.html',
    "<div class=isite-video><iframe border=\"{{:: $ctrl.border}}\" scrolling=\"{{:: $ctrl.scrolling}}\" seamless width=\"{{:: $ctrl.width}}\" height=\"{{:: $ctrl.height}}\" src={{$ctrl.givenUrl}} frameborder=\"{{:: $ctrl.frameBorder }}\" ng-attr-allowfullscreen={{$ctrl.allowFullScreen}}></iframe></div>"
  );


  $templateCache.put('/components/ng-components/layout-device-usage/layout-device-usage.html',
    "<div class=\"layoutDeviceUsage layoutDeviceUsage--{{$ctrl.orientation}}\"><ul class=layoutDeviceUsage__list><li ng-repeat=\"dataType in $ctrl.data\"><span class=\"layoutDeviceUsage__icon cwsicon cwsicon-{{dataType.icon}}\"></span><div class=layoutDeviceUsage__data><span class=layoutDeviceUsage__amount>{{dataType.amount}}</span> <span class=layoutDeviceUsage__label>{{dataType.label}}</span></div></li></ul></div>"
  );


  $templateCache.put('/components/ng-components/left-action/left-action.html',
    "<ul class=leftAction__details><li><span class=\"leftAction__icon {{ :: $ctrl.icon }}\" ng-click=$ctrl.goTo($ctrl.path)></span></li><li class=leftAction__text>{{:: $ctrl.text}}</li></ul>"
  );


  $templateCache.put('/components/ng-components/left-navigation/left-navigation.html',
    "<div class=left-navigation ng-if=$root.showLeftNav><table><tr ng-repeat=\"navigationItem in navigationItems\" ng-class=\"{'active-state': LeftNavigationController.isIconActive(navigationItem.routes)}\" ng-click=LeftNavigationController.goToIconState(navigationItem.default)><td><div class={{navigationItem.icon}} aria-hidden=true></div><div class=\"title glyphicon-text ng-binding\">{{navigationItem.title}}</div></td></tr></table></div>"
  );


  $templateCache.put('/components/ng-components/login/login.html',
    "<div class=\"col-lg-12 col-md-12 col-sm-12 dr-login component\"><div class=login-box-container><div class=login-box ng-style=\"{'background-image': 'url(' + backgroundImage + ')'}\"><h1 ng-class=\"{'compressed' : focus, largeScreen : blur}\">{{header}}</h1><form ng-submit=\"tryAuthentication(buttonPath, serviceUrl, sessionTimeout, formInvalidCredentials, formUnableLogin, profileUrl, authEnabled)\" novalidate name=loginform role=form class=form-horizontal><div class=form-group><label class=\"control-label sr-only\" for=username>{{userPlaceholderText}}</label><input name=username ng-model=username ng-class=\"{'has-error' : loginform.username.$error}\" ng-focus=\"focus=true;blur=false;\" ng-blur=\"focus=false;blur=true\" hide-status-bar class=form-control id=username placeholder={{userPlaceholderText}} ng-pattern=userRegexPattern required ng-model-options=\"{ updateOn: 'default blur' }\"><div class=help-inline ng-messages=loginform.username.$error ng-show=\"loginform.$submitted || loginform.username.$dirty\"><span ng-message=pattern>{{userRegexValidationText}}</span></div></div><div class=form-group><label class=\"control-label sr-only\" for=password>{{passwordPlaceholderText}}</label><input autocomplete=off type=password name=password class=form-control id=password ng-model=password ng-class=\"{'has-error' : loginform.password.$error}\" placeholder={{passwordPlaceholderText}} ng-focus=\"focus=true;blur=false;\" ng-blur=\"focus=false;blur=true\" hide-status-bar ng-pattern=passwordRegexPattern required ng-model-options=\"{ updateOn: 'default blur' }\"><div class=help-inline ng-messages=loginform.password.$error ng-show=\"loginform.$submitted || loginform.password.$dirty\"><span ng-message=pattern>{{passwordRegexValidationText}}</span></div></div><button ng-disabled=\"loginform.username.$dirty && loginform.username.$invalid ||\n" +
    "  myForm.password.$dirty || loginform.password.$invalid\" type=submit class=\"btn btn-default\">{{buttonLabel}}</button></form></div></div></div>"
  );


  $templateCache.put('/components/ng-components/messaging-errors/messaging-errors.html',
    "<div class=\"{{toastClass}} level-{{level}} {{toastType}} {{iconClassName}} dr-messaging-errors component hide-in-edit-design-aemmode\" ng-click=tapToast()><div ng-switch on=allowHtml><div ng-switch-default ng-if=title class={{titleClass}} aria-label={{title}}>{{title}}</div><div ng-switch-default class={{messageClass}} aria-label={{message}}>{{message}}</div><div ng-switch-when=true ng-if=title class={{titleClass}} ng-bind-html=title></div><div ng-switch-when=true class={{messageClass}} ng-bind-html=message></div></div><progress-bar ng-if=progressBar></progress-bar></div>"
  );


  $templateCache.put('/components/ng-components/multi-line-manager/multi-line-manager-modal.html',
    "<div class=modal-header><h3 class=modal-title>{{clearModalTitle}}</h3></div><div class=modal-body>{{clearModalMsg}}</div><div class=modal-footer><button class=\"btn btn-default btn-yes\" type=button ng-click=ok()>{{clearModalYesLabel}}</button> <button class=\"btn btn-default btn-no\" type=button ng-click=cancel()>{{clearModalNoLabel}}</button></div>"
  );


  $templateCache.put('/components/ng-components/multi-line-manager/multi-line-manager.html',
    "<carousel-container class=ml-customers-list ng-if=$ctrl.customers.length ng-class=\"{'dragged': $ctrl.dragged}\"><carousel-go-to class=ml-customers-carousel-left direction=previous icon=\"{{ :: $ctrl.leftButtonIcon }}\" text=\"{{ :: $ctrl.leftButtonText }}\"></carousel-go-to><div class=ml-customers-carousel><carousel slides-shown=4><div ng-repeat=\"customer in $ctrl.customers track by $index\" class=\"ml-customers-tile ml-customers-tile-group-{{ customer.groupId }}\" ng-class=\"{'ml-customers-tile-dragged': $ctrl.draggedIndex === $index}\"><div class=ml-tile-image><div ng-if=\"customer.selections.device.id === undefined\"><img ng-src=\"{{ $ctrl.deviceEmptyImage }}\"></div><div ng-if=\"customer.selections.device.id !== undefined\" ng-switch=\"customer.selections.device.available_colours[customer.selections.deviceColor].imagery[0].url ? 'HAS_IMAGE' : 'NO_IMAGE' \"><img ng-switch-when=HAS_IMAGE ng-src=\"{{ customer.selections.device.available_colours[customer.selections.deviceColor].imagery[0].url }}\" alt=\"\"> <img ng-switch-when=NO_IMAGE ng-src=\"{{ customer.selections.device.available_colours[0].imagery[0].url }}\" alt=\"\"></div></div><div class=ml-tile-info><div class=ml-tile-top-line><div class=ml-tile-top-checkbox><input type=checkbox name=select ng-click=$ctrl.toggleCustomer($index) ng-checked=customer.selected id=select-customer-{{$index}}></div><label for=select-customer-{{$index}} class=ml-tile-customer-name>{{ customer.name }}</label><div class=ml-tile-top-remove><a class=\"ml-tile-top-remove-button {{ $ctrl.removeButtonIcon }}\" ng-click=$ctrl.removeCustomer($index)></a></div></div><div class=ml-tile-customer-number>{{ customer.lineNumber }}</div><ng-switch on=\"customer.selections.deviceDisplayName ? 'HAS_DEVICE' : 'NO_DEVICE'\"><div class=ml-tile-device-name ng-switch-when=HAS_DEVICE>{{ customer.selections.deviceDisplayName }}</div><div class=ml-tile-device-name ng-switch-when=NO_DEVICE>{{ $ctrl.deviceEmptyText }}</div></ng-switch><div class=\"ml-tile-payment-options dropdown\" ng-if=\"$ctrl.displayMode !== 'simple'\"><span class=dropdown-toggle type=button data-toggle=dropdown ng-click=\"$ctrl.isPaymentOptionsVisible = !$ctrl.isPaymentOptionsVisible\" ng-class=\"{'ml-tile-payment-options-expanded': $ctrl.isPaymentOptionsVisible}\">{{ $ctrl.paymentOptionsLabel }} <span ng-if=$ctrl.paymentOptionsIcon class=\"dropdown-toggle-icon {{ $ctrl.paymentOptionsIcon }}\"></span></span><multi-line-payment-options ng-show=$ctrl.isPaymentOptionsVisible customer-id=\"{{ $index }}\" offerings=customer.hBCustomerOfferings selected-offering=\"{{ customer.selections.hBofferingType }}\" on-select=\"$ctrl.setPaymentOption(customerId, offeringKey)\"></multi-line-payment-options></div></div></div></carousel></div><carousel-go-to class=ml-customers-carousel-right direction=next icon=\"{{ :: $ctrl.rightButtonIcon }}\" text=\"{{ :: $ctrl.rightButtonText }}\"></carousel-go-to></carousel-container><ul class=\"ml-dots list-unstyled\" ng-if=\"$ctrl.groupingEnabled && $ctrl.customers.length\" ng-class=\"{'dragged': $ctrl.dragged}\"><li ng-repeat=\"customer in $ctrl.customers track by $index\" class=\"ml-dots-item ml-dots-customer {{ $ctrl.isNumber(customer.groupId) ? 'ml-dots-group-' + customer.groupId : '' }}\" ng-class=\"{'dropzone': $ctrl.isNumber(customer.groupId) && $ctrl.draggedIndex !== $index}\" ng-click=$ctrl.toggleCustomer($index) group-id=\"{{ customer.groupId }}\"></li><li class=ml-dots-separator></li><li class=\"ml-dots-item ml-dots-add\" ng-class=\"{'dropzone': $ctrl.isDraggedInAGroup === false && $ctrl.isNumber($ctrl.newGroupId)}\"></li><li class=\"ml-dots-item ml-dots-remove\" ng-class=\"{'dropzone': $ctrl.isDraggedInAGroup === true}\"></li></ul>"
  );


  $templateCache.put('/components/ng-components/multi-line-manager/multi-line-payment-options/multi-line-payment-options.html',
    "<ul class=\"dropdown-menu list-unstyled\"><li ng-repeat=\"(key, value) in $ctrl.offerings\" ng-click=\"$ctrl.onSelect({customerId: $ctrl.customerId, offeringKey: key})\"><input type=radio name=\"customer-{{  $ctrl.customerId  }}\" value=\"{{ key }}\" id=\"customer-{{  $ctrl.customerId  }}-{{ key }}\" ng-checked=\"key === $ctrl.selectedOffering\" class=ml-tile-payment-options-input><label class=ml-tile-payment-options-label>{{ value }}</label></li></ul>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-item-compare/navigation-item-compare.html',
    "<li class=\"dr-navigation-item-compare component\"><a ng-click=NavigationItemCompareController.goToLink(linkComparePath) ng-class=\"{'dr-navigation-link-compare-disabled': !$root.numberCompareItems }\">{{linkCompareLabel}} (<span class=num-compare-items>{{$root.numberCompareItems}}</span>)</a></li>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-item-link/navigation-item-link.html',
    "<li class=\"dr-navigation-item-link component {{isCurrentPath(linkPath)}}\"><a ng-click=goToLink(linkPath)>{{linkLabel}}</a></li>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-item-logout/navigation-item-logout.html',
    "<li class=\"dr-navigation-item-logout component\"><a ng-click=logout()>{{logoutTitle}}</a></li>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-item-media/navigation-item-media.html',
    "<li class=\"dr-navigation-item-media component {{isCurrentPath(linkPath)}}\"><a ng-click=goToLink(linkPath)><span class=\"media-icon {{linkIcon}}\"></span> {{linkLabel}}</a></li>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-item-nectr/navigation-item-nectr.html',
    "<li class=\"dr-navigation-item-nectr component\"><a>{{nectrTitle}}<label class=\"switch cwsicon\" ng-click=\"$root.testMode = !$root.testMode\"><input type=checkbox ng-checked=$root.testMode><div class=\"slider round\"></div></label></a></li>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-item-updates/navigation-item-updates.html',
    "<li class=\"dr-navigation-item-updates component updates {{ updatesFound }}\"><a data-href={{linkPath}} ng-click=goToLink(linkPath)>{{linkLabel}}<span class=\"cwsicon {{ updatesFound }}\"></span></a></li>"
  );


  $templateCache.put('/components/ng-components/navigation/navigation-list/navigation-list.html',
    "<li ng-click=menu() class=\"dr-navigation-list component\" ng-class=\"{'preselect-menu':isPreselectEnabled(preselectEnabled), 'selected':isCurrentPathInList(navList.data)}\"><a>{{category}}<span ng-class=iconClass class=acc_close></span></a><ul ng-show=expanded class=\"first-lmenu slide menu-wrap ng-hide\" ng-repeat=\"navitem in navList.data\" style=\"display: none\"><li class={{isCurrentPath(navitem.cta)}}><a class=slide ng-click=\"deepLink(navitem.id, navitem.cta, navitem.type)\"><span class=\"media-icon {{getIconClass(navitem)}}\"></span> {{navitem.name}}</a></li></ul></li>"
  );


  $templateCache.put('/components/ng-components/pagination/pagination.html',
    "<nav class=dr-pagination ng-if=pagination.totalPages><div class=row ng-show=\"paginationMode === 'paged'\"><div class=\"col-xs-12 text-center\"><button class=\"btn btn-cws\" ng-click=paginationUpdate(-1) ng-class=\"{'vh': pagination.currentPage === 1}\"><span ng-if=\"prevIcon !== ''\" ng-class=prevIcon></span> {{prevLabel}}</button><div class=pagination-middle><span class=pagination-stats ng-bind-html=pagesSummary></span><select ng-show=\"pagination.totalPages > 1\" ng-model=paginationGoToPage ng-change=paginationDropdownChange()><option ng-repeat=\"item in pagesNumbers track by $index\" value={{$index+1}}>{{$index + 1}}</option><option value={{paginationGoToLabel}} disabled selected hidden>{{paginationGoToLabel}}</option></select></div><button class=\"btn btn-cws\" ng-click=paginationUpdate(1) ng-class=\"{'vh': pagination.currentPage ===  pagination.totalPages}\">{{nextLabel}} <span ng-if=\"nextIcon !== ''\" ng-class=nextIcon></span></button></div></div><div class=\"col-xs-12 text-center\"><button class=toggle-all ng-show=\"paginationMode === 'paged'\" ng-click=\"changePaginationMode('all')\">{{showAllLabel}}</button> <button class=toggle-all ng-show=\"paginationMode === 'all'\" ng-click=\"changePaginationMode('paged')\">{{showXPerPage}}</button></div></nav>"
  );


  $templateCache.put('/components/ng-components/pdf-viewer/pdf-viewer.html',
    "<div><ng-pdf template-url=/components/ng-components/pdf-viewer/viewer.html debug=true></ng-pdf></div>"
  );


  $templateCache.put('/components/ng-components/pdf-viewer/viewer.html',
    "<canvas id=pdf-canvas></canvas>"
  );


  $templateCache.put('/components/ng-components/plan/plan.html',
    "<div class=plan-container><div class=\"plan-box-tile col-xs-3\" ng-if=displayTile ng-class=\"\"><img class=plan-device-image ng-src={{planItem.device.imagery[0].url}} alt=\"\" ng-class=\"{'display-colors': displayColors, 'display-title': displayTitle}\"><h2 ng-if=displayTitle class=\"plan-device-name h4\">{{planItem.device.name}}</h2><div class=summarybox ng-if=displayColors><ul class=color-boxes><li ng-repeat=\"color in planItem.device.available_colours\" style=background-color:{{color.hex}}><p class=sr-only>{{color.name}}</p></li></ul></div></div><div class=plan-box-inclusion ng-class=\"{'col-xs-9': displayTile, 'col-xs-12': !displayTile}\"><div class=\"row plan-row\"><div class=col-xs-7><div class=carrier-logo><div class=\"network-logo {{pc.getCarrierClass(planItem.serviceProvider)}}\"></div></div><div class=feature-box><div class=row ng-repeat=\"feature in planItem.tariff.features | limitTo:4\"><div class=media><div class=media-left><span class=\"cwsicon cwsicon-tick\"></span></div><div class=media-body>{{feature.value}}</div></div></div></div></div><div class=\"col-xs-5 plan-box-price\"><p class=price><uit-price-format number=planItem.offering[0].monthlyContract.regularInstallmentAmount.net.value></uit-price-format><span class=unit>{{perMonthLabel}}</span></p><p class=upfront-price><uit-price-format number=planItem.offering[0].upfrontPrice.net.value></uit-price-format><span class=unit>{{upfrontCostLabel}}</span></p></div></div><div class=\"row plan-row plan-row-details\"><div class=\"col-xs-12 inclusions-container\"><div class=row ng-if=\"displayedDetails === 'plan'\"><div class=\"col-md-15 col-lg-15 col-sm-15 inclusions\"><div class=canvas-wrap><graph-small canvas-color={{textPointsColor}} canvas-id=allowance-canvas-1 canvas-position=\"{{pc.getAllowanceGraphPosition(planItem.tariff.textAllowance.number, planItem.tariff.textAllowance.units, planItem.tariff.textAllowance.unlimited, textPoints)}}\"></graph-small></div><p class=value>{{pc.getAllowanceValue(planItem.tariff.textAllowance.number, planItem.tariff.textAllowance.units, planItem.tariff.textAllowance.unlimited, unlimitedText)}}</p><p class=unit>{{textLabel}}</p></div><div class=\"col-md-15 col-lg-15 col-sm-15 inclusions\"><div class=canvas-wrap><graph-small canvas-color={{talkPointsColor}} canvas-id=allowance-canvas-2 canvas-position=\"{{pc.getAllowanceGraphPosition(planItem.tariff.talkAllowance.number, planItem.tariff.talkAllowance.units, planItem.tariff.talkAllowance.unlimited, talkPoints)}}\"></graph-small></div><p class=value>{{pc.getAllowanceValue(planItem.tariff.talkAllowance.number, planItem.tariff.talkAllowance.units, planItem.tariff.talkAllowance.unlimited, unlimitedText)}}</p><p class=unit>{{talkLabel}}</p></div><div class=\"col-md-15 col-lg-15 col-sm-15 inclusions\"><div class=canvas-wrap><graph-small canvas-color={{dataPointsColor}} canvas-id=allowance-canvas-3 canvas-position=\"{{pc.getAllowanceGraphPosition(planItem.tariff.dataAllowance.number, planItem.tariff.dataAllowance.units, planItem.tariff.dataAllowance.unlimited, dataPoints)}}\"></graph-small></div><p class=value>{{pc.getAllowanceValue(planItem.tariff.dataAllowance.number, planItem.tariff.dataAllowance.units, planItem.tariff.dataAllowance.unlimited, unlimitedText)}}</p><p class=unit>{{dataLabel}}</p></div><div class=\"col-md-15 col-lg-15 col-sm-15 inclusions tariff-month\"><span class={{contractIcon}}></span><p class=value>{{planItem.tariff.recurringPrice.frequency}} {{planItem.tariff.recurringPrice.units}}</p><p class=value>{{planItem.offering[0].termInMonths}} {{contractLengthLabel | pluralize:planItem.offering[0].termInMonths}}</p><p class=unit>{{contractLabel}}</p></div><div class=\"col-md-15 col-lg-15 col-sm-15 inclusions generation\"><span class={{generationIcon}}></span><p class=value>{{pc.getGeneration(planItem.device.features)}}</p><p class=unit>{{bandwidthLabel}}</p></div></div><div class=row ng-if=\"displayedDetails === 'device'\"><div class=\"col-md-15 col-lg-15 col-sm-15 feature\" ng-repeat=\"feature in displayedFeatures\"><div class=icon-wrap><span class=\"icon {{feature.icon}}\"></span></div><p class=value>{{pc.getFeatureValue(planItem.device.features, feature.dataPoint) | htmlEntities}}</p><p class=unit>{{feature.label}}</p></div></div></div></div></div><button ng-click=pc.goToPlanCta(planItem.id) ng-if=planCtaEnabled class=cta></button></div>"
  );


  $templateCache.put('/components/ng-components/plans-data-calculator/data-calculator-graph/data-calculator-graph.html',
    "<div class=\"data-graph-wrapper dr-data-calculator-graph.directive component\"><div class=data-graph><h2>{{usageResultTitle}} <span class=data-calc-total-amount>{{totalUsageInMB_orGB}}</span><span><span class=data-calc-size-unit>{{graphCurUnit}}</span></span></h2><p class=data-calc-chart-intro>{{usageResultText}}</p><div class=data-calc-chart-yaxis><div class=data-calc-chart-yaxis-item style=padding-bottom:{{gb_step_padding}}px ng-repeat=\"value in incrementing_gbs\">{{value}}GB -</div><div class=\"data-calc-chart-yaxis-item last\">0MB -</div></div><div class=data-calc-chart-bar><div class=data-calc-chart-shadow></div><div class=data-calc-chart-future style=height:{{chartFutureHeight}}px><div class=data-calc-chart-label ng-hide=futureProofOpen><span class=usage><span class=data-calc-future-amount>{{futureProofInMB_orGB}}</span><span class=data-calc-size-unit>{{graphFutureUnit}}</span></span>{{futureProofLabel}}</div></div><div class=data-calc-chart-current style=height:{{chartCurrentHeight}}px><div class=data-calc-chart-label ng-hide=futureProofOpen><span class=usage><span class=data-calc-current-amount>{{totalUsageInMB_orGB}}</span><span class=data-calc-size-unit>{{graphCurUnit}}</span></span>{{suggestedAmountLabel}}</div></div></div><div class=data-calc-actions><div class=data-calc-chart-current style=height:{{chartCurrentHeight}}px><div class=btn-suggested><a class=\"btn btn-cws\" role=button ng-click=\"pc.viewPlans(totalUsageInMB, linkPath, actionMode, slidersObj)\">{{suggestedAmountButtonLabel}} (<span class=data-calc-current-amount>{{totalUsageInMB_orGB}}</span><span class=data-calc-size-unit>{{graphCurUnit}}</span>)</a></div><div class=btn-futureproof role=button ng-class=\"{'future-proof-open': futureProofOpen, 'future-proof-detail-disabled': !showFutureProofDetail }\"><div class=future-proof-container ng-cloak ng-show=futureProofOpen><ng-include src=pc.panelContentUrl></ng-include></div><a class=\"btn btn-cws-sec\" ng-click=\"pc.viewPlans(futureProofInMB, linkPath, actionMode, slidersObj)\">{{futureProofButtonLabel}} (<span class=data-calc-future-amount>{{futureProofInMB_orGB}}</span> <span class=data-calc-size-unit>{{graphFutureUnit}}</span>) </a><a ng-click=toggleFutureProof() ng-show=pc.showFutureProofDetail class=\"btn btn-cws-sec future-proof-cta\" ng-class=\"futureProofOpen ? 'detail-open' : 'detail-closed'\">{{ futureProofOpen ? 'X' : '?'}}</a></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/plans-data-calculator/plans-data-slider/plans-data-slider.html',
    "<div class=\"data-calc-slider-row dr-plans-data-slider component\"><div class=row><div class=slider-area ng-class=\"{'slider-area-partial': showBubble === 'true' , 'slider-area-full': showBubble === 'false' }\"><div class=data-calc-slider-label><span>{{mainTitle}}</span> <span class=rightlabel>{{secondTitle}}</span></div><input type=number value=slider.value ng-model=slider.value name={{sliderId}} id={{sliderId}} class=planslider ng-init=\"conversion=dataConversion\"><rzslider class=rzslider-container rz-slider-model=slider.min rz-slider-high=slider.max rz-slider-options=slider.options></rzslider></div><div ng-class=\"{'': showBubble === 'true' , 'disabled': showBubble === 'false' }\" class=bubble-area><div class=data-calc-slider-bubble><span>{{slider.min}}<br><span class=units>{{units}}</span></span></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/plans-data-calculator/plans-data-slider/wifi-data-slider.html',
    "<div class=\"data-calc-slider-row dr-plans-data-slider component\"><div class=row><div class=slider-area ng-class=\"{'slider-area-partial': showBubble === 'true' , 'slider-area-full': showBubble === 'false' }\"><label class=data-calc-slider-label><span>{{mainTitle}}</span> <span class=rightlabel>{{secondTitle}}</span></label><input type=number value=slider.value ng-model=slider.value name={{sliderId}} id={{sliderId}} class=planslider ng-init=\"conversion=dataConversion\"><rzslider rz-slider-model=slider.min rz-slider-high=slider.max rz-slider-options=slider.options></rzslider></div><div ng-class=\"{'': showBubble === 'true' , 'disabled': showBubble === 'false' }\" class=bubble-area><div class=data-calc-slider-bubble><span>{{slider.min}}<br><span class=units>{{units}}</span></span></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/plans-recommendations/plans-recommendations.html',
    "<div><div class=\"col-lg-8 col-md-8 col-sm-8 recommended-no-results\" ng-if=\"PlansRecommendationsController.areTherePropositions === false\"><h1>{{noResultsTitle}}</h1><p>{{noResultsMsg}}</p><button ng-click=goToNoResultsButtonPath() class=\"btn btn-cws\">{{noResultsButtonLabel}}</button></div><a ng-repeat=\"item in PlansRecommendationsController.propositions.slice( PlansRecommendationsController.startOffset, PlansRecommendationsController.endOffset) \" ng-click=PlansRecommendationsController.goTo(url,item.id)><div class=\"col-lg-4 col-md-4 col-sm-4\"><div ng-if=\"$index !== 2\"><div class=recommend-better-summary ng-class=\"{disabled : PlansRecommendationsController.hideDifferenceText($index)}\" ng-bind-html=PlansRecommendationsController.sanitize(PlansRecommendationsController.getDifferenceText(item.offering[0].id))></div></div><div class=recommended-plan><div class=recommended-cost><span class=cost><uit-price-format number=item.offering[0].monthlyContract.regularInstallmentAmount.net.value></uit-price-format></span><span class=cost-label>{{monthCostLabel}}</span></div><div class=recommended-upfront-cost><span><div>{{upfrontCostLabel}} <span ng-if=\"item.offering[0].upfrontPrice.net.value === 0\">{{freeLabel}}</span> <span ng-if=\"item.offering[0].upfrontPrice.net.value >= 1\"><uit-price-format number=item.offering[0].upfrontPrice.net.value></uit-price-format></span></div></span></div><div class=recommended-benefits><ul class=head><li>{{PlansRecommendationsController.getPlanName(item.offering[0].id)}}</li></ul><ul class=benefits><li ng-repeat=\"benefit in PlansRecommendationsController.getBenefitsText(item.offering[0].id) track by $index\"><span class={{benefitIcon}}></span>{{benefit}}</li></ul></div><div class=recommended-details><div class=container-fluid><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=network-logo ng-class=PlansRecommendationsController.getCarrierClass(item.serviceProvider)></div></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{talkPointsColor}} canvas-id=allowance-canvas{{$index}} canvas-position=\"{{PlansRecommendationsController.getAllowanceGraphPosition(item.tariff.talkAllowance.number, item.tariff.talkAllowance.units, item.tariff.talkAllowance.unlimited, talkPoints)}}\"></graph></div><span class=value>{{PlansRecommendationsController.getAllowanceValue(item.tariff.talkAllowance.number, item.tariff.talkAllowance.units, item.tariff.talkAllowance.unlimited, unlimitedText)}}</span> <span class=dlabel>{{talkLabel}}</span></div></div></div><hr><div class=container-fluid><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{dataPointsColor}} canvas-id=allowance-canvas{{$index}} canvas-position=\"{{PlansRecommendationsController.getAllowanceGraphPosition(item.tariff.dataAllowance.number, item.tariff.dataAllowance.units, item.tariff.dataAllowance.unlimited, dataPoints)}}\"></graph></div><span class=value>{{PlansRecommendationsController.getAllowanceValue(item.tariff.dataAllowance.number, item.tariff.dataAllowance.units, item.tariff.dataAllowance.unlimited, unlimitedText)}}</span> <span class=dlabel>{{dataLabel}}</span></div></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{textPointsColor}} canvas-id=allowance-canvas{{$index}} canvas-position=\"{{PlansRecommendationsController.getAllowanceGraphPosition(item.tariff.textAllowance.number, item.tariff.textAllowance.units, item.tariff.textAllowance.unlimited, textPoints)}}\"></graph></div><span class=value>{{PlansRecommendationsController.getAllowanceValue(item.tariff.textAllowance.number, item.tariff.textAllowance.units, item.tariff.textAllowance.unlimited, unlimitedText)}}</span> <span class=dlabel>{{textLabel}}</span></div></div></div></div><div class=\"recommended-upsell reward-tier-{{PlansRecommendationsController.getRewardTier(item.offering[0].id)}}\"><p ng-if=\"PlansRecommendationsController.downsellPlan === $index\">{{sellTextDownsellText}}</p><p ng-if=\"PlansRecommendationsController.recommendedPlan === $index\">{{sellTextBestMatchText}}</p><p ng-if=\"PlansRecommendationsController.upsell1 === $index\">{{sellTextUpsell1Text}}</p><p ng-if=\"PlansRecommendationsController.upsell2 === $index\">{{sellTextUpsell2Text}}</p></div></div></div></a></div>"
  );


  $templateCache.put('/components/ng-components/plans-results-list/plans-results-list.html',
    "<div class=dr-plans-results-list ng-show=\"results !== undefined\"><ul class=list-unstyled ng-if=results.length><li ng-repeat=\"planItem in results\" class=proposition-item><plan></plan></li></ul><div ng-if=!results.length><h2>{{noResultsTitle}}</h2><p>{{noResultsMessage}}</p></div></div>"
  );


  $templateCache.put('/components/ng-components/plans-results-summary/plans-results-summary.html',
    "<div class=dr-plans-results-summary ng-show=\"carriersCount !== undefined\"><span ng-if=showCarriers><span class=prs-count>{{carriersCount}}</span> {{carriersLabel | pluralize:carriersCount:carriersLabelPl}}{{separator}} </span><span class=prs-count>{{plansCount}}</span> {{plansLabel | pluralize:plansCount:plansLabelPl}}</div>"
  );


  $templateCache.put('/components/ng-components/pricing/pricing.html',
    "<div ng-if=$ctrl.offering><div class=pricing ng-class=\"{'no-discount': !$ctrl.offering.previousUpfrontPrice.net.value,\n" +
    "                 'summary-price': $ctrl.layoutType !== 'details'}\"><div class=main-price><div class=price-holder><p class=cashback-title><span ng-show=$ctrl.cashBack>{{ :: $ctrl.config.afterCashbackText }}</span> <span ng-show=$ctrl.tradeIn>{{ :: $ctrl.config.afterTradeinText }}</span></p><h4 class=product-price ng-hide=\"$ctrl.layoutType !== 'details'\"><uit-price-format number=\":: $ctrl.offering.upfrontPrice.net.value - $ctrl.cashBack - $ctrl.tradeIn\"></uit-price-format></h4><h4 class=product-price ng-show=\"$ctrl.layoutType !== 'details'\"><uit-price-format number=$ctrl.offering.upfrontPrice.net.value></uit-price-format></h4><p class=product-saving>{{ :: $ctrl.config.saveText }}&nbsp;<uit-price-format number=\":: $ctrl.offering.previousUpfrontPrice.net.value - $ctrl.offering.upfrontPrice.net.value\"></uit-price-format></p></div><p class=cashback-amount><span ng-show=$ctrl.cashBack><uit-price-format number=\":: $ctrl.cashBack\"></uit-price-format>&nbsp;{{ :: $ctrl.config.cashbackText }} </span><span ng-show=$ctrl.tradeIn><uit-price-format number=\":: $ctrl.tradeIn\"></uit-price-format>&nbsp;{{ :: $ctrl.tradeinText }}</span></p></div><div class=price-discount same-height=discount><p class=instore-price ng-class=\"{'not-visible': !$ctrl.cashBack && !$ctrl.tradeIn}\">{{ :: $ctrl.config.instorePriceText }}&nbsp;<uit-price-format number=\":: $ctrl.offering.upfrontPrice.net.value\"></uit-price-format></p><div class=pricing-previous ng-class=\"{'not-visible': !$ctrl.offering.previousUpfrontPrice.net.value}\"><b>{{ :: $ctrl.config.wasText }}&nbsp;<uit-price-format number=\":: $ctrl.offering.previousUpfrontPrice.net.value\"></uit-price-format>&nbsp; </b><span class=pricing-date>{{ :: $ctrl.config.leftBracket }}{{ :: $ctrl.config.fromText }} {{ :: $ctrl.offering.previousUpfrontPrice.startDate | date : $ctrl.config.dateFormat }} {{ :: $ctrl.config.toText }} {{ :: $ctrl.offering.previousUpfrontPrice.endDate | date : $ctrl.config.dateFormat }}{{ :: $ctrl.config.rightBracket }}</span></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/print-icon/print-icon.html',
    "<ul class=customerInfoBar__print><li><span class=\"customerInfoBarPrint__icon {{ :: $ctrl.icon }}\" ng-click=$ctrl.print()></span></li></ul>"
  );


  $templateCache.put('/components/ng-components/product-compare/product-compare.html',
    "<div class=\"product-compare row\"><div ng-if=\"(!$ctrl.pending && !$ctrl.products.length) || $ctrl.numberProducts === 0\"><h2 class=text-center>{{ :: $ctrl.noCompareResultsMsg }}</h2></div><div ng-if=$ctrl.products.length><div class=col-xs-1></div><slick class=\"slick-carousel col col-xs-10\" current-index=1 style=\"visibility: hidden\" infinite=false touch-move=true draggable=true touch-threshold=100 css-ease=none prev-arrow-class={{$ctrl.buttonLeftIcon}} next-arrow-class={{$ctrl.buttonRightIcon}} slide=uit-product-item slides-to-show=\"{{slidesToShow || 3}}\" slides-to-scroll=\"{{slidesToScroll || 1}}\" data=$ctrl.products init-onload=true><uit-product-item dif-display=\"{{ :: $ctrl.difDisplay }}\" dif-features=\"{{ :: $ctrl.difFeatures }}\" dif-journey-type=\"{{ :: $ctrl.getCategoryJourneyType(product) }}\" ng-repeat=\"product in $ctrl.products\" remove-compare-icon=\"{{ :: $ctrl.removeCompareIcon }}\" product=product select-text=\"{{ :: $ctrl.selectText }}\" show-tags=true on-compare-remove=$ctrl.removeCompare(product) on-select=$ctrl.select(product) on-select-image=$ctrl.selectImage pr-layout-type=\"{{ :: $ctrl.prLayoutType }}\"></uit-product-item></slick><div class=col-xs-1></div></div></div>"
  );


  $templateCache.put('/components/ng-components/product-slide/product-slide.html',
    "<div class=product-slide><div class=product-body ng-init=$ctrl.broadcastProduct(product)><h6 same-height=product-header>{{product.device.manufacturer}} {{product.device.name}}</h6><img ng-src={{product.device.imagery[0].url}} alt=\"\"><div same-height=pricing class=slide-pricing><pricing pr-device=product.device pr-offering=product.offering[0] pr-currency-config={{currencyConfig}} pr-layout-type={{layoutType}}></pricing></div><device-stickers ds-journey-type={{journeyType}}></device-stickers><ul class=benefits same-height=products-benefits><li ng-repeat=\"feature in featuresArray\"><span ng-repeat=\"featureObj in product.device.features | filter:{name: feature.value} | filter:{category: feature.category}\">{{featureObj.value}}&nbsp;</span></li></ul><p class=text-center>{{priceText}}</p><div class=product-stock-counter><stock-count></stock-count></div><div class=product-select ng-class=\"{active: ProductSlideController.isProductSelected(product.device.id)}\" ng-click=\"ProductSlideController.selectProduct(product, pageType, redirectUrl)\"><span>{{ProductSlideController.isProductSelected(product.device.id) ? selectedText : selectText}}</span></div></div></div>"
  );


  $templateCache.put('/components/ng-components/programs-plans/programs-plans.html',
    "<div class=\"hb value ng-scope\" ng-if=!node.schema.enum><span class=hb>{{:: $ctrl.MobileNumber}}</span> <span class=\"hb error\" ng-show=node.error>{{mobileNumber-validation-title}}</span> <input id=account.subscriber.mobileNumber ng-model=node.value class=hb ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node></div><div class=\"hb value ng-scope\" ng-if=!node.schema.enum><span class=hb>{{:: $ctrl.Pin}}</span> <span class=\"hb error ng-binding ng-hide\" ng-show=node.error>pin-validation-title</span> <input id=account.pin ng-model=node.value class=hb ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node></div>"
  );


  $templateCache.put('/components/ng-components/promotion-item/promotion-item.html',
    "<div class=promotion-item><div class=promotion-item-header><h3>{{:: PromotionItemController.promotionTitle}}</h3></div><div class=\"promotion-item-image text-center\"><img ng-src=\"{{:: PromotionItemController.promotionImagePath}}\"></div><div ng-if=\"PromotionItemController.promotionOfferTitle !== undefined\" class=offer><div class=offer-head>{{:: PromotionItemController.promotionOfferTitle}}</div><div class=offer-text>{{:: PromotionItemController.primotionOfferText}}</div></div></div>"
  );


  $templateCache.put('/components/ng-components/proposition/proposition.html',
    "<div class=proposition-container><div class=col-xs-3-placeholder><div class=proposition-img-wrapper><img ng-src={{propositionItem.device.imagery[0].url}} alt=\"\"></div></div><div class=\"col-xs-9 pull-right proposition-box-inclusion\"><div class=\"row proposition-row\"><div class=col-xs-2><div class=\"manufacturer-logo {{propc.getManufacturerClass(propositionItem.device.manufacturer)}}\"></div></div><div class=col-xs-7><h2 class=proposition-title>{{propositionItem.name}}</h2><small>Product number: {{propositionItem.id}}</small></div><div class=\"col-xs-3 proposition-box-price\"><p class=price><uit-price-format number=propositionItem.upfrontPrice.net.value></uit-price-format></p></div></div><div class=\"row proposition-row proposition-row-details\"><div class=\"col-xs-12 inclusions-container\"><div class=row><div class=col-xs-15 ng-repeat=\"feature in displayedFeatures\"><p class=\"icon {{feature.icon}}\"></p><p class=value>{{propc.getFeatureValue(propositionItem.device.features, feature.dataPoint)}}</p><p class=label>{{feature.label}}</p></div></div></div></div><button ng-click=propc.goToPropositionCta(propositionItem.id) ng-if=planCtaEnabled class=cta></button></div></div>"
  );


  $templateCache.put('/components/ng-components/propositions-list/propositions-list.html',
    "<div class=drctv-propositions-list><ul class=list-unstyled ng-if=results.length><li ng-repeat=\"propositionItem in results\" class=proposition-item><proposition></proposition></li></ul><div ng-if=!results.length><h2>{{noResultsTitle}}</h2><p>{{noResultsMessage}}</p></div></div>"
  );


  $templateCache.put('/components/ng-components/protection-teaser/protection-teaser.html',
    "<div class=protection-teaser ng-class=\"{'not-visible': !$ctrl.price}\"><div class=col-sm-8><h5 class=protection-title>{{:: $ctrl.title}}</h5><p ng-if=$ctrl.price><span ng-bind-html=\":: $ctrl.textParts.before\"></span><uit-price-format number=\":: $ctrl.price\"></uit-price-format><span ng-bind-html=\":: $ctrl.textParts.after\"></span></p></div><div class=col-sm-4><img ng-src=\"{{:: $ctrl.logoUrl}}\" alt=\"\"></div></div>"
  );


  $templateCache.put('/components/ng-components/protection-tiles/protection-tiles.html',
    "<div class=protection-tiles><div class=protection-tiles-header><span><a ng-click=\"$ctrl.openModal($ctrl.infoModalUrl, $ctrl.infoModalCloseIcon, $ctrl.infoModalTitle, $ctrl.infoModalsize)\">{{:: $ctrl.importantInfoText}}</a> </span><span class=\"{{:: $ctrl.hintIcon}}\" ng-click=\"$ctrl.openModal($ctrl.hintModalUrl, $ctrl.hintModalCloseIcon, $ctrl.hintModalTitle, $ctrl.hintModalsize)\"></span></div><div class=col-sm-4 ng-repeat=\"item in $ctrl.carePlans\"><div class=\"tile text-center\"><h5 class=title>{{item.protectionTerm}}</h5><p class=price><uit-price-format number=\"$ctrl.returnCorrectPricing(item.protectionPrice, item.monthlyPrice)\"></uit-price-format></p><div class=\"product-select cta\" ng-class=\"{active: $ctrl.isPlanSelected(item.thirdPartyId)}\" ng-click=\"$ctrl.selectPlan(item, $ctrl.displayType, $ctrl.basketImage, $index, $ctrl.basketText)\"><span>{{$ctrl.isPlanSelected(item.thirdPartyId) ? $ctrl.ctaSelectedText : $ctrl.ctaSelectText}}</span></div></div></div><div class=logo><img ng-src=\"{{:: $ctrl.logoUrl}}\"></div><div class=\"modal-backdrop fade in\" ng-class=\"{active: $ctrl.modalOpen}\"></div><div class=\"modal bootstrap-dialog modal-protection fade in\" id=clearModal role=dialog ng-class=\"{active: $ctrl.modalOpen}\" ng-click=\"$ctrl.modalOpen = false\"><div class=\"modal-dialog {{$ctrl.modalsize}} type-normal\"><div class=modal-content><div class=\"modal-header no-warning\"><button type=button ng-click=\"$ctrl.modalOpen = false\" class=\"close {{$ctrl.modalCloseIcon}} pull-right\" data-dismiss=modal></button><h4 class=modal-title id=myModalLabel>{{$ctrl.modalTitle}}</h4></div><div class=modal-body><ng-include ng-if=$ctrl.modalOpen src=$ctrl.modalContentUrl></ng-include></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/qrCode/qrCode-modal.html',
    "<div class=\"dr-qrCode-modal component\"><div class=\"modal-header type-warning warning\"><h3 class=modal-title>{{modalTitle}}</h3></div><div class=modal-body>{{modalText}}</div><div class=modal-footer><button class=\"btn btn-default\" type=button ng-click=ok()>{{modalYesLabel}}</button> <button class=\"btn btn-default\" type=button ng-click=cancel()>{{modalNoLabel}}</button></div></div>"
  );


  $templateCache.put('/components/ng-components/qrCode/qrCode.html',
    "<div class=\"qr-code row dr-qrCode component\"><div class=\"col-sm-8 col-md-8 col-lg-8 col-sm-offset-2\"><h1>{{header}}</h1><div class=light-border><img class=qr-image title=qrCode src=/assets/dam/qr-code.png alt=qrCode><div class=qr-text><h2 class=uppercase>{{thankYouMsg}}</h2><h3>{{upgradeMsg}}</h3></div></div><div class=row><br><br><a class=\"btn btn-cws pull-right\" role=button ng-click=qrCodeController.qrModal()>{{buttonLabel}}</a></div></div></div>"
  );


  $templateCache.put('/components/ng-components/questions-advanced/answer/answer.html',
    "<div class=dr-answer ng-click=toggleAnswer(answer)><div class=dr-questions-icons ng-class=\"{'active': isAnswerSelected(answer.id)}\"><div class=dr-answer-content><span ng-if=\"answer.icon !== ''\" class={{answer.icon}} aria-hidden=true></span> <img ng-if=\"answer.image !== ''\" ng-src=\"{{ isAnswerSelected(answer.id) && answer.imageSelected ? answer.imageSelected : answer.image | relativeUrl  }}\"> <span class=answer-text ng-class=\"{'answer-push-text': answer.text!=='' && (answer.image !=='' || answer.icon !== '' )}\">{{answer.text}}</span></div></div></div>"
  );


  $templateCache.put('/components/ng-components/questions-container/questions-container.html',
    "<div class=\"col-md-12 col-lg-12 dr-questions-container component\"><div class=\"buttons-holder-div {{ :: $ctrl.theme }}\"><h1>{{ :: $ctrl.title }}</h1><div class=bs-glyphicons ng-class=\"{ 'maximum-selected': $ctrl.isMaximumSelected() && !$root.hintMode, 'modal-open': $ctrl.modalOpen }\"><ul class=\"bs-glyphicons-list {{ :: $ctrl.smallSize }}\" ng-class=\"{'readonly': $ctrl.readOnly}\"><li ng-repeat=\"qItem in $ctrl.itemJson\" ng-class=\"{'hint-active': $ctrl.isHintAnswer(qItem.title)}\"><div class=\"dr-questions-icons component\" ng-class=\"{ 'active': $ctrl.isAnswerActive(qItem)}\" ng-click=$ctrl.updateQuestionContainer(qItem)><a><span ng-if=\"qItem.iconClass !== ''\" class=\"{{ qItem.iconClass | htmlEntities}}\" aria-hidden=true></span> <img ng-if=\"qItem.image !== ''\" ng-src=\"{{ qItem.image | htmlEntities}}\"> <span class=\"title glyphicon-text\">{{ qItem.title | htmlEntities}}</span></a></div></li></ul></div><div class=\"modal bootstrap-dialog fade in\" id=clearModal role=dialog ng-class=\"{active: $ctrl.modalOpen}\" ng-click=$ctrl.closeModal($event)><div class=\"modal-dialog modal-lg type-normal\"><div class=modal-content><div class=modal-body><button type=button ng-click=\"$ctrl.modalOpen = false\" class=\"close {{ $ctrl.closeModalIcon}} pull-right\" data-dismiss=modal></button><ng-include ng-if=$ctrl.modalOpen src=$ctrl.hintContent></ng-include></div></div></div></div><span class=\"{{ $ctrl.hintIcon}} questions-hint-icon\" ng-class=\"{'active': $root.hintMode, 'disabled': $ctrl.hintEnabled !== 'true'}\" ng-click=$ctrl.changeHintMode() aria-hidden=true></span></div></div>"
  );


  $templateCache.put('/components/ng-components/recommendations-tabs-carousel/recommendations-tabs-carousel.html',
    "<div class=\"row recommendations-tabs-carousel\"><div class=tabbed-carriers-display><div class=col-xs-12><div class=container-fluid><div class=\"row row-horizon\"><div class=\"col-xs-8 recommended-no-results\" ng-if=\"$ctrl.areTherePropositions === false\"><h1>{{$ctrl.noResultsTitle}}</h1><p>{{$ctrl.noResultsMsg}}</p><button ng-click=$ctrl.goToNoResultsButtonPath() class=\"btn btn-cws\">{{$ctrl.noResultsButtonLabel}}</button></div><div class=\"col-xs-2 recommendations-tabs-carousel__device-tile\" ng-show=$ctrl.deviceTileShown><device-tile></device-tile></div><carousel-container class=col-xs-10><div class=row><div class=col-xs-1><carousel-go-to direction=previous class=recommendations-tabs-carousel__arrow icon=\"cwsicon cwsicon-arrow-left\"></carousel-go-to></div><div class=col-xs-10><carousel slides-shown=3 fixed-height=full><div same-height=plan class=recommended-proposition-item ng-repeat=\"item in $ctrl.propositionItems\" ng-if=item.itemIsVisible ng-show=\"($ctrl.selectedTab == '' || item.serviceProvider == $ctrl.selectedTab)\" ng-hide=\"(!$ctrl.enableCarousel && item.itemIndex < 4)\" ng-class=\"{ 'recommended-proposition-item-first' : item.itemIsFirst, 'recommended-proposition-item-last' : item.itemIsLast, 'col-xs-3': !$ctrl.enableCarousel, 'col-xs-3': $ctrl.enableCarousel }\"><div ng-hide=\"item.itemIsLast || item.itemIndex == $ctrl.getShownLength() || (!$ctrl.enableCarousel && item.itemIndex > 2)\"><div class=recommend-better-summary ng-class=\"{disabled : $ctrl.hideDifferenceText($index)}\" ng-bind-html=$ctrl.sanitize($ctrl.getDifferenceText(item.offering[0].id))></div></div><recommended-plan message-position=$ctrl.messagePosition item-index=$index item=item url=$ctrl.url content-propositions=$ctrl.contentPropositions propositions=$ctrl.propositions downsell-plan=$ctrl.downsellPlan upsell1=$ctrl.upsell1 upsell2=$ctrl.upsell2 upsell-other=$ctrl.upsellOther recommended-plan=$ctrl.recommendedPlan sell-text-upsell1=$ctrl.sellTextUpsell1 sell-text-upsell2=$ctrl.sellTextUpsell2 sell-text-upsell-other=$ctrl.sellTextUpsellOther sell-text-downsell=$ctrl.sellTextDownsell sell-text-best-match=$ctrl.sellTextBestMatch monthly-cost-label=$ctrl.monthlyCostLabel upfront-cost-label=$ctrl.upfrontCostLabel free-label=$ctrl.freeLabel benefit-icon=$ctrl.benefitIcon talk-label=$ctrl.talkLabel text-label=$ctrl.textLabel talk-points-color=$ctrl.talkPointsColor talk-points=$ctrl.talkPoints text-points=$ctrl.textPoints text-points-color=$ctrl.textPointsColor label-data=$ctrl.labelData points-data=$ctrl.pointsData points-data-color=$ctrl.pointsDataColor unlimited-text=$ctrl.unlimitedText></recommended-plan></div></carousel></div><div class=col-xs-1><carousel-go-to direction=next class=recommendations-tabs-carousel__arrow icon=\"cwsicon cwsicon-arrow-right\"></carousel-go-to></div></div></carousel-container><div same-height=plan class=\"col-xs-4 recommended-proposition-item active\" ng-show=\"$ctrl.getShownLength() < 2\"></div><div same-height=plan class=\"col-xs-3 recommended-proposition-item recommended-proposition-item-last active\" ng-show=\"$ctrl.getShownLength() < 3\"></div></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/recommended-plan/recommended-plan.html',
    "<div class=recommended-plan><div ng-if=\"$ctrl.messagePosition ==='top'\" class=\"recommended-upsell recommendations-tabs-carousel__message--top reward-tier-{{$ctrl.getRewardTier($ctrl.item.offering[0].id)}}\"><p ng-if=\"$ctrl.downsellPlan === $ctrl.item.itemIndex\">{{$ctrl.sellTextDownsell}}</p><p ng-if=\"$ctrl.recommendedPlan === $ctrl.item.itemIndex\">{{$ctrl.sellTextBestMatch}}</p><p ng-if=\"$ctrl.upsell1 === $ctrl.item.itemIndex\">{{$ctrl.sellTextUpsell1}}</p><p ng-if=\"$ctrl.upsell2 === $ctrl.item.itemIndex\">{{$ctrl.sellTextUpsell2}}</p><p ng-if=\"$ctrl.upsellOther <= $ctrl.item.itemIndex\">{{$ctrl.sellTextUpsellOther}}</p></div><div class=recommended-cost><span class=cost><uit-price-format number=$ctrl.item.offering[0].monthlyContract.regularInstallmentAmount.net.value></uit-price-format></span><span class=cost-label>{{$ctrl.monthlyCostLabel}}</span></div><div class=recommended-upfront-cost><span><div>{{$ctrl.upfrontCostLabel}} <span ng-if=\"$ctrl.item.upfrontPrice.net.value === 0\">{{freeLabel}}</span> <span ng-if=\"$ctrl.item.upfrontPrice.net.value >= 1\"><uit-price-format number=$ctrl.item.upfrontPrice.net.value></uit-price-format></span></div></span></div><div class=recommended-benefits><ul class=head><li>{{$ctrl.getPlanName($ctrl.item.offering[0].id)}}</li></ul><ul class=benefits><li ng-repeat=\"benefit in $ctrl.getBenefitsText($ctrl.item.offering[0].id) track by $index\"><span class={{$ctrl.benefitIcon}}></span>{{benefit}}</li></ul></div><div class=recommended-details><div class=container-fluid><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=network-logo ng-class=$ctrl.getCarrierClass($ctrl.item.serviceProvider)></div></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{$ctrl.talkPointsColor}} canvas-id=allowance-canvas{{$ctrl.itemIndex}} canvas-position=\"{{$ctrl.getAllowanceGraphPosition($ctrl.item.tariff.talkAllowance.number, $ctrl.item.tariff.talkAllowance.units, $ctrl.item.tariff.talkAllowance.unlimited, $ctrl.talkPoints)}}\"></graph></div><span class=value>{{$ctrl.getAllowanceValue($ctrl.item.tariff.talkAllowance.number, $ctrl.item.tariff.talkAllowance.units, $ctrl.item.tariff.talkAllowance.unlimited, $ctrl.unlimitedText)}}</span> <span class=dlabel>{{$ctrl.talkLabel}}</span></div></div></div><hr><div class=container-fluid><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{$ctrl.pointsDataColor}} canvas-id=allowance-canvas{{$ctrl.itemIndex}} canvas-position=\"{{$ctrl.getAllowanceGraphPosition($ctrl.item.tariff.dataAllowance.number, $ctrl.item.tariff.dataAllowance.units, $ctrl.item.tariff.dataAllowance.unlimited, $ctrl.pointsData)}}\"></graph></div><span class=value>{{$ctrl.getAllowanceValue($ctrl.item.tariff.dataAllowance.number, $ctrl.item.tariff.dataAllowance.units, $ctrl.item.tariff.dataAllowance.unlimited, $ctrl.unlimitedText)}}</span> <span class=dlabel>{{$ctrl.labelData}}</span></div></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{$ctrl.textPointsColor}} canvas-id=allowance-canvas{{$ctrl.itemIndex}} canvas-position=\"{{$ctrl.getAllowanceGraphPosition($ctrl.item.tariff.textAllowance.number, $ctrl.item.tariff.textAllowance.units, $ctrl.item.tariff.textAllowance.unlimited, $ctrl.textPoints)}}\"></graph></div><span class=value>{{$ctrl.getAllowanceValue($ctrl.item.tariff.textAllowance.number, $ctrl.item.tariff.textAllowance.units, $ctrl.item.tariff.textAllowance.unlimited, $ctrl.unlimitedText)}}</span> <span class=dlabel>{{$ctrl.textLabel}}</span></div></div></div></div><div class=recommendations-tabs-carousel__choose-plan ng-if=\"$ctrl.messagePosition ==='top'\" ng-click=$ctrl.goTo($ctrl.url,$ctrl.item.id)>Choose this plan</div><div ng-if=\"$ctrl.messagePosition ==='bottom'\" class=\"recommended-upsell reward-tier-{{$ctrl.getRewardTier($ctrl.item.offering[0].id)}}\"><p ng-if=\"$ctrl.downsellPlan === $ctrl.item.itemIndex\">{{$ctrl.sellTextDownsell}}</p><p ng-if=\"$ctrl.recommendedPlan === $ctrl.item.itemIndex\">{{$ctrl.sellTextBestMatch}}</p><p ng-if=\"$ctrl.upsell1 === $ctrl.item.itemIndex\">{{$ctrl.sellTextUpsell1}}</p><p ng-if=\"$ctrl.upsell2 === $ctrl.item.itemIndex\">{{$ctrl.sellTextUpsell2}}</p><p ng-if=\"$ctrl.upsellOther <= $ctrl.item.itemIndex\">{{$ctrl.sellTextUpsellOther}}</p></div></div>"
  );


  $templateCache.put('/components/ng-components/rich-text/rich-text.html',
    "<div class=richtext><div class=richtext__info-box ng-style=\"{'overflow-y': $ctrl.showMoreContent ? 'scroll' : 'hidden', 'height' : $ctrl.readMore ? $ctrl.initialHeight : 'auto'}\"><div class=\"{{:: $ctrl.childClass }}\"><div ng-transclude></div></div></div><div ng-if=$ctrl.readMore ng-hide=$ctrl.showMoreContent><p ng-click=$ctrl.showHiddenContent()>{{ :: $ctrl.readMore }}</p></div></div>"
  );


  $templateCache.put('/components/ng-components/search-results-grid/search-results-grid.html',
    "<div class=\"row search-results-grid\"><form class=\"col-xs-12 search-form\" name=searchForm><div class=search-box><label class=search-label><span class=search-title>{{ :: $ctrl.searchTitleText }}</span> <input autocomplete=off class=search-input hide-status-bar name=query ng-model=$ctrl.query ng-model-options=\"{debounce: 500}\" placeholder=\"{{ :: $ctrl.searchPlaceholderText }}\" type=search></label><span ng-if=!$ctrl.query class=\"search-icon {{ :: $ctrl.searchIcon}}\"></span> <span ng-if=$ctrl.query ng-click=\"$ctrl.query = ''\" class=\"search-icon {{ :: $ctrl.clearSearchIcon }}\"></span> <span class=search-scan ng-if=$ctrl.enableBarcodeScan><barcode-scanner-field model=$ctrl.query></barcode-scanner-field></span></div></form><div class=\"col-xs-12 search-no-results\" ng-if=\"!$ctrl.pending && $ctrl.query.length >= $ctrl.searchAtCharacterCount && !$ctrl.products.length\"><div class=search-no-results-title>{{ :: $ctrl.noResultsTitleText }}</div><div class=search-no-results-message>{{ :: $ctrl.noResultsMessageText }}</div></div><div class=search-results ng-if=$ctrl.products.length><uit-product-item class=\"col-xs-4 product-grid\" ds-journey-type=\"{{ :: $ctrl.dsJourneyType }}\" ng-repeat=\"product in $ctrl.products\" pr-layout-type=\"{{ :: $ctrl.pricingLayoutType }}\" product=product select-text=\"{{ :: $ctrl.psSelectText }}\" on-select=$ctrl.select(product) on-select-image=$ctrl.selectImage></uit-product-item></div></div>"
  );


  $templateCache.put('/components/ng-components/search-results-list/search-results-list.html',
    "<div class=\"container-fluid search-result-list\"><div class=\"row result-box\" ng-repeat=\"deviceObj in searchResults\" ng-init=\"product = deviceObj.item.hits.hits[0]._source\"><div class=\"panel panel-default panel-table\"><div class=panel-body><div class=tr><div class=\"td image-block\"><div class=product-image><img src={{product.device.available_colours[0].imagery[0].url}}></div></div><div class=\"td content-td\"><div class=\"tr tr-top\"><div class=\"td td-processor\"><img src=http://brain-images.cdn.dixons.com/file/86/80/00/00/intel_cpu_core_i3_4th_gen-868.png></div><div class=\"td header-td\"><div class=tr><div><h6>{{product.device.name}}</h6></div></div><div class=tr><div class=product-code>product code: {{product.id}}</div></div></div><div class=\"td td-price\">£{{product.offering[0].upfrontPrice.net.value}}</div></div><div class=tr><div class=\"td feature-box\"><div class=feature-value>{{getFeatureValue(product,'Screen size','SCREEN',null)}}</div><div class=feature-img><img ng-if=\"getFeatureValue(product,'Screen size','SCREEN',null)\" src=/static/core/assets/dam/size.gif></div></div><div class=\"td feature-box\"><div class=feature-value>{{getFeatureValue(product,'Memory (RAM)','SPECIFICATION',null)}}</div><div class=feature-img><img ng-if=\"getFeatureValue(product,'Memory (RAM)','SPECIFICATION',null)\" src=/static/core/assets/dam/grids.gif></div></div><div class=\"td feature-box\"><div class=feature-value>{{getFeatureValue(product,'Processor','SPECIFICATION',getGHz)}}</div><div class=feature-img><img ng-if=\"getFeatureValue(product,'Processor','SPECIFICATION',getGHz)\" src=/static/core/assets/dam/clock.gif></div></div><div class=\"td feature-box\"><div class=feature-value>{{getFeatureValue(product,'Storage','SPECIFICATION',null)}}</div><div class=feature-img><img ng-if=\"getFeatureValue(product,'Storage','SPECIFICATION',null)\" src=/static/core/assets/dam/ssd.gif></div></div><div class=\"td feature-box\"><div class=feature-value>{{getFeatureValue(product,'Battery life','POWER',null)}}</div><div class=feature-img><img ng-if=\"getFeatureValue(product,'Battery life','POWER',null)\" src=/static/core/assets/dam/battery.gif></div></div></div></div></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/selected-device-thumbnail/selected-device-thumbnail.html',
    "<div ng-if=$ctrl.showComponent class=selectedDeviceThumbnail><img ng-if=$ctrl.imgSrc ng-src=\"{{ :: $ctrl.imgSrc }}\" class=selectedDeviceThumbnail__img height=85 alt=\"{{ :: $ctrl.manufacturer }} {{ :: $ctrl.name }}\"> {{ :: $ctrl.manufacturer }}<br>{{ :: $ctrl.name }}</div>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-boolean.html',
    "<script type=text/ng-template id=hb/field-templates/auto-boolean.html><br>\n" +
    "    <label>\n" +
    "        <input ng-id=\"{{node.fullName}}\" type=\"checkbox\" ng-model=\"node.value\" class=\"hb\" ng-class=\"{error: node.error}\"\n" +
    "               ng-change=\"node.validate()\" hb-field=\"node\"/>\n" +
    "        &nbsp;&nbsp;\n" +
    "        <span ng-if=\"node.required\" class=\"simpleHb__asterix\">*</span>\n" +
    "        {{node.title | translate | emptyTranslate}}\n" +
    "    </label>\n" +
    "\n" +
    "    <div>\n" +
    "        {{node.description}}\n" +
    "    </div></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-customer-visualisation.html',
    ""
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-number.html',
    "<script type=text/ng-template id=hb/field-templates/auto-number.html><div class=\"hb data string col-sm-6\">\n" +
    "        <label class=\"hb control-label\">\n" +
    "            {{node.title | translate}}\n" +
    "            <span ng-if=\"node.required\" class=\"simpleHb__asterix\">*</span>\n" +
    "        </label>\n" +
    "        <div class=\"hb\" ng-if=\"node.schema.enum\" hb-enum=\"node\"></div>\n" +
    "        <div class=\"hb\" ng-if=\"!node.schema.enum\">\n" +
    "            <span class=\"hb error\" ng-show=node.error>{{node.schema.validationMessage}}</span>\n" +
    "            <input id=\"{{node.fullName}}\" type=\"number\" ng-model=\"node.value\" class=\"hb form-control\" ng-class=\"{error: node.error}\" ng-change=\"node.validate()\" step=\"any\" hb-field=\"node\"/>\n" +
    "        </div>\n" +
    "        <div class=\"hb description\">\n" +
    "            {{node.description}}\n" +
    "        </div>\n" +
    "    </div></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-password.html',
    "<div class=\"hb data string col-sm-6\"><label class=\"hb data string\"><span ng-if=node.required class=simpleHb__asterix>*</span> {{node.title | translate | emptyTranslate}}</label><div class=hb><input type=password class=\"hb password form-control\" ng-id={{node.fullName}} ng-class=\"{error: node.error}\" hb-field=node name=uPass maxlength=24 ng-hide=formFlags.showpass ng-model=node.value ng-required validate-pass> <input class=\"hb password form-control\" name=uPass maxlength=24 ng-show=formFlags.showpass ng-model=node.value ng-required validate-pass> <span class=message ng-show=\"form.uPass.$dirty && form.uPass.$invalid && node.error\">{{node.validationMessage}}</span></div><label class=\"hb inline\"><input class=\"hb form-inline\" type=checkbox name=uShowPass ng-model=formFlags.showpass toggle-pass>Show password</label></div>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-string-enum-code.html',
    "<script type=text/ng-template id=hb/field-templates/auto-string-enum-code.html><div class=\"hb data enum-code\">\n" +
    "        <label class=\"hb control-label\">\n" +
    "            <span ng-if=\"node.required\" class=\"simpleHb__asterix\">*</span>\n" +
    "            {{node.title | translate}}\n" +
    "        </label>\n" +
    "        <div class=\"hb\" hb-enum=\"node\" hb-enum-filters=\"hbPrefix | translate\"></div>\n" +
    "        <div class=\"hb description\">\n" +
    "            {{node.description}}\n" +
    "        </div>\n" +
    "    </div></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-string-full-date.html',
    "<script type=text/ng-template id=hb/field-templates/auto-string-full-date.html><div class=\"hb data string full-date\">\n" +
    "        <label class=\"hb control-label\">\n" +
    "            <span ng-if=\"node.required\" class=\"simpleHb__asterix\">*</span>\n" +
    "            {{node.title | translate | emptyTranslate}}\n" +
    "        </label>\n" +
    "        <div class=\"hb row\" hb-field=\"node\" hb-date-fields=\"node.value\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input id=\"{{node.fullName}}.year\" type=\"number\" ng-model=\"dateFields.year\" min=\"1899\" max=\"2999\"\n" +
    "                       ng-class=\"{error: node.error || !dateFields.valid}\" placeholder=\"YYYY\" class=\"hb form-control\"/>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input id=\"{{node.fullName}}.day\" type=\"number\" ng-model=\"dateFields.day\" min=\"1\" max=\"31\"\n" +
    "                       class=\"hb form-control\" ng-class=\"{error: node.error || !dateFields.valid}\"\n" +
    "                       placeholder=\"DD\"/>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <select id=\"{{node.fullName}}.month\" ng-model=\"dateFields.month\"\n" +
    "                        ng-class=\"{error: node.error || !dateFields.valid}\"\n" +
    "                        class=\"hb form-control\">\n" +
    "                    <option value=\"\" disabled selected hidden>Month</option>\n" +
    "                    <option value=\"0\">Jan</option>\n" +
    "                    <option value=\"1\">Feb</option>\n" +
    "                    <option value=\"2\">Mar</option>\n" +
    "                    <option value=\"3\">Apr</option>\n" +
    "                    <option value=\"4\">May</option>\n" +
    "                    <option value=\"5\">Jun</option>\n" +
    "                    <option value=\"6\">Jul</option>\n" +
    "                    <option value=\"7\">Aug</option>\n" +
    "                    <option value=\"8\">Sep</option>\n" +
    "                    <option value=\"9\">Oct</option>\n" +
    "                    <option value=\"10\">Nov</option>\n" +
    "                    <option value=\"11\">Dec</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"hb description\">{{node.description}}</div>\n" +
    "    </div></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-string-image-capture.html',
    "<div class=\"hb data string col-sm-6\"><label class=\"hb control-label\"><span ng-if=node.required class=simpleHb__asterix>*</span> {{node.title | translate | emptyTranslate}}</label><div class=hb ng-if=node.schema.enum hb-enum=node></div><div class=hb ng-if=!node.schema.enum><span class=\"hb error-color\" ng-show=node.error>{{ node.validationMessage | translate | emptyTranslate}}</span> <input id={{node.fullName}} ng-model=node.value class=\"simpleHb__imageCapture_field hb form-control\" ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node><image-capture model=node.value></image-capture></div></div>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-string-scannable.html',
    "<div class=\"hb data string col-sm-6\"><label class=\"hb control-label\"><span ng-if=node.required class=simpleHb__asterix>*</span> {{node.title | translate | emptyTranslate}}</label><div class=hb ng-if=node.schema.enum hb-enum=node></div><div class=hb ng-if=!node.schema.enum><span class=\"hb error-color\" ng-show=node.error>{{ node.validationMessage | translate | emptyTranslate}}</span> <input id={{node.fullName}} ng-model=node.value class=\"hb form-control\" ng-class=\"{error: node.error}\" ng-change=node.validate() hb-field=node><barcode-scanner-field model=node.value></barcode-scanner-field></div><div class=\"hb description\">{{node.description}}</div></div>"
  );


  $templateCache.put('/components/ng-components/simple-hb/auto-string.html',
    "<script type=text/ng-template id=hb/field-templates/auto-string.html><div class=\"hb data string\">\n" +
    "        <label class=\"hb control-label\">\n" +
    "            <span ng-if=\"node.required\" class=\"simpleHb__asterix\">*</span>\n" +
    "            {{node.title | translate | emptyTranslate}}\n" +
    "        </label>\n" +
    "        <div class=\"hb\" ng-if=\"node.schema.enum\" hb-enum=\"node\"></div>\n" +
    "        <div class=\"hb\" ng-if=\"!node.schema.enum\">\n" +
    "            <span class=\"hb error-color string__error-message\" ng-show=\"node.error\">{{ node.validationMessage | translate | emptyTranslate}}</span>\n" +
    "            <span ng-class=\"{'string__error-icon' : node.error}\">\n" +
    "            <input id=\"{{node.fullName}}\" type=\"text\" ng-model=\"node.value\" class=\"hb form-control\"\n" +
    "                   ng-class=\"{error: node.error}\"\n" +
    "                   ng-change=\"node.validate()\" hb-field=\"node\"/>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"hb description\">\n" +
    "            {{node.description}}\n" +
    "        </div>\n" +
    "    </div></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/enum.html',
    "<script type=text/ng-template id=hb/field-templates/enum.html><select hb-field=\"node\" id=\"{{node.fullName}}\" ng-model=\"selectedOption\"\n" +
    "            ng-options=\"option.label for option in options\"\n" +
    "            class=\"hb form-control\" ng-class=\"{error: node.error}\">\n" +
    "        <option value=\"\" ng-if=\"hbEnumDefaultText\">{{hbEnumDefaultText}}</option>\n" +
    "    </select></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/hidden-field.html',
    "<script type=text/ng-template id=hb/field-templates/hidden-field.html><div ng-hide=\"true\"></div></script>"
  );


  $templateCache.put('/components/ng-components/simple-hb/signature-capture.html',
    "<div class=\"hb data image\"><label class=\"hb control-label\"><span ng-if=node.required class=simpleHb__asterix>*</span> {{node.title | translate | emptyTranslate}}</label><div class=\"hb value\"><span class=\"hb error\" ng-show=node.error>{{node.validationMessage | translate}}</span><signature-pad dataurl=node.value height=220 width=568></signature-pad></div><div class=\"hb description\">{{node.description}}</div></div>"
  );


  $templateCache.put('/components/ng-components/simple-hb/simple-hb.html',
    "<script id=hb/components/flows/templates/simple-form.html type=text/ng-template><form ng-submit=\"validateAndSubmit()\" hb-form=\"simpleFlow.node\">\n" +
    "        <div hb-node=\"node\"></div>\n" +
    "        <simple-hb-submit text=\"Save\" fallback></simple-hb-submit>\n" +
    "    </form></script><script id=hb/components/flows/templates/done.html type=text/ng-template><div ng-include=\"$ctrl.doneUrl\"></div></script><div ng-include=\"'/components/ng-components/simple-hb/auto-string.html'\"></div><div ng-include=\"'/components/ng-components/simple-hb/auto-number.html'\"></div><div ng-include=\"'/components/ng-components/simple-hb/auto-boolean.html'\"></div><div ng-include=\"'/components/ng-components/simple-hb/enum.html'\"></div><div ng-include=\"'/components/ng-components/simple-hb/auto-string-enum-code.html'\"></div><div ng-include=\"'/components/ng-components/simple-hb/auto-string-full-date.html'\"></div><div class=simpleHb><div hb-service=$ctrl.service hb-simple-flow hb-test-mode-id=\"$ctrl.testMode ? $ctrl.testModeId : undefined\" ng-controller=hbConsumer ng-if=$ctrl.show></div><form class=simpleHb__testMode ng-if=$root.testMode ng-submit=$ctrl.toggleTestMode()><label for=testModeId class=simpleHb__testMode__label>Test Mode ID</label><input id=testModeId ng-model=$ctrl.testModeId> <input class=\"btn simpleHb__testMode__btn\" type=submit value=\"{{ $ctrl.testMode ? 'Disable' : 'Enable'}}\"></form></div>"
  );


  $templateCache.put('/components/ng-components/slide/slide.html',
    "<div class=slide ng-style=\"{'background-image':'url({{ :: $ctrl.imageSrc | relativeUrl }})'}\" ng-transclude></div>"
  );


  $templateCache.put('/components/ng-components/specs-slider/specs-slider-buttons-group/specs-slider-buttons-group.html',
    "<div><div class=drctv-specs-sider-buttons-group><strong class=ssbg-title ng-bind=::title>{{hintModalContentUrl}}</strong> <span ng-if=hintModalEnabled class=\"hint {{:: hintModalIcon}}\" ng-click=openModal()></span><ul class=list-unstyled><li ng-class=\"{'active': isActive(item)}\" ng-click=\"toggleActive(item, isMultiSelect)\" ng-repeat=\"item in mappings | filter : { featureCategory: featurePointMapping[0], groupName: featurePointMapping[1] } : true | unique: 'groupValue' | orderBy: 'index'\">{{item.groupValue}}</li></ul></div><div class=\"modal-backdrop fade in\" ng-class=\"{active: modalOpen}\"></div><div class=\"modal bootstrap-dialog modal-protection fade in\" id=clearModal role=dialog ng-class=\"{active: modalOpen}\" ng-click=closeModal($event)><div class=\"modal-dialog {{hintModalSize}} type-normal\"><div class=modal-content><div class=\"modal-header no-warning\"><button type=button ng-click=\"modalOpen = false\" class=\"close {{hintModalCloseIcon}} pull-right\" data-dismiss=modal></button><h4 class=modal-title id=myModalLabel>{{hintModalTitle}}</h4></div><div class=modal-body><ng-include ng-if=modalOpen src=hintModalContentUrl></ng-include></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/specs-slider/specs-slider-price-range/specs-slider-price-range.html',
    "<div class=specs-slider-stats><h2>{{estimatedPriceRangeMsg}}<span class=pull-right><uit-price-format number=range.min></uit-price-format><span class=to-label>{{estimatedPriceRangeToLabel}}</span><uit-price-format number=range.max></uit-price-format></span></h2><div ng-bind-html=richtext></div></div>"
  );


  $templateCache.put('/components/ng-components/specs-slider/specs-slider/specs-slider.html',
    "<div><a class=\"spec-slider-toggle btn btn-cws pull-right\" ng-click=open()><span class={{toggleIcon}}></span></a><aside class=\"drctv-specs-slider specs-slider\" ng-click=close() ng-class=\"{'specs-slider-open': visible}\"><div class=specs-slider-panel ng-style=\"!!panelWidth && {'width': panelWidth}\" ng-click=$event.stopPropagation()><div class=specs-slider-header><div class=specs-slider-title-bar><h1 ng-bind=::title></h1><a class=\"{{ ::closeIconClass }}\" ng-click=close()></a> <a class=\"{{ ::resetIconClass }}\" ng-click=reset()></a></div></div><ng-include src=overlayPath class=specs-slider-included-content></ng-include><div class=specs-slider-footer><button ng-click=goTo(ctaPath) ng-bind=::ctaLabel class=\"btn btn-cws\"></button></div></div></aside></div>"
  );


  $templateCache.put('/components/ng-components/stock-count/stock-count.html',
    "<div class=stock-counter-container><span class=stock-counter>{{ $ctrl.stockMessage }}</span></div>"
  );


  $templateCache.put('/components/ng-components/stock-toggle/stock-toggle.html',
    "<div class=stock-ctoggle><ng-switch on=\"$ctrl.toggledOn ? 'ON' : 'OFF'\"><span ng-switch-when=ON class=\"instore-text on\">{{ $ctrl.inStoreText }}</span> <span ng-switch-when=OFF class=\"instore-text off\">{{ $ctrl.allStoreText }}</span></ng-switch><label class=\"switch cwsicon\"><input type=checkbox ng-model=$ctrl.toggledOn ng-click=$ctrl.switchToggle()><div class=\"slider round\"></div></label></div>"
  );


  $templateCache.put('/components/ng-components/success/success.html',
    "<div class=\"success component\"><img class=success-image ng-src=\"{{:: $ctrl.imageUrl}}\" alt=\"{{:: $ctrl.imageAlt}}\"><p class=success-text>{{:: $ctrl.successText}}</p></div>"
  );


  $templateCache.put('/components/ng-components/swiper-grid/swiper-grid.html',
    "<div class=swiper-grid><div class=\"swipers clearfix\"><div><swiper bundle-category-filter=\"{{ :: $ctrl.bundleCategoryFilter }}\" sw-select-text=\"{{ :: $ctrl.selectText }}\" sw-selected-text=\"{{ :: $ctrl.selectedText }}\" sw-price-text=\"{{ :: $ctrl.priceText }}\" sw-currency-config=\"{{ :: $ctrl.currencyConfig }}\" sw-data-key=\"{{ :: $ctrl.dataKey }}\" sw-journey=\"{{ :: $ctrl.journey }}\" sw-category=\"{{ :: $ctrl.filterCategories[0] }}\" sw-height-category=\"{{ :: $ctrl.heightCategory }}\" sw-initial-slide=\"{{ :: $ctrl.initialSlide }}\" sw-display-separate-selling-price-text=\"{{ :: $ctrl.displaySeparateSellingPriceText }}\" sw-display-saving=\"{{ :: $ctrl.displaySaving }}\" sw-saving-text=\"{{ :: $ctrl.savingText }}\" sw-layout=\"{{ :: $ctrl.layoutType }}\" sw-display-type=\"{{ :: $ctrl.displayType }}\" hint-content-url=\"{{ :: $ctrl.hintContentUrl[0] }}\" hint-icon=\"{{ :: $ctrl.hintIcon }}\" hint-modal-close-icon=\"{{ :: $ctrl.hintModalCloseIcon }}\" hint-modal-title=\"{{ :: $ctrl.hintModalTitle[0] }}\" hint-modal-size=\"{{ :: $ctrl.hintModalSize[0] }}\" sw-select-mode=\"{{ :: $ctrl.selectMode }}\"></swiper></div><div><swiper bundle-category-filter=\"{{ :: $ctrl.bundleCategoryFilter }}\" sw-select-text=\"{{ :: $ctrl.selectText }}\" sw-selected-text=\"{{ :: $ctrl.selectedText }}\" sw-price-text=\"{{ :: $ctrl.priceText }}\" sw-currency-config=\"{{ :: $ctrl.currencyConfig }}\" sw-data-key=\"{{ :: $ctrl.dataKey }}\" sw-journey=\"{{ :: $ctrl.journey }}\" sw-category=\"{{ :: $ctrl.filterCategories[1] }}\" sw-height-category=\"{{ :: $ctrl.heightCategory }}\" sw-initial-slide=\"{{ :: $ctrl.initialSlide }}\" sw-display-separate-selling-price-text=\"{{ :: $ctrl.displaySeparateSellingPriceText }}\" sw-display-saving=\"{{ :: $ctrl.displaySaving }}\" sw-saving-text=\"{{ :: $ctrl.savingText }}\" sw-layout=\"{{ :: $ctrl.layoutType }}\" sw-display-type=\"{{ :: $ctrl.displayType }}\" hint-content-url=\"{{ :: $ctrl.hintContentUrl[1] }}\" hint-icon=\"{{ :: $ctrl.hintIcon }}\" hint-modal-close-icon=\"{{ :: $ctrl.hintModalCloseIcon }}\" hint-modal-title=\"{{ :: $ctrl.hintModalTitle[1] }}\" hint-modal-size=\"{{ :: $ctrl.hintModalSize[1] }}\" sw-select-mode=\"{{ :: $ctrl.selectMode }}\"></swiper></div><div><swiper bundle-category-filter=\"{{ :: $ctrl.bundleCategoryFilter }}\" sw-select-text=\"{{ :: $ctrl.selectText }}\" sw-selected-text=\"{{ :: $ctrl.selectedText }}\" sw-price-text=\"{{ :: $ctrl.priceText }}\" sw-currency-config=\"{{ :: $ctrl.currencyConfig }}\" sw-data-key=\"{{ :: $ctrl.dataKey }}\" sw-journey=\"{{ :: $ctrl.journey }}\" sw-category=\"{{ :: $ctrl.filterCategories[2] }}\" sw-height-category=\"{{ :: $ctrl.heightCategory }}\" sw-initial-slide=\"{{ :: $ctrl.initialSlide }}\" sw-display-separate-selling-price-text=\"{{ :: $ctrl.displaySeparateSellingPriceText }}\" sw-display-saving=\"{{ :: $ctrl.displaySaving }}\" sw-saving-text=\"{{ :: $ctrl.savingText }}\" sw-layout=\"{{ :: $ctrl.layoutType }}\" sw-display-type=\"{{ :: $ctrl.displayType }}\" hint-content-url=\"{{ :: $ctrl.hintContentUrl[2] }}\" hint-icon=\"{{ :: $ctrl.hintIcon}}\" hint-modal-close-icon=\"{{ :: $ctrl.hintModalCloseIcon }}\" hint-modal-title=\"{{ :: $ctrl.hintModalTitle[2] }}\" hint-modal-size=\"{{ :: $ctrl.hintModalSize[2] }}\" sw-select-mode=\"{{ :: $ctrl.selectMode }}\"></swiper></div></div></div>"
  );


  $templateCache.put('/components/ng-components/swiper/swiper.html',
    "<div class=\"swiper-top-wrap swiper-{{$ctrl.displayType}}\" ng-class=\"{\n" +
    "        'horizontal-swiper': $ctrl.layoutType === 'horizontal-left' || $ctrl.layoutType === 'horizontal-right',\n" +
    "        'swiper-disabled': $ctrl.isDisabled()\n" +
    "    }\" ng-show=$ctrl.attachments.length><div class=swiper-wrap><div class=swiper-container><div class=swiper-wrapper><div class=swiper-slide ng-repeat=\"attachment in :: $ctrl.attachments | orderBy: 'index'\"><div class=swiper-header><div class=\"col-xs-4 swiper-header-image\"><img ng-src=\"{{:: attachment.imageUrl | relativeUrl }}\" alt=\"\"></div><div class=\"col-xs-8 header-text\"><h6 class=text-left>{{ :: attachment.name }}</h6></div></div><div class=swiper-body><ul same-height=\"{{:: $ctrl.heightCategory}}\"><li class=swiper-first-benefit ng-if=\":: attachment.data.productBenefit1\">{{ :: attachment.data.productBenefit1 }}</li><li ng-if=\":: attachment.data.productBenefit2\">{{ :: attachment.data.productBenefit2 }}</li><li ng-if=\":: attachment.data.productBenefit3\">{{ :: attachment.data.productBenefit3 }}</li><li ng-if=\":: attachment.data.productBenefit4\">{{ :: attachment.data.productBenefit4 }}</li></ul><h6 class=swiper-price><span ng-if=\":: $ctrl.displaySeparateSellingPriceText === 'true'\"><uit-price-format number=\":: attachment.data.separatePrice\"></uit-price-format></span><span ng-if=\":: $ctrl.displaySeparateSellingPriceText !== 'true'\"><uit-price-format number=\":: attachment.price\"></uit-price-format></span><div class=swiper-saving ng-show=\"$ctrl.displaySaving !== 'false' && attachment.saving\">{{ :: $ctrl.savingText }}&nbsp;<uit-price-format number=\":: attachment.saving\"></uit-price-format></div></h6><p class=swiper-price-text ng-if=\":: $ctrl.displaySeparateSellingPriceText === 'true'\">{{ :: $ctrl.priceText }}</p></div></div></div><div class=swiper-pagination ng-show=\":: $ctrl.attachments.length > 1\"></div></div><div class=swiper-select ng-class=\"{\n" +
    "                'swiper-select-selected': $ctrl.isSelected(),\n" +
    "                'swiper-select-right': $ctrl.layoutType === 'horizontal-right'\n" +
    "            }\" ng-click=$ctrl.select()><span class=swiper-selected-text>{{:: $ctrl.selectedText}}</span> <span class=swiper-not-selected-text>{{:: $ctrl.selectText}}</span></div><div class=\"modal-backdrop fade in\" ng-class=\"{active: $ctrl.isOpen}\"></div><div class=\"modal fade bootstrap-dialog\" tabindex=-1 role=dialog ng-style=\"$ctrl.isOpen ? {'display': 'block'} : {'display': 'none'}\" ng-click=\"$ctrl.isOpen =!$ctrl.isOpen\" ng-if=$ctrl.isOpen><div class=\"modal-dialog {{ :: $ctrl.hintModalSize }}\" role=document><div class=modal-content ng-click=$event.stopPropagation()><div class=\"modal-header no-warning\"><button aria-label=Close class=\"close {{ :: $ctrl.hintModalCloseIcon }}\" data-dismiss=modal ng-click=\"$ctrl.isOpen = false\" type=button></button><h4 class=modal-title id=myModalLabel>{{ :: $ctrl.hintModalTitle }}</h4></div><div class=modal-body><div ng-if=$ctrl.isOpen ng-include=\"$ctrl.hintContentUrl | relativeUrl\"></div></div></div></div></div></div><span class=\"swiper-info-icon {{ :: $ctrl.hintIcon }}\" ng-click=\"$ctrl.isOpen = !$ctrl.isOpen\"></span></div>"
  );


  $templateCache.put('/components/ng-components/tabbed-plans-recommendations/tabbed-plans-recommendations.html',
    "<div class=\"row tabbed-plans-recommendations\" ng-controller=\"TabbedPlansRecommendationsController as ctp\"><div ng-class=\"ctp.deviceTileShown ? 'col-sm-offset-3 col-sm-9' : 'col-sm-12'\" class=tabbed-carriers><ul class=\"nav nav-pills\"><li role=presentation ng-repeat=\"tab in ctp.tabs\" ng-class=\"tab.active ? 'active' : ''\" ng-show=\"ctp.tabs.length > 1\"><a href=\"\" ng-click=ctp.tabSelected(tab.id)><div class=\"network-logo {{tab.class}}\"></div></a></li></ul></div><div class=tabbed-carriers-display><div class=col-sm-3 ng-show=ctp.deviceTileShown><device-tile></device-tile></div><div ng-class=\"ctp.deviceTileShown ? 'col-sm-9' : 'col-sm-12'\"><div class=row ng-class=\"ctp.selectedTab !== '' ? 'active' : ''\"><div><div class=\"col-lg-8 col-md-8 col-sm-8 recommended-no-results\" ng-if=\"ctp.areTherePropositions === false\"><h1>{{noResultsTitle}}</h1><p>{{noResultsMsg}}</p><button ng-click=goToNoResultsButtonPath() class=\"btn btn-cws\">{{noResultsButtonLabel}}</button></div><div class=\"recommended-proposition-item col-xs-4\" ng-repeat=\"item in ctp.propositions.slice( ctp.startOffset, ctp.endOffset)\" ng-click=ctp.goTo(url,item.id) ng-show=\"ctp.selectedTab == '' || item.serviceProvider == ctp.selectedTab\" ng-class=\"{ 'recommended-proposition-item-first' : item.itemIsFirst, 'recommended-proposition-item-last' : item.itemIsLast }\"><div ng-hide=\"item.itemIsLast || item.itemIndex == ctp.getShownLength() || (item.itemIndex > 2)\"><div class=recommend-better-summary ng-class=\"{disabled : ctp.hideDifferenceText($index)}\" ng-bind-html=ctp.sanitize(ctp.getDifferenceText(item.offering[0].id))></div></div><div class=recommended-plan><div class=recommended-cost><span class=cost><uit-price-format number=item.offering[0].monthlyContract.regularInstallmentAmount.net.value></uit-price-format></span><span class=cost-label>{{monthCostLabel}}</span></div><div class=recommended-upfront-cost><span><div>{{upfrontCostLabel}} <span ng-if=\"item.upfrontPrice.net.value === 0\">{{freeLabel}}</span> <span ng-if=\"item.upfrontPrice.net.value >= 1\"><uit-price-format number=item.offering[0].upfrontPrice.net.value></uit-price-format></span></div></span></div><div class=recommended-benefits><ul class=head><li>{{ctp.getPlanName(item.offering[0].id)}}</li></ul><ul class=benefits><li ng-repeat=\"benefit in ctp.getBenefitsText(item.offering[0].id)\"><span class={{benefitIcon}}></span>{{benefit}}</li></ul></div><div class=recommended-details><div class=container-fluid><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=network-logo ng-class=ctp.getCarrierClass(item.serviceProvider)></div></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{talkPointsColor}} canvas-id=allowance-canvas{{$index}} canvas-position=\"{{ctp.getAllowanceGraphPosition(item.tariff.talkAllowance.number, item.tariff.talkAllowance.units, item.tariff.talkAllowance.unlimited, talkPoints)}}\"></graph></div><span class=value>{{ctp.getAllowanceValue(item.tariff.talkAllowance.number, item.tariff.talkAllowance.units, item.tariff.talkAllowance.unlimited, unlimitedText)}}</span> <span class=dlabel>{{talkLabel}}</span></div></div></div><hr><div class=container-fluid><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{dataPointsColor}} canvas-id=allowance-canvas{{$index}} canvas-position=\"{{ctp.getAllowanceGraphPosition(item.tariff.dataAllowance.number, item.tariff.dataAllowance.units, item.tariff.dataAllowance.unlimited, dataPoints)}}\"></graph></div><span class=value>{{ctp.getAllowanceValue(item.tariff.dataAllowance.number, item.tariff.dataAllowance.units, item.tariff.dataAllowance.unlimited, unlimitedText)}}</span> <span class=dlabel>{{dataLabel}}</span></div></div><div class=\"col-lg-6 col-md-6 col-sm-6\"><div class=detail><div class=canvas-wrap><graph canvas-color={{textPointsColor}} canvas-id=allowance-canvas{{$index}} canvas-position=\"{{ctp.getAllowanceGraphPosition(item.tariff.textAllowance.number, item.tariff.textAllowance.units, item.tariff.textAllowance.unlimited, textPoints)}}\"></graph></div><span class=value>{{ctp.getAllowanceValue(item.tariff.textAllowance.number, item.tariff.textAllowance.units, item.tariff.textAllowance.unlimited, unlimitedText)}}</span> <span class=dlabel>{{textLabel}}</span></div></div></div></div><div class=\"recommended-upsell reward-tier-{{ctp.getRewardTier(item.offering[0].id)}}\"><p ng-if=\"ctp.downsellPlan === $index\">{{sellTextDownsellText}}</p><p ng-if=\"ctp.recommendedPlan === $index\">{{sellTextBestMatchText}}</p><p ng-if=\"ctp.upsell1 === $index\">{{sellTextUpsell1Text}}</p><p ng-if=\"ctp.upsell2 === $index\">{{sellTextUpsell2Text}}</p></div></div></div></div></div></div></div></div>"
  );


  $templateCache.put('/components/ng-components/text-search/text-search.html',
    "<div class=\"ts-search component\"><div class=search-box-container><div class=search-box ng-style=\"{'background-image': 'url(' + backgroundImage + ')'}\"><h1>{{searchTitle}}</h1><form novalidate name=searchform role=form class=form-inline><div class=input-group><label class=\"control-label sr-only\" for=search>{{userPlaceholderText}}</label><input ng-change=performSearch() style=\"width: {{searchBoxWidth}}px\" autocomplete=off name=search ng-model=search ng-class=\"{'has-error' : searchform.search.$error}\" class=form-control id=search placeholder={{searchPlaceholderText}} hide-status-bar required ng-model-options=\"{updateOn: 'default blur'}\"><div class=input-group-addon><span class=input-group-btn><button ng-if=\"search.length==0\" class=\"search-btn btn btn-default\" ng-click=performSearch() type=button><span class={{searchIcon}}></span></button> <button ng-if=\"search.length>0\" class=\"clear-btn btn btn-default\" ng-click=clearSearch() type=button><span class={{clearSearchIcon}}></span></button></span></div></div></form></div></div></div>"
  );


  $templateCache.put('/components/ng-components/title-component/title-component.html',
    "<div class=title-component ng-switch=$ctrl.tag><h1 ng-switch-when=h1 class=\"{{ :: $ctrl.alignment }}\">{{ :: $ctrl.title | htmlToPlaintext }}</h1><h2 ng-switch-when=h2 class=\"{{ :: $ctrl.alignment }}\">{{ :: $ctrl.title | htmlToPlaintext }}</h2><h3 ng-switch-when=h3 class=\"{{ :: $ctrl.alignment }}\">{{ :: $ctrl.title | htmlToPlaintext }}</h3><h4 ng-switch-when=h4 class=\"{{ :: $ctrl.alignment }}\">{{ :: $ctrl.title | htmlToPlaintext }}</h4><h5 ng-switch-when=h5 class=\"{{ :: $ctrl.alignment }}\">{{ :: $ctrl.title | htmlToPlaintext }}</h5><h6 ng-switch-when=h6 class=\"{{ :: $ctrl.alignment }}\">{{ :: $ctrl.title | htmlToPlaintext }}</h6></div>"
  );


  $templateCache.put('/components/ng-components/tracked-button/tracked-button.html',
    "<div class=\"trackedButton clearfix\"><div class=\"trackedButton__checkbox trackedButton__checkbox--{{ :: $ctrl.alignment }} clearfix\"><input class=trackedButton__checkbox-input type=checkbox name=status ng-model=$ctrl.status id=\"{{ :: $ctrl.trackingId }}\" ng-true-value=\"'checked'\" ng-false-value=\"'not-checked'\"><label class=trackedButton__checkbox-label for=\"{{ :: $ctrl.trackingId }}\">{{ :: $ctrl.labelText }}</label></div><div class=\"trackedButton__button trackedButton__button--{{ :: $ctrl.alignment }}\" ng-if=\"$ctrl.status === 'checked'\"><button class=\"btn btn-cws trackedButton__button-button\" ng-click=$ctrl.setTrackingData()>{{ :: $ctrl.buttonText }}</button></div></div>"
  );


  $templateCache.put('/components/ng-components/upsell-message/upsell-message.html',
    "<div class=drctv-upsell-message><div class=upsell-message-arrow><div class=upsell-message-price-delta>+<uit-price-format number=$ctrl.data.priceDelta></uit-price-format></div>{{ $ctrl.data.message }}</div></div>"
  );


  $templateCache.put('/components/ng-components/vertical-slider-item/vertical-slider-item.html',
    "<div class=vertical-slider-item><div class=vertical-slider-item-body><div class=product-title><h6 ng-click=\"goToPDP(product.device.id, imgCTA)\">{{product.device.manufacturer | htmlToPlaintext}} {{product.device.name | htmlToPlaintext}}</h6><device-compare dc-compare-inactive=cwsicon-circle-heart dc-compare-active=cwsicon-circle-heart-sel dc-compare-hidden=false></device-compare></div><div class=product-image ng-click=\"goToPDP(product.device.id, imgCTA)\"><device-stickers ds-order-priority=2></device-stickers><img ng-src={{product.device.available_colours[0].imagery[0].url}}></div><pricing pr-currency-config={{currencyRules}} pr-layout-type={{layoutType}}></pricing><div class=\"product-stock-count clearfix\"><span class=instock><stock-count></stock-count></span></div><div class=product-features><device-icon-features dif-journey-type={{journeyType}} dif-features={{featureFeatureList}} dif-display={{featureDisplay}}></device-icon-features></div><device-tags pt-journey-type={{journeyType}}></device-tags></div><div class=product-button-container><button class=\"btn btn-block\" ng-click=\"addToBasket(product, selectCTA, bracket, $index)\">{{buttonText}}</button></div></div>"
  );


  $templateCache.put('/components/ng-components/vertical-slider/vertical-slider.html',
    "<div class=\"col-md-4 col-lg-4 col-sm-4 product-slider\"><div class=\"swiper-container swiper-container-{{ :: bracket }}\"><div ng-show=\"devices.length > 1 && limit > 1\" class=\"swiper-pagination swiper-pagination-{{ :: bracket }}\"></div><div class=swiper-wrapper><div class=swiper-slide ng-repeat=\"product in devices | limitTo: limit\"><vertical-slider-item vsi-product=\"{{ product }}\"></vertical-slider-item></div></div></div></div>"
  );


  $templateCache.put('/components/uit-components/basket-builder-device/basket-builder-device.html',
    "<div class=basketBuilderDevice><div class=basketBuilderDevice ng-click=$ctrl.handleClick($event)><uit-title-block title=Phone></uit-title-block><div class=basketBuilderDevice__image ng-class=\"{'basketBuilderDevice__image--expand' : $ctrl.expand, 'basketBuilderDevice__image--closed' : !$ctrl.expand }\"><div class=basketBuilderDevice__image-inner><button class=basketBuilderDevice__image-button ng-click=$ctrl.goTo($ctrl.imageLink)><img ng-src=\"{{ :: $ctrl.setImage | relativeUrl }}\"></button></div><div ng-show=$ctrl.expand class=basketBuilderDevice__button-container ng-init=!$ctrl.model.imeiScanned><button ng-click=$ctrl.goTo($ctrl.imeiLink) ng-class=\"{'imei--scanned': $ctrl.model.imeiScanned}\" class=basketBuilderDevice__button><span ng-if=$ctrl.model.imeiScanned class=\"{{:: $ctrl.buttonActiveIcon }}\"></span> {{ $ctrl.model.imeiScanned ? $ctrl.buttonLabelActive : $ctrl.buttonLabel }}</button></div></div><uit-modal params='{\"url\" : $ctrl.setImage, \"description\" : $ctrl.setImage.desciption }' type=custom size=md><div class=uitModal__body><div class=uitModal__image><img alt=\"{{ :: $ctrl.params.description}}\" title=\"{{ :: $ctrl.params.description}}\" ng-src=\"{{ :: $ctrl.params.url}}\"></div></div></uit-modal><div class=basketBuilderDevice__details><div class=basketBuilderDevice__details-inner><div class=basketBuilderDevice__details-inner-item-top><div class=basketBuilderDevice__details-inner__title><h3>{{ ::$ctrl.model.data.device.model }} {{ :: $ctrl.model.data.device.manufacturer }}</h3></div><div class=basketBuilderDevice__details-inner__sub-title><ul><li>{{ :: $ctrl.model.data.device.capacity.amount }} {{ ::$ctrl.model.data.device.capacity.unit }} {{ :: $ctrl.model.data.device.colour }}</li><li>{{ :: $ctrl.model.selectedOffering.terminMonths }} {{:: $ctrl.model.selectedOffering.termLengthUnits }}</li></ul></div></div><div ng-show=$ctrl.expand><div class=basketBuilderDevice__details-inner-item-middle><button class=basketBuilderDevice__plain ng-click=$ctrl.goTo($ctrl.detailsLink) ng-click=$event.stopPropagation()><span class=\"{{:: $ctrl.detailsIcon }}\"></span> {{::$ctrl.detailsLabel}}</button></div><div class=basketBuilderDevice__details-inner-item><div class=\"basketBuilderDevice__details-inner-item-edit pull-right\"><button class=basketBuilderDevice__plain ng-click=$ctrl.goTo($ctrl.editLink) ng-click=$event.stopPropagation()><span class=\"{{:: $ctrl.editIcon }}\"></span> {{:: $ctrl.editLabel}}</button></div></div></div></div></div></div></div>"
  );


  $templateCache.put('/components/uit-components/basket-builder-plan/basket-builder-plan.html',
    "<div class=basketBuilderPlan ng-switch=\"$ctrl.tariffProposition || 'NO_PLAN'\"><uit-basket-builder-state-manager not-started-label=\"{{:: $ctrl.notStartedLabel }}\" in-progress-label=\"{{:: $ctrl.inProgressLabel }}\" section-type=\"{{:: $ctrl.sectionType }}\" cta-link=\"{{:: $ctrl.ctaLink }}\" disabled-state=$ctrl.disabledState ng-switch-when=NO_PLAN></uit-basket-builder-state-manager><div class=basketBuilderPlan__full-state ng-click=$ctrl.handleClick($event) ng-switch-default><uit-title-block title=\"{{:: $ctrl.title}}\"></uit-title-block><div class=basketBuilderPlan__allowances><div class=basketBuilderPlan__data-allowance ng-switch=\"$ctrl.tariffProposition.tariff.dataAllowance.unlimited ? 'UNLIMITED' : 'LIMITED'\"><h2 ng-switch-when=UNLIMITED>{{:: $ctrl.unlimitedDataLabel }}</h2><h2 ng-switch-default>{{:: $ctrl.tariffProposition.tariff.dataAllowance.number}} {{:: $ctrl.tariffProposition.tariff.dataAllowance.units}}</h2><div class=basketBuilderPlan__term-length-units>{{:: $ctrl.perMonthDataLabel }}</div></div><div ng-if=$ctrl.expand class=basketBuilderPlan__traffic-allowance><uit-device-usage orientation=vertical data=$ctrl.deviceUsage></uit-device-usage></div></div><div class=basketBuilderPlan__details><div class=basketBuilderPlan__details-inner><div class=basketBuilderPlan__details-inner-top><div class=basketBuilderPlan__summary><h3>{{:: $ctrl.tariffProposition.tariff.name}}</h3><div class=basketBuilderPlan__contract-length>{{:: $ctrl.selectedOffering.termLength}} {{:: $ctrl.selectedOffering.termLengthUnits}} {{:: $ctrl.contractLabel}}</div></div><ul class=basketBuilderPlan__features-list><uit-icon-list ng-repeat=\"feature in $ctrl.tariffProposition.features | limitTo:$ctrl.detailsLimit\" list=\"[{ icon: $ctrl.planFeatureIcon, text: feature.value }]\"></uit-icon-list></ul><div ng-if=$ctrl.expand class=basketBuilderPlan__full-plan-details-button><div ng-click=$ctrl.goTo($ctrl.fullPlanLink)><span class=cwsicon ng-class=$ctrl.fullPlanIcon></span>{{:: $ctrl.fullPlanLabel}}</div></div></div><div ng-if=$ctrl.expand ng-click=$ctrl.goTo($ctrl.editLink) class=basketBuilderPlan__edit-button><span class=cwsicon ng-class=$ctrl.editIcon></span>{{:: $ctrl.editLabel}}</div></div></div></div></div>"
  );


  $templateCache.put('/components/uit-components/basket-builder-state-manager/basket-builder-state-manager.html',
    "<div class=basketBuilderStateManager ng-class=\"{'basketBuilderStateManager--disabledState': $ctrl.disabledState}\" ng-click=$ctrl.handleClick($event)><div class=basketBuilderStateManager__state-description>{{:: $ctrl.notStartedLabel }}<div class=basketBuilderStateManager__in-progress-state>{{ $ctrl.inProgress }}</div></div></div>"
  );


  $templateCache.put('/components/uit-components/device-usage/device-usage.html',
    "<div class=\"uitDeviceUsage uitDeviceUsage--{{$ctrl.orientation}}\"><ul class=uitDeviceUsage__list><li ng-repeat=\"dataType in $ctrl.data\"><span class=\"uitDeviceUsage__icon {{dataType.icon}}\"></span><div class=uitDeviceUsage__data><span class=uitDeviceUsage__amount>{{dataType.amount}}<span class=uitDeviceUsage__unit>{{dataType.unit}}</span></span> <span class=uitDeviceUsage__label>{{dataType.label}}</span></div></li></ul></div>"
  );


  $templateCache.put('/components/uit-components/icon-list/icon-list.html',
    "<ul class=uitIconList><li ng-repeat=\"item in $ctrl.list\"><span class=\"uitIconList__icon {{ :: item.icon}}\"></span> <span>{{ :: item.text }}</span></li></ul>"
  );


  $templateCache.put('/components/uit-components/insert-placeholder/insert-placeholder.html',
    "{{ :: $ctrl.splitSentence[0] }} <span class=\"{{ :: $ctrl.styleClass }}\">{{ :: $ctrl.replaceText }}</span>{{ :: $ctrl.splitSentence[2] }}"
  );


  $templateCache.put('/components/uit-components/modal/modal.html',
    "<div class=uitModal ng-click=$ctrl.params.dismiss()><div ng-click=$event.stopPropagation(); class=\"uitModal__content uitModal__content--{{ :: $ctrl.size}}\"><div ng-switch=\" :: $ctrl.type\"><div ng-switch-when=confirm><h4 class=uitModal__title><span ng-if=\":: $ctrl.params.titleIcon\" class=\"uitModal__title-icon {{ :: $ctrl.params.titleIcon}}\"></span> {{ :: $ctrl.params.title}}</h4><p class=uitModal__body>{{ :: $ctrl.params.message}}</p><div class=uitModal__footer><button class=\"uitModal__button uitModal__button--secondary\" type=button ng-click=$ctrl.params.dismiss()>{{ :: $ctrl.params.cancelLabel}}</button> <button class=uitModal__button type=button ng-click=$ctrl.params.submit()>{{ :: $ctrl.params.submitLabel}}</button></div></div><div ng-switch-when=custom ng-transclude=\"\"></div></div></div></div>"
  );


  $templateCache.put('/components/uit-components/number-format/number-format.html',
    "<span class=major-units>{{ $ctrl.number | absNumber : $ctrl.groupSeparator }}</span><span class=decimal>{{ :: $ctrl.decimalSeparator }}</span><span class=minor-units>{{ $ctrl.number | decNumber : $ctrl.decimalPlaces }}</span>"
  );


  $templateCache.put('/components/uit-components/price-format/price-format.html',
    "<span class=formatted-price ng-switch=\":: $ctrl.config.currencyFormat\"><span ng-switch-when=0><span class=currency ng-bind-html=$ctrl.currencySymbol></span><uit-number-format decimal-places=\"{{ :: $ctrl.config.digitsAfterDecimal }}\" decimal-separator=\"{{ :: $ctrl.config.decimalSymbol }}\" group-separator=\"{{ :: $ctrl.config.digitGrouping ? $ctrl.config.digitGroupingSymbol : '' }}\" number=$ctrl.number></uit-number-format></span><span ng-switch-when=1><uit-number-format decimal-places=\"{{ :: $ctrl.config.digitsAfterDecimal }}\" decimal-separator=\"{{ :: $ctrl.config.decimalSymbol }}\" group-separator=\"{{ :: $ctrl.config.digitGrouping ? $ctrl.config.digitGroupingSymbol : '' }}\" number=$ctrl.number></uit-number-format><span class=currency ng-bind-html=$ctrl.currencySymbol></span></span><span ng-switch-when=2><span class=currency ng-bind-html=$ctrl.currencySymbol></span><uit-number-format decimal-places=\"{{ :: $ctrl.config.digitsAfterDecimal }}\" decimal-separator=\"{{ :: $ctrl.config.decimalSymbol }}\" group-separator=\"{{ :: $ctrl.config.digitGrouping ? $ctrl.config.digitGroupingSymbol : '' }}\" number=$ctrl.number></uit-number-format></span><span ng-switch-when=3><uit-number-format decimal-places=\"{{ :: $ctrl.config.digitsAfterDecimal }}\" decimal-separator=\"{{ :: $ctrl.config.decimalSymbol }}\" group-separator=\"{{ :: $ctrl.config.digitGrouping ? $ctrl.config.digitGroupingSymbol : '' }}\" number=$ctrl.number></uit-number-format><span class=currency ng-bind-html=$ctrl.currencySymbol></span></span></span>"
  );


  $templateCache.put('/components/uit-components/product-item/product-item.html',
    "<div class=uitProductItem><div class=uitProductItem__title ng-class=\":: {'uitProductItem__title--hasCompare': $ctrl.onCompareRemove}\"><h6>{{ :: $ctrl.product.device.manufacturer | htmlToPlaintext }} {{ :: $ctrl.product.device.name | htmlToPlaintext }}</h6><a class=\"{{ :: $ctrl.removeCompareIcon }}\" ng-click=$ctrl.onCompareRemove({$event:$event}) ng-if=$ctrl.onCompareRemove></a></div><div class=uitProductItem__image ng-click=$ctrl.onSelectImage()><device-stickers ds-journey-type=\"{{ :: $ctrl.dsJourneyType }}\" ds-order-priority=2></device-stickers><img ng-src=\"{{ :: $ctrl.product.device.available_colours[0].imagery[0].url }}\"></div><pricing pr-device=$ctrl.product.device pr-layout-type=\"{{ :: $ctrl.prLayoutType }}\" pr-offering=$ctrl.product.offering[0]></pricing><device-benefits features-array=$ctrl.featuresArray product=$ctrl.product></device-benefits><div class=\"uitProductItem__stockCount clearfix\"><span class=instock><stock-count method=eventApi></stock-count></span></div><div class=uitProductItem__features ng-if=\":: $ctrl.difFeatures\"><device-icon-features dif-display=\"{{ :: $ctrl.difDisplay }}\" dif-features=\"{{ :: $ctrl.difFeatures }}\" dif-journey-type=\"{{ :: $ctrl.difJourneyType }}\"></device-icon-features></div><div ng-show=$ctrl.showTags><device-tags pt-journey-type=\"{{ :: $ctrl.difJourneyType }}\"></device-tags></div><uit-product-select on-select=$ctrl.onSelect() on-is-selected=$ctrl.onIsSelected() select-text=\"{{ :: $ctrl.selectText }}\" selected-text=\"{{ :: $ctrl.selectedText }}\"></uit-product-select></div>"
  );


  $templateCache.put('/components/uit-components/product-select/product-select.html',
    "<div class=uitProductSelect ng-switch=\"$ctrl.onIsSelected() ? 'SELECTED' : 'UNSELECTED'\"><button class=\"btn btn-cws uitProductSelect__button active\" ng-click=$ctrl.onSelect() ng-switch-when=SELECTED>{{ :: $ctrl.selectedText }}</button> <button class=\"btn btn-cws uitProductSelect__button\" ng-click=$ctrl.onSelect() ng-switch-when=UNSELECTED>{{ :: $ctrl.selectText }}</button></div>"
  );


  $templateCache.put('/components/uit-components/title-block/title-block.html',
    "<div class=uitTitleBlock><span>{{ :: $ctrl.title}}</span></div>"
  );


  $templateCache.put('/components/uit-components/ways-to-buy/ways-to-buy.html',
    "<ng-switch on=\"$ctrl.selectedOfferingType || 'SELECT_OFFERING_TYPE'\"><div class=uitWaysToBuy ng-switch-when=SELECT_OFFERING_TYPE><div class=uitWaysToBuy__offeringType ng-repeat=\"offering in $ctrl.offering | unique : 'offeringType'\"><div class=uitWaysToBuy__header>{{ :: $ctrl.offeringTypes[offering.offeringType] }}</div><ng-switch on=\"$ctrl.showOffering === 'true' ? 'SELECT_OFFERING' : 'SELECT_TYPE_ONLY'\"><div ng-switch-when=SELECT_OFFERING><div class=uitWaysToBuy__content>{{ :: offering.termInMonths }} {{ :: $ctrl.termText }}</div><a class=uitWaysToBuy__select ng-click=\"$ctrl.onSelect({offering: offering})\">{{ :: $ctrl.selectText }}</a> <a class=uitWaysToBuy__viewMore ng-click=$ctrl.selectOfferingType(offering)>{{ :: $ctrl.moreText }}</a></div><a class=uitWaysToBuy__select ng-switch-when=SELECT_TYPE_ONLY ng-click=$ctrl.selectOfferingType(offering)>{{ :: $ctrl.selectText }}</a></ng-switch></div></div><div class=uitWaysToBuy ng-switch-default><div class=\"uitWaysToBuy__header uitWaysToBuy__header--full\">{{ :: $ctrl.offeringTypes[$ctrl.selectedOfferingType.offeringType] }}</div><div class=uitWaysToBuy__term ng-repeat=\"offering in $ctrl.offering | filter : {offeringType: $ctrl.selectedOfferingType.offeringType}\"><div class=uitWaysToBuy__content>{{ :: offering.termInMonths }} {{ :: $ctrl.termText }}</div><a class=uitWaysToBuy__select ng-click=\"$ctrl.onSelect({offering: offering})\">{{ :: $ctrl.selectText }}</a></div><a class=uitWaysToBuy__viewOther ng-click=$ctrl.selectOfferingType()>{{ :: $ctrl.otherWaysText }}</a></div></ng-switch>"
  );

}]);
