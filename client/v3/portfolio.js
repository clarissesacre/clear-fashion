
// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let show = 12;
let page = 1;
let brand = 'All';
let price = 'All';
let for_who = 'All';
let sort = 'Cheapest';
let favorite_products = [];
const current_date = Date.now();

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectPrice = document.querySelector('#price-select');
const selectSort = document.querySelector('#sort-select');
const selectSex = document.querySelector('#sex-select');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbBrands = document.querySelector('#nbBrands');
const spanPercentile50 = document.querySelector('#percentile50');
const spanPercentile90 = document.querySelector('#percentile90');
const spanPercentile95 = document.querySelector('#percentile95');
const spanNbSearchProducts = document.querySelector('#nbSearchProducts');
const sectionSearchProducts = document.querySelector('#searchProducts');
const spanNbFavoriteProducts = document.querySelector('#nbFavoriteProducts');
const sectionFavoriteProducts = document.querySelector('#favoriteProducts');

/**
 * Fetch API
 */

// affiche les produits avec possibilité de filtrage 
const fetchProducts = async (show=12, page=1, brand="",price="", for_who="") => {
  try {
    let url = `http://localhost:8092/products/price?page=${page}&limit=${show}&brand=${brand}&price=${price}&for_who=${for_who}`;
    console.log(url);
    const response = await fetch(url);
    const body = await response.json();

    const currentPage = body.currentPage;
    const totalPages = body.totalPages;
    spanNbSearchProducts.innerHTML = body.totalCount + ' products found';
    const options = Array.from(
      {'length': totalPages},
      (value, index) => `<option value="${index + 1}">${index + 1}</option>`
    ).join('');
    selectPage.innerHTML = options;
    selectPage.selectedIndex = currentPage - 1;
    return body.data;
  } catch (error) {
    console.error(error);
    return currentProducts;
  }
};

