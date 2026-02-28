
kubectl create namespace argocd
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Set the default 
kubectl config set-context --current --namespace=argocd


curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64


kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
kubectl patch svc argocd-server -n argocd   -p '{"spec":{"type":"NodePort","ports":[{"name":"http","port":80,"targetPort":8080,"nodePort":32008},{"name":"https","port":443,"targetPort":8080}]}}'

kubectl create namespace opsradar
kubectl create secret docker-registry ecr-registry-helper --docker-server=$(aws sts get-caller-identity --query Account --output text).dkr.ecr.us-east-1.amazonaws.com --docker-username=AWS --docker-password=$(aws ecr get-login-password --region us-east-1) -n opsradar --dry-run=client -o yaml | kubectl annotate --local -f - argocd.argoproj.io/sync-options=Prune=false -o yaml | kubectl apply -f -

argocd admin initial-password -n argocd