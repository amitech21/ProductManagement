import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    //editedIngredientIndex: number,
}

 const initialState: State = {

 };

export function shoppingListReducer(
    state: State = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch(action.type) {
    //     case ShoppingListActions.ADD_INGREDIENT:
    //         return {
    //             ...state, // this will first copy old state
    //             ingredients: [...state.ingredients, action.payload] // than update
    //         };

    //     case ShoppingListActions.ADD_INGREDIENTS:
    //         return {
    //             ...state, // this will copy old state
    //             ingredients: [...state.ingredients, ...action.payload]
    //         }; 
            
    //     case ShoppingListActions.UPDATE_INGREDIENT:
    //         const ingredient = state.ingredients[state.editedIngredientIndex]; // get ingredient in old state
    //         const updatedIngredient = {
    //             ...ingredient,                  // this will first copy old state
    //             ...action.payload    // than update whole objects
    //         };
    //         const updatedIngredients = [...state.ingredients]; // get ingredients array in old state
    //         updatedIngredients[state.editedIngredientIndex] = updatedIngredient; // override specific array

    //         return {
    //             ...state, // this will copy old state
    //             ingredients: updatedIngredients,
    //             editedIngredientIndex: -1,
    //             editedIngredient: null
    //         }; 

    //     case ShoppingListActions.DELETE_INGREDIENT:
    //         return {
    //             ...state, // this will copy old state
    //             ingredients: state.ingredients.filter((ig, igIndex) => {
    //                 return igIndex !== state.editedIngredientIndex;
    //             }),
    //             editedIngredientIndex: -1,
    //             editedIngredient: null
    //         };

    //     case ShoppingListActions.START_EDIT:
    //         return {
    //             ...state,
    //             editedIngredientIndex: action.payload,
    //             // this ... will copy and {} will create new object
    //             editedIngredient: { ...state.ingredients[action.payload] } 
    //         };

    //     case ShoppingListActions.STOP_EDIT:
    //         return {
    //             ...state,
    //             editedIngredientIndex: -1,
    //             editedIngredient: null
    //         };

        
    //     default: 
    //         return state;
     }

}