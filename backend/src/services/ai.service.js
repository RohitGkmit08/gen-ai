const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod");
const ai =  new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
})

async function invokeAI() {
    try {
        const res = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: "hello gemeni. What is interview ? "
        })
        console.log("AI Response:", res.text)
    } catch (err) {
        console.error("AI Error:", err.message || err)
    }
}   

const interviewReportSchema = z.object({
    matchScore: z.number()
        .min(0)
        .max(100)
        .describe(
            "Overall percentage match between the candidate profile and the job description. Must be a number between 0 and 100."
        ),

    strengths: z.array(
        z.string().describe("A strength of the candidate that aligns with the job requirements."))
        .describe("List of candidate strengths relevant to the target role."),

    technicalQuestions: z.array(
        z.object({
            question: z.string().describe("Technical interview question tailored to the candidate profile and job role."),
            intention: z.string().describe("What the interviewer is trying to evaluate by asking this question."),
            answer: z.string().describe("Guidance on how the candidate should answer the question, including topics and examples to mention.")
        })
    ).describe(
        "Technical interview questions along with their purpose and answer guidance."
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string().describe("Behavioral interview question tailored to the candidate profile and job role."),
            intention: z.string().describe("The behavior, skill, or trait the interviewer wants to evaluate."),

            answer: z.string().describe("Recommended answer strategy, preferably using the STAR method.")})
    ).describe(
        "Behavioral interview questions with their purpose and answering strategy."
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string().describe("A skill or technology that the candidate lacks or needs stronger knowledge in for this role."),

            severity: z.enum(["low","medium","high"]).describe(
                "How important this missing skill is for succeeding in the role."
            )
        })
    ).describe(
        "Skills missing from the candidate profile when compared to the job description."
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number().describe("Day number in the preparation schedule."),
            focus: z.string().describe("Primary topic or area to study on this day."),

            tasks: z.array(
                z.string().describe("A specific task or activity to complete.")
            ).describe(
                "List of tasks for the day."
            )
        })
    ).describe(
        "A personalized day-by-day preparation plan to improve interview readiness."
    )
});

async function generateInterviewReport ({resume, selfDescription, jobDescription}) {

    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${resume},
        Self Description: ${selfDescription},
        Job Description: ${jobDescription}
    `
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: interviewReportSchema.toJSONSchema()
        }
    })

    console.log(JSON.stringify(JSON.parse(response.text), null, 2))
}
module.exports = {invokeAI, generateInterviewReport}