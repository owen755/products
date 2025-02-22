document.addEventListener("DOMContentLoaded", function () {
    // Load cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // ===== INDEX PAGE FUNCTIONALITY =====
    if (document.querySelector("#product-list")) {
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
          const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: parseFloat(this.dataset.price),
            quantity: 1,
          };
  
          // Check if item exists in cart
          let existing = cart.find((item) => item.id === product.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push(product);
          }
  
          // Save cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${product.name} added to cart!`);
        });
      });
    }
  
    // ===== CART PAGE FUNCTIONALITY =====
    if (document.querySelector("#cart-items")) {
      const cartContainer = document.querySelector("#cart-items");
      const totalContainer = document.querySelector("#cart-total");
  
      function renderCart() {
        cartContainer.innerHTML = "";
        let total = 0;
  
        cart.forEach((item, index) => {
          total += item.price * item.quantity;
          cartContainer.innerHTML += `
            <div class="cart-item">
              <span>${item.name}</span> - 
              <span>$${item.price.toFixed(2)}</span> x 
              <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="update-quantity"> 
              <button class="remove-item" data-index="${index}">Remove</button>
            </div>
          `;
        });
  
        totalContainer.textContent = `Total: $${total.toFixed(2)}`;
      }
  
      renderCart();
  
      // Update quantity
      cartContainer.addEventListener("input", function (event) {
        if (event.target.classList.contains("update-quantity")) {
          let index = event.target.dataset.index;
          cart[index].quantity = parseInt(event.target.value);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
  
      // Remove item
      cartContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
          let index = event.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart();
        }
      });
  
      // Clear cart
      document.querySelector("#clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        cart = [];
        renderCart();
      });
    }
  
    // ===== LOGIN FUNCTIONALITY =====
    if (document.querySelector("#login-form")) {
      document.querySelector("#login-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;
  
        // Get stored users from localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find((u) => u.email === email && u.password === password);
  
        if (user) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          alert("Login successful!");
          window.location.href = "index.html";
        } else {
          alert("Invalid credentials!");
        }
      });
    }
  
    // ===== SIGNUP FUNCTIONALITY =====
    if (document.querySelector("#signup-form")) {
      document.querySelector("#signup-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.querySelector("#signup-name").value;
        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;
  
        // Get stored users
        let users = JSON.parse(localStorage.getItem("users")) || [];
  
        // Check if email exists
        if (users.some((user) => user.email === email)) {
          alert("Email already registered!");
          return;
        }
  
        // Add new user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
  
        alert("Signup successful! Please log in.");
        window.location.href = "login.html";
      });
    }
  
    // ===== CHECKOUT FUNCTIONALITY =====
    if (document.querySelector("#checkout-form")) {
      document.querySelector("#checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.querySelector("#checkout-name").value;
        const address = document.querySelector("#checkout-address").value;
  
        if (cart.length === 0) {
          alert("Your cart is empty!");
          return;
        }
  
        alert(`Thank you, ${name}! Your order has been placed.`);
        localStorage.removeItem("cart");
        window.location.href = "index.html";
      });
    }
  });
  