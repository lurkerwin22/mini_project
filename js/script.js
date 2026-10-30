// Product data

const products = [
    {
        id: 1,
        name: "Classic Sneakers",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 4,
        name: "Backpack",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 35.50,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 6,
        name: "Camera",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    }
];

// Shopping cart

let cart = [];

// Display products

function displayProducts() {
    const container = document.getElementById("products-container");

    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-button"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    });
}

// Add product to cart

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Remove product from cart

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    updateCart();
}

// Change product quantity

function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Update cart display

function updateCart() {
    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>$${item.price.toFixed(2)}</p>
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
}

// Open / close cart

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

// Checkout

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with Shoply!");

    cart = [];
    updateCart();
}

// Initialize website

displayProducts();
updateCart();