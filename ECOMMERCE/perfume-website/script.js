const items = [
  {
      id: '001',
      image: 'products/img1.jpg',
      item_name: 'Floral Bliss',
      description:'A refreshing floral fragrance with notes of jasmine and rose.',
      original_price: 1045,
      current_price: 606,
      discount_percentage: 42,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 4.5,
          count: 1400,
      },
  },
  {
      id: '002',
      image: 'products/img2.jpg',
      item_name: 'Ocean Breeze',
      description:'Crisp and invigorating scent inspired by the sea breeze.',
      original_price: 2599,
      current_price: 1507,
      discount_percentage: 42,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 4.3,
          count: 24,
      },
  },
  {
      id: '003',
      image: 'products/img3.jpg',
      item_name: 'Mystic Night',
      description:'A refreshing floral fragrance with notes of jasmine and rose.',
      original_price: 1599,
      current_price: 495,
      discount_percentage: 69,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 4.1,
          count: 249,
      },
  },
  {
      id: '004',
      image: 'products/img4.jpg',
      item_name: 'Pure Seduction',
      description:'Sensual and warm with notes of amber and vanilla.',
      original_price: 999,
      current_price: 999,
      discount_percentage: 0,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 5.0,
          count: 10,
      },
  },
  {
      id: '005',
      image: 'products/img5.jpg',
      item_name: 'Tease',
      description:'Celebrate you with warm notes of Juiced plum and Crushed freesia',
      original_price: 1399,
      current_price: 489,
      discount_percentage: 65,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 4.2,
          count: 3500,
      },
  },
  {
      id: '006',
      image: 'products/img6.jpg',
      item_name: 'Daring',
      description:'Crisp and invigorating scent inspired by the sea breeze',
      original_price: 14995,
      current_price: 14995,
      discount_percentage: 0,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 0.0,
          count: 0,
      },
  },
  {
      id: '007',
      image: 'products/img7.jpg',
      item_name: 'Bombshell Intense ',
      description:'Sensual and warm with notes of amber and vanilla.',
      original_price: 1599,
      current_price: 639,
      discount_percentage: 60,
      rating: {
          stars: 4.2,
          count: 388,
      },
  },
  {
      id: '008',
      image: 'products/img8.jpg',
      item_name: 'Bare Rose',
      description:'Celebrate you with warm notes of Juiced plum.',
      original_price: 285,
      current_price: 142,
      discount_percentage: 50,
      return_period: 14,
      delivery_date: '10 Oct 2023',
      rating: {
          stars: 4.2,
          count: 5200,
      },
  }
];
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname === "/index") {
  function greetUser() {
      const date = new Date();
      const hours = date.getHours();
      let greeting = "Welcome";

      if (hours >= 5 && hours < 12) {
          greeting = "Good Morning";
      } else if (hours >= 12 && hours < 18) {
          greeting = "Good Afternoon";
      } else {
          greeting = "Good Evening";
      }

      alert(`${greeting}! Explore our exclusive perfume collection.`);
  }

  greetUser();
}
});
// Cart data structure
let cart = [];

// Utility: Find product by ID
function findProductById(id) {
  return items.find(item => item.id === id);
}

// Display products on Shop.html
function displayProducts() {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  items.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'productt';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.item_name}">
      <h3>${product.item_name}</h3>
      <p>${product.description}</p>
      <p class="price">₹${product.current_price}</p>
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    `;
    container.appendChild(productDiv);
  });
}

// Add product to cart
function addToCart(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    const product = findProductById(productId);
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartDisplay();
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartDisplay();
}

// Update quantity in cart
function updateQuantity(productId, newQty) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem && newQty > 0) {
    cartItem.quantity = newQty;
  }
  saveCart();
  updateCartDisplay();
}

// Cart summary calculations
function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.current_price * item.quantity, 0);
}

// Display cart items and summary (for cart.html)
function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items');
  if (!cartContainer) return;
  cartContainer.innerHTML = '';
  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" class="cart-img" alt="${item.item_name}">
      <div class="cart-details">
        <h3>${item.item_name}</h3>
        <p>${item.description}</p>
        <p>Price: ₹${item.current_price}</p>
        <p>
          Quantity:
          <input type="number" min="1" value="${item.quantity}" 
            onchange="updateQuantity('${item.id}', this.value)">
        </p>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  // Update summary
  const summary = document.getElementById('cart-summary');
  if (summary) {
    const subtotal = getCartSubtotal();
    const shipping = subtotal > 0 ? 100 : 0;
    const total = subtotal + shipping;
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <p>Subtotal: ₹${subtotal}</p>
      <p>Shipping: ₹${shipping}</p>
      <hr>
      <h4>Total: ₹${total}</h4>
      <button class="checkout-btn">Checkout</button>
    `;
  }
}

// Save/load cart to localStorage for persistence
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function loadCart() {
  const stored = localStorage.getItem('cart');
  if (stored) cart = JSON.parse(stored);
}

// Initialization (call on page load)
window.onload = function() {
  loadCart();
  if (document.getElementById('product-list')) {
    displayProducts();
  }
  updateCartDisplay();
};

const form = document.querySelector(".newsletter form");
    
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = form.querySelector("input[type='email']");
        if (emailInput.value) {
            alert("Thank you for subscribing!");
            emailInput.value = ""; // Clear the input field
        } else {
            alert("Please enter a valid email.");
        }
    });
}






