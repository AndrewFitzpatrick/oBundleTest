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
        // console.log('Log Cart');
        // fetch('/api/storefront/cart', {
        //   credentials: 'include'
        // }).then(function(response) {
        //   return response.json();
        // }).then(function(myJson) {
        //   console.log(myJson);
        // });
        this.addRemoveCart();
        // this.addAllToCart();
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
    }
    addRemoveCart() {
        utils.api.cart.getCartQuantity({}, (err, response) => {
            // console.log(response > 0);
            if (response > 0) { 
                this.cartRemoveItem(112, (err, response));
            } else { 
                this.addAllToCart();
            }
        }); 
    }

    addAllToCart() {
        function createCart(url, cartItems) {
           return fetch(url, {
               method: "POST",
               credentials: "same-origin",
               headers: {
                   "Content-Type": "application/json"},
               body: JSON.stringify(cartItems),
           })
           .then(response => response.json());
         };

        $('#add-to-cart-category-button').click(
            createCart(`https://fitztastic.mybigcommerce.com/api/storefront/carts`, {
               "lineItems": [
                   {
                       "quantity": 1,
                       "productId": 112
                   },
                ]}
            )
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.error(error))
        );
        // let cartUrl = '/';
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
    }

    cartRemoveItem(itemId, errResponse) {
        console.log(errResponse[1].data.status);
        $('#remove-from-cart-category-button').show();
        $('#add-to-cart-category-button').hide();
        $('#remove-from-cart-category-button').on('click', () => {
            utils.api.cart.itemRemove(itemId, errResponse => {
                if (errResponse[1].data.status === 'succeed') {
                    this.refreshContent(true);
                } else {
                    alert(errResponse[1].data.errors.join('\n'));
                }
            });
        });
        // $('#remove-from-cart-category-button').click(cartRemoveItem);
    }
    

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
