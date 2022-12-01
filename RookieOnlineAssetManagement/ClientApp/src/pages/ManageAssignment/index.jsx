import React, { useEffect, useState } from "react";
import {
    Form,
    Dropdown,
    Table,
    ButtonGroup,
    InputGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { BsFillCalendarDateFill } from "react-icons/bs";
import AssignmentRow from "./AssignmentRow";
import assignmentApi from "api/assignmentApi";
import PaginationComponent from "./AssignmentPagination";
import "./ManageAssignment.css";
import { GetDate } from "utils";

export default function ManageAssignment() {
    const itemsPerPage = 5;
    const [filterDate, setFilterDate] = useState(null);
    const [assignmentList, setAssignmentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsNumber, setItemsNumber] = useState(5);
    const [filters, setFilters] = useState({
        State: [],
        AssignedDate: null,
        KeyWord: "",
        SortBy: "No",
        SortType: true
    });

    useEffect(() => {
        const validFilter = {
            State:
                filters.State.includes("All") ||
                filters.State.length >= 2 ||
                filters.State.length === 0
                    ? "All"
                    : filters.State[0],
            AssignedDate:
                filters.AssignedDate == null
                    ? null
                    : GetDate(filters.AssignedDate),
            SearchWords: filters.KeyWord,
            SortBy: "No",
            SortType: filters.SortType ? "asc" : "desc"
        };

        assignmentApi
            .GetAssignmentNumberAfterFilter(validFilter)
            .then((response) => {
                setItemsNumber(response);
            })
            .catch((error) => console.log(error));
    }, [])

    useEffect(() => {
        const validFilter = {
            State:
                filters.State.includes("All") ||
                filters.State.length >= 2 ||
                filters.State.length === 0
                    ? "All"
                    : filters.State[0],
            AssignedDate:
                filters.AssignedDate == null
                    ? null
                    : GetDate(filters.AssignedDate),
            SearchWords: filters.KeyWord,
            SortBy: filters.SortBy,
            SortType: filters.SortType ? "asc" : "desc"
        };

        assignmentApi
            .GetAssignmentsByFilters(validFilter, currentPage, itemsPerPage)
            .then((response) => {
                setAssignmentList(response);
            })
            .catch((error) => console.log(error));
    }, [currentPage]);

    useEffect(() => {
        setFilters({
            State: filters.State,
            AssignedDate: filterDate,
            KeyWord: filters.KeyWord,
            SortBy: filters.SortBy,
            SortType: filters.SortType
        });
    }, [filterDate]);

    const handleChangeSortPrams = (event, fieldName) => {
        setFilters({
            State: filters.State,
            AssignedDate: filters.AssignedDate,
            KeyWord: filters.KeyWord,
            SortBy: fieldName,
            SortType: !filters.SortType
        });

        const validFilter = {
            State:
            filters.State.includes("All") ||
            filters.State.length >= 2 ||
            filters.State.length === 0
            ? "All"
            : filters.State[0],
            AssignedDate:
            filters.AssignedDate == null
            ? null
            : GetDate(filters.AssignedDate),
            SearchWords: filters.KeyWord,
            SortBy: fieldName,
            SortType: !filters.SortType ? 'asc' : 'desc'
        };
        
        assignmentApi
            .GetAssignmentNumberAfterFilter(validFilter)
            .then((response) => {
                setItemsNumber(response);
            })
            .catch((error) => console.log(error));

        assignmentApi
            .GetAssignmentsByFilters(validFilter, 1, itemsPerPage)
            .then((response) => {
                setAssignmentList(response);
                setCurrentPage(1);
            })
            .catch((error) => console.log(error));

    }

    const handleChangeStateFilters = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setFilters({
                State: [...filters.State, value],
                AssignedDate: filters.AssignedDate,
                KeyWord: filters.KeyWord,
                SortBy: filters.SortBy,
                SortType: filters.SortType
            });
        } else {
            setFilters({
                State: filters.State.filter((element) => element !== value),
                AssignedDate: filterDate,
                KeyWord: filters.KeyWord,
                SortBy: filters.SortBy,
                SortType: filters.SortType
            });
        }
    };

    const handleChangeSearchWord = (e) => {
        const value = e.target.value;
        setFilters({
            State: filters.State,
            AssignedDate: filters.AssignedDate,
            KeyWord: value,
            SortBy: filters.SortBy,
            SortType: filters.SortType
        });
    };

    const handleSubmitFilters = () => {
        const validFilter = {
            State:
            filters.State.includes("All") ||
            filters.State.length >= 2 ||
            filters.State.length === 0
            ? "All"
            : filters.State[0],
            AssignedDate:
            filters.AssignedDate == null
            ? null
            : GetDate(filters.AssignedDate),
            SearchWords: filters.KeyWord,
            SortBy: filters.SortBy,
            SortType: filters.SortType ? 'asc' : 'desc'
        };
        
        assignmentApi
            .GetAssignmentNumberAfterFilter(validFilter)
            .then((response) => {
                setItemsNumber(response);
            })
            .catch((error) => console.log(error));

        assignmentApi
            .GetAssignmentsByFilters(validFilter, 1, itemsPerPage)
            .then((response) => {
                setAssignmentList(response);
                setCurrentPage(1);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <div style={{ marginTop: "150px", fontSize: "2px" }}>
                <div className="row">
                    <h4 className="page-title">Assignment</h4>
                    <div className="col-sm-3 text-start">
                        <Dropdown as={ButtonGroup} align="start" size="sm">
                            <Dropdown.Toggle
                                variant="outline-dark"
                                style={{
                                    minWidth: "150px",
                                    maxWidth: "200px",
                                    width: "100%",
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
                                style={{ maxWidth: "40px" }}
                                onClick={() => handleSubmitFilters()}
                            >
                                <i className="bi bi-funnel-fill"></i>
                            </button>
                            <Dropdown.Menu
                                style={{
                                    minWidth: "130px",
                                    maxWidth: "250px",
                                    padding: "10px",
                                }}
                            >
                                <Form.Check
                                    type="checkbox"
                                    id="All"
                                    label="All"
                                    value="All"
                                    onChange={handleChangeStateFilters}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="Admin"
                                    label="Accepted"
                                    value="Accepted"
                                    onChange={handleChangeStateFilters}
                                />
                                <Form.Check
                                    type="checkbox"
                                    id="Staff"
                                    label="Waiting for acceptance"
                                    value="WaitingForAcceptance"
                                    onChange={handleChangeStateFilters}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="col-sm-3 text-start">
                        <InputGroup
                            size="sm"
                            className="mb-3"
                            style={{
                                height: "35px",
                                maxWidth: "250px",
                                minWidth: "150px",
                            }}
                        >
                            <DatePicker
                                selected={filterDate}
                                autoComplete="on"
                                dateFormat="dd/MM/yyyy"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="Assigned Date"
                                onChange={(date) => setFilterDate(date)}
                                className="form-control"
                            ></DatePicker>
                            <span
                                className="input-group-text btn btn-outline-secondary"
                                style={{
                                    position: "absolute",
                                    right: "0px",
                                    height: "100%",
                                }}
                                onClick={handleSubmitFilters}
                            >
                                <BsFillCalendarDateFill />
                            </span>
                        </InputGroup>
                    </div>
                    <div className="col-sm-3 text-end d-flex justify-content-end">
                        <div
                            className="input-group mb-3 input-group-sm"
                            style={{ height: "30px", maxWidth: "250px" }}
                        >
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                name="search"
                                value={filters.KeyWord}
                                onChange={(e) => handleChangeSearchWord(e)}
                            ></input>
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleSubmitFilters}
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="col-sm-3 text-end">
                        <button className="btn btn-danger btn-sm">
                            Create new assignment
                        </button>
                    </div>
                </div>
                <div className="row">
                    <Table>
                        <thead>
                            <tr>
                                <th className="cursor-pointer" value="No">
                                    <div onClick={(e) => handleChangeSortPrams(e, "No")}>
                                        No.
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    value="Asset Code"
                                >
                                    <div onClick={(e) => handleChangeSortPrams(e, "AssetCode")} >
                                        Asset Code
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    value="Asset Name"
                                >
                                    <div onClick={(e) => handleChangeSortPrams(e, "AssetName")}>
                                        Asset Name
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    value="Assigned to"
                                >
                                    <div onClick={(e) => handleChangeSortPrams(e, "AssignedTo")}>
                                        Assigned to
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    value="Assigned by"
                                >
                                    <div onClick={(e) => handleChangeSortPrams(e, "AssignedBy")}>
                                        Assigned by
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    value="Assigned Date"
                                >
                                    <div onClick={(e) => handleChangeSortPrams(e, "AssignedDate")}>
                                        Assigned Date
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th className="cursor-pointer" value="State">
                                    <div onClick={(e) => handleChangeSortPrams(e, "State")}>
                                        State
                                        <i className="bi bi-caret-down-fill ms-1"></i>
                                    </div>
                                </th>
                                <th
                                    className="cursor-pointer"
                                    value="Action"
                                ></th>
                            </tr>
                        </thead>

                        <tbody>
                            {assignmentList?.length === 0 ? (
                                <tr className="d-block my-2">
                                    <td>There are no assignment to display</td>
                                </tr>
                            ) : (
                                assignmentList.map((row, index) => (
                                    <AssignmentRow
                                        key={index}
                                        assignment={row}
                                        index={index}
                                        currentPage={currentPage}
                                        pageSize={itemsPerPage}
                                    />
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
                <div className="row">
                    <PaginationComponent
                        itemsCount={itemsNumber}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        alwaysShown={true}
                    />
                </div>
            </div>
        </div>
    );
}
