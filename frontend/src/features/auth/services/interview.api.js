import apiClient from "../../../services/apiClient.js";

export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    try {
        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        formData.append("resumeFile", resumeFile);

        const response = await apiClient.post("/api/interview/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getInterviewReportById = async (interviewId) => {
    try {
        const response = await apiClient.get(`/api/interview/report/${interviewId}`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getAllInterviewReports = async () => {
    try {
        const response = await apiClient.get("/api/interview/");
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
