import React from 'react';
import {Button} from '@material-ui/core'
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { deleteAll } from './../redux/items/items.actions'

import { giveMeTollValue, giveMeMeanValue } from './../redux/stats/stats.utils'

const Stats = ({ currentQuantity, currentSum, currentMean, clearALL,currentUser }) => {
    
    
    return (
      <Paper  elevation={8}>
        <div Style='padding:30px 30px'>
            <div align='left'>
                <h3>Items Statistics</h3>            
            </div>
            <hr width='100%'></hr>
            <div align='right'>
                <p>Количество : {currentQuantity}</p>
                <p>Суммарная цена : </p>
                <p>{currentSum}</p>
                <p>Средняя цена : </p>
                <p>{currentMean}</p>
            </div>
            <hr width='100%'></hr>
            <div align='right'>
              {
                currentUser
                  .toLowerCase()
                  .includes('admin') ?
                
                  <Button  onClick={()=> clearALL()}>
                      Удалить все товары
                  </Button>:
                  <p></p>
              }
            </div>
        </div>
      </Paper>
    );
}



const mapStateToProps = ({items :{items}, user :{currentUser}}) => ({
  currentUser,
  items,
  currentSum: giveMeTollValue(items),
  currentQuantity: items.length,
  currentMean: giveMeMeanValue(items)
})

const mapDispatchToProps = dispatch =>({
  clearALL: () => dispatch(deleteAll())
})

export default connect(mapStateToProps,mapDispatchToProps)(Stats);