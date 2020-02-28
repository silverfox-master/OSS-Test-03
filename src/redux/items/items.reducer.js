import DATA from './Product.data.json';


const INITIAL_STATE = {
    items: DATA.items,
    
}

const itemsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DELETE_ITEM':
            return{
                ...state,
                items: state.items.filter((item)=>item.id!==action.payload)
            }
        case 'ADD_ITEM':
            return{
                ...state,
                items: [...state.items,action.payload]
            }

        case 'DELETE_ALL':
            return{
                ...state,
                items:[]
            }

        default: 
            return state
    }
}

export default itemsReducer;