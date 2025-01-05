pipeline {
    agent any

    environment {
        IMAGE_NAME = 'gestion_commande_mern'               // Nom d' image Docker
        DOCKER_REGISTRY = 'sarrarhouma'   //e nom d'utilisateur Docker Hub
        DOCKER_CREDENTIALS_ID = 'dockerhub' // ID des credentials Docker dans Jenkins
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning the repository..."
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:latest .'
            }
        }

        stage('Scan Vulnerabilities') {
            steps {
                echo "Scanning Docker image for vulnerabilities using Trivy..."
                sh 'trivy image $DOCKER_REGISTRY/$IMAGE_NAME:latest || true'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing Docker image to Docker Hub..."
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: '']) {
                    sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest'
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
