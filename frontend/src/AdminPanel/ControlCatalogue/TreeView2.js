import React, { Component } from 'react';
import './TreeView.css';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';


//Redux
import { connect } from 'react-redux';


function handlerClickSpan(e, f, f1, el) {

    if (e.target.tagName !== 'DIV') {
        return false;
    } else {
        f1(el);
        f();
    }
}

class TreeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isToggled: true
        };
    }


    render() {
        let {
            data,
            isChildElement = false,
            haveChildren = true,
            obj = { name: 'Catalogue', id_catalogue: -1 },
            isParentToggled = true,
            level = 1,
            showEditForm,
            editCatalogueItem,
            editItem
        } = this.props;

        let { isToggled } = this.state;

        let arrItems = data.map((el) => {
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
                        isChildElement={true}
                        isParentToggled={isParentToggled && isToggled}
                        obj={el}
                        level={level + 1}
                        showEditForm={showEditForm}
                        editCatalogueItem={editCatalogueItem}
                        editItem={editItem}
                    />
                );
            } else {
                return (
                    <ListGroup.Item
                        active={editItem.id_catalogue === el.id_catalogue}
                        key={`${el.id_catalogue}`}
                        onClick={(e) => handlerClickSpan(e, showEditForm, editCatalogueItem, el)}
                        style={{
                            paddingLeft: isChildElement ? (17 * (level + 1)) : 4 + 'px',
                            display: isToggled ? 'block' : 'none'
                        }}

                    >
                        {el.name}
                    </ListGroup.Item>);
            }

        });
        return (
            <React.Fragment>
                <ListGroup
                    style={{ display: isParentToggled ? 'block' : 'none' }}
                >

                    {obj.name ?
                        <ListGroup.Item
                            active={(editItem.id_catalogue === obj.id_catalogue)}
                            onClick={(e) => handlerClickSpan(e, showEditForm, editCatalogueItem, obj)}
                            style={{
                                paddingLeft: isChildElement ? (17 * level) : 4 + 'px',

                            }}>
                            {
                                haveChildren ?
                                    <span
                                        className={isToggled ? 'toggler' : 'toggler closed'}
                                        style={{
                                            left: isChildElement ? (16 * level - 15) : 4 + 'px'
                                        }}
                                        onClick={() => {
                                            this.setState((state) => ({
                                                isToggled: !state.isToggled
                                            }));
                                        }}>
                                        <i className="fas fa-plus"></i>
                                    </span> : <span></span>
                            }
                            {obj.name}
                        </ListGroup.Item> : <span>&nbsp;&nbsp;</span>}
                    {arrItems}
                </ListGroup>
            </React.Fragment>
        );
    }
}

TreeView.propTypes = {
    data: PropTypes.array,
    isChildElement: PropTypes.bool,
    haveChildren: PropTypes.bool,
    obj: PropTypes.object,
    isParentToggled: PropTypes.bool,
    level: PropTypes.number,
    showEditForm: PropTypes.func,
    editCatalogueItem: PropTypes.func,
    editItem: PropTypes.func
};

const mapStateTpProps = (state) => {
    return {
        editItem: state.adminPanel_catalogue.editItem
    };
};

export default connect(mapStateTpProps)(TreeView);