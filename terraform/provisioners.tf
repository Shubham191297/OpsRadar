resource "null_resource" "copy_minikube_script_configure" {
  depends_on = [aws_instance.opsradar_minikube_node, aws_security_group.opsradar_node_sg]

  provisioner "file" {
    source      = "scripts/install_minikube.sh"
    destination = "/home/ubuntu/install_minikube.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = tls_private_key.opsradar_tls_key.private_key_pem
      host        = aws_instance.opsradar_minikube_node.public_ip
    }
  }

  provisioner "file" {
    source      = "scripts/deploy_argocd.sh"
    destination = "/home/ubuntu/deploy_argocd.sh"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = tls_private_key.opsradar_tls_key.private_key_pem
      host        = aws_instance.opsradar_minikube_node.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get install -y dos2unix",
      "dos2unix /home/ubuntu/install_minikube.sh",
      "dos2unix /home/ubuntu/deploy_argocd.sh",
      "chmod +x /home/ubuntu/install_minikube.sh",
      "chmod +x /home/ubuntu/deploy_argocd.sh"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = tls_private_key.opsradar_tls_key.private_key_pem
      host        = aws_instance.opsradar_minikube_node.public_ip
    }
  }
}
