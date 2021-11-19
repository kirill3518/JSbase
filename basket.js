let array = [];

function addToCart(id1, name1, price1) {

    let cnt = 1;
    if (id1 in array) {
        cnt = cnt + array[id1].count;
    }
    array[id1] = { id: id1, name: name1, price: price1, count: cnt };
    basket = array;
}

function getCount() {
    let cnt = 0;
    for (let i = 0; i < array.length; i++) {
        if (i in array) {
            cnt = cnt + array[i].count;
        }

    }
    return cnt;
}

function getSum() {
    let cnt = 0;
    for (let i = 0; i < array.length; i++) {
        if (i in array) {
            cnt = +cnt + +(array[i].price * array[i].count).toFixed(2);
        }

    }
    return cnt.toFixed(2);
}

function getProductMarkup() {
    return `
      <div class="product">
          <div>${this.name}</div>
          <div>${this.count} шт.</div>
          <div>$${this.price}</div>
          <div>$${(this.count * this.price).toFixed(2)}</div>
      </div>
    `;
}

const basketEl = document.querySelector('.basket');
const cartIconWrapEl = document.querySelector('.cartIconWrap');

cartIconWrapEl.addEventListener('click', event => {
    basketEl.classList.toggle("hidden");
});

let basket = {};

const basketTotalValueEl = document.querySelector('.basketTotalValue');
const productsEl = document.querySelector('.products');
const spanEl = document.querySelector(".cartIconWrap").querySelector("span");
const featuredItemsEl = document.querySelector('.featuredItems');
featuredItemsEl.addEventListener('click', event => {
    if (!event.target.classList.contains("addToCart")) {
        return;
    }

    const featuredItemEl = event.target.closest('.featuredItem');
    // console.log(featuredItemEl);

    const dataId = featuredItemEl.dataset.id;
    const dataName = featuredItemEl.dataset.name;
    const dataPrice = featuredItemEl.dataset.price;

    // console.log(dataId, dataName, dataPrice);

    addToCart(dataId, dataName, dataPrice);
    // console.log(basket);

    spanEl.textContent = getCount();
    basketTotalValueEl.textContent = getSum();

    productsEl.innerHTML = basket.map(product => getProductMarkup.call(product)).join("");
    // console.log(basket.map(product => getProductMarkup.call(product)));
});



