pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'gestion_commande_mern_backend'   // Docker image name for the backend
        DOCKER_IMAGE_FRONTEND = 'gestion_commande_mern_frontend' // Docker image name for the frontend
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub') // Docker Hub credentials stored in Jenkins
    }

    stages {
        stage('Login to Docker Hub') {
            steps {
                echo "Logging in to Docker Hub..."
                bat "docker login -u %DOCKER_HUB_CREDENTIALS_USR% -p %DOCKER_HUB_CREDENTIALS_PSW%"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing backend dependencies..."
                    bat "cd backend && npm install"
                    
                    echo "Installing frontend dependencies..."
                    bat "cd frontend && npm install"
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    try {
                        echo "Running security scan on backend Docker image using Trivy..."
                        bat "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image %DOCKER_IMAGE_BACKEND%"
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Security scan failed for backend: ${e.message}"
                    }

                    try {
                        echo "Running security scan on frontend Docker image using Trivy..."
                        bat "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image %DOCKER_IMAGE_FRONTEND%"
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Security scan failed for frontend: ${e.message}"
                    }
                }
            }
        }

        stage('Build and Push Backend Docker Image') {
            steps {
                echo "Building backend Docker image..."
                bat "docker build -t %DOCKER_IMAGE_BACKEND% ./backend"
                
                echo "Pushing backend Docker image to Docker Hub..."
                bat "docker push %DOCKER_IMAGE_BACKEND%"
            }
        }

        stage('Build and Push Frontend Docker Image') {
            steps {
                echo "Building frontend Docker image..."
                bat "docker build -t %DOCKER_IMAGE_FRONTEND% ./frontend"
                
                echo "Pushing frontend Docker image to Docker Hub..."
                bat "docker push %DOCKER_IMAGE_FRONTEND%"
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
