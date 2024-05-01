provider "kubernetes" {
    host                   = "https://127.0.0.1:49224"
    client_certificate     = file("C:/Users/ANJUM/.minikube/profiles/minikube/client.crt")
    client_key             = file("C:/Users/ANJUM/.minikube/profiles/minikube/client.key")
    cluster_ca_certificate = file("C:/Users/ANJUM/.minikube/ca.crt")
}

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
                        value = "http://backend.example.com"
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
                    image_pull_policy = "Always"
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
            protocol   = "TCP"
            port       = 5000
            target_port = 5000  
        }
    }
}
