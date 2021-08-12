(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

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

    //get cart and product id
    console.log('Log Cart');
    fetch('../api/storefront/cart', {
      credentials: 'include'
    }).then(function (response) {
      return response.json();
    }).then(function (myJson) {
      console.log(myJson);
    });
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
    this.ariaNotifyNoProducts(); // console.log(myCart);

    var getCartId = function getCartId() {
      return fetch('../api/storefront/cart', {
        credentials: 'include'
      }).then(function (response) {
        return response.json();
      }).then(function (myJson) {
        return myJson;
      });
    };

    $('#add-to-cart-category-button').on('click', function () {
      getCartId().then(function (response) {
        console.log(response[0].id);

        _this3.addCartItem("../api/storefront/carts/", response[0].id, {
          "lineItems": [{
            "quantity": 1,
            "productId": 112
          }]
        }).then(function (data) {
          return console.log(JSON.stringify(data));
        })["catch"](function (error) {
          return console.error(error);
        });
      });
    });
    this.removeCart();
  };

  _proto.removeCart = function removeCart() {
    var _this4 = this;

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCartQuantity({}, function (err, response) {
      console.log(response);

      if (response > 0) {
        $('#remove-from-cart-category-button').show();
        $('#remove-from-cart-category-button').on('click', function () {
          return _this4.deleteCartItem("../api/storefront/carts/", "bdec6d16-e546-4c24-afa2-b9c37e0c31f8", "425c6146-c8fe-4c18-a76a-f4e5a84d610b").then(function (data) {
            return console.log(JSON.stringify(data));
          })["catch"](function (error) {
            return console.log(error);
          });
        });
      } else {
        $('#remove-from-cart-category-button').hide();
      }
    });
  };

  _proto.addCartItem = function addCartItem(url, cartId, cartItems) {
    console.log('click'); // console.log(url, cartId, cartItems);

    return fetch(url + cartId + '/items', {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cartItems)
    }).then(function (response) {
      return response.json();
    });
  };

  _proto.deleteCartItem = function deleteCartItem(url, cartId, itemId) {
    return fetch(url + cartId + '/items/' + itemId, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response.json();
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiY29uc29sZSIsImxvZyIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibXlKc29uIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCJnZXRDYXJ0SWQiLCJpZCIsImFkZENhcnRJdGVtIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsInJlbW92ZUNhcnQiLCJ1dGlscyIsImFwaSIsImNhcnQiLCJnZXRDYXJ0UXVhbnRpdHkiLCJlcnIiLCJzaG93IiwiZGVsZXRlQ2FydEl0ZW0iLCJoaWRlIiwidXJsIiwiY2FydElkIiwiY2FydEl0ZW1zIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJpdGVtSWQiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxR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QUNBO0FBQ0E7QUFDQTs7O0FBQ08sSUFBTTVGLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBOEIsQ0FBQ0YsT0FBRCxFQUFhO0FBQUEsTUFDNUNvRyx3QkFENEMsR0FDb0RwRyxPQURwRCxDQUM1Q29HLHdCQUQ0QztBQUFBLE1BQ2xCQyxnQ0FEa0IsR0FDb0RyRyxPQURwRCxDQUNsQnFHLGdDQURrQjtBQUFBLE1BQ2dCQywrQkFEaEIsR0FDb0R0RyxPQURwRCxDQUNnQnNHLCtCQURoQjtBQUVwRCxNQUFNQyxnQkFBZ0IsR0FBR04sc0JBQXNCLENBQUNHLHdCQUFELEVBQTJCQyxnQ0FBM0IsRUFBNkRDLCtCQUE3RCxDQUEvQztBQUNBLE1BQU1FLGFBQWEsR0FBR1QsTUFBTSxDQUFDVSxNQUFQLENBQWNGLGdCQUFnQixDQUFDWCxZQUFELENBQTlCLENBQXRCO0FBQ0EsTUFBTWMsZUFBZSxHQUFHWCxNQUFNLENBQUNDLElBQVAsQ0FBWU8sZ0JBQWdCLENBQUNYLFlBQUQsQ0FBNUIsRUFBNENlLEdBQTVDLENBQWdELFVBQUFDLEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUNDLEtBQUosQ0FBVSxHQUFWLEVBQWVDLEdBQWYsRUFBSjtBQUFBLEdBQW5ELENBQXhCO0FBRUEsU0FBT0osZUFBZSxDQUFDSyxNQUFoQixDQUF1QixVQUFDQyxHQUFELEVBQU1KLEdBQU4sRUFBV1YsQ0FBWCxFQUFpQjtBQUMzQ2MsT0FBRyxDQUFDSixHQUFELENBQUgsR0FBV0osYUFBYSxDQUFDTixDQUFELENBQXhCO0FBQ0EsV0FBT2MsR0FBUDtBQUNILEdBSE0sRUFHSixFQUhJLENBQVA7QUFJSCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjE2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICAgICAgICAnYXJpYS1saXZlJzogYXJpYUxpdmVTdGF0dXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgICAgIGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAoJCgnLm5hdkxpc3QtYWN0aW9uJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksICdzdGF0dXMnLCAnYXNzZXJ0aXZlJykpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG5cbiAgICAgICAgLy9nZXQgY2FydCBhbmQgcHJvZHVjdCBpZFxuICAgICAgICBjb25zb2xlLmxvZygnTG9nIENhcnQnKTtcbiAgICAgICAgZmV0Y2goJy4uL2FwaS9zdG9yZWZyb250L2NhcnQnLCB7XG4gICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihteUpzb24pIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhteUpzb24pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XG5cbiAgICAgICAgJCgnW2RhdGEtYnV0dG9uLXR5cGU9XCJhZGQtY2FydFwiXScpLm9uKCdjbGljaycsIChlKSA9PiB0aGlzLnNldExpdmVSZWdpb25BdHRyaWJ1dGVzKCQoZS5jdXJyZW50VGFyZ2V0KS5uZXh0KCksICdzdGF0dXMnLCAncG9saXRlJykpO1xuXG4gICAgICAgIHRoaXMubWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSgpO1xuXG4gICAgICAgIGNvbXBhcmVQcm9kdWN0cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgICAgIGlmICgkKCcjZmFjZXRlZFNlYXJjaCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5yZXNldC1idG4nKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnNldExpdmVSZWdpb25zQXR0cmlidXRlcygkKCdzcGFuLnJlc2V0LW1lc3NhZ2UnKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG4gICAgICAgIHRoaXMuYXJpYU5vdGlmeU5vUHJvZHVjdHMoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobXlDYXJ0KTtcblxuXG4gICAgICAgIGNvbnN0IGdldENhcnRJZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaCgnLi4vYXBpL3N0b3JlZnJvbnQvY2FydCcsIHtcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJ1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihteUpzb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbXlKc29uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJyNhZGQtdG8tY2FydC1jYXRlZ29yeS1idXR0b24nKS5vbignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIGdldENhcnRJZCgpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlWzBdLmlkKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXJ0SXRlbShgLi4vYXBpL3N0b3JlZnJvbnQvY2FydHMvYCwgcmVzcG9uc2VbMF0uaWQsIHsgXCJsaW5lSXRlbXNcIjogWyB7XCJxdWFudGl0eVwiOiAxLCBcInByb2R1Y3RJZFwiOiAxMTIgfSBdfSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlbW92ZUNhcnQoKTtcbiAgICB9XG5cbiAgICByZW1vdmVDYXJ0KCkge1xuICAgICAgICBcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q2FydFF1YW50aXR5KHt9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID4gMCkge1xuICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtZnJvbS1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWZyb20tY2FydC1jYXRlZ29yeS1idXR0b24nKS5vbignY2xpY2snLCAoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDYXJ0SXRlbShgLi4vYXBpL3N0b3JlZnJvbnQvY2FydHMvYCwgYGJkZWM2ZDE2LWU1NDYtNGMyNC1hZmEyLWI5YzM3ZTBjMzFmOGAsIGA0MjVjNjE0Ni1jOGZlLTRjMTgtYTc2YS1mNGU1YTg0ZDYxMGJgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtZnJvbS1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIGFkZENhcnRJdGVtKHVybCwgY2FydElkLCBjYXJ0SXRlbXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVybCwgY2FydElkLCBjYXJ0SXRlbXMpO1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsICsgY2FydElkICsgJy9pdGVtcycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNhcnRJdGVtcyksXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfTtcblxuICAgIGRlbGV0ZUNhcnRJdGVtKHVybCwgY2FydElkLCBpdGVtSWQpIHtcbiAgICAgICByZXR1cm4gZmV0Y2godXJsICsgY2FydElkICsgJy9pdGVtcy8nICsgaXRlbUlkLCB7XG4gICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsfVxuICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgfTtcbiAgICBcblxuICAgIGFyaWFOb3RpZnlOb1Byb2R1Y3RzKCkge1xuICAgICAgICBjb25zdCAkbm9Qcm9kdWN0c01lc3NhZ2UgPSAkKCdbZGF0YS1uby1wcm9kdWN0cy1ub3RpZmljYXRpb25dJyk7XG4gICAgICAgIGlmICgkbm9Qcm9kdWN0c01lc3NhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAkbm9Qcm9kdWN0c01lc3NhZ2UuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBwcmljZV9taW5fZXZhbHVhdGlvbjogb25NaW5QcmljZUVycm9yLFxuICAgICAgICAgICAgcHJpY2VfbWF4X2V2YWx1YXRpb246IG9uTWF4UHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21pbl9ub3RfZW50ZXJlZDogbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfbWF4X25vdF9lbnRlcmVkOiBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBwcmljZV9pbnZhbGlkX3ZhbHVlOiBvbkludmFsaWRQcmljZSxcbiAgICAgICAgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgIGNvbnN0ICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0ICRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBwcm9kdWN0c1BlclBhZ2UgPSB0aGlzLmNvbnRleHQuY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2U7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcF9ieV9wcmljZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbWl0OiBwcm9kdWN0c1BlclBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnY2F0ZWdvcnkvcHJvZHVjdC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnY2F0ZWdvcnkvc2lkZWJhcicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2hvd01vcmU6ICdjYXRlZ29yeS9zaG93LW1vcmUnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCAoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmh0bWwoY29udGVudC5wcm9kdWN0TGlzdGluZyk7XG4gICAgICAgICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JNZXNzYWdlczoge1xuICAgICAgICAgICAgICAgIG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgbWluUHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgICAgIG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=