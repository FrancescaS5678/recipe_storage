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
                    {recipes.map(({ _id, name, instructions }) => (
                        <div key={_id}>
                            <ListGroupItem>
                                {instructions !== null ? <EditRecipeModal name={name} instructions={instructions} /> : null}
                                <Button
                                    className='remove-btn'
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                >&times;
                                </Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                {name}
                            </ListGroupItem>
                            <ListGroupItem>
                                {instructions}
                            </ListGroupItem>
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