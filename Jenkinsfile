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

        stage('Install Trivy') {
            steps {
                echo "Installing Trivy for vulnerability scanning..."
                sh 'curl -sSL https://github.com/aquasecurity/trivy/releases/download/v0.29.2/trivy_0.29.2_Linux-64bit.deb -o trivy.deb'
                sh 'sudo dpkg -i trivy.deb'
                sh 'rm trivy.deb'
            }
        }

        stage('Scan Vulnerabilities') {
            steps {
                echo "Scanning Docker images for vulnerabilities using Trivy..."
                
                // Scanner l'image backend
                sh 'trivy image $DOCKER_REGISTRY/$IMAGE_NAME_BACKEND:latest || true'
                
                // Scanner l'image frontend
                sh 'trivy image $DOCKER_REGISTRY/$IMAGE_NAME_FRONTEND:latest || true'
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
