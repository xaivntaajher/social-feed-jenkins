pipeline {
    agent any

    environment {
        def nodejsTool = tool name: 'node-20-tool', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        def dockerTool = tool name: 'docker-latest-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
        PATH = "${nodejsTool}/bin:${dockerTool}/bin:${env.PATH}"
    }

    stages {
        stage('Installing Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Create Production React Build') {
            steps {
                sh 'npm run-script build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t xaivntaaj/social-feed-jenkins:$BUILD_NUMBER .
                    docker images
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'personal-docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                }
                sh "docker push xaivntaaj/social-feed-jenkins:$BUILD_NUMBER"

            }
        }

        stage('Deploy New Image to AWS EC2') {
            steps {
                sh 'echo "Deploying to EC2 instance..."'

                sshagent(['social-feed-linux-kp-ssh-credentials']) {
                    sh """
                        SSH_COMMAND="ssh -o StrictHostKeyChecking=no ubuntu@3.128.254.143"
                        \$SSH_COMMAND "docker stop hosted-react-app && docker rm hosted-react-app"
                        \$SSH_COMMAND "docker pull xaivntaaj/social-feed-jenkins:$BUILD_NUMBER"
                        \$SSH_COMMAND "docker run -d -p 80:80 --name hosted-react-app xaivntaaj/social-feed-jenkins:$BUILD_NUMBER"
                    """
                }

            }
        }
    }
}