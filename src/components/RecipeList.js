import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipes } from '../actions/recipeActions';
import PropTypes from 'prop-types';

class RecipeList extends Component {
    state = {
        modal: false
    }

    componentDidMount = () => {
        this.props.getRecipes();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
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
    recipe: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    recipe: state.recipe
})

export default connect(mapStateToProps, { getRecipes, deleteRecipes })(RecipeList);