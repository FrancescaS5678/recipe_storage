import axios from 'axios';
import { GET_RECIPES, ADD_RECIPE, DELETE_RECIPE, RECIPES_LOADING } from './types';

export const getRecipes = () => dispatch => {
    dispatch(setRecipesLoading());
    axios
        .get('https://mysterious-earth-62439.herokuapp.com/api/recipes')
        .then(res =>
            dispatch({
                type: GET_RECIPES,
                payload: res.data
            })
        )
};

export const addRecipe = (recipe) => dispatch => {
    axios
        .post('https://mysterious-earth-62439.herokuapp.com/api/recipes', recipe)
        .then(res =>
            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            })
        )
};

export const deleteRecipes = (id) => dispatch => {
    axios
        .delete(`https://mysterious-earth-62439.herokuapp.com/api/recipes/${id}`)
        .then(res =>
            dispatch({
                type:DELETE_RECIPE,
                payload: id
            })
        )
};

export const setRecipesLoading = () => {
    return {
        type: RECIPES_LOADING
    }
};