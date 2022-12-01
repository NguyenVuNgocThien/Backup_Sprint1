import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalConfirm = (props) => {
    const { isShow, OnclickCloseModalDetail, OnclickHandleAccept, OnclickHandleDecline, IsAccept } = props;


    return (
        <React.Fragment>
            <Modal
                show={isShow}
                onHide={OnclickCloseModalDetail}
                backdrop="static"
                keyboard={false}
                centered
                className="modal modal-custom"
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <Modal.Header className="modal__header">
                    <h5 className="m-0 bold text-nash-red">Are you sure?</h5>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    Do you want to {IsAccept ? "accept" : 'decline'} this assignment?
                    <div className="mt-3">
                        <button className="btn btn-primary me-4" onClick={IsAccept ? OnclickHandleAccept : OnclickHandleDecline}>{IsAccept ? "Accept" : 'Decline'}</button>
                        <button className="btn btn-outline-secondary" onClick={OnclickCloseModalDetail}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default ModalConfirm;
