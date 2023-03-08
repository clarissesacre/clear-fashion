// fonction pour scrapper

// pour MONTLIMART brand 


const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.products-list*  .products-list_block*') // * quand y'a des espaces : on prend ce qui commence par ça
    .map((i, element) => {
      const name = $(element)
        .find('.text-reset') // on prend le nom
        .text()
        .trim();
      const price = parseInt(
        $(element)
          .find('.price') // on prend le prix
          .text()
      );

      return {name, price};
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
