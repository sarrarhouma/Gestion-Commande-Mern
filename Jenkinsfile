pipeline {
    agent any

    environment {
        IMAGE_NAME = 'gestion_commande_mern'               // Nom d'image Docker
        DOCKER_REGISTRY = 'sarrarhouma'   // Nom d'utilisateur Docker Hub
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
                script {
                    sh 'docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:latest .'
                }
            }
        }

        stage('Install Trivy') {
            steps {
                echo "Installing Trivy for vulnerability scanning..."
                script {
                    // Check if Trivy is already installed
                    sh '''
                    if ! command -v trivy &> /dev/null
                    then
                        echo "Trivy not found, installing..."
                        curl -sSL https://github.com/aquasecurity/trivy/releases/download/v0.29.2/trivy_0.29.2_Linux-64bit.deb -o trivy.deb
                        sudo dpkg -i trivy.deb
                        rm trivy.deb
                    else
                        echo "Trivy is already installed."
                    fi
                    '''
                }
            }
        }

        stage('Scan Vulnerabilities') {
            steps {
                echo "Scanning Docker image for vulnerabilities using Trivy..."
                script {
                    sh 'trivy image $DOCKER_REGISTRY/$IMAGE_NAME:latest || true'
                }
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
