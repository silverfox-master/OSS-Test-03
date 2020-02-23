const INITIAL_STATE = {
    currentSum: 0,
    currentMean:0,
    currentQuantity:0,

};

const statsReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case 'SET_CURRENT_STATS_SUM':
            return{
                ...state,
                currentSum: action.payload
            };
        case 'SET_CURRENT_STATS_QUANTITY':
            return{
                ...state,
                currentQuantity: action.payload
            };
        case 'SET_CURRENT_STATS_MEAN':
            return{
                ...state,
                currentMean: action.payload
            };
        default:
            return state
    }
}

export default statsReducer;