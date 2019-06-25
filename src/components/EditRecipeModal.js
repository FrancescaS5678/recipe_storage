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
        name: '',
        instructions: [],
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
                    <ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
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
                                {this.props.instructions.map((text, i) => {
                                    return <div key={i} style={{ marginBottom: '5px' }}>
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
    instructions: PropTypes.array.isRequired
}

export default EditRecipeModal