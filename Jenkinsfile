pipeline {
    agent any

    tools {
        nodejs "node"
        dockerTool "docker"
    }
    
    environment {
        MONGODB_URI = ''
        FRONTEND_REPO = 'abdurrafae/chatui'
        BACKEND_REPO = 'abdurrafae/chatback'
        DOCKER_TAG = 'latest'
        K8S_CREDENTIALS_ID = 'k8secret'
        K8S_SERVER_URL = 'https://127.0.0.1:62447'
    }
    
    stages {
        stage('Set MongoDB URI') {
            steps {
                withCredentials([string(credentialsId: 'CHATDB', variable: 'MONGODB_URI')]) {
                    script {
                        env.CHAT_DB = MONGODB_URI
                    }
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    dir('./') {
                        bat 'npm install'
                    }
                }
            }
        }
        stage('Build Backend') {
            steps {
                script {
                    dir('./backend') {
                        bat 'npm install'
                    }
                }
            }
        }
        stage('Build & Push Frontend Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockercred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry('https://index.docker.io/v1/', 'dockercred') {
                            docker.build("${FRONTEND_REPO}:${DOCKER_TAG}", './')
                            docker.image("${FRONTEND_REPO}:${DOCKER_TAG}").push()
                        }
                    }
                }
            }
        }
        stage('Build & Push Backend Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockercred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry('https://index.docker.io/v1/', 'dockercred') {
                            docker.build("${BACKEND_REPO}:${DOCKER_TAG}", './backend')
                            docker.image("${BACKEND_REPO}:${DOCKER_TAG}").push()
                        }
                    }
                }
            }
        }
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: '--format HTML', odcInstallation: 'DP_Check'
            }
        }
        stage('Deploy to Minikube') {
            steps {
                script {
                    kubeconfig(credentialsId: "${env.K8S_CREDENTIALS_ID}", serverUrl: "${env.K8S_SERVER_URL}") {
                        bat 'terraform init'
                        bat 'terraform plan'
                        bat 'terraform apply -auto-approve'
                    }
                }
            }
        }
    }
}
