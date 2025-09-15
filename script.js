const lemons = [
    { id: 1, name: "Fresh Lemon", price: 10, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", description: "Fresh, juicy lemons—perfect for all uses!", status: "Active" },
    { id: 2, name: "Organic Lemon", price: 15, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b", description: "Organic lemons grown naturally.", status: "Active" }
  ];
  
  let cart = [];
  let modalProductId = null;
  
  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    lemons.forEach(lemon => {
      if(lemon.status === 'Active') {
        productList.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${lemon.image}" class="card-img-top" alt="${lemon.name}">
              <div class="card-body">
                <h5 class="card-title">${lemon.name}</h5>
                <p class="card-text">Price: ₹${lemon.price}</p>
                <button class="btn btn-info" onclick="showProductDetails(${lemon.id})">View Details</button>
                <button class="btn btn-success" onclick="addToCart(${lemon.id})">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
      }
    });
  }
  
  function showProductDetails(id) {
    const lemon = lemons.find(l => l.id === id);
    modalProductId = id;
    document.getElementById('modalTitle').textContent = lemon.name;
    document.getElementById('modalBody').innerHTML = `
      <img src="${lemon.image}" class="img-fluid mb-2" alt="${lemon.name}">
      <p>Price: ₹${lemon.price}</p>
      <p>Description: ${lemon.description}</p>
    `;
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
  }
  
  function addToCart(id) {
    cart.push(id);
    document.getElementById('cart-count').textContent = cart.length;
    alert('Added to cart!');
  }
  
  displayProducts();
  