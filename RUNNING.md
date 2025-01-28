TODO: The RUNNING.md outlines steps needed to run the application separately for the development mode and the production mode.

TODO: For merits, the RUNNING.md also outlines the steps needed to use Kubernetes to run the application with Minikube (or somilar), using kubernetes configuration files created as parts of the passing with merits requirements

## Kubernetes Deployment
minikube start --cpus 4
minikube addons enable metrics-server

### inside llm-api
minikube image build -t llm-api -f Dockerfile .
### inside qa-api
minikube image build -t qa-api -f Dockerfile .
### inside qa-ui
minikube image build -t qa-ui -f Dockerfile .
### inside flyway
minikube image build -t database-migrations -f Dockerfile .

kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml
check kubectl get all -n cnpg-system
kubectl apply -f kubernetes/database/database-cluster.yaml
check cluster with kubectl get cluster
kubectl apply -f kubernetes/database/database-migration-job.yaml
kubectl get pods

kubectl apply -f kubernetes/application/configmap
kubectl apply -f kubernetes/application/deployments
kubectl apply -f kubernetes/application/services

minikube service nginx-service --url


## Monitoring

## Necessary steps for monitoring are defined in this website: https://grafana.com/blog/2023/01/19/how-to-monitor-kubernetes-clusters-with-the-prometheus-operator/

kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml --force-conflicts=true --server-side=true

kubectl create deployment grafana --image=docker.io/grafana/grafana:latest 
# check deployment
kubectl expose deployment grafana --port 3000
kubectl port-forward svc/grafana 3000:3000
kubectl apply -f kubernetes/monitoring
kubectl port-forward svc/prometheus-operated 9090:9090
kubectl port-forward svc/grafana 3000:3000


# Enter kubernetes in http://127.0.0.1:3000/
# Enter your username and password as admin
# Click add your first data source
# Get node-ip
kubectl get nodes -o wide

# Click prometheus and write http://<node_ip>:30900 in http url part
# Save data source
# Create dashboard and selected prometheus as data source
# Add nginx_http_requests_total as metric to see total http request to nginx
# Run query
# Click apply and to finish dashboard click save dashboard