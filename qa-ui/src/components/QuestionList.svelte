<script>
  import QuestionCard from "./QuestionCard.svelte"
  import { userUuid } from "../stores/stores.js";

  import { onMount } from "svelte";
  
  export let course_id;

  let questions = [];
  
  const getQuestions = async () => {
    const res = await fetch('/api/courses/'+course_id+'/questions?user_id='+$userUuid);
    const questionsData = await res.json();
    console.log(questionsData);
    questions = questionsData;
    return questions;
  };

  const questionsPromise = getQuestions();


    
</script>




  <!-- Main Content -->
  <main class="my-8 px-4">

    <!-- Button to Ask New Question -->
    <div class="flex justify-between items-center mb-6">
      <button data-modal-target="askQuestionModal" data-modal-toggle="askQuestionModal" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300">Ask a New Question</button>
      <a href="/" class="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300">Back to Course List</a>
    </div>

    <!-- Question List -->
    <section class="space-y-6">
      {#await questionsPromise}
      {:then questions}
        {#each questions as question}
          <QuestionCard question={question.content} upvotes={question.total_votes} isLiked={question.user_liked}> </QuestionCard>
        {/each}
      {/await}
    </section>
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
  </main>

  

