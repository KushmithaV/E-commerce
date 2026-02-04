const cartItemsDiv = document.getElementById("cartItems");
const totalDiv = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <p>
        Qty:
        <button onclick="updateQty(${index}, -1)">-</button>
        ${item.quantity}
        <button onclick="updateQty(${index}, 1)">+</button>
      </p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  totalDiv.innerText = "Total: ₹" + total;
}

function updateQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
