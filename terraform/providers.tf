terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "=6.28.0"
    }
  }

  backend "s3" {
    bucket = "opsradar-infra-state-bucket9"
    key    = "env/prod/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}
