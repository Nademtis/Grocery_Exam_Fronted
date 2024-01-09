const addNewProductURL = "http://localhost:3333/addProduct"
const fetchListURL = "http://localhost:3333/getAllProducts"

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

let products = []; // Change this from const to let
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
            let rowData = document.createElement('tr'); // Create a table row

            let productNameCell = document.createElement('td');
            productNameCell.classList.add("tableData")
            productNameCell.textContent = products[i].name; // Replace 'value' with the correct property name
            rowData.appendChild(productNameCell);

            let weightCell = document.createElement('td');
            weightCell.textContent = products[i].weight; // Replace 'value' with the correct property name
            rowData.appendChild(weightCell);

            let priceCell = document.createElement('td');
            priceCell.textContent = products[i].price; // Replace 'value' with the correct property name
            rowData.appendChild(priceCell);

            tableBody.appendChild(rowData); // Append the row to the table body
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

