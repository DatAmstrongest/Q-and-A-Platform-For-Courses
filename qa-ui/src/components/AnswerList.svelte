<script>
    import AnswerCard from "./AnswerCard.svelte"
    import AnswerModal from "./AnswerModal.svelte"
    import { onMount } from "svelte";
  
    import { userUuid } from "../stores/stores.js";
    
    export let question_id;
  
    let answers = [];
    let showModal = false;
  
    let page = 1;
    let container;
    let isLoading;
    let hasMore;
    
    const getAnswers = async () => {
  
      isLoading = true;
      const res = await fetch('/api/questions/'+question_id+'/answers?user_uuid='+$userUuid+'&page='+page.toString());
      const answersData = await res.json();
      hasMore = (answersData.length - answers.length) >= 20;
      answers = [...answersData];
      console.log(answers);
      isLoading = false;
      return answers;
    };
  
    const toggleModal = async () =>{
      showModal = !showModal;
    }
  
  
    async function handleScroll(event) {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (!isLoading && hasMore && scrollTop + viewportHeight >= documentHeight ) {
        page += 1;
        getAnswers();
      }
    }
  
    onMount(() => {
      getAnswers();
      const eventSource = new EventSource(`/api/questions/${question_id}/answers/sse`);
  
      eventSource.onmessage = (event) => {
        try {
          const newAnswer = JSON.parse(event.data);
          answers = [newAnswer, ...answers];
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
  
      <!-- Button to Give New Answer -->
      <div class="flex justify-between items-center mb-6">
        <a href="/" class="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition-all duration-300">&larr; Back to Question List</a>
        <button on:click={toggleModal} data-modal-target="AnswerModal" data-modal-toggle="AnswerModal" class="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-300">Ask a New Question</button>
    
      </div>
  
      <!-- Answer List -->
      <section class="space-y-6">
          <div class="grid grid-cols-1 gap-4 mt-12 mb-24">
            {#each answers as answer}
              <AnswerCard answer={answer.content} upvotes={answer.total_votes} isLiked={answer.user_liked} answerId={answer.id}> </AnswerCard>
            {/each}
          </div>
      </section>
      {#if showModal}
        <AnswerModal toggleModal={toggleModal} question_id={question_id}></AnswerModal>
      {/if}
    </main>