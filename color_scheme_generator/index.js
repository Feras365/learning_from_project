const seedColor = document.getElementById("seed-color")
const selectOption = document.getElementById("select-option")
const selectBtn = document.getElementById("select-btn")
const formElement=document.getElementById("form-ele")
const secPallete = document.getElementById("palete-color")
formElement.addEventListener("submit", function(e) {
    e.preventDefault()

    const formData = new FormData(formElement)

    const hex = formData.get("color").slice(1)
    const mode = formData.get("mode")

    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            secPallete.innerHTML=""
           data.colors.forEach(function(color) {
                const colorItem = document.createElement("div")
                colorItem.classList.add("color-item")

                const colorBox = document.createElement("div")
                colorBox.classList.add("color-box")
                colorBox.style.backgroundColor = color.hex.value

                const hexText = document.createElement("p")
                hexText.textContent = color.hex.value
                
                 hexText.addEventListener("click", function() {
                         navigator.clipboard.writeText(color.hex.value)
    })

                colorItem.appendChild(colorBox)
                colorItem.appendChild(hexText)

                secPallete.appendChild(colorItem)
})
        })
        .catch(error => console.error(error)); 
        
})


          
          
          