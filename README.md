#Task
----------
**DONE -** Create a product called Special Item which will be assigned to a new category called Special Items. Be sure to add at least 2 images during the product creation
• Created product and category in Bigcommerce dashboard

**DONE -** The Special Item should be the only item which shows in this category - create a feature that will show the product's second image when it is hovered on.
• created in templates/products/options/card.html
	In card-img-container created a second-img class with {{#each (limit images 2)}}
• in /assets/scss/components/citadel/cards/_cards.scss:
	created a pseudo :hover to show .second-img

**PARTIAL DONE** - Add a button at the top of the category page labeled Add All To Cart. When clicked, the product will be added to the cart. Notify the user that the product has been added.
• in assets/js/category.js
	addCartItem() functionality added on #add-to-cart-category-button click
	#item-added-banner shown on click
	#item-added-banner hidden on button X click

I am able to add a product with this button IF there is already an item in the cart. Looking at the available docs [here: https://developer.bigcommerce.com/api-docs/storefront/tutorials/carts](https://developer.bigcommerce.com/api-docs/storefront/tutorials/carts) - I am unable to create a cart with createCart() according to the docs. It looks like the difference between addCartItem() and createCart() is the cartId, which I am able to pull from the API for an existing cart. The add all to cart button will work if there is already an item in the cart but it is specifically adding item 112. It seems like there should be a way to pull this item from the existing special items category but I am not familiar with Bigcommerce and need to see a working example. I feel like the fetch for the API may be in the wrong place.

**DONE -** If the cart has an item in it - show a button next to the Add All To Cart button which says Remove All Items. When clicked it should clear the cart and notify the user.
Both buttons should utilize the Storefront API for completion.
• in assets/js/category.js
	added deleteCartItem() functionality
	If there is an item in the cart Remove all from cart button is shown, when clicked items are removed from cart.


#Submission
--------------------
Create a GitHub repo for your codebase . In the Readme file remove the current data and add your own which describes a brief overview of your test.
[GitHub repo: https://github.com/AndrewFitzpatrick/oBundleTest](https://github.com/AndrewFitzpatrick/oBundleTest)

Be sure you include the Preview Code for the Bigcommerce Store, along with its URL, so we can view it. Then reply to this email with the Github repo link.
[Preview URL: https://fitztastic.mybigcommerce.com/](https://fitztastic.mybigcommerce.com/)
