import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipes } from '../actions/recipeActions';
import EditRecipeModal from './EditRecipeModal';
import PropTypes from 'prop-types';

class RecipeList extends Component {
    componentDidMount = () => {
        this.props.getRecipes();
    }

    onDeleteClick = (id) => {
        this.props.deleteRecipes(id);
    }

    render() {
        const { recipes } = this.props.recipe;
        return (
            <Container>
                <ListGroup>
                    {recipes.map(({ _id, name, instructions, ingredients }) => (
                        <div key={_id}>
                            <ListGroupItem style={{ display: 'flex' }}>
                                {instructions !== null ? <EditRecipeModal name={name} instructions={instructions} id={_id} ingredients={ingredients} /> : null}
                                <div>
                                    <Button
                                        className='remove-btn'
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        style={{ marginLeft: '7px' }}
                                    >&times;
                                    </Button>
                                </div>
                                <div style={{ paddingTop: '4px' }}>
                                    <h4>{name}</h4>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                {ingredients.map((ingredients, i) => {
                                    return <div data-ingredient={i} key={i}>
                                        {ingredients}
                                    </div>
                                })}
                            </ListGroupItem>
                            {instructions.map((instruction, i) => {
                                return <ListGroupItem data-steps={i} key={i} style={{ display: 'block' }}>
                                    {instruction}
                                </ListGroupItem>
                            })}
                        </div>
                    ))}
                </ListGroup>
            </Container>
        )
    }
}

RecipeList.propTypes = {
    getRecipes: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired,
    deleteRecipes: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
})

export default connect(mapStateToProps, { getRecipes, deleteRecipes })(RecipeList);