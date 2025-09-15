let lemons = [
    { id: 1, name: "Fresh Lemon", price: 10, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", description: "Fresh, juicy lemons—perfect for all uses!", status: "Active" },
    { id: 2, name: "Organic Lemon", price: 15, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b", description: "Organic lemons grown naturally.", status: "Active" }
  ];
  
  function renderTable() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    lemons.forEach((lemon) => {
      tbody.innerHTML += `
        <tr>
          <td>${lemon.name}</td>
          <td>₹${lemon.price}</td>
          <td>
            <select onchange="changeStatus(${lemon.id}, this.value)">
              <option ${lemon.status==='Active'?'selected':''}>Active</option>
              <option ${lemon.status==='Inactive'?'selected':''}>Inactive</option>
            </select>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${lemon.id})">Delete</button>
          </td>
        </tr>`;
    });
  }
  
  document.getElementById('addProductForm').onsubmit = function(e) {
    e.preventDefault();
    const newLemon = {
      id: Date.now(),
      name: document.getElementById('name').value,
      price: parseFloat(document.getElementById('price').value),
      image: document.getElementById('image').value,
      description: document.getElementById('desc').value,
      status: document.getElementById('status').value
    };
    lemons.push(newLemon);
    renderTable();
    e.target.reset();
  };
  
  function deleteProduct(id) {
    lemons = lemons.filter(l => l.id !== id);
    renderTable();
  }
  
  function changeStatus(id, status) {
    let lemon = lemons.find(l => l.id === id);
    if (lemon) {
      lemon.status = status;
    }
    renderTable();
  }
  
  renderTable();
  