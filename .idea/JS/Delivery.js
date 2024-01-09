const addNewProductURL = "http://localhost:3333/addProduct"

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