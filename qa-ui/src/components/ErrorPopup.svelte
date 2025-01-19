<script>
    export let message = "An error occurred!";
    export let onClose;
  
    const handleClose = () => {
      if (onClose) onClose();
    };
  </script>
  
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
    <div class="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-red-600">Error</h3>
        <button
          on:click={handleClose}
          class="text-gray-500 hover:text-gray-700 focus:outline-none transition-all duration-300"
        >
          &times;
        </button>
      </div>
      <p class="mt-4 text-sm text-gray-700">{message}</p>
      <div class="mt-6 text-right">
        <button
          on:click={handleClose}
          class="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>