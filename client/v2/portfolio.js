// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';


// current products on the page
let currentProducts = [];
let currentPagination = {};


// instantiate the selectors
// select l'élément HTML "show-select" et le stocke dans selectShow.
// show-select : prend le nombre d'article qu'on veut afficer (12/24/48)
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectSort = document.querySelector('#sort-select');


// prend le nombre total de produits dispo (222)
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbbrand = document.querySelector('#nbBrands');

// pas touche
/**
 * Set global value
 * @param {Array} result - products to display 
 * // tableau contenant les produits à afficher
 * @param {Object} meta - pagination meta info 
 * // objet contenant infos de pagination
 * // nombre total de produits (count)
 * // le nombre de pages (pageCount)
 * // la page actuelle (currentPage), etc.
 */

// met à jour currentproducts et currentpagination lorsqu'une nouvelle liste est récupérée depuis l'API
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};



/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */

// récupère une liste de produits depuis une API (grâce à fetch)
const fetchProducts = async (page = 1, size = 12) => {
  try {
    // récupère des données à partir de l'URL générée en urtilisant
    // page = 1 et size = 12
    const response = await fetch(
      //`https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
      //'http://localhost:8092/products'
      'https://clear-fashion-beige.vercel.app/products'
    );

    // lit la réponse en tant que JSON
    const body = await response.json(); 
    allproducts=body;
    console.log(allproducts);

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */

// affiche une liste de produits

const renderProducts = products => 
{
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  // parcourt tous les produits de 'products' donné en entrée
  // renvoit un html représentant chaque
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */

//

const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination; // extrait currentpage, pagecount de pagination
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};




/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  const products = await fetchProducts(currentPagination.currentPage, parseInt(event.target.value));

  setCurrentProducts(products); 
  render(currentProducts, currentPagination); 
});




document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});
