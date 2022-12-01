import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { acceptAssignment, declineAssignment, fetchAssignmentDetail, fetchAssignments } from "pages/Home/HomeSlice";
import { MdDone } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { BsArrowCounterclockwise } from "react-icons/bs";
import ModalDetail from "./components/ModalDetail";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalConfirm from "./components/ModalConfirm";


export default function Home() {
    const dispatch = useDispatch();
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [assignmentId, setAssignmentId] = useState();

    let assignmentList = useSelector((state) => state.home.assignments);
    let page = useSelector((state) => state.home.page);
    let lastPage = useSelector((state) => state.home.lastPage);

    let feildNameSorting = useRef();
    let typeSorting = useRef();
    let pageSize = useRef(10);
    let isAccept =  useRef();


    useEffect(() => {
        // Initialized data on table
        try {
            const params = {
                feildName: null,
                sortType: null,
                page: 1,
                limit: pageSize.current,
            };
            dispatch(fetchAssignments(params));
        } catch (error) {
            console.log('Failed to fetch assignment list: ', error);
        }
    }, [])

    const fetchAssignmentList = async (fieldName, sortType, currentPage, limit) => {
        try {
            const params = {
                fieldName,
                sortType,
                page: currentPage,
                limit
            };
            dispatch(fetchAssignments(params));
        } catch (error) {
            console.log('Failed to fetch assignment list: ', error);
        }
    }

    const HandlePageClick = (data) => {
        let currentPage = data.selected + 1;
        fetchAssignmentList(feildNameSorting.current, typeSorting.current, currentPage, pageSize.current);
    }

    const HandleSortingClick = (event, fieldName) => {

        if (event.currentTarget.classList.contains('desc')) {
            // Sort ascending
            document.querySelectorAll('.sort-title').forEach(item => item.classList.remove('desc'))

            typeSorting.current = 'asc';
            feildNameSorting.current = fieldName;
            document.querySelectorAll('.sort-title').forEach(item => item.classList.add(typeSorting.current))

            fetchAssignmentList(feildNameSorting.current, typeSorting.current, page, pageSize.current);
        }
        else if (event.currentTarget.classList.contains('asc')) {
            // Sort descending
            document.querySelectorAll('.sort-title').forEach(item => item.classList.remove('asc'))

            typeSorting.current = 'desc';
            feildNameSorting.current = fieldName;
            document.querySelectorAll('.sort-title').forEach(item => item.classList.add(typeSorting.current))

            fetchAssignmentList(feildNameSorting.current, typeSorting.current, page, pageSize.current);
        }

        // Display icon
        document.querySelectorAll('.sort-title i').forEach(item => {
            if (typeSorting.current === 'asc') {
                item.classList.add("bi-caret-up-fill")
            }
            else {
                item.classList.remove("bi-caret-up-fill")
            }
        })
    }

    const HandleCloseModalDetail = (event) => {
        setShowModalDetail(false);
    }

    const HandleOpenModalConfirm = (assignmentId, isaccept) => {
        if (isaccept)
            isAccept.current = true;
        else
            isAccept.current = false;

        setAssignmentId(assignmentId)
        setShowModalConfirm(true);
    }

    const HandleCloseModalConfirm = (event) => {
        setShowModalConfirm(false);
    }

    const HandleWatchDetailAssignment = (assignmentId) => {
        dispatch(fetchAssignmentDetail(assignmentId));
        setShowModalDetail(true);
    }

    const HandleAcceptAssignment = () => {
        const data = {
            id: assignmentId,
            currentPage: page,
            pageSize: pageSize.current
        }
        dispatch(acceptAssignment(data));
        setShowModalConfirm(false); // Close modal
    }
    const HandleDeclineAssignment = () => {
        const data = {
            id: assignmentId,
            pageSize: pageSize.current
        }
        dispatch(declineAssignment(data));
        setShowModalConfirm(false); // Close modal

        // Reset paging
        let paglink = document.querySelectorAll('.page-item');
        paglink[1].firstChild.click();
    }

    function FormatDateTime(datetime) {
        if (datetime != null) {
            let date = `${datetime.split("T")[0].split("-")[2]}/${datetime.split("T")[0].split("-")[1]}/${datetime.split("T")[0].split("-")[0]}`;
            return date;
        }
        return "";
    }
    function CompactText(text) {
        var result = "";
        if (text != null) {
            if (text.length <= 15)
                return text;

            else {
                for (var i = 0; i < 15; i++) {
                    result = result.concat(text.split('')[i])
                }
                return result + "...";
            }
        }
        else
            return result;
    }
    function HandleDisplayAssignmentState(assignmentState) {
        if (assignmentState != null) {
            if (assignmentState === 1)
                return "Accepted";
            else if (assignmentState === 2)
                return "Waiting For Acceptance";
        }
        else 
            return "";
    }


    return (
        <div>
            <div className="page-title">My Assignment</div>
            <div className="table-responsive">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th className="cursor-pointer">
                                <div className="sort-title my-2 desc" onClick={(event) => HandleSortingClick(event, "assetCode")}>
                                    Asset Code
                                    <i className="bi bi-caret-down-fill ms-2"></i>
                                </div>
                                <hr
                                    className="m-0 me-3"
                                    style={{ borderTop: "2px solid #000" }}
                                />
                            </th>
                            <th className="cursor-pointer">
                                <div className="sort-title my-2 desc" onClick={(event) => HandleSortingClick(event, "assetName")}>
                                    Asset Name
                                    <i className="bi bi-caret-down-fill ms-2"></i>
                                </div>
                                <hr
                                    className="m-0 me-3"
                                    style={{ borderTop: "2px solid #000" }}
                                />
                            </th>
                            <th className="cursor-pointer">
                                <div className="sort-title my-2 desc" onClick={(event) => HandleSortingClick(event, "category")}>
                                    Category
                                    <i className="bi bi-caret-down-fill ms-2"></i>
                                </div>
                                <hr
                                    className="m-0 me-3 d-block"
                                    style={{ borderTop: "2px solid #000" }}
                                />
                            </th>
                            <th className="cursor-pointer">
                                <div className="sort-title my-2 desc" onClick={(event) => HandleSortingClick(event, "assignedDate")}>
                                    Assigned Date
                                    <i className="bi bi-caret-down-fill ms-2"></i>
                                </div>
                                <hr
                                    className="m-0 me-3 d-block"
                                    style={{ borderTop: "2px solid #000" }}
                                />
                            </th>
                            <th className="cursor-pointer">
                                <div className="sort-title my-2 desc" onClick={(event) => HandleSortingClick(event, "state")}>
                                    State
                                    <i className="bi bi-caret-down-fill ms-2"></i>
                                </div>
                                <hr
                                    className="m-0 me-3 d-block"
                                    style={{ borderTop: "2px solid #000" }}
                                />
                            </th>
                            <th style={{ border: "0px" }}></th>
                        </tr>


                    </thead>
                    <tbody>
                        {
                            assignmentList?.length === 0
                                ? (<tr className="d-block my-2"><td>There are no assignment to display</td></tr>)
                                : assignmentList?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-0" onClick={() => HandleWatchDetailAssignment(item.assignmentId)}>
                                                <div className="my-2 ms-2">
                                                    {item.assetCode}
                                                </div>
                                                <hr className="m-0 me-3" />
                                            </td>
                                            <td className="p-0" onClick={() => HandleWatchDetailAssignment(item.assignmentId)}>
                                                <div className="my-2 ms-2">
                                                    <OverlayTrigger
                                                        key={'bottom'}
                                                        placement={'bottom'}
                                                        overlay={
                                                            <Tooltip>
                                                                {item.assetName}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <p className="m-0">{CompactText(item.assetName)}</p>
                                                    </OverlayTrigger>

                                                </div>
                                                <hr className="m-0 me-3" />
                                            </td>
                                            <td className="p-0" onClick={() => HandleWatchDetailAssignment(item.assignmentId)}>
                                                <div className="my-2 ms-2">
                                                    {item.category}
                                                </div>
                                                <hr className="m-0 me-3" />
                                            </td>
                                            <td className="p-0" onClick={() => HandleWatchDetailAssignment(item.assignmentId)}>
                                                <div className="my-2 ms-2">
                                                    {FormatDateTime(item.assignedDate)}
                                                </div>
                                                <hr className="m-0 me-3" />
                                            </td>
                                            <td className="p-0" onClick={() => HandleWatchDetailAssignment(item.assignmentId)}>
                                                <div className="my-2 ms-2">
                                                    {HandleDisplayAssignmentState(item.state)}
                                                </div>
                                                <hr className="m-0 me-3" />
                                            </td>
                                            <td className="p-0 px-3 mx-5">
                                                <button className="btn p-0 border-0">
                                                    <MdDone
                                                        className={`fs-5 text-danger fw-bold ${item.state === 1 ? 'icon-disabled' : ''}`}
                                                        onClick={() => HandleOpenModalConfirm(item.assignmentId, true)}
                                                    />
                                                </button>
                                                <button className="btn p-0 border-0">
                                                    <IoCloseSharp
                                                        className={`fs-5 fw-bold mx-1 ${item.state === 1 ? 'icon-disabled' : ''}`}
                                                        onClick={() => HandleOpenModalConfirm(item.assignmentId, false)}
                                                    />
                                                </button>
                                                <button className="btn p-0 border-0 align-items-end">
                                                    <BsArrowCounterclockwise
                                                        className="fs-5 text-primary fw-bold"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>



            <ReactPaginate
                previousLabel={'Previous'}
                breakLabel={'...'}
                nextLabelLabel={'Next'}
                pageCount={lastPage}
                marginPagesDisplayed={3}
                pageRangeDisplayed={6}
                onPageChange={HandlePageClick}
                containerClassName={'pagination justify-content-end'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={`page-item ${lastPage === 0 ? 'disabled' : ''}`}
                nextLinkClassName={'page-link'}
                breakClassName={'page-link'}
                activeClassName={'active'}
            />

            <ModalDetail
                isShow={showModalDetail}
                OnclickCloseModalDetail={HandleCloseModalDetail}
                assignmentId={assignmentId}
            />

            <ModalConfirm
                isShow={showModalConfirm}
                OnclickCloseModalDetail={HandleCloseModalConfirm}
                OnclickHandleAccept={HandleAcceptAssignment}
                OnclickHandleDecline={HandleDeclineAssignment}
                IsAccept={isAccept.current}
            />
        </div>
    );
}
