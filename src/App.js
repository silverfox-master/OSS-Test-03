import React  from 'react';
import ProductList from './components/product-list.component'
import Header from './components/header.component'
import { Route , Switch ,Redirect } from 'react-router-dom'
import Stats from '././components/stats.component'
import AddItems from '././components/add-item.form'
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import './App.css'


const useStyles = makeStyles(() => createStyles({
container:{
  minHeight: 1000,
  display: 'flex',
  flexDirection: 'row',
  padding: '25px 0px 100px',
   
}
}));

const App = ({items, setUser}) => {
  const currentUser = 'Admin';
  const classes = useStyles();
  setUser(currentUser)
  
  
  return (
    <div  >
      <Header/>
      <div className={classes.container}>
      
      <Grid container spacing={3}>
        
        <Grid item xs={9}> 
          <Switch>
              <Route exact path='/' 
                      component={() => <ProductList 
                                            products={items}
                                            
                                            
                                      />} />
              <Route exact path='/item-add' 
                      render={() =>currentUser
                                        .toLowerCase()
                                        .includes('admin') ?
                        <AddItems/> 
                        :<Redirect to='/403-ACCESS FORBIDDEN' />}
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
          <Stats/>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}



const mapDispatchToProps = dispatch =>({
    setUser: user => dispatch(setCurrentUser(user)),
    
})

const mapStateToProps = ({items :{items}}) => ({
  items,
})


export default connect(mapStateToProps ,mapDispatchToProps)(App);
