module "instances" {
  source       = "./ec2"
  ec2_tag_name = "backend-gestion-app"
}