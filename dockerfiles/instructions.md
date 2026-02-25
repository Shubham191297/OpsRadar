To upload the file to Repo

aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 691456441865.dkr.ecr.us-east-2.amazonaws.com

docker tag opsradar-postgre 691456441865.dkr.ecr.us-east-2.amazonaws.com/opsradar-postgre

docker push 691456441865.dkr.ecr.us-east-2.amazonaws.com/opsradar-postgre
