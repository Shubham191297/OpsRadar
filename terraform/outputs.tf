output "opsradar_node_public_ip" {
  description = "public IP of instance hosting minikube"
  value       = aws_instance.opsradar_minikube_node.public_ip
}

output "opsradar_keypair_path" {
  description = "Path of keypair for opsradar node"
  value       = local_file.opsradar_private_key_pem.filename
}

output "kubernetes_cluser_version" {
  value = var.kubernetes_version
}
