import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["avg", "p(99)"],
};

export default function () {
  http.post("http://localhost:7800/api/quesitons", JSON.stringify({
    user_uuid:"1111",
    content:"Random Question",
    course_id:"1"
  }));
}