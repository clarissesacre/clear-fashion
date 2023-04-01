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
  
  return $('.productList-container .productList') // on va analyser tous les éléments 1 par 1
  // productList-container : endroit où y'a les produits
  // productList : où y'a un produit
    .map((i, element) => {
      var name = $(element)
        .find('.productList-title') // on prend le nom
        .text()
        .trim()
        .replace(/\s/g, ' ');
      
      var color = name.split(" ");
      color = color.slice(-1);
      color = color[0]

      const price = parseInt(
        $(element)
          .find('.productList-price') // on prend le prix
          .text()
      );


      const shopname = 'dedicated';

      var link = $(element)
      .find('.productList-link')
      .attr('href');
      final_link = 'https://www.dedicatedbrand.com' + link;
      
      var for_who= '';
      var category='';
      if(link.search('/en/men/')==0)
      {
        for_who = 'men';
        category = link.replace('/en/men/','');
        category = category.split('/')[0];
      }
      if(link.search('/en/women/')==0)
      {
        for_who = 'women';
        category = link.replace('/en/women/','');
        category = category.split('/')[0];
      }
      if(link.search('/en/kids/')==0)
      {
        for_who = 'kids';
        category = link.replace('/en/kids/','');
        category = category.split('/')[0];
      }
      
 
      return {shopname, name, color, price, for_who, category, final_link};
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
