terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "=6.28.0"
    }
  }

  backend "s3" {
    bucket = "opsradar-infra-state-bucket"
    key    = "env/prod/terraform.tfstate"
    region = "us-east-2"
  }
}

provider "aws" {
  region = var.aws_region
}