// renvoie la liste de tous les produits
const fetchAllProducts = async () => {
  try {
    const response = await fetch(
      `http://localhost:8092/products`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return currentProducts;
  }
};

// renvoie la liste de toutes les marques
const fetchBrands = async () => {
  try {
    const response = await fetch(
      `http://localhost:8092/brands`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return currentProducts;
  }
};

const fetchSex = async () => {
  try {
    const response = await fetch(
      `http://localhost:8092/sex`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return currentProducts;
  }
};

/*
const fetchCategory = async () => {
  try {
    const response = await fetch(
      `http://localhost:8092/category`
    );
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return currentProducts;
  }
};*/

////////////////////////
////////////////////////

/**
 * Favorite products
 */

async function changeFavorite(id) {
  if (favorite_products.find(element => element._id === id)) {
    favorite_products = favorite_products.filter(item => item._id !== id);
  }
  else {
    favorite_products.push(currentProducts.find(element => element._id === id));
  }
  document.getElementById(id).getElementsByTagName('button')[0].innerText = textFavorite(id);
  renderFavoriteProducts();
}

function textFavorite(id) {
  let text = "";
  if (favorite_products.find(element => element._id === id)) {
    text = "Remove favorite";
  }
  else {
    text = "Add favorite";
  }
  return text;
}

/**
 * Render list of products
 */
// traduit les produits en html
const renderSearchProducts = products => {
  currentProducts = products;
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id} style="text-align: center">
        <img  src=${product.image} alt="Not avaible" width="500" height="550">
        <br>
        <span>brand:${product.brand}</span>
        <br>
        <a href="${product.final_link}" target="_blank">${product.name}</a>
        <br>
        <span>${product.price}€</span>
        <br>
        <button onclick="changeFavorite('${product._id}')">${textFavorite(product._id)}</button>
        <br>
      </div>
    `;
    })
    .join('');

  sectionSearchProducts.innerHTML = template;
};

const renderFavoriteProducts = products => {
  const template = favorite_products
    .map(product => {
      return `
      <div class="product" id=${product._id} style="text-align: center">
        <img  src=${product.image} alt="Not avaible" width="500" height="550">
        <br>
        <span>brand:${product.brand}</span>
        <br>
        <a href="${product.final_link}" target="_blank">${product.name}</a>
        <br>
        <span>${product.price}€</span>
        <br>
        <button onclick="changeFavorite('${product._id}')">${textFavorite(product._id)}</button>
        <br>
      </div>
    `;
    })
    .join('');
  
  spanNbFavoriteProducts.innerHTML = favorite_products.length + (favorite_products.length > 1 ? ' favorite products' : ' favorite product');
  sectionFavoriteProducts.innerHTML = template;
};




/**
 * Declaration of all Listeners
 */

selectShow.addEventListener('change', async (event) => {
  show = event.target.value;
  page = 1;
  let products = await fetchProducts(show=show, page=1, brand="", price="",for_who="")
  renderSearchProducts(products);
});

selectPage.addEventListener('change', async (event) => {
  page = event.target.value;
  let products = await fetchProducts(show=12, page=page, brand="", price="",for_who="")
  renderSearchProducts(products);
});

selectBrand.addEventListener('change', async (event) => {
  brand = event.target.value;
  if(brand=='All'){
    brand="";
  }
  page = 1;
  let products = await fetchProducts(show=show, page=page, brand=brand, price=price,for_who=for_who)
  renderSearchProducts(products);
});


selectSex.addEventListener('change', async (event) => {
  for_who = event.target.value;
  if(for_who=='All'){
    for_who="";
  }
  page = 1;
  let products = await fetchProducts(show=show, page=page, brand=brand, price=price,for_who=for_who)
  renderSearchProducts(products);
});

// quand on modifie le prix selectionné
selectPrice.addEventListener('change', async (event) => {
  price = event.target.value;
  if(price=='All'){
    price="";
  }
  // on remet direct la page à 1
  page = 1;
  // on appelle fetchproducts pour récupérer les produits avec les bon parametres
  let products = await fetchProducts(show=show, page=page, brand=brand, price=price,for_who=for_who)
  // pour l'affichage
  renderSearchProducts(products);
});

selectBrand.addEventListener('change', async (event) => {
  brand = event.target.value;
  if(brand=='All'){
    brand="";
  }
  page = 1;
  let products = await fetchProducts(show=show, page=page, brand=brand, price=price,for_who=for_who)
  renderSearchProducts(products);
});

/*
selectCategory.addEventListener('change', async (event) => {
  category = event.target.value;
  if(category=='All'){
    category="";
  }
  page = 1;
  let products = await fetchProducts(show=show, page=page, brand=brand, price=price,for_who=for_who)
  renderSearchProducts(products);
});*/


selectSort.addEventListener('change', async (event) => {
  sort = event.target.value;
  page = 1;
  let products = await fetchSortProducts();
  let listeOfPdts=[];
  if(sort!='Default'){
    if(sort=='Cheapest'){
      listeOfPdts = await fetchSortProducts(1);
    }
    else if(sort=='Most expensive'){
      listeOfPdts = await fetchSortProducts(-1);
    }
  }
  else{
    listeOfPdts = products
  }
  products=listeOfPdts;
  renderSearchProducts(products);
});





/**
 * Launched on page load
 */

const quantile = (arr, q) => {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
      return sorted[base];
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const brand_names = await fetchBrands();
  spanNbBrands.innerHTML = brand_names.length;
  
  brand_names.unshift("All");
  const brands = Array.from(
    brand_names,
    value => `<option value="${value}">${value}</option>`
  ).join('');
  
  selectBrand.innerHTML = brands;



  const sex_names = await fetchSex();
  
  sex_names.unshift("All");
  const sexes = Array.from(
    sex_names,
    value => `<option value="${value}">${value}</option>`
  ).join('');

  selectSex.innerHTML = sexes;


/*
  const category_names = await fetchCategory();
  
  category_names.unshift("All");
  const categories = Array.from(
    category_names,
    value => `<option value="${value}">${value}</option>`
  ).join('');

  selectCategory.innerHTML = categories;*/



  let products = await fetchProducts();
  renderSearchProducts(products);

  const all_products = await fetchAllProducts();
  spanNbProducts.innerHTML = all_products.length;
  
  
  let prices = [];

  for (let product_id in all_products) {
    prices.push(all_products[product_id].price);
  }
  spanPercentile50.innerHTML = Math.round(quantile(prices, 0.50));
  spanPercentile90.innerHTML = Math.round(quantile(prices, 0.90));
  spanPercentile95.innerHTML = Math.round(quantile(prices, 0.95));
});
