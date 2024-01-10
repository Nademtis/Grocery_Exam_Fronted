const addNewProductURL = "http://localhost:3333/addProduct"
const fetchListURL = "http://localhost:3333/getAllProducts"
let products = [];

function newProduct() {
    console.log("hit method")
    let name = document.getElementById("name")
    let price = document.getElementById("price")
    let weight = document.getElementById("weight")


    let Product = {
        name: name.value,
        price: price.value,
        weight: weight.value
    }
    let body = JSON.stringify(Product)
    console.log(body)

    fetch(addNewProductURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    }).then(response => {
        if (!response.ok) {
            throw new Error("boobies")
        }
        return response.json()
    }).then(data => {
        console.log("product added" + data)
    }).catch(error => {
        console.error("error saving product" + error)
    })
}

async function fetchList() {
    try {
        const response = await fetch(fetchListURL);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        products = await response.json();
        console.log(products);

        let tableBody = document.getElementById("listAllProductTableBody");

        // For at rydde table, hvis flere klik på knap
        tableBody.innerHTML = "";

        for (let i = 0; i < products.length; i++) {
            let rowData = document.createElement('tr'); // Laver table row

            let productNameCell = document.createElement('td');
            productNameCell.classList.add("tableData")
            productNameCell.textContent = products[i].name;
            rowData.appendChild(productNameCell);

            let weightCell = document.createElement('td');
            weightCell.textContent = products[i].weight;
            rowData.appendChild(weightCell);

            let priceCell = document.createElement('td');
            priceCell.textContent = products[i].price;
            rowData.appendChild(priceCell);

            tableBody.appendChild(rowData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function searchProduct() {
    event.preventDefault()
    try {
        const productName = document.getElementById("productName").value

        const response = await fetch(`http://localhost:3333/findProductByName/${productName}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const product = await response.json();
        console.log(product);

        const productResult = document.getElementById("productResult");

        if (product) {
            const resultText = `Name: ${product.name}, Weight: ${product.weight}, Price: ${product.price}`;
            productResult.textContent = resultText;
        } else {
            productResult.textContent = "No product found";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getProduct() {
    const productName = document.getElementById("productName").value;

    try {
        const response = await fetch(`http://localhost:3333/findProductByName/${productName}`);
        if (!response.ok) {
            throw new Error('Failed to load product');
        }

        const product = await response.json();

        console.log(product);

        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productWeight").value = product.weight;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

function clearForm() {
    document.getElementById("editForm").reset();
}


async function editProduct() {

    const productName = document.getElementById("productName").value
    const productPrice = parseFloat(document.getElementById("productPrice").value)
    const productWeight = parseFloat(document.getElementById("productWeight").value)

    const updatedProduct = {
        name: productName,
        price: productPrice,
        weight: productWeight
    }

    try {
        const response = await fetch(`http://localhost:3333//editProduct`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        alert('Product updated successfully!');
        // Gendannelse af formularen
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productWeight').value = '';
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
    }
}

async function deleteProduct() {
    const name = document.getElementById("productName").value;

    try {
        const response = await fetch(`http://localhost:3333/deleteProduct/${name}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed bingoDorthe');
        }

        const name = await response.json();
        console.log(deletedProduct);
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}
