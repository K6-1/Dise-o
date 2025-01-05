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