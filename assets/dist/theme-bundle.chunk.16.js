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
    fetch('/api/storefront/cart', {
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

    $('#add-to-cart-category-button').on('click', function () {
      return _this3.addCartItem("../api/storefront/carts/", "bdec6d16-e546-4c24-afa2-b9c37e0c31f8", {
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
    this.removeCart(); // this.createCart(`/api/storefront/carts`, {
    //    "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
    //    "lineItems": [
    //        {
    //            "quantity": 1,
    //            "productId": 112
    //        }
    //     ]}
    // )
    // .then(data => console.log(JSON.stringify(data)))
    // .catch(error => console.error(error));
  } // createCart(url, cartItems) {
  //    return fetch(url, {
  //        method: "POST",
  //        credentials: "same-origin",
  //        headers: {
  //            "Content-Type": "application/json"},
  //        body: JSON.stringify(cartItems),
  //    })
  //    .then(response => response.json());
  //  };
  ;

  _proto.removeCart = function removeCart() {
    var _this4 = this;

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getCartQuantity({}, function (err, response) {
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

  // addAllToCart() {
  // let cartUrl = '/';
  // $('#add-to-cart-category-button').show();
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
  // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwibmFtZXMiOlsiQ2F0ZWdvcnkiLCJjb250ZXh0IiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJzZXRMaXZlUmVnaW9uQXR0cmlidXRlcyIsIiRlbGVtZW50Iiwicm9sZVR5cGUiLCJhcmlhTGl2ZVN0YXR1cyIsImF0dHIiLCJyb2xlIiwibWFrZVNob3BCeVByaWNlRmlsdGVyQWNjZXNzaWJsZSIsIiQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsImZvY3VzIiwib24iLCJvblJlYWR5IiwiY29uc29sZSIsImxvZyIsImZldGNoIiwiY3JlZGVudGlhbHMiLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwibXlKc29uIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCJlIiwiY3VycmVudFRhcmdldCIsIm5leHQiLCJjb21wYXJlUHJvZHVjdHMiLCJpbml0RmFjZXRlZFNlYXJjaCIsIm9uU29ydEJ5U3VibWl0IiwiYmluZCIsImhvb2tzIiwic2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzIiwiYXJpYU5vdGlmeU5vUHJvZHVjdHMiLCJhZGRDYXJ0SXRlbSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyb3IiLCJyZW1vdmVDYXJ0IiwidXRpbHMiLCJhcGkiLCJjYXJ0IiwiZ2V0Q2FydFF1YW50aXR5IiwiZXJyIiwic2hvdyIsImRlbGV0ZUNhcnRJdGVtIiwiaGlkZSIsInVybCIsImNhcnRJZCIsImNhcnRJdGVtcyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiaXRlbUlkIiwiJG5vUHJvZHVjdHNNZXNzYWdlIiwib25NaW5QcmljZUVycm9yIiwicHJpY2VfbWluX2V2YWx1YXRpb24iLCJvbk1heFByaWNlRXJyb3IiLCJwcmljZV9tYXhfZXZhbHVhdGlvbiIsIm1pblByaWNlTm90RW50ZXJlZCIsInByaWNlX21pbl9ub3RfZW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsInByaWNlX21heF9ub3RfZW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwicHJpY2VfaW52YWxpZF92YWx1ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwicHJvZHVjdHNQZXJQYWdlIiwiY2F0ZWdvcnlQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsImNvbmZpZyIsImNhdGVnb3J5Iiwic2hvcF9ieV9wcmljZSIsInByb2R1Y3RzIiwibGltaXQiLCJ0ZW1wbGF0ZSIsInByb2R1Y3RMaXN0aW5nIiwic2lkZWJhciIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiaHRtbCIsInRyaWdnZXJIYW5kbGVyIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsInZhbGlkYXRpb25FcnJvck1lc3NhZ2VzIiwiQ2F0YWxvZ1BhZ2UiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsInBhcnNlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIiwiYWN0aXZlRGljdGlvbmFyeSIsImxvY2FsaXphdGlvbnMiLCJ2YWx1ZXMiLCJ0cmFuc2xhdGlvbktleXMiLCJtYXAiLCJrZXkiLCJzcGxpdCIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsUTs7O0FBQ2pCLG9CQUFZQyxP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TUFBUCxDQUFjRixnQkFBZ0IsQ0FBQ1gsWUFBRCxDQUE5QixDQUF0QjtBQUNBLE1BQU1jLGVBQWUsR0FBR1gsTUFBTSxDQUFDQyxJQUFQLENBQVlPLGdCQUFnQixDQUFDWCxZQUFELENBQTVCLEVBQTRDZSxHQUE1QyxDQUFnRCxVQUFBQyxHQUFHO0FBQUEsV0FBSUEsR0FBRyxDQUFDQyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQUo7QUFBQSxHQUFuRCxDQUF4QjtBQUVBLFNBQU9KLGVBQWUsQ0FBQ0ssTUFBaEIsQ0FBdUIsVUFBQ0MsR0FBRCxFQUFNSixHQUFOLEVBQVdWLENBQVgsRUFBaUI7QUFDM0NjLE9BQUcsQ0FBQ0osR0FBRCxDQUFILEdBQVdKLGFBQWEsQ0FBQ04sQ0FBRCxDQUF4QjtBQUNBLFdBQU9jLEdBQVA7QUFDSCxHQUhNLEVBR0osRUFISSxDQUFQO0FBSUgsQ0FWTSxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xNi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi4vdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGVnb3J5IGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkgPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG4gICAgfVxuXG4gICAgc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJGVsZW1lbnQsIHJvbGVUeXBlLCBhcmlhTGl2ZVN0YXR1cykge1xuICAgICAgICAkZWxlbWVudC5hdHRyKHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGVUeXBlLFxuICAgICAgICAgICAgJ2FyaWEtbGl2ZSc6IGFyaWFMaXZlU3RhdHVzLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCkge1xuICAgICAgICBpZiAoISQoJ1tkYXRhLXNob3AtYnktcHJpY2VdJykubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCQoJy5uYXZMaXN0LWFjdGlvbicpLmhhc0NsYXNzKCdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbi5pcy1hY3RpdmUnKS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnYS5uYXZMaXN0LWFjdGlvbicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJCgnc3Bhbi5wcmljZS1maWx0ZXItbWVzc2FnZScpLCAnc3RhdHVzJywgJ2Fzc2VydGl2ZScpKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuXG4gICAgICAgIC8vZ2V0IGNhcnQgYW5kIHByb2R1Y3QgaWRcbiAgICAgICAgY29uc29sZS5sb2coJ0xvZyBDYXJ0Jyk7XG4gICAgICAgIGZldGNoKCcvYXBpL3N0b3JlZnJvbnQvY2FydCcsIHtcbiAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKG15SnNvbikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG15SnNvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYXJyYW5nZUZvY3VzT25Tb3J0QnkoKTtcblxuICAgICAgICAkKCdbZGF0YS1idXR0b24tdHlwZT1cImFkZC1jYXJ0XCJdJykub24oJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbkF0dHJpYnV0ZXMoJChlLmN1cnJlbnRUYXJnZXQpLm5leHQoKSwgJ3N0YXR1cycsICdwb2xpdGUnKSk7XG5cbiAgICAgICAgdGhpcy5tYWtlU2hvcEJ5UHJpY2VGaWx0ZXJBY2Nlc3NpYmxlKCk7XG5cbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgaWYgKCQoJyNmYWNldGVkU2VhcmNoJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmFjZXRlZFNlYXJjaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblNvcnRCeVN1Ym1pdCA9IHRoaXMub25Tb3J0QnlTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdhLnJlc2V0LWJ0bicpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2V0TGl2ZVJlZ2lvbnNBdHRyaWJ1dGVzKCQoJ3NwYW4ucmVzZXQtbWVzc2FnZScpLCAnc3RhdHVzJywgJ3BvbGl0ZScpKTtcbiAgICAgICAgdGhpcy5hcmlhTm90aWZ5Tm9Qcm9kdWN0cygpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhteUNhcnQpO1xuICAgICAgICAkKCcjYWRkLXRvLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykub24oJ2NsaWNrJywgKCkgPT4gXG4gICAgICAgICAgICB0aGlzLmFkZENhcnRJdGVtKFxuICAgICAgICAgICAgICAgIGAuLi9hcGkvc3RvcmVmcm9udC9jYXJ0cy9gLCBcbiAgICAgICAgICAgICAgICBgYmRlYzZkMTYtZTU0Ni00YzI0LWFmYTItYjljMzdlMGMzMWY4YCwgXG4gICAgICAgICAgICAgICAgeyBcImxpbmVJdGVtc1wiOiBbIHtcInF1YW50aXR5XCI6IDEsIFwicHJvZHVjdElkXCI6IDExMiB9IF19XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSkpO1xuICAgICAgICB0aGlzLnJlbW92ZUNhcnQoKTtcblxuICAgICAgICAvLyB0aGlzLmNyZWF0ZUNhcnQoYC9hcGkvc3RvcmVmcm9udC9jYXJ0c2AsIHtcbiAgICAgICAgLy8gICAgXCJpZFwiOiBcImQ0ZTk3OGMyLWJkY2YtNDFiMC1hNDliLWZlY2Y0ZjUyMjNjMVwiLFxuICAgICAgICAvLyAgICBcImxpbmVJdGVtc1wiOiBbXG4gICAgICAgIC8vICAgICAgICB7XG4gICAgICAgIC8vICAgICAgICAgICAgXCJxdWFudGl0eVwiOiAxLFxuICAgICAgICAvLyAgICAgICAgICAgIFwicHJvZHVjdElkXCI6IDExMlxuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvLyAgICAgXX1cbiAgICAgICAgLy8gKVxuICAgICAgICAvLyAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKSlcbiAgICAgICAgLy8gLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcblxuICAgIH1cblxuICAgIC8vIGNyZWF0ZUNhcnQodXJsLCBjYXJ0SXRlbXMpIHtcbiAgICAvLyAgICByZXR1cm4gZmV0Y2godXJsLCB7XG4gICAgLy8gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgLy8gICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgLy8gICAgICAgIGhlYWRlcnM6IHtcbiAgICAvLyAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifSxcbiAgICAvLyAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2FydEl0ZW1zKSxcbiAgICAvLyAgICB9KVxuICAgIC8vICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgLy8gIH07XG5cbiAgICByZW1vdmVDYXJ0KCkge1xuICAgICAgICBcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0Q2FydFF1YW50aXR5KHt9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlID4gMCkge1xuICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtZnJvbS1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkKCcjcmVtb3ZlLWZyb20tY2FydC1jYXRlZ29yeS1idXR0b24nKS5vbignY2xpY2snLCAoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDYXJ0SXRlbShgLi4vYXBpL3N0b3JlZnJvbnQvY2FydHMvYCwgYGJkZWM2ZDE2LWU1NDYtNGMyNC1hZmEyLWI5YzM3ZTBjMzFmOGAsIGA0MjVjNjE0Ni1jOGZlLTRjMTgtYTc2YS1mNGU1YTg0ZDYxMGJgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICAgICQoJyNyZW1vdmUtZnJvbS1jYXJ0LWNhdGVnb3J5LWJ1dHRvbicpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgIH1cblxuICAgIGFkZENhcnRJdGVtKHVybCwgY2FydElkLCBjYXJ0SXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCArIGNhcnRJZCArICcvaXRlbXMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjYXJ0SXRlbXMpLFxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH07XG5cbiAgICAvLyBhZGRBbGxUb0NhcnQoKSB7XG4gICAgICAgIC8vIGxldCBjYXJ0VXJsID0gJy8nO1xuICAgICAgICAvLyAkKCcjYWRkLXRvLWNhcnQtY2F0ZWdvcnktYnV0dG9uJykuc2hvdygpO1xuICAgICAgICAvLyBjb25zdCBhZGRUb0NhcnQgPSAoKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnY2xpY2snKTtcbiAgICAgICAgLy8gICAgIGxldCBjYXRlZ29yeVByb2R1Y3RJZHMgPSB0aGlzLmNvbnRleHQucHJvZHVjdElkcztcbiAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgaWYgKGNhdGVnb3J5UHJvZHVjdElkcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhdGVnb3J5UHJvZHVjdElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb249Jy4uL2NhcnQucGhwP2FjdGlvbj1hZGQmcHJvZHVjdF9pZD0nK2NhdGVnb3J5UHJvZHVjdElkc1tpXTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9ICAgICAgICBcbiAgICAgICAgLy8gfTsgXG4gICAgICAgIC8vICQoJyNhZGQtdG8tY2FydC1jYXRlZ29yeS1idXR0b24nKS5jbGljayhhZGRUb0NhcnQpO1xuICAgICAgICBcbiAgICAvLyB9XG5cbiAgICBkZWxldGVDYXJ0SXRlbSh1cmwsIGNhcnRJZCwgaXRlbUlkKSB7XG4gICAgICAgcmV0dXJuIGZldGNoKHVybCArIGNhcnRJZCArICcvaXRlbXMvJyArIGl0ZW1JZCwge1xuICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLH1cbiAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIH07XG4gICAgXG5cbiAgICBhcmlhTm90aWZ5Tm9Qcm9kdWN0cygpIHtcbiAgICAgICAgY29uc3QgJG5vUHJvZHVjdHNNZXNzYWdlID0gJCgnW2RhdGEtbm8tcHJvZHVjdHMtbm90aWZpY2F0aW9uXScpO1xuICAgICAgICBpZiAoJG5vUHJvZHVjdHNNZXNzYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5vUHJvZHVjdHNNZXNzYWdlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcHJpY2VfbWluX2V2YWx1YXRpb246IG9uTWluUHJpY2VFcnJvcixcbiAgICAgICAgICAgIHByaWNlX21heF9ldmFsdWF0aW9uOiBvbk1heFByaWNlRXJyb3IsXG4gICAgICAgICAgICBwcmljZV9taW5fbm90X2VudGVyZWQ6IG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHByaWNlX21heF9ub3RfZW50ZXJlZDogbWF4UHJpY2VOb3RFbnRlcmVkLFxuICAgICAgICAgICAgcHJpY2VfaW52YWxpZF92YWx1ZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9