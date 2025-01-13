pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'gestion_commande_mern_backend'   // Docker image name for the backend
        DOCKER_IMAGE_FRONTEND = 'gestion_commande_mern_frontend' // Docker image name for the frontend
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub') // Docker Hub credentials stored in Jenkins
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
                script {
                    // Build backend Docker image
                    sh 'docker build -t $DOCKER_IMAGE_BACKEND:latest ./partie-node'
                    
                    // Build frontend Docker image
                    sh 'docker build -t $DOCKER_IMAGE_FRONTEND:latest ./reactpart'
                }
            }
        }

        stage('Scan Vulnerabilities') {
            steps {
                echo "Scanning Docker images for vulnerabilities using Trivy..."
                script {
                    // Scan backend image with Trivy
                    sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image $DOCKER_IMAGE_BACKEND:latest || true'
                    
                    // Scan frontend image with Trivy
                    sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image $DOCKER_IMAGE_FRONTEND:latest || true'
                }
            }
        }

        stage('Docker Login') {
            steps {
                echo "Logging in to Docker Hub..."
                script {
                    sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Pushing Docker images to Docker Hub..."
                script {
                    // Push backend image
                    sh 'docker push $DOCKER_IMAGE_BACKEND:latest'
                    
                    // Push frontend image
                    sh 'docker push $DOCKER_IMAGE_FRONTEND:latest'
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
