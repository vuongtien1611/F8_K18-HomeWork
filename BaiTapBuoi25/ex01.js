const customers = [
    { id: 1, name: 'An' },
    { id: 2, name: 'Binh' },
    { id: 3, name: 'Cuong' }
]

const orders = [
    { id: 1, customerId: 1, total: 500 },
    { id: 2, customerId: 2, total: 1200 },
    { id: 3, customerId: 1, total: 700 },
    { id: 4, customerId: 3, total: 400 },
    { id: 5, customerId: 2, total: 800 }
]


function getTopCustomer(customers, orders){

    const customerMap = {}

    for(const customer of customers) {
        customerMap[customer.id] = customer
    }

    const totalMap = {}

    for(const order of orders) {
        totalMap[order.customerId] = (totalMap[order.customerId] || 0) + order.total
    }

    let bestCustomer = null
    let maxTotal = 0

    for (const customerId in totalMap){
        if(totalMap[customerId] > maxTotal){
            maxTotal = totalMap[customerId]
            bestCustomer = customerMap[customerId]
        }
    }
    return {
       ...bestCustomer,
        total: maxTotal
    }
}

console.log(getTopCustomer(customers, orders))