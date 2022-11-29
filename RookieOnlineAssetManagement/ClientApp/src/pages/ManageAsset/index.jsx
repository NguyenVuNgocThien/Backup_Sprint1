import React, {  useEffect, useState } from "react";
import { Form, Dropdown, Table, ButtonGroup } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { fetchAssets} from "./AssetSlice";
export default function ManageAssignment() {
    const dispatch = useDispatch();
    const [allState, setAllState] = useState(false);
    const [assigned, setAssigned] = useState(true);
    const [available, setAvailable] = useState(true);
    const [notAvailable, setNotAvailable] = useState(true);
    const [waitingForRecycling, setWaitingForRecycling] = useState(false);
    const [recycled, setRecycled] = useState(false);
    const [allCategory, setAllCategory] = useState(true)
    const [bluetooth, setBluetooth] = useState(false)
    const [headset, setHeadset] = useState(false)
    const [ipad, setIpad] = useState(false)
    const [iphone, setIphone] = useState(false)
    const [laptop, setLaptop] = useState(false)
    const [mobile, setMobile] = useState(false)
    const [monitor, setMonitor] = useState(false)
    const [computer, setComputer] = useState(false)
    const [tablet, setTablet] = useState(false)
    const [searchString, setSearchString] = useState('');
    const list = useSelector(state => state.asset.assets)
    const [assetList, setAssetList] = useState(list)
    let strState = ""
    let strCategory=""
    const [strFilterByState, setStrFilterByState] = useState('');
    const [strFilterByCategory, setStrFilterByCategory] = useState('');
    const param = {
        filterByState:"Assigned Available NotAvailable", filterByCategory:"All", searchString:"null", sort:"null", sortBy:"null"
    }
    useEffect(() => {
        dispatch(fetchAssets(param))
    }, [dispatch])
    useEffect(() => {
        setAssetList(list)
    },[list])
    const handleCheckbox = (event) => {
        if (event.target.value === "All") {
            setAllState(event.target.checked);
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
        if (event.target.value === "All Category") {
            setAllCategory(event.target.checked);
        }
        if (event.target.value === "Bluetooth Mouse") {
            setBluetooth(event.target.checked);
        }
        if (event.target.value === "Headset") {
            setHeadset(event.target.checked);
        }
        if (event.target.value === "Ipad") {
            setIpad(event.target.checked);
        }
        if (event.target.value === "Iphone") {
            setIphone(event.target.checked);
        }
        if (event.target.value === "Laptop") {
            setLaptop(event.target.checked);
        }
        if (event.target.value === "Mobile") {
            setMobile(event.target.checked);
        }
        if (event.target.value === "Monitor") {
            setMonitor(event.target.checked);
        }
        if (event.target.value === "Personal Computer") {
            setComputer(event.target.checked);
        }
        if (event.target.value === "Tablet") {
            setTablet(event.target.checked);
        }
    };
    const handleFilter = () => {
            if (allState === true)
                strState += "All "
            if (assigned === true)
                strState += "Assigned "
            if (available === true)
                strState += "Available "
            if (notAvailable === true)
                strState += "NotAvailable "
            if (waitingForRecycling === true)
                strState += "WaitingForRecycling "
            if (recycled === true)
                strState += "Recycle "

            if (allCategory === true)
                strCategory += "All "
            if (bluetooth === true)
                strCategory += "BluetoothMouse "
            if (headset === true)
                strCategory += "Headset "
            if (ipad === true)
                strCategory += "Ipad "
            if (iphone === true)
                strCategory += "Iphone "
            if (laptop === true)
                strCategory += "Laptop "
            if (mobile === true)
                strCategory += "Mobile "
            if (monitor === true)
                strCategory += "Monitor "
            if (computer === true)
                strCategory += "PersonalComputer "
            if (tablet === true)
                strCategory += "Tablet "
            setStrFilterByState(strState)
            setStrFilterByCategory(strCategory)
            param.filterByState = strState;
            param.filterByCategory=strCategory;
            dispatch(fetchAssets(param))
            setAssetList(list)
    };
    const handleSearchAsset = () => {
        const search = searchString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        if (search !== "") {
            param.searchString = search
        }
        else {
            param.searchString = "Not Found The Asset You Are Searching"
        }
        if (strFilterByState !== "") {
            param.filterByState = strFilterByState;
        }
        dispatch(fetchAssets(param))
        setAssetList(list)
    }
    return <div>
        <div style={{ marginTop: "150px" }}>
            <div className="row">
                <h4 className="page-title">Asset list</h4>
                <div className="col-sm-3 text-start" >
                    <Dropdown as={ButtonGroup} align="end" size="sm">
                        <Dropdown.Toggle
                            variant="outline-dark"
                            style={{
                                width: "160px",
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
                                padding: "10px",
                                marginRight: "-40px"
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                id="All"
                                label="All"
                                value="All"
                                checked={allState}
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
                <div className="col-sm-3 text-start" >
                    <Dropdown as={ButtonGroup} align="end" size="sm">
                        <Dropdown.Toggle
                            variant="outline-dark"
                            style={{
                                width: "160px",
                                textAlign: "left",
                                paddingLeft: "10px",
                            }}
                        >
                            Category
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
                                padding: "10px",
                                marginRight: "-40px"
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                id="All Category"
                                label="All"
                                value="All Category"
                                checked={allCategory}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Bluetooth Mouse"
                                label="Bluetooth Mouse"
                                value="Bluetooth Mouse"
                                checked={bluetooth}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Headset"
                                label="Headset"
                                value="Headset"
                                checked={headset}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Ipad"
                                label="Ipad"
                                value="Ipad"
                                checked={ipad}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Iphone"
                                label="Iphone"
                                value="Iphone"
                                checked={iphone}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Laptop"
                                label="Laptop"
                                value="Laptop"
                                checked={laptop}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Mobile"
                                label="Mobile"
                                value="Mobile"
                                checked={mobile}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Monitor"
                                label="Monitor"
                                value="Monitor"
                                checked={monitor}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Personal Computer"
                                label="Personal Computer"
                                value="Personal Computer"
                                checked={computer}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Tablet"
                                label="Tablet"
                                value="Tablet"
                                checked={tablet}
                                onChange={handleCheckbox}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-sm-3 d-flex">
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
                            onClick={handleSearchAsset}
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
            {list.length === 0 ? <h5>No results were found to match your search</h5> :
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
                        {assetList
                            //.slice(indexOfFirstCourse, indexOfLastCourse)
                            .map((asset, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{asset.assetCode}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.category}</td>
                                        <td>{asset.assetState}</td>
                                        <td className="border-0 text-end">
                                            <i
                                                className="bi bi-pencil-fill pe-3"
                                                style={{ color: "grey" }}
                                            ></i>
                                            <i
                                                className="bi bi-x-circle"
                                                style={{ color: "red" }}
                                            ></i>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            }
        </div>
    </div>
}