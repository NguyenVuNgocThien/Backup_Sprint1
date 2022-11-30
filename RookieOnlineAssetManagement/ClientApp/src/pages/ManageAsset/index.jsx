import React, {  useEffect, useState,useContext } from "react";
import { Form, Dropdown, Table, ButtonGroup } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { fetchAssets } from "./AssetSlice";
import api, { endpoint } from "../../api/api"
export default function ManageAssignment() {
    const dispatch = useDispatch();
    const [allState, setAllState] = useState(false);
    const [allCategory, setAllCategory] = useState(true);
    const [assigned, setAssigned] = useState(true);
    const [available, setAvailable] = useState(true);
    const [notAvailable, setNotAvailable] = useState(true);
    const [waitingForRecycling, setWaitingForRecycling] = useState(false);
    const [recycled, setRecycled] = useState(false);

    const [searchString, setSearchString] = useState('');
    const list = useSelector(state => state.asset.assets)
    const [assetList, setAssetList] = useState(list)
    const [categoryList, setCategoryList] = useState([])
    const [checkList, setCheckList] = useState([])
    const [sortBy, setSortBy] = useState("Descending");
    let strState = ""
    let strCategory = ""
    let state = ""
    let arr = []
    const [strFilterByState, setStrFilterByState] = useState("Assigned Available NotAvailable");
    const [strFilterByCategory, setStrFilterByCategory] = useState("All");
    const param = {
        strFilterByState: "Assigned Available NotAvailable", strFilterByCategory: "All", searchString: "null", sort: "null", sortBy: sortBy
    }
    useEffect(() => {
        dispatch(fetchAssets(param))
    }, [dispatch])
    useEffect(() => {
        setAssetList(list)
    }, [list])
    useEffect(() => {
        const loadCategories = async () => {
            let res = await api.get(endpoint['Categories'])
            try {
                setCategoryList(res.data)
            }
            catch (err) {
                console.error(err)
            }
            for (let i = 0; i < categoryList.length; i++) {
                arr.push(false)
            }
            setCheckList(arr)
        }
        loadCategories();
    }, [])
    const handleCheckbox = (event) => {
        if (event.target.value === "AllState") {
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
        if (event.target.value === "AllCategory") {
            setAllCategory(event.target.checked);
        }

        for (let i = 0; i < categoryList.length; i++) {
            if (event.target.value === categoryList[i].categoryName) {
                checkList[i] = event.target.checked
            }
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
        for (let i = 0; i < categoryList.length; i++) {
            if (checkList[i] == true) {
                strCategory = strCategory + categoryList[i].categoryName.replace(' ', '') + " "
            }
        }
        if (strState !== "" && strCategory !== "") {
            setStrFilterByCategory(strCategory)
            setStrFilterByState(strState)
            param.strFilterByState = strState;
            param.strFilterByCategory = strCategory;
            dispatch(fetchAssets(param))
            setAssetList(list)
        }
    };
    const handleSearchAsset = () => {
        const search = searchString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        if (search !== "") {
            param.searchString = search
        }
        else {
            param.searchString = "Not Found The Asset You Are Searching"
        }
        if (strFilterByState !== "" && strFilterByCategory !== "") {
            param.strFilterByState = strFilterByState;
            param.strFilterByCategory = strFilterByCategory;
        }
        dispatch(fetchAssets(param))
        setAssetList(list)
    }
    const handleSortByAssetCode = () => {
        const search = searchString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        if (search !== "") {
            param.searchString = search
        }
        if (strFilterByState !== "" && strFilterByCategory !== "") {
            param.strFilterByState = strFilterByState;
            param.strFilterByCategory = strFilterByCategory;
        }
        param.sort = "Asset Code"
        dispatch(fetchAssets(param))
        setAssetList(list)
        if (sortBy === "Descending") {
            setSortBy("Ascending")
        }
        else {
            setSortBy("Descending")
        }
    }
    const handleSortByAssetName = () => {
        const search = searchString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        if (search !== "") {
            param.searchString = search
        }
        if (strFilterByState !== "" && strFilterByCategory !== "") {
            param.strFilterByState = strFilterByState;
            param.strFilterByCategory = strFilterByCategory;
        }
        param.sort = "Asset Name"
        dispatch(fetchAssets(param))
        setAssetList(list)
        if (sortBy === "Descending") {
            setSortBy("Ascending")
        }
        else {
            setSortBy("Descending")
        }
    }
    const handleSortByCategory = () => {
        const search = searchString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        if (search !== "") {
            param.searchString = search
        }
        if (strFilterByState !== "" && strFilterByCategory !== "") {
            param.strFilterByState = strFilterByState;
            param.strFilterByCategory = strFilterByCategory;
        }
        param.sort = "Category"
        dispatch(fetchAssets(param))
        setAssetList(list)
        if (sortBy === "Descending") {
            setSortBy("Ascending")
        }
        else {
            setSortBy("Descending")
        }
    }
    const handleSortByState = () => {
        const search = searchString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
        if (search !== "") {
            param.searchString = search
        }
        if (strFilterByState !== "" && strFilterByCategory !== "") {
            param.strFilterByState = strFilterByState;
            param.strFilterByCategory = strFilterByCategory;
        }
        param.sort = "State"
        dispatch(fetchAssets(param))
        setAssetList(list)
        if (sortBy === "Descending") {
            setSortBy("Ascending")
        }
        else {
            setSortBy("Descending")
        }
    }
    const handleEditAsset = (asset) => {
        console.info(`this is Event to Edit ${asset.asset.assetCode}`)
    }
    const handleDelAsset = (asset) => {
        console.info(`this is Event to Del ${asset.asset.assetCode}`)
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
                                value="AllState"
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
                                id="All"
                                label="All"
                                value="AllCategory"
                                checked={allCategory}
                                onChange={handleCheckbox}
                            />
                            {categoryList.map((category, index) => {
                                return (
                                    <Form.Check
                                        key={index }
                                        type="checkbox"
                                        id={category.categoryName}
                                        label={category.categoryName}
                                        value={category.categoryName}
                                        checked={arr[index]}
                                        onChange={handleCheckbox}
                                    />
                                    )
                            }) }
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
                            <th className="cursor-pointer" value="Asset Code" onClick={handleSortByAssetCode}>
                                Asset Code<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="Asset Name" onClick={handleSortByAssetName}>
                                Asset Name<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="Category" onClick={handleSortByCategory}>
                                Category<i className="bi bi-caret-down-fill ms-1"></i>
                            </th>
                            <th className="cursor-pointer" value="State" onClick={handleSortByState}>
                                State<i className="bi bi-caret-down-fill ms-1" ></i>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {assetList
                            .map((asset, index) => {
                                if (asset.state === 1) {
                                    state="Assigned"
                                }
                                if (asset.state === 2) {
                                    state = "Available"
                                }
                                if (asset.state === 3) {
                                    state = "Not Available"
                                }
                                if (asset.state === 4) {
                                    state = "Waiting for recycling"
                                }
                                if (asset.state === 5) {
                                    state = "Recycled"
                                }
                                return (
                                    <tr key={index} >
                                        <td >{asset.assetCode}</td>
                                        <td >{asset.assetName}</td>
                                        <td >{asset.category}</td>
                                        <td >{state}</td>
                                        {asset.state===1?
                                            <td className="border-0 text-end" >
                                                <i
                                                    className="bi bi-pencil-fill pe-3"
                                                    style={{ color: "grey",opacity:"0.4"}}
                                                ></i>
                                                <i
                                                    className="bi bi-x-circle"
                                                    style={{ color: "red",opacity:"0.4" }}
                                                ></i>
                                            </td> :
                                            <td className="border-0 text-end">
                                                <i
                                                    className="bi bi-pencil-fill pe-3"
                                                    style={{ color: "grey" }}
                                                    onClick={() => handleEditAsset({asset})}
                                                ></i>
                                                <i
                                                    className="bi bi-x-circle"
                                                    style={{ color: "red" }}
                                                    onClick={() => handleDelAsset({asset})}
                                                ></i>
                                            </td>
                                        }
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            }
        </div>
    </div>
}