import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

const dishDetailComponents = (props) => {
    if(props.dish) {
        return(
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
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
                    {props.comments ? (
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className='list-unstyled'>{props.comments.map((comment)=>(
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            ))}</ul>
                        </div>
                    ): null}
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
        
    
};

export default dishDetailComponents;