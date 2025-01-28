import http from "k6/http";

// Function to generate a random string
function randomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const options = {
  duration: "10s",
  vus: 10,
  summaryTrendStats: ["avg", "p(99)"],
}; 

export default function () {
  http.post("http://localhost:7800/api/answers", JSON.stringify({
    user_uuid: randomString(12),
    content:"Random Answer",
    question_id:"1"
  }));
}