import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

const dishDetailComponents = (props) => {
    if(props.dish) {
        return(
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    <div>
                        <Card>
                            <CardImg top src={props.dish.image} alt={props.dish.name} />
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                {props.dish.comments ? (
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>{props.dish.comments.map((comment)=>(
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {comment.date.split('T')[0]}</p>
                            </li>
                        ))}</ul>
                    </div>
                ): null}
            </div>
        )
    } else {
        return (<div></div>)
    }
        
    
};

export default dishDetailComponents;