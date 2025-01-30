## Design Decisions
### Server-sent Events
Server sent events are used to dynamically update question and answer lists. When a question or an answer is posted, qa-api sends an event to the frontend. qa-ui captures the event and adds new question or answer to the beginning of the list to show users.

### Pagination
When user reached to the end of the page, frontend automatically increases page size and sends it to the qa-api to get new batch of questions and answers.

### Monitoring
To collect metrics about HTTP request, an exported defined in NGINX deployment. Prometheus Service Monitor targets NGINX metrics with label and port. These metrics are exposed to Grafana for visualization.

### Scaling
Horizontal Pod Autoscaler is created for qa-api. Kubernetes can scale qa-api till 5 replicas to reach 50% CPU utilization.

### Dynamic Routes
A different page created for each question list and answer list by using Astro's dynamic routes. `id` parameter is used to retrieve necessary answers and quetsions to show to the user.

## Possible Improvements
1. New Horizontal Pod Autoscalers can be defined for other deployments like llm-api, qa-ui etc.
2. More dashboards can be added to visualize metrics
3. Adding questions or answers to a favorite list can be implemented