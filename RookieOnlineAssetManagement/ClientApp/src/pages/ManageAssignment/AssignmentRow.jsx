import { BsArrowCounterclockwise, BsFillPencilFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, Fragment } from "react";
import { ModalContext } from "context/ModalContext";

function GetDate(dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1; //January is 0!
    var year = date.getFullYear();

    if (day < 10) {
        day = `0${day}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    return `${day}/${month}/${year}`;
}

const AssignmentRow = ({ assignment, index, currentPage, pageSize }) => {
    const modalContext = useContext(ModalContext);

    const showAssignmentDetail = () => {
        const assignmentData = `
        <div class="container" id="thien" >
            <div class="row mb-3">
                <div class="col-5">Asset Code</div>
                <div class="col-7">${assignment.assetCode}</div>
            </div>
            <div class="row mb-3" >
                <div class="col-5">Asset Name</div>
                <div class="col-7">${assignment.assetName}</div>
            </div>
            <div class="row mb-3" >
                <div class="col-5">Specification</div>
                <div class="col-7">${assignment.specification}</div>
            </div>
            <div class="row mb-3">
                <div class="col-5">Assigned to</div>
                <div class="col-7">${assignment.assignedTo}</div>
            </div>
            <div class="row mb-3">
                <div class="col-5">Assigned by</div>
                <div class="col-7">${assignment.assignedBy}</div>
            </div>
            <div class="row mb-3">
                <div class="col-5">Assigned Date</div>
                <div class="col-7">${GetDate(assignment.assignedDate)}</div>
            </div>
            <div class="row mb-3">
                <div class="col-5">State</div>
                <div class="col-7">${assignment.state === 1 ? "Accepted" : "Waiting for acceptance"}</div>
            </div>
            <div class="row mb-3">
                <div class="col-5">Note</div>
                <div class="col-7">${assignment.note}</div>
            </div>
        </div>
        `;
        const newDataModal = {
            isShowModal: true,
            title: "Detailed User Information",
            content: assignmentData,
            isShowButtonCloseIcon: true,
            isShowButtonClose: false,
            isShowButtonFunction: false,
            contentButtonFunction: "",
            contentButtonClose: "Close",
            handleFunction: null,
        };
        modalContext.HandleSetModalData(newDataModal);
    };

    return (
        <Fragment>
        <tr key={index}>        
            <td className="p-0 ps-1">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {index + 1 + (currentPage - 1) * pageSize}
                </div>
            </td>
            <td className="p-0 ps-1">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {assignment.assetCode}
                </div>
            </td>
            <td className="p-0 ps-1">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {assignment.assetName}
                </div>
            </td>
            <td className="p-0 ps-1">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {assignment.assignedTo}
                </div>
            </td>
            <td className="p-0 ps-1">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {assignment.assignedBy}
                </div>
            </td>
            <td className="p-0 ps-1">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {GetDate(assignment.assignedDate)}
                </div>
            </td>
            <td className="p-0 ps-1" width="14%">
                <div className="td__cell" onClick={showAssignmentDetail}>
                    {assignment.state === 1
                        ? "Accepted"
                        : "Waiting for acceptance"}
                </div>
            </td>
            <td className="p-0 px-3 mx-5">
                <button className="btn p-0 border-0">
                    <BsFillPencilFill
                        style={{
                            color: "black",
                            fontSize: "22px",
                        }}
                    />
                </button>
                <button className="btn p-0 border-0">
                    <AiOutlineCloseCircle
                        className="mx-2"
                        style={{
                            color: "red",
                            fontSize: "22px",
                        }}
                    />
                </button>
                <button className="btn p-0 border-0 align-items-end">
                    <BsArrowCounterclockwise
                        style={{
                            color: "blue",
                            fontSize: "22px",
                        }}
                    />
                </button>
            </td>
        </tr>
        </Fragment>
    );
};

export default AssignmentRow;
