/* eslint-disable no-console, no-process-exit */
// programme principal


const dedicatedbrand = require('./eshops/dedicatedbrand'); // /eshops/dedicatedbrand : chemin à gauche pour trouver la fonction à appeler
const montlimartbrand = require('./eshops/montlimart');

// remettre la ligne au dessus aussi pour les autres sites


async function sandbox_dedicated (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await dedicatedbrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function sandbox_montlimart (eshop = 'https://www.montlimart.com/99-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await montlimartbrand.scrape(eshop);


    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
// ici mettre pour les autres sites


const [,, eshop] = process.argv;

sandbox_montlimart(eshop);

