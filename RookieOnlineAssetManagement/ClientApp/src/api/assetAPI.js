import axiosClient from "./axiosClient";

const assetApi = {
    getListAsset: (filterByState, filterByCategory, searchString, sort, sortBy) => {
        const url = `/Assets/${filterByState}/${filterByCategory}/${searchString}/${sort}/${sortBy}`;
        return axiosClient.get(url);
    },

    // edit, remove, ...
}
export default assetApi;