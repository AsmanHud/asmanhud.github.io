const people = ['asman', 'roma', 'stas']
const mainForm = document.querySelector('#main-form')
const privatePurchases = document.querySelector('#private-purchases')
const privatePurchasesBtns = privatePurchases.querySelectorAll('button')
const calculatedDiv = document.querySelector('#calculated')

const capit = (str) => str[0].toUpperCase() + str.slice(1)

const createPurchaseElem = (person, id) => {
    const div = document.createElement('div')
    div.classList.add('row', 'mb-3', 'g-2')
    div.id = `${person}-priv-purch-${id}`
    const divContent = `<div class="col-4">
  <input class="form-control" type="number" min="0" step="0.01" name="${person}-priv-purch-sum-${id}" id="${person}-priv-purch-sum-${id}" placeholder="0.00 SEK" required>
</div>
<div class="col-8">
  <input class="form-control" type="text" name="${person}-priv-purch-name-${id}" id="${person}-priv-purch-name-${id}" placeholder="Name (optional)">
</div>`
    div.innerHTML = divContent
    return div
}

const createWhoOwsWhoElem = (whoPaid, whoOws, sum) => {
    const div = document.createElement('div')
    const h5 = document.createElement('h5')
    h5.classList.add('fs-5', 'text-start')
    h5.textContent = `${whoOws} ows ${whoPaid} ${sum} EUR`
    div.appendChild(h5)
    return div
}

for (let btn of privatePurchasesBtns) {
    const person = btn.id.split('-')[0]
    btn.addEventListener('click', function (e) {
        e.preventDefault()
        let lastPurchase = btn.previousElementSibling
        if (btn.id.includes('add')) {
            let elemId = 1
            if (lastPurchase && lastPurchase.tagName === 'DIV') {
                elemId = parseInt(lastPurchase.querySelector('input').id.split('-').pop()) + 1
            }
            const purchase = createPurchaseElem(person, elemId)
            btn.insertAdjacentElement('beforebegin', purchase)
        } else {
            lastPurchase = lastPurchase.previousElementSibling
            if (lastPurchase && lastPurchase.tagName === 'DIV') {
                lastPurchase.remove()
            }
        }
    })
}

mainForm.addEventListener('submit', function (e) {
    e.preventDefault()
    calculatedDiv.innerHTML = ''
    const formData = new FormData(mainForm)
    const sumInSek = parseFloat(formData.get('tot-sum-sek'))
    const sumInEur = parseFloat(formData.get('tot-sum-eur'))
    const whoPaid = formData.get('who-paid')

    const privatePurchases = {}
    for (let person of people) {
        privatePurchases[person] = []
        const privatePurchasesDivs = mainForm.querySelectorAll(`div[id^="${person}-priv-purch"]`)
        for (let div of privatePurchasesDivs) {
            const sum = parseFloat(div.querySelector('input[id*="sum"]').value)
            const name = div.querySelector('input[id*="name"]').value
            privatePurchases[person].push({ sum, name })
        }
    }
    console.log(sumInSek, sumInEur, whoPaid, privatePurchases)
    const conversionRate = sumInSek / sumInEur
    let commonSum = sumInSek
    const privateSums = { asman: 0, roma: 0, stas: 0 }
    for (let key in privatePurchases) {
        for (let purchase of privatePurchases[key]) {
            commonSum -= purchase.sum
            privateSums[key] += purchase.sum
        }
    }
    for (let person of people) {
        if (person !== whoPaid) {
            const owedSum = ((commonSum / people.length + privateSums[person]) / conversionRate).toFixed(2)
            const whoOwsWhoElem = createWhoOwsWhoElem(capit(whoPaid), capit(person), owedSum)
            calculatedDiv.appendChild(whoOwsWhoElem)
        }
    }
})