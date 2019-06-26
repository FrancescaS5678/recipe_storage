import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';

class EditRecipeModal extends Component {
    state = {
        modal: false,
        name: this.props.name,
        instructions: this.props.instructions,
        step: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, [e.target.step]: e.target.value });
    }

    addStep = (e) => {
        e.preventDefault()
        this.setState({ instructions: [...this.state.instructions, this.state.step] })
        console.log(this.state.instructions)
    }

    onSubmit = (e) => {
        const updatedRecipe = {
            name: this.state.name,
            instructions: this.state.instructions
        }
        fetch(`https://mysterious-earth-62439.herokuapp.comapi/recipes/${this.props.id}`, {
        // fetch(`http://localhost:4000/api/recipes/${this.props.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedRecipe),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
        this.toggle();
        this.setState({
            name: '',
            instructions: [],
            step: ''
        })
    }

    render() {
        return (
            <div>
                <Button
                    color="info"
                    size="sm"
                    onClick={this.toggle}>
                    Edit
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.name}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup className="d-flex flex-column">
                                <Label for="recipe">Recipe Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="recipe"
                                    placeholder={this.props.name}
                                    onChange={this.onChange} />
                                <Label for="recipe">Recipe Instructions</Label>
                                {this.state.instructions.map((text, i) => {
                                    return <div data-steps={i} key={i} style={{ marginBottom: '5px' }}>
                                        {text}
                                    </div>
                                })}
                                <Input
                                    type="text"
                                    name="step"
                                    id="recipe"
                                    placeholder="Add Recipe Instructions"
                                    onChange={this.onChange} />
                                <Button
                                    color="info"
                                    className="btn-sm"
                                    onClick={this.addStep}
                                    style={{ marginTop: '1rem', marginRight: '27rem' }}>
                                    &#43;
                                </Button>
                                <Button
                                    color="info"
                                    style={{ marginTop: '2rem', marginLeft: '20rem' }}>
                                    Update Recipe</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

EditRecipeModal.propTypes = {
    name: PropTypes.string.isRequired,
    instructions: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired
}

export default EditRecipeModal;