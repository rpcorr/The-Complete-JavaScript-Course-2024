import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime/runtime'; // polyfilling async await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // 1) get recipe id
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener('load', controlRecipes);
// window.addEventListener('hashchange', controlRecipes);

// a method to refactor the two lines above
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
