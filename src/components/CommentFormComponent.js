import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Label,Col } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

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
        alert(JSON.stringify(values))
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

export default CommentForm;