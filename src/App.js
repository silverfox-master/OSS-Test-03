import React ,{ useEffect} from 'react';
import ProductList from './components/product-list.component'
import Header from './components/header.component'
import { Route , Switch ,Redirect } from 'react-router-dom'
import Stats from '././components/stats.component'
import uuid from 'uuid/v1'
import AddItems from '././components/add-item.form'
import apiClient from './helpers/local-storage.helper'
import Grid from '@material-ui/core/Grid';
import DATA from './assets/Product.data.json'
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'
import { setCurrentStatSum} from './redux/stats/stats.actions'
import { setCurrentStatMean} from './redux/stats/stats.actions'
import { setCurrentStatQuantity} from './redux/stats/stats.actions'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
container:{
  display: 'flex',
  flexDirection: 'row',
  padding: '25px 50px 100px',
   
}
}));

const App = (props) => {
  const currentUser = 'Admin';
  const classes = useStyles();
  apiClient.saveItems('items', DATA.items);
  const [items, setItems] = React.useState(apiClient.loadItems('items'));
  
  const giveMeTollValue = arr => {
    if (arr.length===0) return 0;
    const res = arr.reduce((init,current) =>(
      {price : init.price+current.price}
    ));
    return res.price
  }

  const giveMeMeanValue = arr => {
    const toll = giveMeTollValue(arr)
    if (toll===0) return 0;
    return (toll/arr.length)
            .toFixed(2)
  }

  useEffect(() => {
    props.setUser(currentUser)
    props.setStatSum(giveMeTollValue(items))
    props.setStatMean(giveMeMeanValue(items))
    props.setStatQuantity(items.length)
  });

  const handleClear = () =>{
    setItems([])
    apiClient.saveItems('items',[]);
  };

  const handleProductDelete = (productId) => {
    const nextProducts = items.filter((product) => (
      product.id !== productId
    ));
    setItems(nextProducts);
    apiClient.saveItems('items',nextProducts);
  };

  const handleAddItem = (p_title,p_description,p_price) =>{
    const newproducts = items.concat({
        id:uuid(),
        imageUrl:'',
        title:p_title,
        description:p_description,
        price:parseFloat(p_price),
    });
    setItems(newproducts);
    apiClient.saveItems('items',newproducts);
  }
  
  return (
    <div className={classes.container} >
      <Grid container spacing={3}>
        <Header/>
        <Grid item xs={9}> 
          <Switch>
              <Route exact path='/' 
                      component={() => <ProductList 
                                            products={items}
                                            handleDelete={handleProductDelete}
                                            
                                      />} />
              <Route exact path='/item-add' 
                      render={() =>currentUser
                                        .toLowerCase()
                                        .includes('admin') ?
                        <AddItems
                                              onSubmit={handleAddItem} 
                        /> :
                        <Redirect to='/403-ACCESS FORBIDDEN' />}
              />
              <Route path='/403-ACCESS FORBIDDEN'
                      render={ () =>
                                currentUser
                                        .toLowerCase()
                                        .includes('admin') ?
                        <Redirect to='/' /> :
                        <h3> this option is not allowed to
                           unauthorized AKA 'not admin' users.
                           Please log in as AN admin role user
                        </h3> 
                      }
              />
          </Switch>
        </Grid>
        <Grid item xs={3}> 
          <Stats onDeleteAll={handleClear}/>
        </Grid>
      </Grid>
    </div>
  );
}

//const mapStateToProps = state =>({
//  currentUser: state.user.currentUser
//})

const mapDispatchToProps = dispatch =>({
    setStatSum: sum => dispatch(setCurrentStatSum(sum)),
    setUser: user => dispatch(setCurrentUser(user)),
    setStatMean: mean => dispatch(setCurrentStatMean(mean)),
    setStatQuantity: quantity => dispatch(setCurrentStatQuantity(quantity))
})

export default connect(null ,mapDispatchToProps)(App);
