import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["avg", "p(99)"],
};

export default function () {
  http.get("http://localhost:7800/questions/1?question_content=What%20is%20normalization?");
}