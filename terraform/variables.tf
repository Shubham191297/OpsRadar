variable "aws_region" {
  default = "us-east-2"
}

variable "kubernetes_version" {
  default = "1.34"
}

variable "aws_ec2_ami" {
  default = "ami-06e3c045d79fd65d9"
}

variable "aws_ec2_instance_type" {
  default = "t2.large"
}
