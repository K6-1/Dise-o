const form = document.getElementById('product-form');
const productList=document.getElementById('product-list');
//fetch all products on load
async function fetchProducts() {
    const res=await fetch('/products');
const products=await res.json();
}
//render products in the dom
function renderProducts(products){
    productList.innerHTML='';
    products.forEach(product=>{
        const div=document.createElement('div');
        div.classList.add('product-item');
        div.innerHTML=`
        <span>${product.name}-$${product.price}</span>
        <button onclick="deleteProduct('${product._id}')">Delete</button>`;
        productList.appendChild(div);
    });
}

//add new product
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const price=document.getElementById('price').value;
    const category=document.getElementById('category').value;
    const res=await fetch('/products',{
        method:'POST',
        headers:{'Content-Type':'appliction/json'},
        body:JSON.stringify({name,price,category})
    });
    if(res.ok){
        fetchProducts();
        form.reset();
    }
});
//delete a product 
async function deleteProduct(id){
    const res=await fetch(`/products/${id}`,{
        method:'DELETE'});
        if(res.ok) fetchProducts();
}
fetchProducts();
//filtering
async function fetchProducts() {
    const sort=document.getElementById('sort').value;
    const category=document.getElementById('category-filter').value;
    const res=await fetch(`/products?sort=${sort}&category=${category}`);
    const products=await res.json();
    renderProducts(products);
}
// Handle "Book Now" Button Click
document.querySelectorAll('.two').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.card'); // Get the parent card
        const productName = card.querySelector('h3').innerText;
        const productPrice = card.querySelector('h3:nth-of-type(2)').innerText;

        // Display popup with product details
        document.getElementById('popupText').innerText =
           `Are you sure you want to buy "${productName}" for ${productPrice}?`;

        // Show popup modal
        document.getElementById('popupModal').style.display = 'block';

        // Handle Yes button click
        document.getElementById('yesBtn').onclick = () => {
            localStorage.setItem('productName', productName);
            localStorage.setItem('productPrice', productPrice);
            window.location.href = 'payment.html'; // Redirect to payment page
        };

        // Handle No button click
        document.getElementById('noBtn').onclick = () => {
            document.getElementById('popupModal').style.display = 'none';
        };
    });
});

// Close modal if clicked outside
window.onclick = function (event) {
    const modal = document.getElementById('popupModal');
    if (event.target === modal) {
        modal.style.display = 'none';
}
};