resource "aws_security_group" "opsradar_node_sg" {
  name        = "allow_tls"
  description = "Opsradar aws security group for node"
  vpc_id      = aws_vpc.opsradar_vpc.id

  depends_on = [aws_vpc.opsradar_vpc]

  tags = {
    Name = "Opsradar SG"
  }
}

resource "aws_vpc_security_group_ingress_rule" "opsradar_ssh_ingress_rule" {
  security_group_id = aws_security_group.opsradar_node_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "opsradar_nodeport_ingress_rule" {
  security_group_id = aws_security_group.opsradar_node_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 32008
  ip_protocol       = "tcp"
  to_port           = 32008
}

resource "aws_vpc_security_group_ingress_rule" "opsradar_http_ingress_rule" {
  security_group_id = aws_security_group.opsradar_node_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_ingress_rule" "opsradar_https_ingress_rule" {
  security_group_id = aws_security_group.opsradar_node_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  ip_protocol       = "tcp"
  to_port           = 443
}

resource "aws_vpc_security_group_egress_rule" "opsradar_outgoing_traffic_rule" {
  security_group_id = aws_security_group.opsradar_node_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
