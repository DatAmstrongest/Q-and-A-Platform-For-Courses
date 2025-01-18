<script>
  import QuestionCard from "./QuestionCard.svelte"
  import AskQuestionModal from "./AskQuestionModal.svelte"
  import { onMount } from "svelte";

  import { userUuid } from "../stores/stores.js";
  
  export let course_id;

  let questions = [];
  let showModal = false;

  let page = 1;
  let container;
  let isLoading;
  let hasMore;
  
  const getQuestions = async () => {

    isLoading = true;
    const res = await fetch('/api/courses/'+course_id+'/questions?user_uuid='+$userUuid+'&page='+page.toString());
    const questionsData = await res.json();
    hasMore = (questionsData.length - questions.length) >= 20;
    questions = [...questionsData];
    isLoading = false;
    return questions;
  };

  const toggleModal = async () =>{
    showModal = !showModal;
  }


  async function handleScroll(event) {
    if (!isLoading && hasMore && container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      page += 1;
      questionsPromise = getQuestions();
    }
  }

  onMount(() => {
    getQuestions();
    const eventSource = new EventSource(`/api/courses/${course_id}/sse`);

    eventSource.onmessage = (event) => {
      try {
        const newQuestion = JSON.parse(event.data);
        console.log(newQuestion);
        questions = [newQuestion, ...questions];
      } catch (error) {
        console.error("Failed to parse SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      // Optionally close the connection if needed
      eventSource.close();
    };

    // Optional: Cleanup when the component or page unloads
    window.addEventListener("beforeunload", () => {
      eventSource.close();
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);


  });

</script>

  <!-- Main Content -->
  <main class="my-8 px-4" bind:this={container}>

    <!-- Button to Ask New Question -->
    <div class="flex justify-between items-center mb-6">
      <button on:click={toggleModal} data-modal-target="askQuestionModal" data-modal-toggle="askQuestionModal" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300">Ask a New Question</button>
      <a href="/" class="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300">Back to Course List</a>
    </div>

    <!-- Question List -->
    <section class="space-y-6">
        <div class="grid grid-cols-4 gap-4">
          {#each questions as question}
            <QuestionCard question={question.content} upvotes={question.total_votes} isLiked={question.user_liked} questionId={question.id}> </QuestionCard>
          {/each}
        </div>
    </section>
    {#if showModal}
      <AskQuestionModal toggleModal={toggleModal} course_id={course_id}></AskQuestionModal>
    {/if}
  </main>