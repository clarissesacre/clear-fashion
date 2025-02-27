// fonction pour scrapper

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
        .attr('data-color');

        const brand = 'circle';

        var link = $(element)
        .find('.full-unstyled-link')
        .attr('href');
        final_link = "https://shop.circlesportswear.com" +link;
        
        var img = $(element)
        .find('img')
        .attr('src');
        var image = 'https:'+img;


      var for_who= '';
      var category= '';
      
      /*
      if(link.search('homme')==0)
      {
        for_who = 'men';
        //category = link.replace('/en/kids/','');
        //category = category.split('/')[0];
      }
      if(link.search('femme')==0)
      {
        for_who = 'women';
        //category = link.replace('/en/kids/','');
        //category = category.split('/')[0];
      }
      */
      
      

      return {brand, name, color, price, for_who, category, final_link, image};
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


