import React, { Component } from 'react';
import './TreeView.css';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';


// Redux
import { connect } from 'react-redux';


function handlerClickSpan(e, f, f1, el) {
    if (e.target.tagName !== 'DIV') {
        return false;
    }
    f1(el);
    f();
    return null;
}

export class TreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggled: true
        };
    }

    render() {
        const {
            data,
            obj = { name: 'Catalogue', id_catalogue: -1 },
            isParentToggled = true,
            level = 1,
            showEditForm,
            editCatalogueItem,
            editItem,
            closeEditForm
        } = this.props;

        let {
            isChildElement = false,
            haveChildren = true
        } = this.props;

        const { isToggled } = this.state;

        const arrItems = data.map((el) => {
            if (el.id_catalogue === -1) {
                isChildElement = false;
            } else {
                isChildElement = true;
            }
            if (el.children) {
                haveChildren = true;

                return (
                    <TreeView
                        key={`${el.id_catalogue}`}
                        data={el.children}
                        isChildElement
                        isParentToggled={isParentToggled && isToggled}
                        obj={el}
                        level={level + 1}
                        showEditForm={showEditForm}
                        editCatalogueItem={editCatalogueItem}
                        editItem={editItem}
                        closeEditForm={closeEditForm}
                    />
                );
            }
            return (
                <ListGroup.Item
                    active={editItem.id_catalogue === el.id_catalogue}
                    key={`${el.id_catalogue}`}
                    onClick={(e) => { closeEditForm(); handlerClickSpan(e, showEditForm, editCatalogueItem, el); }}
                    style={{
                        paddingLeft: isChildElement ? (17 * (level + 1)) : `${4}px`,
                        display: isToggled ? 'block' : 'none'
                    }}
                >
                    {el.name}
                </ListGroup.Item>
            );
        });
        return (
            <React.Fragment>
                <ListGroup
                    style={{ display: isParentToggled ? 'block' : 'none' }}
                >

                    {obj.name
                        ? (
                            <ListGroup.Item
                                active={(editItem.id_catalogue === obj.id_catalogue)}
                                onClick={(e) => {
                                    closeEditForm();
                                    handlerClickSpan(e, showEditForm, editCatalogueItem, obj);
                                }}
                                style={{
                                    paddingLeft: isChildElement ? (17 * level) : `${4}px`

                                }}
                                disabled={(obj.id_catalogue === -1)}
                            >
                                {
                                    haveChildren
                                        ? (
                                            <span
                                                className={isToggled ? 'toggler' : 'toggler closed'}
                                                style={{
                                                    left: isChildElement ? (16 * level - 15) : `${4}px`
                                                }}
                                                onClick={() => {
                                                    this.setState(state => ({
                                                        isToggled: !state.isToggled
                                                    }));
                                                }}
                                                role='button'
                                                tabIndex={0}
                                                onKeyPress={() => null}
                                            >
                                                <i className='fas fa-plus' />
                                            </span>
                                        ) : <span />
                                }
                                {obj.name}
                            </ListGroup.Item>
                        ) : <span>&nbsp;&nbsp;</span>}
                    {arrItems}
                </ListGroup>
            </React.Fragment>
        );
    }
}

TreeView.propTypes = {
    data: PropTypes.array.isRequired,
    isChildElement: PropTypes.bool.isRequired,
    haveChildren: PropTypes.bool.isRequired,
    obj: PropTypes.object.isRequired,
    isParentToggled: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    showEditForm: PropTypes.func.isRequired,
    editCatalogueItem: PropTypes.func.isRequired,
    editItem: PropTypes.object.isRequired,
    closeEditForm: PropTypes.func.isRequired
};

const mapStateTpProps = state => ({
    editItem: state.adminPanel_catalogue.editItem
});

export default connect(mapStateTpProps)(TreeView);
