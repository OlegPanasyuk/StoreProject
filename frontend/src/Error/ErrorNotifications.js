import React, { Component } from 'react';
import $ from 'jquery';
import 'bootstrap/js/dist/toast';
import PropTypes from 'prop-types';

//Redux
import { connect } from 'react-redux';
import {
    deleteErrorFromState
} from '../REDUX/actions/actionsErrors';

export class ErrorNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidMount() {
        let { obj } = this.props;
        this.setState(()=> ({
            id: obj.id
        }));
        $(`#${this.state.id}`).toast({ delay: 4500 });
        $(`#${this.state.id}`).toast('show');
        setTimeout(() => {
            $(`#${this.state.id}`).remove();
        }, 5000);
    }

    render() {
        let { obj } = this.props;
        return (
            <div
                className="toast mt-3 "
                id={`${this.state.id}`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    background: 'grey',
                    position: 'relative',
                    minHeight: '100px',
                    zIndex: 10
                }}
            >
                <div className="toast-header">
                    <strong className="mr-auto">{obj.level}</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {obj.message}
                </div>
            </div>
        );

    }
}

ErrorNotification.propTypes = {
    obj: PropTypes.object
};

export default connect(null, {
    deleteErrorFromState
})(ErrorNotification);