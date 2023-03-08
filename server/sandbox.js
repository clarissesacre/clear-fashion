/* eslint-disable no-console, no-process-exit */
// programme principal


const dedicatedbrand = require('./eshops/dedicated'); // /eshops/dedicatedbrand : chemin à gauche pour trouver la fonction à appeler
const montlimartbrand = require('./eshops/montlimart');
const circlebrand = require('./eshops/circle');

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


async function sandbox_dedicated_women (eshop = 'https://www.dedicatedbrand.com/en/women/all-women') {
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


async function sandbox_circle (eshop = 'https://shop.circlesportswear.com/collections/collection-homme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlebrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function sandbox_circle_women (eshop = 'https://shop.circlesportswear.com/collections/collection-femme') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

    const products = await circlebrand.scrape(eshop); // lance dedicatedbrand.js puis affiche les produits

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const [,, eshop] = process.argv;

//sandbox_dedicated(eshop);
//sandbox_montlimart(eshop);
//sandbox_circle(eshop);
//sandbox_dedicated_women(eshop);
sandbox_circle_women(eshop);
