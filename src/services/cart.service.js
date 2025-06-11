// src/services/cart.service.js

const CART_STORAGE_KEY = 'userCart';

const CartService = {
  // Get the current cart from local storage
  getCart: () => {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : [];
  },

  // Save the cart to local storage
  
  saveCart: (cart) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  },

  // Add a product to the cart
  // item should have { productType: number, productId: number, quantity: number }
  addItem: (newItem) => {
    const cart = CartService.getCart();
    const existingItemIndex = cart.findIndex(
      (item) => item.productId === newItem.productId && item.productType === newItem.productType
    );

    if (existingItemIndex > -1) {
      // If item exists, update quantity
      cart[existingItemIndex].quantity += newItem.quantity;
    } else {
      // If item does not exist, add it
      cart.push(newItem);
    }

    CartService.saveCart(cart);
  },

  // Remove an item from the cart
  removeItem: (itemToRemove) => {
    let cart = CartService.getCart();
    cart = cart.filter(
      (item) => !(item.productId === itemToRemove.productId && item.productType === itemToRemove.productType)
    );
    CartService.saveCart(cart);
  },

  // Update the quantity of an item in the cart
  updateItemQuantity: (itemToUpdate, newQuantity) => {
    const cart = CartService.getCart();
    const itemIndex = cart.findIndex(
      (item) => item.productId === itemToUpdate.productId && item.productType === itemToUpdate.productType
    );

    if (itemIndex > -1) {
      if (newQuantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart[itemIndex].quantity = newQuantity;
      }
      CartService.saveCart(cart);
    }
  },

  // Clear the entire cart
  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
  },
};

export default CartService; 