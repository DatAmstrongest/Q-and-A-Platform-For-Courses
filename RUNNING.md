## Docker compose development deployment
1. docker compose up --build

## Docker compose production deployment
1. docker compose -f docker-compose.prod.yml up -d

## Kubernetes Deployment

### Application Deployment
#### Start Minikube
1. `minikube start --cpus 4`
2. `minikube addons enable metrics-server`

#### Load Images to Minikube
1. inside llm-api folder run `minikube image build -t llm-api -f Dockerfile .`
2. inside qa-api folder run `minikube image build -t qa-api -f Dockerfile .`
3. inside qa-ui folder run `minikube image build -t qa-ui -f Dockerfile .`
4. inside flyway folder run `minikube image build -t database-migrations -f Dockerfile .`

#### Deploy Scalable Database with Kubernetes Operator
1. `kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml`
2. Check the deployment of the operator by  `kubectl get all -n cnpg-system` command
3. Deploy database cluster `kubectl apply -f kubernetes/database/database-cluster.yaml`
4. Check cluster with `kubectl get cluster` command
5. When cluster is up, run `kubectl apply -f kubernetes/database/database-migration-job.yaml` to start flyway job
6. Use `kubectl get pods` command to check job completed successfully

#### Deploy Application Specific Resources
1. `kubectl apply -f kubernetes/application/configmap`
2. `kubectl apply -f kubernetes/application/deployments`
3. `kubectl apply -f kubernetes/application/services`

#### Expose Application
1. `minikube service nginx-service --url`


### Monitoring Deployment

> Necessary steps for monitoring are specified in this website: https://grafana.com/blog/2023/01/19/how-to-monitor-kubernetes-clusters-with-the-prometheus-operator/

#### Set up Resources
1. To get Prometheus operator, run `kubectl apply -f https://raw.githubusercontent.com/prometheus-operator/prometheus-operator/main/bundle.yaml --force-conflicts=true --server-side=true`

2. Create Grafana `kubectl create deployment grafana --image=docker.io/grafana/grafana:latest `
3. Use `kubectl get pods` command to check Granafa pod is running
4. Create service to expose Grafana, run `kubectl expose deployment grafana --port 3000`
5. Use this command to get url for Grafana `kubectl port-forward svc/grafana 3000:3000`
6. Create necessary resoures to monitor application `kubectl apply -f kubernetes/monitoring`

#### Grafana Usage
1. Open http://127.0.0.1:3000/ in your browser
2. Enter your username and password as **admin**
3. Get **node-ip** with `kubectl get nodes -o wide`
4. Click add your first data source
5. Click Prometheus and write http://<node_ip>:30900 in http url part
6. Save the data source
7. Create dashboard and select prometheus as data source
8. Add **nginx_http_requests_total** as metric to see total http request to nginx
9. Run query
10. Click apply to finish dashboard and click save dashboard

### Scaling qa-api
1. Run this command to create HPA for qa-api `kubectl apply -f kubernetes/scaling`