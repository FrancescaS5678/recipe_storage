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
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipeActions';
import PropTypes from 'prop-types';

class RecipeModal extends Component {
    state = {
        modal: false,
        name: '',
        instructions: [],
        step: '',
        ingredients: [],
        ingredient: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, [e.target.step]: e.target.value, [e.target.ingredient]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            name: this.state.name,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients
        };
        this.props.addRecipe(newRecipe);
        this.toggle();
        this.setState({
            name: '',
            instructions: [],
            step: '',
            ingredients: [],
            ingredient: ''
        })
    }

    addIngredient = (e) => {
        e.preventDefault()
        this.setState({ ingredients: [...this.state.ingredients, this.state.ingredient] })
        document.getElementById("inputIngredient").value = ""
    }

    addStep = (e) => {
        e.preventDefault()
        this.setState({ instructions: [...this.state.instructions, this.state.step] })
        document.getElementById("inputStep").value = ""
    }

    render() {
        return (
            <div>
                <Button
                    color="info"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}>
                    Add Recipe</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Recipe Storage</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup className="d-flex flex-column">
                                <Label for="recipe">Recipe Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="recipe"
                                    placeholder="Add Recipe Name"
                                    onChange={this.onChange} />
                                <Label for="recipe">Recipe Ingredients</Label>
                                {this.state.ingredients.map((text, i) => {
                                    return <div key={i} style={{ marginBottom: '5px' }}>
                                        {text}
                                        <Button
                                            className='remove-btn'
                                            color="danger"
                                            size="sm"
                                            onClick={i => {
                                                this.state.ingredients.splice(i, 1)
                                                this.forceUpdate()
                                            }}
                                            style={{ marginLeft: '7px' }}
                                        >&times;
                                        </Button>
                                    </div>
                                })}
                                <Input
                                    type="text"
                                    name="ingredient"
                                    id="inputIngredient"
                                    placeholder="Add Recipe Ingredients"
                                    onChange={this.onChange} />
                                <Button
                                    color="info"
                                    className="btn-sm"
                                    onClick={this.addIngredient}
                                    style={{ marginTop: '1rem', marginRight: 'auto', marginBottom: '1rem' }}>
                                    &#43;
                                </Button>
                                <Label for="recipe">Recipe Instructions</Label>
                                {this.state.instructions.map((text, i) => {
                                    return <div key={i} style={{ marginBottom: '5px' }}>
                                        {text}
                                        <Button
                                            className='remove-btn'
                                            color="danger"
                                            size="sm"
                                            onClick={i => {
                                                this.state.instructions.splice(i, 1)
                                                this.forceUpdate()
                                            }}
                                            style={{ marginLeft: '7px' }}
                                        >&times;
                                        </Button>
                                    </div>
                                })}
                                <Input
                                    type="text"
                                    name="step"
                                    id="inputStep"
                                    placeholder="Add Recipe Instructions"
                                    onChange={this.onChange} />
                                <Button
                                    color="info"
                                    className="btn-sm"
                                    onClick={this.addStep}
                                    style={{ marginTop: '1rem', marginRight: 'auto' }}>
                                    &#43;
                                </Button>
                                <Button
                                    color="info"
                                    style={{ marginTop: '2rem', marginLeft: 'auto' }}>
                                    Add Recipe</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

RecipeModal.propTypes = {
    addRecipe: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    recipe: state.recipes
})

export default connect(mapStateToProps, { addRecipe })(RecipeModal);