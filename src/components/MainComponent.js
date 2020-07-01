import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { actions } from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

import Contact from './ContactComponent';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import DishdetailComponent  from './DishdetailComponent';  
import Footer from './FooterComponents';
import {postComment, fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators';    

class Main extends Component{

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render(){
        const HomePage = () => (
            <Home 
            dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
            dishesLoading = {this.props.dishes.isLoading}
            dishesErrMess = {this.props.dishes.errMess}
            promotion={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
            promosLoading = {this.props.promotions.isLoading}
            promosErrMess = {this.props.promotions.errMess}
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]} />
        );

        const DishWithId = ({match}) => {
            return(
                <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                dishesLoading = {this.props.dishes.isLoading}
                dishesErrMess = {this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId, 10))}
                commentsErrMess = {this.props.comments.errMess}
                postComment={this.props.postComment}/>
            )
        }

        return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders} />} />
                        <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>} />
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                        <Redirect to='/home' />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
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
    postComment: (dishId, rating, author, commemt) => dispatch(postComment(dishId, rating, author, commemt)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
