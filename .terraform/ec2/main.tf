resource "aws_security_group" "sec_group_gestion_app" {
    name        = var.security_group_name
    tags = {
        Name = var.security_group_name
    }
    description = "Security group for Gestion App"
    
    ingress {
        description = "Allow port for Gestion App"
        from_port   = 3000
        to_port     = 3000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow HTTP"
        from_port   = 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow HTTPS"
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        description = "Allow SSH"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        description = "Allow all outbound traffic"
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_instance" "ec2" {
    ami           = var.ec2_ami_ubuntu
    instance_type = var.instance_type
    key_name      = var.ec2_keyname
    vpc_security_group_ids = [aws_security_group.sec_group_gestion_app.id]
    tags = {
        Name = var.ec2_tag_name
        Ambiente = var.ec2_tag_ambiente
    }
    user_data = <<-EOF
    #!/bin/bash
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg -y
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg

    # Add Docker apt repository:
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
    EOF
}

resource "aws_sns_topic" "budget_notification_topic" {
    name = "budget-notification-topic"
}

resource "aws_sns_topic_subscription" "email_subscription" {
    topic_arn = aws_sns_topic.budget_notification_topic.arn
    protocol  = "email"
    endpoint  = "anthonyguekdjian@gmail.com"
}

resource "aws_sns_topic_subscription" "sms_subscription" {
    topic_arn = aws_sns_topic.budget_notification_topic.arn
    protocol  = "sms"
    endpoint  = "+59898452454"
}

resource "aws_budgets_budget" "ec2-cost" {
  name              = "ec2-gestion_app-cost-monthly"
  budget_type       = "COST"
  limit_amount      = "1"
  limit_unit        = "USD"
  time_period_end   = "2023-12-30_20:20"
  time_period_start = "2023-12-19_20:20"
  time_unit         = "MONTHLY"

  cost_filter {
    name = "Service"
    values = [
      "Amazon Elastic Compute Cloud - Compute",
    ]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 2
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_sns_topic_arns = [aws_sns_topic.budget_notification_topic.arn]
  }
}

    output "URL" {
        value = "http://${aws_instance.ec2.public_ip}:3000"
    }