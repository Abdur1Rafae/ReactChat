provider "kubernetes" {
    host                   = "https://127.0.0.1:58469"
    client_certificate     = file("C:/Users/ANJUM/.minikube/profiles/minikube/client.crt")
    client_key             = file("C:/Users/ANJUM/.minikube/profiles/minikube/client.key")
    cluster_ca_certificate = file("C:/Users/ANJUM/.minikube/ca.crt")
}

# Define deployments
resource "kubernetes_deployment" "react_ui" {
    metadata {
        name = "react-ui-deployment"
    }

    spec {
        replicas = 1

        selector {
            match_labels = {
                app = "react-ui"
            }
        }

        template {
            metadata {
                labels = {
                    app = "react-ui"
                }
            }

            spec {
                container {
                    name  = "react-ui"
                    image = "abdurrafae/chatui:v3"

                    port {
                        container_port = 3000
                    }

                    env {
                        name  = "BACKEND_URL"
                        value = "http://node-api-service:5000"
                    }
                }
            }
        }
    }
}

resource "kubernetes_deployment" "node_api" {
    metadata {
        name = "node-api-deployment"
    }

    spec {
        replicas = 1

        selector {
            match_labels = {
                app = "node-api"
            }
        }

        template {
            metadata {
                labels = {
                    app = "node-api"
                }
            }

            spec {
                container {
                    name  = "node-api"
                    image = "abdurrafae/chatback:v1"

                    port {
                        container_port = 5000
                    }

                    env {
                        name  = "MONGO_URI"
                        value_from {
                            secret_key_ref {
                                name = "chat-secret"
                                key  = "MONGO_URI"
                            }
                        }
                    }

                    env {
                        name  = "JWT_SECRET"
                        value_from {
                            secret_key_ref {
                                name = "chat-secret"
                                key  = "JWT_SECRET"
                            }
                        }
                    }
                }
            }
        }
    }
}

# Define services
resource "kubernetes_service" "react_ui" {
    metadata {
        name = "react-ui-service"
    }

    spec {
        selector = {
            app = "react-ui"
        }

        port {
            protocol   = "TCP"
            port       = 3000
            target_port = 3000
        }

        type = "LoadBalancer"
    }
}

resource "kubernetes_service" "node_api" {
    metadata {
        name = "node-api-service"
    }

    spec {
        selector = {
            app = "node-api"
        }

        port {
            port = 5000
        }
    }
}

# Define Ingress
resource "kubernetes_ingress_v1" "chatapp_ingress" {
    wait_for_load_balancer = true
    metadata {
        name = "chatapp-ingress"
        annotations = {
            "nginx.ingress.kubernetes.io/rewrite-target" = "/"
        }
    }

    spec {
        rule {
            host = "backend.example.com"

            http {
                path {
                    path = "/"

                    backend {
                        service {
                            name = kubernetes_service.node_api.metadata[0].name
                            port {
                                number = 5000
                            }
                        }
                    }
                }
            }
        }
    }
}

# Define Horizontal Pod Autoscaler
resource "kubernetes_horizontal_pod_autoscaler" "react_ui_autoscaler" {
    metadata {
        name = "react-ui-autoscaler"
    }
    spec {
        scale_target_ref {
            api_version = "apps/v1"
            kind = "Deployment"
            name = kubernetes_deployment.react_ui.metadata[0].name
        }

        min_replicas = 1
        max_replicas = 10

        target_cpu_utilization_percentage = 50
    }
}
