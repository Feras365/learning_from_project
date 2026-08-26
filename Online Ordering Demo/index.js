import { menuArray } from "/data.js"

const menuItem = document.getElementById('menu')


const menuHtml = menuArray.map(function(item) {
    return `<section class="menu">
               <span class="emoji-icon">${item.emoji}</span>
                <div class="inter">
                     <h3>${item.name}</h3>
                     <p>${item.ingredients.join(', ')}</p>
                     <h3>$${item.price}</h3>
                </div>
                <button class="order-btn" data-id="${item.id}">+</button>
            </section>`
}).join('')

menuItem.innerHTML = menuHtml

const orderItem = document.getElementById('order')
let currentOrderList = []

document.addEventListener('click', function(e) {
    
 
    if (e.target.classList.contains('order-btn')) {
        const itemId = parseInt(e.target.dataset.id)
        const targetItem = menuArray.find(function(arr){
            return arr.id === itemId
        })
        
        if (targetItem) {
            currentOrderList.push(targetItem)
            renderOrderSummary() 
        }
    }
    
   
    if (e.target.classList.contains('remove-btn')) {
  
        const itemIndex = parseInt(e.target.dataset.index)
        
       
        currentOrderList.splice(itemIndex, 1)
        
      
        renderOrderSummary()
    }
})


function renderOrderSummary() {
    
    if (currentOrderList.length === 0) {
        orderItem.innerHTML = ''
        return
    }

    
    const itemsHtml = currentOrderList.map(function(item, index) {
        return `
            <div class="detail">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <!-- CRITICAL FIX: added data-index="${index}" -->
                    <button class="remove-btn" data-index="${index}">remove</button>
                </div>
                <div class="item-price">
                    <h3>$${item.price}</h3>
                </div>
            </div>
        `
    }).join('')

   
    const totalPrice = currentOrderList.reduce(function(sum, currentItem){
        return sum + currentItem.price
    }, 0)

   
    const orderHtml = `
        <section class="ordersec">
            <h2>Your Order</h2>
            
            <div class="order-items-wrapper">
                ${itemsHtml}
            </div>
            
            <hr class="order-line">
            
            <div class="total-sec">
                <h2>Total price:</h2>
                <h2>$${totalPrice}</h2>
            </div>
            <button class="complete-btn">Complete Order</button>
        </section>
    `
    
    orderItem.innerHTML = orderHtml
}

const paymentModal = document.getElementById('payment-modal')
const paymentForm = document.getElementById('payment-form')


document.addEventListener('click', function(e) {

    if (e.target.classList.contains('complete-btn')) {
   
        paymentModal.classList.remove('hidden')
    }
})


paymentForm.addEventListener('submit', function(e) {
 
    e.preventDefault()
    
   
    const customerName = document.getElementById('user-name').value


    paymentModal.classList.add('hidden')
    
 
    currentOrderList = []
    
    orderItem.innerHTML = `
        <div class="thank-you-card">
            <p>Thanks, ${customerName}! Your order is on its way!</p>
        </div>
    `
    
    
    paymentForm.reset()
})
