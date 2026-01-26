const products = [
    {id: 1, name: "Gạo ST25 (5kg)", price: 180000, remaining: 20},
    {id: 2, name: "Dầu ăn Simply (1L)", price: 65000, remaining: 15},
    {id: 3, name: "Nước mắm Nam Ngư (750ml)", price: 45000, remaining: 30},
    {id: 4, name: "Sữa tươi Vinamilk (1L)", price: 38000, remaining: 25},
    {id: 5, name: "Trứng gà (10 quả)", price: 42000, remaining: 18}
];


const orders = []
let nextOrderId = 1

function createOrder(productId, orderQty) {
    if (productId == null || orderQty == null) {
        console.log("Invalid input")
        return
    }

    if (orderQty <= 0) {
        console.log("Invalid quantity")
        return
    }

    let foundProduct = null
    for (const product of products) {
        if (product.id === productId) {
            foundProduct = product
            break
        }
    }

    if (!foundProduct) {
        console.log("Product not found")
        return
    }

    if (foundProduct.remaining < orderQty) {
        console.log("out of stock")
        return
    }

    const newOrder = {
        id: nextOrderId++,
        productId: productId,
        quantity: orderQty
    }

    orders.push(newOrder)
    foundProduct.remaining -= orderQty

    return newOrder
}


function updateOrder(orderId, newQty) {
    if (newQty == null || newQty <= 0) {
        console.log("Invalid quantity")
        return
    }

    let foundOrder = null
    for (const order of orders) {
        if (order.id === orderId) {
            foundOrder = order
            break
        }
    }

    if (!foundOrder) {
        console.log("not found")
        return
    }

    let relatedProduct = null
    for (const product of products) {
        if (product.id === foundOrder.productId) {
            relatedProduct = product
            break
        }
    }

    if (!relatedProduct) {
        console.log("Product not found")
        return
    }

    const quantityDiff = newQty - foundOrder.quantity

    if (quantityDiff > 0 && relatedProduct.remaining < quantityDiff) {
        console.log("out of stock")
        return
    }

    relatedProduct.remaining -= quantityDiff
    foundOrder.quantity = newQty
}




function deleteOrder(orderId) {
    for (let index = 0; index < orders.length; index++) {
        if (orders[index].id === orderId) {

            let relatedProduct = null
            for (const product of products) {
                if (product.id === orders[index].productId) {
                    relatedProduct = product
                    break
                }
            }

            if (!relatedProduct) {
                console.log("Product not found")
                return
            }

            relatedProduct.remaining += orders[index].quantity
            orders.splice(index, 1)
            return
        }
    }

    console.log("not found")
}
























