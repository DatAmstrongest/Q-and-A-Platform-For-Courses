<script>
    import { userUuid } from "../stores/stores.js";

    export let course_id;
    export let toggleModal;

    let questionInput='';


    const submitQuestion = async () =>{
    let data = {
      user_uuid: $userUuid,
      content: questionInput,
      course_id: course_id,
    }

    await fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
</script>

<div id="ask-question" class="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50" on:click={toggleModal}>
    <div class="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full" on:click|stopPropagation>
      <h2 class="text-2xl font-semibold mb-4">Ask a New Question</h2>
      <form>
        <label for="question-body" class="block text-sm font-medium text-gray-700 mt-4">Question</label>
        <textarea bind:value={questionInput} id="question-body" rows="4" class="mt-1 w-full p-3 border border-gray-300 rounded-lg" placeholder="Describe your question in detail" required></textarea>
        <button on:click={submitQuestion}  class="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 w-full">Submit Question</button>
      </form>
    </div>
</div>