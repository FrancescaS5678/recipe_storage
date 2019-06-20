import React, { Component } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getRecipes, deleteRecipes } from '../actions/recipeActions';
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
                    <TransitionGroup className="recipe-list">
                        {recipes.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem className="d-flex flex-row">
                                    <Button
                                        className='remove-btn'
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;
                                    </Button>
                                    <div style={{marginTop: '2rem'}}><h5>{name}</h5></div>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
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