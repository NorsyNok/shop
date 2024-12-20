function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

let cart = [];
const products = [
    { id: 0, name: 'Timberland', price: 12999},
    { id: 1, name: 'Adidas', price: 9999},
    { id: 2, name: 'Moschino', price: 23999},
    { id: 3, name: 'New Balance', price: 16999},
    { id: 4, name: 'ASICS', price: 11999},
    { id: 5, name: 'Saint Laurent', price: 42999},
    { id: 6, name: 'Prada', price: 66666},
    { id: 7, name: 'Balenciaga', price: 99999},
];
function Take(index) {
    let item = cart.find(item => item.index === index);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ index: index, quantity: 1 });
    }
    updateCart();
    let cartLink = document.getElementById("cart-link");
    cartLink.classList.add("underlined");
}


function updateCart() {
    const cartBody = document.querySelector("#cart tbody");
    cartBody.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const product = products[item.index];
        const row = cartBody.insertRow();
        row.insertCell().textContent = product.name;
        row.insertCell().textContent = product.price;
        const quantityCell = row.insertCell();
        quantityCell.innerHTML = `<input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.index}, this.value)">`;
        row.insertCell().textContent = product.price * item.quantity;
        const deleteCell = row.insertCell();
        deleteCell.innerHTML = `<button class="delete" onclick="removeFromCart(${item.index})"><span class="text"></span></button>`;
        total += product.price * item.quantity;
    });
    document.getElementById("total").textContent = total;
    if (total == 0) {
        let cartLink = document.getElementById("cart-link");
        cartLink.classList.remove("underlined");
    }
}


function updateQuantity(index, quantity) {
    const item = cart.find(item => item.index === index);
    item.quantity = parseInt(quantity);
    updateCart();
}

function removeFromCart(index) {
    cart = cart.filter(item => item.index !== index);
    updateCart();
}

