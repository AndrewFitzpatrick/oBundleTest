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

        const getCartId = () => {
            return fetch('../api/storefront/cart', {
              credentials: 'include'
            }).then(function(response) {
              return response.json();
            }).then(function(myJson) {
                return myJson
            });
        }

        $('#item-added-banner').hide();
        $('#item-removed-banner').hide();
        $('#add-to-cart-category-button').on('click', () => {
            utils.api.cart.getCartQuantity({}, (err, response) => {
                if (response > 0) {
                    getCartId().then(item => {
                        const url = `../api/storefront/carts/` + item[0].id;
                        this.addCartItem(url, { "lineItems": [
                           {
                               "quantity": 1,
                               "productId": 112
                           }
                        ] })
                    })
                } else {
                    getCartId().then(item => {
                        this.addCartItem(`../api/storefront/carts`, {"lineItems": [ { "quantity": 1, "productId": 112 } ]})
                    })
                }
            })
        });

        $('#remove-from-cart-category-button').on('click', () => {
            getCartId().then(item => {
                console.log(item[0]); 
                const url = `../api/storefront/carts/` + item[0].id;
                this.deleteCartItem(url, item[0].lineItems.physicalItems[0].id)
            })
                
        });

        utils.api.cart.getCartQuantity({}, (err, response) => {
            console.log(response);
            if (response > 0) {
                $('#remove-from-cart-category-button').show();
            } else {
                $('#remove-from-cart-category-button').hide();
            }
        });

    }

    addCartItem(url, cartItems) {
        $('#item-added-banner').show();
        $('#remove-from-cart-category-button').show();
        $('#add-banner-button').click(() => $('#item-added-banner').hide());
        return fetch(url + '/items', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"},
            body: JSON.stringify(cartItems),
        })
        .then(response => response.json());


    };

    deleteCartItem(url, itemId) {
        $('#item-removed-banner').show();
        $('#remove-banner-button').click(() => $('#item-removed-banner').hide());
        // console.log(url + '/items/' + itemId);
       return fetch(url + '/items/' + itemId, {
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
