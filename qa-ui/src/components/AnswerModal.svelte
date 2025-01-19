<script>
    import { userUuid } from "../stores/stores.js";

    export let question_id;
    export let toggleModal;
    export let handleError;

    let answerInput='';


    const submitAnswer = async () =>{
      let data = {
        user_uuid: $userUuid,
        content: answerInput,
        question_id: question_id,
      }
      
      const response = await fetch("/api/answers", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 403) {
        const jsonResponse = await response.json();
        handleError(jsonResponse.error)
      }
      toggleModal();
   }
</script>

<div id="give-answer" class="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50" on:click={toggleModal}>
    <div class="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full" on:click|stopPropagation>
      <h2 class="text-2xl font-semibold mb-4">Give an Answer</h2>
      <form on:submit|preventDefault={submitAnswer}>
        <label for="question-body" class="block text-sm font-medium text-gray-700 mt-4">Answer</label>
        <textarea bind:value={answerInput} id="question-body" rows="4" class="mt-1 w-full p-3 border border-gray-300 rounded-lg" placeholder="Give your answer for question" required></textarea>
        <button  class="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300 w-full">Submit Answer</button>
      </form>
    </div>
</div>