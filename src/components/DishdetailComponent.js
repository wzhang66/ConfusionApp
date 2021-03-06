import React,{Component} from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label,Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';
// import CommentForm from './CommentFormComponent';

const required = (val) => val && val.length;
const maxlength = (len) => (val) => !(val) || (val.length <= len);
const minlength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit = (values) => {
        console.log(this.props.dishId);
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className='form-group m-1'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select
                                    model='.rating'
                                    id='rating'
                                    name='rating'
                                    defaultValue='1'
                                    className='form-control' >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className='form-group m-1'>
                                <Label htmlFor='name'>Your Name</Label>
                                <Control.text
                                    model='.name'
                                    id='name'
                                    name='name'
                                    className='form-control'
                                    validators={{
                                        required,
                                        minlength:minlength(2),
                                        maxlength:maxlength(15)
                                    }}
                                    placeholder='Your name' />
                                <Errors 
                                    className='text-danger'
                                    model='.name'
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minlength: 'Must be greater than 2 characters',
                                        maxlength: 'Must be 15 characters or less'
                                    }}
                                />

                            </Row>
                            <Row className='form-group m-1'>
                                <Label htmlFor='comment'>Comment</Label>
                                <Control.textarea 
                                    model='.comment'
                                    id='commemt'
                                    name='commemt'
                                    className='form-control'
                                    rows='6'
                                />
                            </Row>
                            <Row className='form-group '>
                                <Col>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const dishDetailComponents = (props) => {
    if(props.isLoading) {
        return(
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if(props.dish != null) {
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
                            <FadeTransform in 
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                                <Card>
                                    <CardImg top src={baseURL + props.dish.image} alt={props.dish.name} />
                                    <CardBody>
                                        <CardTitle>{props.dish.name}</CardTitle>
                                        <CardText>{props.dish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </FadeTransform>
                        </div>
                    </div>
                    {props.comments ? (
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className='list-unstyled'>
                                <Stagger in>
                                    {props.comments.map((comment)=>(
                                    <Fade in>
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                    </Fade>
                                    ))}
                                </Stagger>
                            </ul>
                            <CommentForm dishId={props.dish.id} postComment={props.postComment} />
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