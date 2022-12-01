import axiosClient from "./axiosClient";

const assignmentApi = {
    getAll: (params) => {
        const url = '/Assignments/GetAssignmentsHomePage';
        return axiosClient.get(url, { params });
    },
    getAssignmentDetail: (id) => {
        const url = `/Assignments/${id}`;
        return axiosClient.get(url);
    },
    AcceptAssignment: (id) => {
        const url = `/Assignments/AcceptAssignment/${id}`;
        return axiosClient.get(url);
    },
    DeclineAssignment: (id) => {
        const url = `/Assignments/DeclineAssignment/${id}`;
    },
    
    getByPage: (pageNumber, pageSize) => {
        const url = `/Assignments/GetAssignmentsByPage?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return axiosClient.get(url);
    },

    GetAssignmentNumber: () => {
        const url = "/Assignments/GetAssignmentNumber";
        return axiosClient.get(url);
    },

    GetAssignmentNumberAfterFilter: (filters) => {
        const url = "/Assignments/GetAssignmentNumberAfterFilter";
        return axiosClient.post(url,  filters);
    },

    GetAssignmentsByFilters: (filters, pageNumber, pageSize) => {
        const url = `/Assignments/GetAssignmentsByFilters?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return axiosClient.post(url, filters);
    }
    // edit, remove, ...
};
export default assignmentApi;
