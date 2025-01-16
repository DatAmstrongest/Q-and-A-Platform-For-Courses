<script>
    export let course_id;
    export let course_name;
</script>

<a href={`/courses/${course_id}?course_name=${course_name}`} class="course-card bg-white text-gray-800 rounded-lg p-6 shadow-lg hover:transform hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out">
    <h2 class="text-2xl font-semibold mb-4">{course_name}</h2>
</a>