provider "aws" {
  region = "eu-north-1"
}

resource "aws_instance" "terraform_ec2" {
  ami                    = "ami-073130f74f5ffb161"
  instance_type          = "t2.micro"
  key_name               = "AWS_keyPair"
  vpc_security_group_ids = ["sg-081d4f9beb2aaac8b"]
  subnet_id              = "subnet-0a26bf8854686db4e"

  tags = {
    Name = "terraform-server"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update
              sudo apt install -y gnupg software-properties-common curl

              wget -O- https://apt.releases.hashicorp.com/gpg | \
              gpg --dearmor | \
              sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg

              echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
              https://apt.releases.hashicorp.com jammy main" | \
              sudo tee /etc/apt/sources.list.d/hashicorp.list

              sudo apt update
              sudo apt install terraform -y
              EOF
}
