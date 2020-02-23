export const setCurrentStatSum = sum =>({
    type: 'SET_CURRENT_STATS_SUM',
    payload: sum
})

export const setCurrentStatMean = mean =>({
    type: 'SET_CURRENT_STATS_MEAN',
    payload: mean
})

export const setCurrentStatQuantity = quantity =>({
    type: 'SET_CURRENT_STATS_QUANTITY',
    payload: quantity
})