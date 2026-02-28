# 🚀 OpsRadar

OpsRadar is a GitOps-based full-stack deployment project built on AWS EC2 using Terraform, Minikube, and ArgoCD.

The project demonstrates automated infrastructure provisioning and Continuous Deployment of a containerized application inside a Kubernetes cluster running on an EC2 instance.

---

## 🏗 Deployment Architecture

Infrastructure Provisioning  
Terraform → EC2 Instance Creation → Automation Scripts Upload

Cluster Setup (Inside EC2)  
Docker Installation → Minikube Cluster → ArgoCD Deployment

Application Deployment  
GitHub (Kubernetes Manifests) → ArgoCD → Minikube → Application Pods

---

## 📂 Repository Structure

```
.
├── backend
│   ├── Dockerfile
│   ├── app.py
│   ├── config.py
│   ├── fieldData.py
│   └── requirements.txt
│
├── dockerfiles
│   ├── Dockerfile
│   ├── init-db.sh
│   ├── instructions.md
│   └── opsradar.pgsql
│
├── frontend
│   ├── opsradar
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── src
│   │   ├── public
│   │   └── tailwind.config.js
│   └── tmp
│
├── kubernetes
│   ├── backend-deploy.yaml
│   ├── frontend-deploy.yaml
│   ├── pgsql-deploy.yaml
│   └── ecr-helper
│
└── terraform
    ├── main.tf
    ├── providers.tf
    ├── variables.tf
    ├── outputs.tf
    ├── provisioners.tf
    ├── security_group.tf
    └── scripts
        ├── install_minikube.sh
        └── deploy_argocd.sh
```

---

## ⚙️ Deployment Workflow

### 1️⃣ Infrastructure Provisioning

```bash
cd terraform
terraform init
terraform apply
```

Terraform provisions:

- EC2 instance
- Security groups
- Required AWS resources
- Uploads automation scripts

---

### 2️⃣ Cluster Bootstrap (Inside EC2)

SSH into the EC2 instance and execute:

```bash
./install_minikube.sh
```

This script:

- Installs Docker
- Starts Docker service
- Installs Minikube
- Starts a single-node Kubernetes cluster

Deploy ArgoCD:

```bash
./deploy_argocd.sh
```

This script:

- Deploys ArgoCD into Minikube
- Creates required namespace
- Creates Kubernetes secret for AWS ECR image pulling

---

### 3️⃣ Application Deployment (GitOps)

- Login to ArgoCD UI
- Create a new Application
- Provide GitHub repository URL
- Set manifest path to `kubernetes`
- Deploy application

ArgoCD monitors the repository and synchronizes changes automatically (default reconciliation interval ~3 minutes when Auto-Sync is enabled).

---

## 🌐 Port Configuration

- `31000` → Application UI
- `32008` → ArgoCD UI

---

## 🛠 Tech Stack

- AWS EC2
- Terraform
- Docker
- Minikube
- ArgoCD
- Python (Flask)
- React + Tailwind CSS
- PostgreSQL
- AWS ECR

---

## 🔄 CI/CD Status

✔ Continuous Deployment (CD) implemented using ArgoCD  
✘ Continuous Integration (CI) not implemented
