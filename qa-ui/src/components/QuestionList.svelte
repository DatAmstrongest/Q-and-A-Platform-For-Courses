<script>
  import QuestionCard from "./QuestionCard.svelte"
  import AskQuestionModal from "./AskQuestionModal.svelte"
  import { userUuid } from "../stores/stores.js";
  
  export let course_id;

  let questions = [];
  let showModal = false;
  let questionInput='';
  
  const getQuestions = async () => {
    const res = await fetch('/api/courses/'+course_id+'/questions?user_uuid='+$userUuid);
    const questionsData = await res.json();
    questions = questionsData;
    return questions;
  };

  const toggleModal = async () =>{
    showModal = !showModal;
  }

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
  const questionsPromise = getQuestions();
</script>

  <!-- Main Content -->
  <main class="my-8 px-4">

    <!-- Button to Ask New Question -->
    <div class="flex justify-between items-center mb-6">
      <button on:click={toggleModal} data-modal-target="askQuestionModal" data-modal-toggle="askQuestionModal" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300">Ask a New Question</button>
      <a href="/" class="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300">Back to Course List</a>
    </div>

    <!-- Question List -->
    <section class="space-y-6">
      {#await questionsPromise}
      {:then questions}
        {#each questions as question}
          <QuestionCard question={question.content} upvotes={question.total_votes} isLiked={question.user_liked} questionId={question.id}> </QuestionCard>
        {/each}
      {/await}
    </section>
    {#if showModal}
      <AskQuestionModal toggleModal={toggleModal} course_id={course_id}></AskQuestionModal>
    {/if}
  </main>