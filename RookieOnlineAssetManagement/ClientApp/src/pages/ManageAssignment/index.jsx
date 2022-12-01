import { getAssignmentById } from "api/AssignmentService";
import React, { useEffect, useState } from "react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDateDMY } from "utils";
const ManageAssignment = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const CreateAssignment = () => {
        navigate("/manage-assignment/create-new-assignment")
    }

    // tuy chinh header, sua dung field tra ve tu backend
    const headers = ["No.", "Asset Code", "Asset Name", "Assigned to", "Assigned by", "Assigned Date", "State"]
    const fields = ["assetCode", "assetName", "assignedTo", "assignedBy", "assignedDate", "state"]

    //sua dung truong, co api thi them use effect
    const [assignments, setAssignments] = useState([
        {
            id: "LA101002",
            assetCode: "LA101002",
            assetName: "Laptop HP Probook 450 G1",
            assignedTo: "manhnq",
            assignedBy: "duyn",
            assignedDate: "10/04/2019",
            state: "Waiting for acceptance",
        },
        {
            id: "LA101003",
            assetCode: "LA101003",
            assetName: "Laptop HP Probook 450 G1",
            assignedTo: "manhnq",
            assignedBy: "duyn",
            assignedDate: "10/04/2019",
            state: "Accepted",
        },
        {
            id: "MO101004",
            assetCode: "MO101004",
            assetName: "Monitor Dell UltraSharp",
            assignedTo: "manhnq",
            assignedBy: "duyn",
            assignedDate: "20/03/2021",
            state: "Waiting for acceptance",
        },
    ])

    useEffect(() => {
        if (location.state !== null) {
            let id = location.state.id
            getAssignmentById(id).then((response) => {
                let assignment = response.data;
                assignment.assignedDate = GetDateDMY(new Date(assignment.assignedDate))
                assignment.state = assignment.state === 2 ? "Waiting for acceptance" : "Accepted"
                setAssignments((assignments) =>
                    [assignment, ...assignments.filter(assignment => assignment.id !== id)])
            })
            window.history.replaceState({}, document.title);
        }
    }, [location.state])

    return (
        <div>
            <div className="page-title">Assignment</div>
            <div className="row">
                <div className="col-sm-9">
                </div>

                <div className="col-sm-3 text-end">
                    <button className="btn btn-danger btn-sm" onClick={CreateAssignment}>
                        Create New Assignment
                    </button>
                </div>
            </div>

            <table className="table table-borderless">
                <thead>
                    <tr>
                        {headers.map((header, index) =>
                            <th key={index} className="p-0">
                                <div style={{ margin: "7px 0px", fontWeight: "500" }}>
                                    {header}
                                    <span className="ms-2">
                                        <i className="bi bi-caret-down-fill"></i>
                                    </span>
                                </div>
                                <hr className="m-0 me-3 d-block" style={{ borderTop: "2px solid #000", }} />
                            </th>
                        )}
                        <th style={{ border: "0px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((row, index) =>
                        <tr key={index}>
                            <td className="p-0 ps-1">
                                <div style={{ margin: "7px 0px 7px 1px" }}>
                                    {index + 1}
                                </div>
                                <hr className="m-0 me-3" />
                            </td>
                            {fields.map((field, idx) => (
                                <td key={idx} className="p-0 ps-1">
                                    <div style={{ margin: "7px 0px 7px 1px" }}>
                                        {row[field]}
                                    </div>
                                    <hr className="m-0 me-3" />
                                </td>
                            ))}
                            <td className="p-0 px-3 mx-5">
                                <button className="btn p-0 border-0">
                                    <MdDone style={{ color: "red", fontSize: '22px', opacity: '0.2', }} />
                                </button>
                                <button className="btn p-0 border-0">
                                    <IoCloseSharp className="mx-2" style={{ color: "black", fontSize: '22px', opacity: '0.2', }} />
                                </button>
                                <button className="btn p-0 border-0 align-items-end">
                                    <BsArrowCounterclockwise style={{ color: "blue", fontSize: "22px" }} />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ManageAssignment;