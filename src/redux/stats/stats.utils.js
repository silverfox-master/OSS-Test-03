export const giveMeTollValue = arr => {
    if (arr.length===0) return 0;
    const res = arr.reduce((init,current) =>(
        init + current.price
    ),0);
    return res 
  }

export const giveMeMeanValue = arr => {
    const toll = giveMeTollValue(arr)
    if (toll===0) return 0;
    return (toll/arr.length)
            .toFixed(2)
  }