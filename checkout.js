function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
