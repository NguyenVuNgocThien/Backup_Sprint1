import React, {useEffect,useState} from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './ModalDetail.css'
import api, { endpoint } from "../../../../api/api"

const ModalDetail = (props) => {
    function HandleDisplayAssetState(state) {
        if (state === 1) {
            return "Assigned"
        }
        if (state === 2) {
            return "Available"
        }
        if (state === 3) {
            return "Not Available"
        }
        if (state === 4) {
            return "Waiting for recycling"
        }
        if (state === 5) {
            return "Recycled"
        }
    }
    function FormatDateTime(datetime) {
        let date = `${datetime.split("T")[0].split("-")[2]}/${datetime.split("T")[0].split("-")[1]}/${datetime.split("T")[0].split("-")[0]}`;
        return `${date}`;
    }

    return (
        <React.Fragment>
            <Modal
                show={props.isShow}
                onHide={props.OnclickCloseModalDetail}
                backdrop="static"
                keyboard={false}
                centered
                className="modal modal-custom"
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <Modal.Header className="modal__header">
                    <h5 className="m-0 bold text-nash-red">Detailed Assignment Information</h5>
                    <i className="bi bi-x-square btn-close-modal fw-bold fs-5 cursor-pointer" onClick={props.OnclickCloseModalDetail}></i>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    <div className="row mb-2">
                        <div className="col-4">Asset Code</div>
                        <div className="col-8">
                            {props.asset.assetCode}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">Asset Name</div>
                        <div className="col-8">
                            {props.asset.assetName}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">Category</div>
                        <div className="col-8">
                            {props.asset.category}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">Installed Date</div>
                        <div className="col-8">
                            {FormatDateTime(props.asset.installedDate)}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">State</div>
                        <div className="col-8">
                            {HandleDisplayAssetState(props.asset.state)}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">Location</div>
                        <div className="col-8">
                            {props.asset.location}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">Specification</div>
                        <div className="col-8">
                            {props.asset.specification}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-4">History</div>
                        <div className="col-8">
                            {(props.listHistory.length === 0) ? <h5></h5> :
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th className="cursor-pointer" value="Date" >
                                                Date<i className="bi bi-caret-down-fill ms-1"></i>
                                            </th>
                                            <th className="cursor-pointer" value="Assigned To" >
                                                Assigned To<i className="bi bi-caret-down-fill ms-1"></i>
                                            </th>
                                            <th className="cursor-pointer" value="Assigned By" >
                                                Assigned By<i className="bi bi-caret-down-fill ms-1"></i>
                                            </th>
                                            <th className="cursor-pointer" value="Returned Date" >
                                                Returned Date<i className="bi bi-caret-down-fill ms-1" ></i>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.listHistory.map((history, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td className="p-0" >
                                                        <div className="my-2 ms-2">
                                                            {FormatDateTime(history.installedDate)}
                                                        </div>
                                                        <hr className="m-0 me-3" />
                                                    </td>
                                                    {history.assignmentHistory.length !== 0 ?
                                                        <td className="p-0" >
                                                            {history.assignmentHistory.map((assignmentHistory, index) => {
                                                                return (
                                                                    <div key={index} className="my-2 ms-2">
                                                                        {assignmentHistory.assignedTo}
                                                                    </div>
                                                                )
                                                            })}
                                                        <hr className="m-0 me-3" />
                                                        </td> :
                                                        <td className="p-0" >
                                                            <div className="my-2 ms-2">
                                                            </div>
                                                            <hr className="m-0 me-3" />
                                                        </td>
                                                    }
                                                    {history.assignmentHistory.length !== 0 ?
                                                        <td className="p-0" >
                                                            {history.assignmentHistory.map((assignmentHistory, index) => {
                                                                return (
                                                                    <div key={index} className="my-2 ms-2">
                                                                        {assignmentHistory.assignedBy}
                                                                    </div>
                                                                )
                                                            })}
                                                            <hr className="m-0 me-3" />
                                                        </td> : <td className="p-0" >
                                                            <div className="my-2 ms-2">
                                                            </div>
                                                            <hr className="m-0 me-3" />
                                                        </td>
                                                    }
                                                    {history.returningRequestHistory.length !== 0 ?
                                                        <td className="p-0" >
                                                            {history.returningRequestHistory.map((requestHistory, index) => {
                                                                return (
                                                                    <div key={index} className="my-2 ms-2">
                                                                        {FormatDateTime(requestHistory.returnedDate)}
                                                                    </div>
                                                                )
                                                            })}
                                                            <hr className="m-0 me-3" />
                                                        </td> : <td className="p-0" >
                                                            <div className="my-2 ms-2">
                                                            </div>
                                                            <hr className="m-0 me-3" />
                                                        </td>
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                 </table>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default ModalDetail;
