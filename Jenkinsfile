pipeline {
    agent any

    environment {
            def nodejsTool = tool name: 'node-20-tool', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
            def dockerTool = tool name: 'docker-latest-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
            env.PATH = "${nodejsTool}/bin:${dockerTool}/bin:${env.PATH}"
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
                script {
                }

                withCredentials([usernamePassword(credentialsId: 'personal-docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    sh "docker push xaivntaaj/social-feed-jenkins:$BUILD_NUMBER"
                }

            }
        }

        stage('Deploy New Image to AWS EC2') {
            steps {

            }
        }
    }
}