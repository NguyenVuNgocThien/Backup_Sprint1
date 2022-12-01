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
        return axiosClient.get(url);
    },

    // edit, remove, ...
}
export default assignmentApi;