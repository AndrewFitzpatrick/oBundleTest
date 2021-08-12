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
    this.ariaNotifyNoProducts();

    var getCartId = function getCartId() {
      return fetch('../api/storefront/cart', {
        credentials: 'include'
      }).then(function (response) {
        return response.json();
      }).then(function (myJson) {
        return myJson;
      });
    };

    $('#item-added-banner').hide();
    $('#item-removed-banner').hide();
    $('#add-to-cart-category-button').on('click', function () {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCartQuantity({}, function (err, response) {
        if (response > 0) {
          getCartId().then(function (item) {
            var url = "../api/storefront/carts/" + item[0].id;

            _this3.addCartItem(url, {
              "lineItems": [{
                "quantity": 1,
                "productId": 112
              }]
            });
          });
        } else {
          getCartId().then(function (item) {
            _this3.addCartItem("../api/storefront/carts", {
              "lineItems": [{
                "quantity": 1,
                "productId": 112
              }]
            });
          });
        }
      });
    });
    $('#remove-from-cart-category-button').on('click', function () {
      getCartId().then(function (item) {
        console.log(item[0]);
        var url = "../api/storefront/carts/" + item[0].id;

        _this3.deleteCartItem(url, item[0].lineItems.physicalItems[0].id);
      });
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCartQuantity({}, function (err, response) {
      console.log(response);

      if (response > 0) {
        $('#remove-from-cart-category-button').show();
      } else {
        $('#remove-from-cart-category-button').hide();
      }
    });
  };

  _proto.addCartItem = function addCartItem(url, cartItems) {
    $('#item-added-banner').show();
    $('#remove-from-cart-category-button').show();
    $('#add-banner-button').click(function () {
      return $('#item-added-banner').hide();
    });
    return fetch(url + '/items', {
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

  _proto.deleteCartItem = function deleteCartItem(url, itemId) {
    $('#item-removed-banner').show();
    $('#remove-banner-button').click(function () {
      return $('#item-removed-banner').hide();
    }); // console.log(url + '/items/' + itemId);

    return fetch(url + '/items/' + itemId, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCJnZXRDYXJ0SWQiLCJmZXRjaCIsImNyZWRlbnRpYWxzIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm15SnNvbiIsImhpZGUiLCJ1dGlscyIsImFwaSIsImNhcnQiLCJnZXRDYXJ0UXVhbnRpdHkiLCJlcnIiLCJpdGVtIiwidXJsIiwiaWQiLCJhZGRDYXJ0SXRlbSIsImNvbnNvbGUiLCJsb2ciLCJkZWxldGVDYXJ0SXRlbSIsImxpbmVJdGVtcyIsInBoeXNpY2FsSXRlbXMiLCJzaG93IiwiY2FydEl0ZW1zIiwiY2xpY2siLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpdGVtSWQiLCIkbm9Qcm9kdWN0c01lc3NhZ2UiLCJvbk1pblByaWNlRXJyb3IiLCJwcmljZV9taW5fZXZhbHVhdGlvbiIsIm9uTWF4UHJpY2VFcnJvciIsInByaWNlX21heF9ldmFsdWF0aW9uIiwibWluUHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWluX25vdF9lbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwicHJpY2VfbWF4X25vdF9lbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCJwcmljZV9pbnZhbGlkX3ZhbHVlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJDYXRhbG9nUGFnZSIsIlRSQU5TTEFUSU9OUyIsImlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkiLCJkaWN0aW9uYXJ5IiwiT2JqZWN0Iiwia2V5cyIsImNob29zZUFjdGl2ZURpY3Rpb25hcnkiLCJpIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lB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SCxDQVZNLEMiLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaG9va3MgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuLi90aGVtZS9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xuICAgICAgICBzdXBlcihjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcbiAgICB9XG5cbiAgICBzZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkZWxlbWVudCwgcm9sZVR5cGUsIGFyaWFMaXZlU3RhdHVzKSB7XG4gICAgICAgICRlbGVtZW50LmF0dHIoe1xuICAgICAgICAgICAgcm9sZTogcm9sZVR5cGUsXG4gICAgICAgICAgICAnYXJpYS1saXZlJzogYXJpYUxpdmVTdGF0dXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKSB7XG4gICAgICAgIGlmICghJCgnW2RhdGEtc2hvcC1ieS1wcmljZV0nKS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAoJCgnLm5hdkxpc3QtYWN0aW9uJykuaGFzQ2xhc3MoJ2lzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uLmlzLWFjdGl2ZScpLmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLm5hdkxpc3QtYWN0aW9uJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKCdzcGFuLnByaWNlLWZpbHRlci1tZXNzYWdlJyksICdzdGF0dXMnLCAnYXNzZXJ0aXZlJykpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG5cbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiYWRkLWNhcnRcIl0nKS5vbignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uQXR0cmlidXRlcygkKGUuY3VycmVudFRhcmdldCkubmV4dCgpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcblxuICAgICAgICB0aGlzLm1ha2VTaG9wQnlQcmljZUZpbHRlckFjY2Vzc2libGUoKTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2EucmVzZXQtYnRuJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRMaXZlUmVnaW9uc0F0dHJpYnV0ZXMoJCgnc3Bhbi5yZXNldC1tZXNzYWdlJyksICdzdGF0dXMnLCAncG9saXRlJykpO1xuICAgICAgICB0aGlzLmFyaWFOb3RpZnlOb1Byb2R1Y3RzKCk7XG5cbiAgICAgICAgY29uc3QgZ2V0Q2FydElkID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKCcuLi9hcGkvc3RvcmVmcm9udC9jYXJ0Jywge1xuICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKG15SnNvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBteUpzb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI2l0ZW0tYWRkZWQtYmFubmVyJykuaGlkZSgpO1xuICAgICAgICAkKCcjaXRlbS1yZW1vdmVkLWJhbm5lcicpLmhpZGUoKTtcbiAgICAgICAgJCgnI2FkZC10by1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENhcnRRdWFudGl0eSh7fSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGdldENhcnRJZCgpLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgLi4vYXBpL3N0b3JlZnJvbnQvY2FydHMvYCArIGl0ZW1bMF0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnRJdGVtKHVybCwgeyBcImxpbmVJdGVtc1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHJvZHVjdElkXCI6IDExMlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdldENhcnRJZCgpLnRoZW4oaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENhcnRJdGVtKGAuLi9hcGkvc3RvcmVmcm9udC9jYXJ0c2AsIHtcImxpbmVJdGVtc1wiOiBbIHsgXCJxdWFudGl0eVwiOiAxLCBcInByb2R1Y3RJZFwiOiAxMTIgfSBdfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjcmVtb3ZlLWZyb20tY2FydC1jYXRlZ29yeS1idXR0b24nKS5vbignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBnZXRDYXJ0SWQoKS50aGVuKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1bMF0pOyBcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgLi4vYXBpL3N0b3JlZnJvbnQvY2FydHMvYCArIGl0ZW1bMF0uaWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDYXJ0SXRlbSh1cmwsIGl0ZW1bMF0ubGluZUl0ZW1zLnBoeXNpY2FsSXRlbXNbMF0uaWQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDYXJ0UXVhbnRpdHkoe30sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgJCgnI3JlbW92ZS1mcm9tLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWZyb20tY2FydC1jYXRlZ29yeS1idXR0b24nKS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgYWRkQ2FydEl0ZW0odXJsLCBjYXJ0SXRlbXMpIHtcbiAgICAgICAgJCgnI2l0ZW0tYWRkZWQtYmFubmVyJykuc2hvdygpO1xuICAgICAgICAkKCcjcmVtb3ZlLWZyb20tY2FydC1jYXRlZ29yeS1idXR0b24nKS5zaG93KCk7XG4gICAgICAgICQoJyNhZGQtYmFubmVyLWJ1dHRvbicpLmNsaWNrKCgpID0+ICQoJyNpdGVtLWFkZGVkLWJhbm5lcicpLmhpZGUoKSk7XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwgKyAnL2l0ZW1zJywge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKTtcblxuXG4gICAgfTtcblxuICAgIGRlbGV0ZUNhcnRJdGVtKHVybCwgaXRlbUlkKSB7XG4gICAgICAgICQoJyNpdGVtLXJlbW92ZWQtYmFubmVyJykuc2hvdygpO1xuICAgICAgICAkKCcjcmVtb3ZlLWJhbm5lci1idXR0b24nKS5jbGljaygoKSA9PiAkKCcjaXRlbS1yZW1vdmVkLWJhbm5lcicpLmhpZGUoKSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHVybCArICcvaXRlbXMvJyArIGl0ZW1JZCk7XG4gICAgICAgcmV0dXJuIGZldGNoKHVybCArICcvaXRlbXMvJyArIGl0ZW1JZCwge1xuICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLH1cbiAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH07XG4gICAgXG5cbiAgICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICAgICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9