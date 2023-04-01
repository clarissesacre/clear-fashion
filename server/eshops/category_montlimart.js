// fonction pour scrapper les CATEGORIES 
// pour montlimart brand 

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

  // on prend toutes les sous catégories du site : tshirt, pantalon etc.
  return $('.js-top-menu* .column_wrap_title*')
    .map((i, element) => {
      var category = $(element)
      .find('a')
      .prop("href");
      console.log('o')
      return [category]; //return la liste de toutes les catégories
    })
    .get();
};




// pas touche
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