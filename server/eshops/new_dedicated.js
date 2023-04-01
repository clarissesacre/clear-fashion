// fonction pour scrapper

// pour DEDICATED brand 
// faire un truc comme ça par site
// créer un autre .js pour les autres sites 

// on envoie le link initial : eshop = https://www.dedicatedbrand.com/en/
// const products = await new_dedicated.scrape(eshop); 
      

const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  // d'abord on prend toutes les sous catégories du site : tshirt, pantalon etc.
  console.log("Here is all the categories of circle's products");
  return $('.mainNavigation-fixedContainer .mainNavigation-link-subMenu-link*')
    .map((i, element) => {
      var category = $(element)
      .find('a')
      .prop("href");
      category = category.replace('/en/','') // on enlève le /en/
      //console.log(category);
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