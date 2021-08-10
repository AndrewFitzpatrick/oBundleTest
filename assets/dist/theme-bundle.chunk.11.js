(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../theme/common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category(context) {
    var _this;

    _this = _CatalogPage.call(this, context) || this;
    _this.validationDictionary = Object(_theme_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__["createTranslationDictionary"])(context);
    return _this;
  }

  var _proto = Category.prototype;

  _proto.setLiveRegionAttributes = function setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      'aria-live': ariaLiveStatus
    });
  };

  _proto.makeShopByPriceFilterAccessible = function makeShopByPriceFilterAccessible() {
    var _this2 = this;

    if (!$('[data-shop-by-price]').length) return;

    if ($('.navList-action').hasClass('is-active')) {
      $('a.navList-action.is-active').focus();
    }

    $('a.navList-action').on('click', function () {
      return _this2.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive');
    });
  };

  _proto.onReady = function onReady() {
    var _this3 = this;

    this.arrangeFocusOnSortBy();
    $('[data-button-type="add-cart"]').on('click', function (e) {
      return _this3.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite');
    });
    this.makeShopByPriceFilterAccessible();
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    $('a.reset-btn').on('click', function () {
      return _this3.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite');
    });
    this.ariaNotifyNoProducts(); // console.log('Log Cart');
    // fetch('/api/storefront/cart', {
    //   credentials: 'include'
    // }).then(function(response) {
    //   return response.json();
    // }).then(function(myJson) {
    //   console.log(myJson);
    // });

    this.addRemoveCart(); // this.addAllToCart();
    // $('#remove-from-cart-category-button').on('click', () => {
    //     console.log('click');
    //     utils.api.cart.getCartQuantity({}, (err, response) => {
    //         // console.log(response > 0);
    //         if (response > 0) { 
    //             this.addAllToCart() 
    //         } else { 
    //             this.cartRemoveItem(112, (err, response)); 
    //         }
    //     }); 
    // })
  };

  _proto.addRemoveCart = function addRemoveCart() {
    var _this4 = this;

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCartQuantity({}, function (err, response) {
      // console.log(response > 0);
      if (response > 0) {
        _this4.cartRemoveItem(112, (err, response));
      } else {
        _this4.addAllToCart();
      }
    });
  };

  _proto.addAllToCart = function addAllToCart() {
    function createCart(url, cartItems) {
      return fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cartItems)
      }).then(function (response) {
        return response.json();
      });
    }

    ;
    $('#add-to-cart-category-button').click(createCart("https://fitztastic.mybigcommerce.com/api/storefront/carts", {
      "lineItems": [{
        "quantity": 1,
        "productId": 112
      }]
    }).then(function (data) {
      return console.log(JSON.stringify(data));
    })["catch"](function (error) {
      return console.error(error);
    })); // let cartUrl = '/';
    // // $('#remove-from-cart-category-button').hide();
    // // $('#add-to-cart-category-button').show();
    // const addToCart = () => {
    //     console.log('click');
    //     let categoryProductIds = this.context.productIds;
    //     if (categoryProductIds.length) {
    //         for (var i = 0; i < categoryProductIds.length; i++) {
    //             window.location='../cart.php?action=add&product_id='+categoryProductIds[i];
    //         }
    //     }        
    // }; 
    // $('#add-to-cart-category-button').click(addToCart);
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId, errResponse) {
    var _this5 = this;

    console.log(errResponse[1].data.status);
    $('#remove-from-cart-category-button').show();
    $('#add-to-cart-category-button').hide();
    $('#remove-from-cart-category-button').on('click', function () {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemRemove(itemId, function (errResponse) {
        if (errResponse[1].data.status === 'succeed') {
          _this5.refreshContent(true);
        } else {
          alert(errResponse[1].data.errors.join('\n'));
        }
      });
    }); // $('#remove-from-cart-category-button').click(cartRemoveItem);
  };

  _proto.ariaNotifyNoProducts = function ariaNotifyNoProducts() {
    var $noProductsMessage = $('[data-no-products-notification]');

    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this$validationDicti = this.validationDictionary,
        onMinPriceError = _this$validationDicti.price_min_evaluation,
        onMaxPriceError = _this$validationDicti.price_max_evaluation,
        minPriceNotEntered = _this$validationDicti.price_min_not_entered,
        maxPriceNotEntered = _this$validationDicti.price_max_not_entered,
        onInvalidPrice = _this$validationDicti.price_invalid_value;
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/*! exports provided: createTranslationDictionary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslationDictionary", function() { return createTranslationDictionary; });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCJhZGRSZW1vdmVDYXJ0IiwidXRpbHMiLCJhcGkiLCJjYXJ0IiwiZ2V0Q2FydFF1YW50aXR5IiwiZXJyIiwicmVzcG9uc2UiLCJjYXJ0UmVtb3ZlSXRlbSIsImFkZEFsbFRvQ2FydCIsImNyZWF0ZUNhcnQiLCJ1cmwiLCJjYXJ0SXRlbXMiLCJmZXRjaCIsIm1ldGhvZCIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsImpzb24iLCJjbGljayIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJpdGVtSWQiLCJlcnJSZXNwb25zZSIsInN0YXR1cyIsInNob3ciLCJoaWRlIiwiaXRlbVJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiYWxlcnQiLCJlcnJvcnMiLCJqb2luIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBw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QUNLLE1BQWhCLENBQXVCLFVBQUNDLEdBQUQsRUFBTUosR0FBTixFQUFXVixDQUFYLEVBQWlCO0FBQzNDYyxPQUFHLENBQUNKLEdBQUQsQ0FBSCxHQUFXSixhQUFhLENBQUNOLENBQUQsQ0FBeEI7QUFDQSxXQUFPYyxHQUFQO0FBQ0gsR0FITSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0sQyIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4uL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeSBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgIH1cblxuICAgIHNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCRlbGVtZW50LCByb2xlVHlwZSwgYXJpYUxpdmVTdGF0dXMpIHtcbiAgICAgICAgJGVsZW1lbnQuYXR0cih7XG4gICAgICAgICAgICByb2xlOiByb2xlVHlwZSxcbiAgICAgICAgICAgICdhcmlhLWxpdmUnOiBhcmlhTGl2ZVN0YXR1cyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpIHtcbiAgICAgICAgaWYgKCEkKCdbZGF0YS1zaG9wLWJ5LXByaWNlXScpLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICgkKCcubmF2TGlzdC1hY3Rpb24nKS5oYXNDbGFzcygnaXMtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24uaXMtYWN0aXZlJykuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EubmF2TGlzdC1hY3Rpb24nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoJ3NwYW4ucHJpY2UtZmlsdGVyLW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdhc3NlcnRpdmUnKSk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0xvZyBDYXJ0Jyk7XG4gICAgICAgIC8vIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydCcsIHtcbiAgICAgICAgLy8gICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICAgIC8vIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgLy8gICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyB9KS50aGVuKGZ1bmN0aW9uKG15SnNvbikge1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKG15SnNvbik7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICB0aGlzLmFkZFJlbW92ZUNhcnQoKTtcbiAgICAgICAgLy8gdGhpcy5hZGRBbGxUb0NhcnQoKTtcbiAgICAgICAgLy8gJCgnI3JlbW92ZS1mcm9tLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICAgIC8vICAgICB1dGlscy5hcGkuY2FydC5nZXRDYXJ0UXVhbnRpdHkoe30sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UgPiAwKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAocmVzcG9uc2UgPiAwKSB7IFxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmFkZEFsbFRvQ2FydCgpIFxuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNhcnRSZW1vdmVJdGVtKDExMiwgKGVyciwgcmVzcG9uc2UpKTsgXG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSk7IFxuICAgICAgICAvLyB9KVxuICAgIH1cbiAgICBhZGRSZW1vdmVDYXJ0KCkge1xuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDYXJ0UXVhbnRpdHkoe30sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSA+IDApO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID4gMCkgeyBcbiAgICAgICAgICAgICAgICB0aGlzLmNhcnRSZW1vdmVJdGVtKDExMiwgKGVyciwgcmVzcG9uc2UpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQWxsVG9DYXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcbiAgICB9XG5cbiAgICBhZGRBbGxUb0NhcnQoKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhcnQodXJsLCBjYXJ0SXRlbXMpIHtcbiAgICAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxuICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcbiAgICAgICAgICAgfSlcbiAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICAgICAgIH07XG5cbiAgICAgICAgJCgnI2FkZC10by1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLmNsaWNrKFxuICAgICAgICAgICAgY3JlYXRlQ2FydChgaHR0cHM6Ly9maXR6dGFzdGljLm15YmlnY29tbWVyY2UuY29tL2FwaS9zdG9yZWZyb250L2NhcnRzYCwge1xuICAgICAgICAgICAgICAgXCJsaW5lSXRlbXNcIjogW1xuICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICBcInByb2R1Y3RJZFwiOiAxMTJcbiAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSlcbiAgICAgICAgKTtcbiAgICAgICAgLy8gbGV0IGNhcnRVcmwgPSAnLyc7XG4gICAgICAgIC8vIC8vICQoJyNyZW1vdmUtZnJvbS1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLmhpZGUoKTtcbiAgICAgICAgLy8gLy8gJCgnI2FkZC10by1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLnNob3coKTtcbiAgICAgICAgLy8gY29uc3QgYWRkVG9DYXJ0ID0gKCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICAgIC8vICAgICBsZXQgY2F0ZWdvcnlQcm9kdWN0SWRzID0gdGhpcy5jb250ZXh0LnByb2R1Y3RJZHM7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIGlmIChjYXRlZ29yeVByb2R1Y3RJZHMubGVuZ3RoKSB7XG4gICAgICAgIC8vICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXRlZ29yeVByb2R1Y3RJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uPScuLi9jYXJ0LnBocD9hY3Rpb249YWRkJnByb2R1Y3RfaWQ9JytjYXRlZ29yeVByb2R1Y3RJZHNbaV07XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfSAgICAgICAgXG4gICAgICAgIC8vIH07IFxuICAgICAgICAvLyAkKCcjYWRkLXRvLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykuY2xpY2soYWRkVG9DYXJ0KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQsIGVyclJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVyclJlc3BvbnNlWzFdLmRhdGEuc3RhdHVzKTtcbiAgICAgICAgJCgnI3JlbW92ZS1mcm9tLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykuc2hvdygpO1xuICAgICAgICAkKCcjYWRkLXRvLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykuaGlkZSgpO1xuICAgICAgICAkKCcjcmVtb3ZlLWZyb20tY2FydC1jYXRlZ29yeS1idXR0b24nKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgZXJyUmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJSZXNwb25zZVsxXS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZXJyUmVzcG9uc2VbMV0uZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gJCgnI3JlbW92ZS1mcm9tLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykuY2xpY2soY2FydFJlbW92ZUl0ZW0pO1xuICAgIH1cbiAgICBcblxuICAgIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgICAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKCdbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dJyk7XG4gICAgICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=