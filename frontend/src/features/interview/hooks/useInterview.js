import {getAllInterviewReports, getInterviewReportById, generateInterviewReport} from "../services/interview.api.js";
import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";


export const useInterview = () => {
    const context = useContext(InterviewContext);

    if(!context){
        throw new Error("Necessary interview context was not provided")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context;

    const generateReport = async({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true);
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription, resumeFile});
            setReport(response.interviewReport);
            return response.interviewReport;
        }catch(err){
            console.log("error is :", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const generateReportById = async(interviewId) => {
        setLoading(true);
        try{
            const response = await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        }catch(err){
            console.log("error is :", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const fetchAllReports = async() => {
        setLoading(true);
        try{
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
            return response.interviewReports;
        }catch(err){
            console.log("error is :", err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {loading,report,reports,generateReport,generateReportById,fetchAllReports,setReport,setReports};
}