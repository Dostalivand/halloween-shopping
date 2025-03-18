let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let headerCounter = document.querySelector('.header-counter')
const counters = document.querySelectorAll('.number')
const toggleBtn = document.querySelector('#toggle-btn')
const menuItems = document.querySelectorAll('.corner-menu a')
const landingTitle = document.querySelector(".navbar-title");


let products = [
  {
    id: 1,
    name: 'پیشبند هالووین',
    images: 'Apron.jpeg',
    price: 540000
  },
  {
    id: 2,
    name: 'لباس هالووین',
    images: 'Clothes.jpeg',
    price: 680000
  },
  {
    id: 3,
    name: 'کلاه گیس رنگی',
    images: 'hat-1.jpeg',
    price: 340000
  },
  {
    id: 4,
    name: 'چوب دستی',
    images: 'Walking-stick.jpeg',
    price: 350000
  },
  {
    id: 5,
    name: 'نیزه سه شاخ',
    images: 'Spear.jpeg',
    price: 320000
  },
  {
    id: 6,
    name: 'جاکلیدی هالووین',
    images: 'Keychain.jpeg',
    price: 280000
  }
];

let listCards = [];

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `<img class="w-100 rounded-3 shadow img-fluid hover-grayscale" src="images/${value.images}">
            <div class="title mt-3 mb-3 fs-5 text-white kalameh">${value.name}</div>
            <div class="d-flex justify-content-between">
              <div class="price text-white">${value.price.toLocaleString()}
                <span>تومان</span>
              </div>
                <div>
                <i class="bi bi-star text-secondary position-relative"></i>
                <i class="bi bi-star text-secondary position-relative"></i>
                <i class="bi bi-star text-warning position-relative"></i>
                <i class="bi bi-star text-warning position-relative"></i>
                <i class="bi bi-star text-warning position-relative"></i>
                </div>
            </div>
            <button class="btn btn-add-to-card bg-orange text-center shadow" onclick="addToCard(${key})">
            <i class="bi bi-plus-circle position-relative"></i>
            افزودن به سبد خرید
            </button>`;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div id="cart" class="px-3" dir="rtl">
          <div class="cart-item d-flex align-items-center justify-content-between border-bottom py-3">
            <div class="d-flex align-items-center">
              <img src="images/${value.images}" alt="Product" class="img-fluid ms-2 rounded-2 shadow" style="width: 60px; height: 60px;">
              <div>
                <h6 class="mb-1">${value.name}</h6>
                <span class="text-secondary">${value.price.toLocaleString()} تومان</span>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <button onclick="changeQuantity(${key}, ${value.quantity - 1})" class="btn btn-outline-secondary btn-sm quantity-decrease me-2">-</button>
              <input type="number" class="quantity-input text-center mx-1 count" value="${value.quantity}" style="width: 45px;">
              <button onclick="changeQuantity(${key}, ${value.quantity + 1})" class="btn btn-outline-secondary btn-sm quantity-increase ms-2">+</button>
            </div>
            <button onclick="removeItem(${key})" class="btn btn-danger btn-sm listCard">
              <i class="bi bi-trash3 position-relative"></i>
            </button>
          </div>
        </div>

      `;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}

// Delete Item
function removeItem(key) {
  delete listCards[key];
  reloadCard();
}


// Product categories
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .boxs");

const filterCards = (e) => {

  document.querySelector("#filter-buttons .active").classList.remove("active");
  e.target.classList.add("active");
  filterableCards.forEach(boxs => {
    if (boxs.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
      boxs.classList.remove("hide");
      boxs.classList.add("show");
    } else {
      boxs.classList.remove("show");
      boxs.classList.add("hide");
    }
  });
}
filterButtons.forEach(button => button.addEventListener("click", filterCards));



// Site counter
let startCounter = false
window.addEventListener('scroll', () => {

  if (window.scrollY >= headerCounter.offsetTop) {
    if (!startCounter) {
      counters.forEach(counter => setCounter(counter))
    }
    startCounter = true
  }
})

function setCounter(el) {
  let elemNumCount = el.dataset.count

  let counterInterval = setInterval(() => {

    if (el.textContent == elemNumCount) {
      clearInterval(counterInterval)
    }

    el.textContent++
  }, 5)
}



// button to up
document.addEventListener("DOMContentLoaded", function () {
  let backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
      backToTop.style.opacity = "1";
      backToTop.style.transition = "opacity 0.5s ease";
    } else {
      backToTop.style.opacity = "0";
      setTimeout(() => {
        if (window.scrollY <= 300) {
          backToTop.style.display = "none";
        }
      }, 500);
    }
  });

  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// curner menu
let isMenuActive = false
toggleBtn.addEventListener('click', () => {
  if (!isMenuActive) {
    console.log("منو باز شد");

    menuItems[0].style.transform = 'translate(90px, 20px)'
    menuItems[1].style.transform = 'translate(90px, -50px)'
    menuItems[2].style.transform = 'translate(45px, -100px)'
    menuItems[3].style.transform = 'translate(-20px, -100px)'

    toggleBtn.classList.add('active-menu')
    isMenuActive = true
  } else {
    console.log("منو بسته شد");

    menuItems.forEach(menuItem => menuItem.style.transform = 'translate(0, 0)')

    toggleBtn.classList.remove('active-menu')
    isMenuActive = false
  }
})

// Type Writer
window.addEventListener("load", () => {
  let landingText = "فروش و ارسال به سراسر کشور";
  let typeIndex = 0;

  function startTyping() {
    landingTitle.innerHTML = "";
    typeWriter(landingText, 0);
  }

  function typeWriter(text, index) {
    if (index < text.length) {
      landingTitle.innerHTML += text[index];
      index++;
      setTimeout(() => typeWriter(text, index), 100);
    } else {
      setTimeout(startTyping, 1000);
    }
  }

  startTyping();
});










