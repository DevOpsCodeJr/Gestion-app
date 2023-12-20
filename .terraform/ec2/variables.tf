variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "ec2_ami_ubuntu" {
  type    = string
  default = "ami-0c7217cdde317cfec"
}

variable "ec2_keyname" {
  type    = string
  default = "key-rsa-aws"
}

variable "ec2_tag_name" {
  type = string
}

variable "ec2_tag_ambiente" {
  type    = string
  default = "Produccion"
}

variable "security_group_name" {
  type    = string
  default = "SecGroupGestionApp"
}