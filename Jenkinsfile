pipeline {
    agent any

    environment {
        IMAGE_NAME_BACKEND = 'gestion_commande_mern_backend'  // Nom d'image Docker pour le backend
        IMAGE_NAME_FRONTEND = 'gestion_commande_mern_frontend' // Nom d'image Docker pour le frontend
        DOCKER_REGISTRY = 'sarrarhouma' // Nom d'utilisateur Docker Hub
        DOCKER_CREDENTIALS_ID = 'dockerhub' // ID des credentials Docker dans Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning the repository..."
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building Docker images..."
                
                // Construire l'image backend
                script {
                    sh 'docker build -t $DOCKER_REGISTRY/$IMAGE_NAME_BACKEND:latest ./partie-node'
                }
                
                // Construire l'image frontend
                script {
                    sh 'docker build -t $DOCKER_REGISTRY/$IMAGE_NAME_FRONTEND:latest ./reactpart'
                }
            }
        }

        stage('Scan Vulnerabilities') {
            steps {
                echo "Scanning Docker images for vulnerabilities using Trivy..."
                
                // Scanner l'image backend avec Trivy dans un conteneur Docker
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image $DOCKER_REGISTRY/$IMAGE_NAME_BACKEND:latest || true'
                
                // Scanner l'image frontend avec Trivy dans un conteneur Docker
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image $DOCKER_REGISTRY/$IMAGE_NAME_FRONTEND:latest || true'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing Docker images to Docker Hub..."
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: '']) {
                    sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME_BACKEND:latest'
                    sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME_FRONTEND:latest'
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs for more details."
        }
    }
}
