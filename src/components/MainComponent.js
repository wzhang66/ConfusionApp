import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Contact from './ContactComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import DishdetailComponent  from './DishdetailComponent';  
import Footer from './FooterComponents';
import {addComment} from '../redux/ActionCreators';    

class Main extends Component{

    render(){
        const HomePage = () => (
            <Home 
            dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]}
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]} />
        );

        const DishWithId = ({match}) => {
            return(
                <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId, 10))}
                addComment={this.props.addComment}/>
            )
        }

        return (
        <div>
            <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders} />} />
                <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={Contact} />
                <Redirect to='/home' />
            </Switch>
            <Footer />
        </div>
        );
    } 
}

const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        leaders : state.leaders,
        promotions : state.promotions
    }
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, commemt) => dispatch(addComment(dishId, rating, author, commemt))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
