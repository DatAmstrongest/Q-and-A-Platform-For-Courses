<script>
  import QuestionCard from "./QuestionCard.svelte"
  import { onMount } from "svelte";
  
  export let course_id;

  let events = [];
  let eventSource;

  onMount(() => {
    eventSource = new EventSource("/api/courses/"+course_id+"/questions");
    eventSource.onmessage = (event) => {
      events = [...events, event.data];
      console.log("h")
      console.log(events);
    };

    eventSource.onerror = (event) => {
      console.log(event);
    };

    return () => {
      if (eventSource.readyState === 1) {
        eventSource.close();
      }
    };
  });
    
</script>




  <!-- Main Content -->
  <main class="my-8 px-4">

    <!-- Button to Ask New Question -->
    <div class="flex justify-between items-center mb-6">
      <a href="#ask-question" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300">Ask a New Question</a>
      <a href={`/`}  class="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300">Back to Course List</a>
    </div>

    <!-- Question List -->
    <section class="space-y-6">
      <QuestionCard question="asdfasfsda" upvotes=5 isLiked=false></QuestionCard>


      <!-- Question 2 -->
      <div class="bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
        <h3 class="text-xl font-semibold mb-2">How do loops work in Python?</h3>
        <p class="text-sm mb-4 text-gray-600">Posted by: User2 | Last updated: 1 day ago</p>
        <a href="#question2" class="text-indigo-600 hover:underline">View Answers</a>
      </div>

      <!-- Question 3 -->
      <div class="bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
        <h3 class="text-xl font-semibold mb-2">What are functions and how do I define them?</h3>
        <p class="text-sm mb-4 text-gray-600">Posted by: User3 | Last updated: 3 days ago</p>
        <a href="#question3" class="text-indigo-600 hover:underline">View Answers</a>
      </div>
    </section>
  </main>

  <!-- Ask New Question Modal -->
  <div id="ask-question" class="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 hidden">
    <div class="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
      <h2 class="text-2xl font-semibold mb-4">Ask a New Question</h2>
      <form>
        <label for="question-title" class="block text-sm font-medium text-gray-700">Question Title</label>
        <input type="text" id="question-title" class="mt-1 w-full p-3 border border-gray-300 rounded-lg" placeholder="Enter your question title" required>

        <label for="question-body" class="block text-sm font-medium text-gray-700 mt-4">Question Details</label>
        <textarea id="question-body" rows="4" class="mt-1 w-full p-3 border border-gray-300 rounded-lg" placeholder="Describe your question in detail" required></textarea>

        <button type="submit" class="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 w-full">Submit Question</button>
      </form>
    </div>
  </div>

