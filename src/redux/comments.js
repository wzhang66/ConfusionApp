// import {COMMENTS} from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        errMess: null,
        dishes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            return {...state, errMess:null, comments: state.comments.concat(comment)};
            
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess:null, comments:action.payload};
        
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess:action.payload, comments:[]};
        default:
            return state
    }
}