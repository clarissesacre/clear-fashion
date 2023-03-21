// fonction pour scrapper

// pour DEDICATED brand 
// faire un truc comme ça par site
// créer un autre .js pour les autres sites 

const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product-grid-container .grid__item') // on va analyser tous les éléments 1 par 1
  // productList-container : endroit où y'a les produits
  // productList : où y'a un produit
    .map((i, element) => {
        var name = $(element)
        .find('.full-unstyled-link') // on prend le nom
        .text()
        .trim()
        .replace(/(\n)/gm, "")
        .split("      ");
        name = name[0];
        
        
        var price = $(element)
        .find('.money') // on prend le prix
        .text()
        .trim()
        .split("€");
        price=price[1];
        price = parseInt(price);


        var color = $(element)
        .find('.color-variant')
        //.getAttribute(data-color)
        .text()
        .trim();
        const shopname = 'circle';

      return {shopname, name, color, price};
    })
    .get();
};

// ça on s'en fou
/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// FIN DEDICATED brand
