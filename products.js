let currentCategory = "all";
const products = [
  // SHOES
  { id: 1, name: "Running Shoes", price: 2500, category: "shoe", image: "images/shoe1.jpg" },
  { id: 2, name: "Casual Sneakers", price: 2200, category: "shoe", image: "images/shoe2.jpg" },
  { id: 3, name: "Sports Shoes", price: 2800, category: "shoe", image: "images/shoe3.jpg" },
  { id: 4, name: "Gym Shoes", price: 2000, category: "shoe", image: "images/shoe4.jpg" },
  { id: 5, name: "Formal Shoes", price: 2600, category: "shoe", image: "images/shoe5.jpg" },
  { id: 6, name: "Leather Sneakers", price: 2300, category: "shoe", image: "images/shoe6.jpg" },
  { id: 7, name: "Black Sneakers", price: 2400, category: "shoe", image: "images/shoe7.jpg" },
  { id: 8, name: "White Sneakers", price: 2700, category: "shoe", image: "images/shoe8.jpg" },
  { id: 9, name: "Casual Shoes", price: 2100, category: "shoe", image: "images/shoe9.jpg" },
  { id: 10, name: "High Top Sneakers", price: 2900, category: "shoe", image: "images/shoe10.jpg" },

  // HOODIES
  { id: 11, name: "Black Hoodie", price: 1400, category: "hoodie", image: "images/hoodie1.jpg" },
  { id: 12, name: "Grey Hoodie", price: 1600, category: "hoodie", image: "images/hoodie2.jpg" },
  { id: 13, name: "Blue Hoodie", price: 1500, category: "hoodie", image: "images/hoodie3.jpg" },
  { id: 14, name: "White Hoodie", price: 1700, category: "hoodie", image: "images/hoodie4.jpg" },
  { id: 15, name: "Red Hoodie", price: 1550, category: "hoodie", image: "images/hoodie5.jpg" },
  { id: 16, name: "Green Hoodie", price: 1450, category: "hoodie", image: "images/hoodie6.jpg" },
  { id: 17, name: "Oversized Hoodie", price: 1800, category: "hoodie", image: "images/hoodie7.jpg" },
  { id: 18, name: "Printed Hoodie", price: 1650, category: "hoodie", image: "images/hoodie8.jpg" },
  { id: 19, name: "Zip Hoodie", price: 1750, category: "hoodie", image: "images/hoodie9.jpg" },
  { id: 20, name: "Classic Hoodie", price: 1500, category: "hoodie", image: "images/hoodie10.jpg" }
];

const productList = document.getElementById("productList");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getItemQty(id) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  return item ? item.quantity : 0;
}

function displayProducts(items) {
  productList.innerHTML = "";

  items.forEach(product => {
    const qty = getItemQty(product.id);

    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>

      ${
        qty === 0
          ? `<button onclick="addItem(${product.id})">Add to Cart</button>`
          : `
            <div class="qty-controls">
              <button onclick="changeQty(${product.id}, -1)">−</button>
              <span>${qty}</span>
              <button onclick="changeQty(${product.id}, 1)">+</button>
            </div>
          `
      }
    `;

    productList.appendChild(div);
  });
}

renderCurrentCategory();


function filterProducts(category, button) {
  currentCategory = category;

  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );
  button.classList.add("active");

  renderCurrentCategory();
}
function renderCurrentCategory() {
  if (currentCategory === "all") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === currentCategory));
  }
}


function addItem(id) {
  let cart = getCart();
  const product = products.find(p => p.id === id);
  cart.push({ ...product, quantity: 1 });
  saveCart(cart);
  renderCurrentCategory();
}

function changeQty(id, change) {
  let cart = getCart();
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  saveCart(cart);
  renderCurrentCategory();
}
