let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(name, price) {

    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert(name + " added to cart!");
}


function displayCart() {

    let container = document.getElementById("cart-container");

    // Stop if not cart page
    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h3 style='text-align:center;'>Your cart is empty</h3>";
        document.getElementById("total").innerText = "";
        return;
    }

    let total = 0;

    for (let i = 0; i < cart.length; i++) {

        let item = cart[i];
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        container.innerHTML += `
            <div>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>

                <button onclick="increaseQty(${i})">+</button>
                <button onclick="decreaseQty(${i})">-</button>
                <button onclick="removeItem(${i})">Remove</button>
            </div>
        `;
    }

    document.getElementById("total").innerText = "Total: ₹" + total;
}


function increaseQty(index) {
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
}


// ================= CART COUNT =================
function updateCartCount() {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }

    let el = document.getElementById("cart-count");
    if (el) el.innerText = count;
}


function placeOrder() {

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all details");
        return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Enter valid 10 digit phone number");
        return false;
    }

    alert("Thank you for ordering from us!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

    return false;
}


displayCart();
updateCartCount();