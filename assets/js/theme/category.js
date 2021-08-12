import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import utils from '@bigcommerce/stencil-utils'

export default class Category extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
        $element.attr({
            role: roleType,
            'aria-live': ariaLiveStatus,
        });
    }

    makeShopByPriceFilterAccessible() {
        if (!$('[data-shop-by-price]').length) return;

        if ($('.navList-action').hasClass('is-active')) {
            $('a.navList-action.is-active').focus();
        }

        $('a.navList-action').on('click', () => this.setLiveRegionAttributes($('span.price-filter-message'), 'status', 'assertive'));
    }

    onReady() {

        //get cart and product id
        console.log('Log Cart');
        fetch('../api/storefront/cart', {
          credentials: 'include'
        }).then(function(response) {
          return response.json();
        }).then(function(myJson) {
          console.log(myJson);
        });

        this.arrangeFocusOnSortBy();

        $('[data-button-type="add-cart"]').on('click', (e) => this.setLiveRegionAttributes($(e.currentTarget).next(), 'status', 'polite'));

        this.makeShopByPriceFilterAccessible();

        compareProducts(this.context);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        $('a.reset-btn').on('click', () => this.setLiveRegionsAttributes($('span.reset-message'), 'status', 'polite'));
        this.ariaNotifyNoProducts();
        // console.log(myCart);


        const getCartId = () => {
            return fetch('../api/storefront/cart', {
              credentials: 'include'
            }).then(function(response) {
              return response.json();
            }).then(function(myJson) {
                return myJson
            });
        }

        $('#add-to-cart-category-button').on('click', () => {

            getCartId().then(response => {
                console.log(response[0].id); 
                this.addCartItem(`../api/storefront/carts/`, response[0].id, { "lineItems": [ {"quantity": 1, "productId": 112 } ]})
                .then(data => console.log(JSON.stringify(data)))
                .catch(error => console.error(error));

            })
        });

        this.removeCart();
    }

    removeCart() {
        
        utils.api.cart.getCartQuantity({}, (err, response) => {
            console.log(response);
            if (response > 0) {
                $('#remove-from-cart-category-button').show();
                $('#remove-from-cart-category-button').on('click', () =>
                        this.deleteCartItem(`../api/storefront/carts/`, `bdec6d16-e546-4c24-afa2-b9c37e0c31f8`, `425c6146-c8fe-4c18-a76a-f4e5a84d610b`)
                        .then(data => console.log(JSON.stringify(data)))
                        .catch(error => console.log(error))
                )
            } else { 
                $('#remove-from-cart-category-button').hide();
            }
        }); 
    }

    addCartItem(url, cartId, cartItems) {
        console.log('click');
        // console.log(url, cartId, cartItems);
        return fetch(url + cartId + '/items', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(cartItems),
        })
        .then(response => response.json());
    };

    deleteCartItem(url, cartId, itemId) {
       return fetch(url + cartId + '/items/' + itemId, {
           method: "DELETE",
           credentials: "same-origin",
           headers: {
               "Content-Type": "application/json",}
    })
        .then(response => response.json());
    };
    

    ariaNotifyNoProducts() {
        const $noProductsMessage = $('[data-no-products-notification]');
        if ($noProductsMessage.length) {
            $noProductsMessage.focus();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }
}
