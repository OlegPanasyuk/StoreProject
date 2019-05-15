import React, {
    Component
} from 'react';
import { Modal } from 'react-bootstrap';


class DeletingForm extends Component {
    render() {
        return (
            <Modal
                show={this.props.show}
            >
                <Modal.Header closeButton>
                    Delete this object?
                </Modal.Header>
            </Modal>
        );
    }
}

export default DeletingForm;