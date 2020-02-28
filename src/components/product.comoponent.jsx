import React from 'react';
import {connect} from 'react-redux';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';


import {deleteItem} from './../redux/items/items.actions'

const useStyles = makeStyles({
  root: {
    width: '30%',
    margin: '1% 1%'
  },
  media: {
    height: 160,
  },
  hovIcon: {
    cursor: 'pointer'
  }
})

const Product = ({currentUser,delItem,product}) =>{
  const classes = useStyles();
  
     
  return (
    <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={product.imageUrl}
          />
          <CardContent className={classes.media}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
          </CardContent>
          <CardHeader 
                  Style='height:100'
                  avatar={
                    <Typography variant="body2" color="textSecondary" component="p">
                      {product.price.toFixed(2)}
                    </Typography>
                  }
                  action={
                    currentUser
                        .toLowerCase()
                        .includes('admin') ?
                    
                        <HighlightOffTwoToneIcon className={classes.hovIcon} onClick={() => delItem(product.id)}/>
                    
                    :
                    null
                  }
          />
               
    </Card>
  );
}

const mapStateToProps = state =>({
  currentUser: state.user.currentUser
})

const mapDispatchToState = dispatch =>({
  delItem: item => dispatch(deleteItem(item))
})

export default connect(mapStateToProps,mapDispatchToState)(Product);


        
        

