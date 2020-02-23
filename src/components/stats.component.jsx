import React from 'react';
import {Button} from '@material-ui/core'
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';

const Stats = props => {

    const handleDel = () => {
        props.onDeleteAll();
    }

    return (
      <Paper  elevation={8}>
        <div Style='padding:30px 30px'>
            <div align='left'>
                <h3>Items Statistics</h3>            
            </div>
            <hr width='100%'></hr>
            <div align='right'>
                <p>Количество : {props.currentQuantity}</p>
                <p>Суммарная цена : {props.currentSum}</p>
                <p>Средняя цена : {props.currentMean}</p>
            </div>
            <hr width='100%'></hr>
            <div align='right'>
              {
                props.currentUser
                  .toLowerCase()
                  .includes('admin') ?
                
                  <Button  onClick={handleDel}>
                      Удалить все товары
                  </Button>:
                  <p></p>
              }
            </div>
        </div>
      </Paper>
    );
}

const mapStateToProps = ({
                      user:{currentUser},
                      sum:{currentSum}, 
                      mean:{currentMean},
                      quantity:{currentQuantity}
                    }) =>({
  currentUser,
  currentSum,
  currentMean,
  currentQuantity
})
export default connect(mapStateToProps)(Stats);