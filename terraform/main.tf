resource "aws_vpc" "opsradar_vpc" {
  cidr_block = "172.16.0.0/16"

  tags = {
    Name = "vpc for opsradar network"
  }
}

resource "aws_subnet" "opsradar_subnet" {
  vpc_id                  = aws_vpc.opsradar_vpc.id
  cidr_block              = "172.16.10.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "Subnet for opsradar vpc"
  }
}

resource "aws_internet_gateway" "opsradar_igw" {
  vpc_id     = aws_vpc.opsradar_vpc.id
  depends_on = [aws_vpc.opsradar_vpc]
  tags = {
    Name = "Opsradar Internet GateWay"
  }
}


resource "aws_route_table" "opsradar-public-rt" {
  vpc_id = aws_vpc.opsradar_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.opsradar_igw.id
  }

  tags = {
    Name = "Opsradar Public Subnet RouteTable"
  }
}

resource "aws_route_table_association" "wearify_public_subnet_association" {
  subnet_id      = aws_subnet.opsradar_subnet.id
  route_table_id = aws_route_table.opsradar-public-rt.id
}


resource "aws_iam_role" "opsradar_node_iam_role" {
  name = "instance_role"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "showmate-AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.opsradar_node_iam_role.name
}

resource "aws_iam_instance_profile" "opsradar_iam_instance_profile" {
  name = "opsradar_instance_profile"
  role = aws_iam_role.opsradar_node_iam_role.name
}

resource "tls_private_key" "opsradar_tls_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "opsradar_keypair" {
  key_name   = "opsradar_key"
  public_key = tls_private_key.opsradar_tls_key.public_key_openssh
}

resource "local_file" "opsradar_private_key_pem" {
  content         = tls_private_key.opsradar_tls_key.private_key_pem
  filename        = "${path.module}/opsradar_keys/opsradar_key.pem"
  file_permission = "0400"
}


resource "aws_instance" "opsradar_minikube_node" {
  ami                         = var.aws_ec2_ami
  instance_type               = var.aws_ec2_instance_type
  subnet_id                   = aws_subnet.opsradar_subnet.id
  key_name                    = aws_key_pair.opsradar_keypair.key_name
  iam_instance_profile        = aws_iam_instance_profile.opsradar_iam_instance_profile.name
  associate_public_ip_address = true

  depends_on = [aws_security_group.opsradar_node_sg, aws_vpc.opsradar_vpc, aws_iam_instance_profile.opsradar_iam_instance_profile]

  vpc_security_group_ids = [
    aws_security_group.opsradar_node_sg.id
  ]

  root_block_device {
    volume_size = 30
    volume_type = "gp2"
  }

  tags = {
    Name = "Opsradar EC2 instance node for minikube cluster"
  }
}
