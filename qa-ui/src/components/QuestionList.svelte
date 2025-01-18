<script>
  import QuestionCard from "./QuestionCard.svelte"
  import QuestionModal from "./QuestionModal.svelte"
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
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (!isLoading && hasMore && (scrollTop + viewportHeight) >= documentHeight) {
      page += 1;
      getQuestions();
    }
  }

  onMount(() => {
    getQuestions();
    const eventSource = new EventSource(`/api/courses/${course_id}/questions/sse`);

    eventSource.onmessage = (event) => {
      try {
        const newQuestion = JSON.parse(event.data);
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
  <main class="my-8 px-8" bind:this={container}>

    <!-- Button to Ask New Question -->
    <div class="flex justify-between items-center mb-6">
      <a href="/" class="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300">&larr; Back to Course List</a>
      <button on:click={toggleModal} data-modal-target="QuestionModal" data-modal-toggle="QuestionModal" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300">Ask a New Question</button>
  
    </div>

    <!-- Question List -->
    <section class="space-y-6">
        <div class="grid grid-cols-4 gap-4 mt-12 mb-24">
          {#each questions as question}
            <QuestionCard question={question.content} upvotes={question.total_votes} isLiked={question.user_liked} questionId={question.id}> </QuestionCard>
          {/each}
        </div>
    </section>
    {#if showModal}
      <QuestionModal toggleModal={toggleModal} course_id={course_id}></QuestionModal>
    {/if}
  </main>