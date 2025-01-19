const { test, expect } = require("@playwright/test");

test("Submit question and answer, see dynamic updates", async ({ page }) => {
  const randomQuestion = `Random question ${10000 + Math.floor(Math.random() * 90000)}`;
  const randomAnswer = `Random answer ${10000 + Math.floor(Math.random() * 90000)}`;

  await page.goto("/");
  await page.locator("#course-card-1").click()

  //Submitting question and checking update
  await page.getByRole("button", { name: "Ask a New Question" }).click();
  await page.locator("#question-input").fill(randomQuestion);
  await page.getByRole("button", { name: "Submit Question" }).click();
  await expect(page.getByText(randomQuestion, { exact: true })).toBeVisible();

  //Submitting answer and checking update
  await page.getByText("View Answers").nth(0).click()
  await page.getByRole("button", { name: "Give an Answer" }).click();
  await page.locator("#answer-input").fill(randomAnswer);
  await page.getByRole("button", { name: "Submit Answer" }).click();
  await expect(page.getByText(randomAnswer, { exact: true })).toBeVisible();

});

test("Submit question, see three answers submitted by LLM", async ({ page }) => {
  const randomQuestion = `Random question ${10000 + Math.floor(Math.random() * 90000)}`;

  await page.goto("/");
  await page.locator("#course-card-1").click()

  //Submitting question and checking update
  await page.getByRole("button", { name: "Ask a New Question" }).click();
  await page.locator("#question-input").fill(randomQuestion);
  await page.getByRole("button", { name: "Submit Question" }).click();
  await expect(page.getByText(randomQuestion, { exact: true })).toBeVisible();

  //Submitting answer and checking update
  await page.getByText("View Answers").nth(0).click()
  await expect(page.locator(".answerCard")).toHaveCount(3, { timeout: 15000 });
});

test("Upvote a question and answer", async ({ page }) => {
  await page.goto("/");
  await page.locator("#course-card-1").click()
  
  //Upvote question
  await page.locator("#upvote-button").nth(0).click()
  await expect(page.getByText("1", { exact: true }).nth(0)).toBeVisible();

  //Upvote answer
  await page.getByText("View Answers").nth(0).click()
  await page.locator("#upvote-button").nth(0).click()
  await expect(page.getByText("1", { exact: true }).nth(0)).toBeVisible();
});

test("Order of questions changed when upvoted", async ({ page }) => {
  await page.goto("/");
  await page.locator("#course-card-1").click()
  
  //Upvote question
  let question_text = await page.locator('.question-content').nth(1).textContent();
  await page.locator("#upvote-button").nth(1).click()

  //Go back and come back
  await page.getByText("Back to Course List").click()
  await page.locator("#course-card-1").click()

  //Checking is latest upvoted first
  await expect(page.locator('.question-content').nth(0)).toHaveText(question_text);
})

test("Loading more questions when scroll down", async ({ page }) => {
  await page.goto("/");
  await page.locator("#course-card-1").click()
  
  await expect(page.locator(".questionCard")).toHaveCount(20);

  let previousHeight;
  while (true) {
    previousHeight = await page.evaluate(() => document.body.scrollHeight);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000); // Wait for loading
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) break; // Stop if no new content
  }

  let count = await page.locator(".questionCard").count()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // Check if the count is greater than 3
  expect(count).toBeGreaterThan(20);

})




