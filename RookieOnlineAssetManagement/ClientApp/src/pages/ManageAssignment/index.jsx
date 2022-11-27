import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Dropdown, Table, ButtonGroup } from "react-bootstrap";
export default function ManageAssignment() {
    const [all, setAll] = useState(true);
    const [assigned, setAssigned] = useState(false);
    const [available, setAvailable] = useState(false);
    const [notAvailable, setNotAvailable] = useState(false);
    const [waitingForRecycling, setWaitingForRecycling] = useState(false);
    const [recycled, setRecycled] = useState(false);
    const [searchString, setSearchString] = useState('');
    let str=""
    const handleCheckbox = (event) => {
        if (event.target.value === "All") {
            setAll(event.target.checked);
        }
        if (event.target.value === "Assigned") {
            setAssigned(event.target.checked);
        }
        if (event.target.value === "Available") {
            setAvailable(event.target.checked);
        }
        if (event.target.value === "Not available") {
            setNotAvailable(event.target.checked);
        }
        if (event.target.value === "Waiting for recycling") {
            setWaitingForRecycling(event.target.checked);
        }
        if (event.target.value === "Recycled") {
            setRecycled(event.target.checked);
        }
    };
    const handleFilter = () => {
        if (all === true)
            str += "All "
        if (assigned === true)
            str += "Assigned "
        if (available === true)
            str += "Available "
        if (notAvailable === true)
            str += "NotAvailable "
        if (waitingForRecycling === true)
            str += "WaitingForRecycling "
        if (recycled === true)
            str+="Recycled"
        console.info(str)
        const loadUser = async () => {
            
        };
        loadUser();
    };
    return <div>
        <div style={{ marginTop: "150px" }}>
            <div className="row">
                <h4 className="page-title">Asset list</h4>
                <div className="col-sm-4 text-start">
                    <Dropdown as={ButtonGroup} align="end" size="sm">
                        <Dropdown.Toggle
                            variant="outline-dark"
                            style={{
                                width: "180px",
                                textAlign: "left",
                                paddingLeft: "10px",
                            }}
                        >
                            State
                        </Dropdown.Toggle>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={handleFilter}
                        >
                            <i className="bi bi-funnel-fill"></i>
                        </button>
                        <Dropdown.Menu
                            style={{
                                minWidth: "220px",
                                padding: "10px",
                                marginRight:"-35px"
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                id="All"
                                label="All"
                                value="All"
                                checked={all}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Assigned"
                                label="Assigned"
                                value="Assigned"
                                checked={assigned}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Available"
                                label="Available"
                                value="Available"
                                checked={available}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Not available"
                                label="Not available"
                                value="Not available"
                                checked={notAvailable}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Waiting for recycling"
                                label="Waiting for recycling"
                                value="Waiting for recycling"
                                checked={waitingForRecycling}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Recycled"
                                label="Recycled"
                                value="Recycled"
                                checked={recycled}
                                onChange={handleCheckbox}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-sm-5 d-flex">
                    <div
                        className="input-group mb-3 input-group-sm"
                        style={{ height: "30px" }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            name="search"
                            value={searchString}
                            onChange={(event) => setSearchString(event.target.value)}
                        ></input>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                        >
                            <i className="bi bi-search page-link" ></i>
                        </button>
                    </div>
                </div>

                <div className="col-sm-3 text-end">
                    <button className="btn btn-danger btn-sm" >
                        Create new asset
                    </button>
                </div>
            </div>
                <Table>
                    <thead>
                        <tr>
                            <th className="cursor-pointer" value="Asset Code" >
                                Asset Code<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="Asset Name">
                                Asset Name<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="Category" >
                                Category<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="State" >
                                State<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {/*{userList*/}
                        {/*    .slice(indexOfFirstCourse, indexOfLastCourse)*/}
                        {/*    .map((user, index) => {*/}
                        {/*        return (*/}
                        {/*            <ClassItem*/}
                        {/*                key={index}*/}
                        {/*                presentation={user}*/}
                        {/*                HandleClick={handleDisableUser}*/}
                        {/*            />*/}
                        {/*        );*/}
                        {/*    })}*/}
                    </tbody>
                </Table>
        </div>
    </div>
}