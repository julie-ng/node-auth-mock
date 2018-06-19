#!/usr/bin/env groovy

@Library('demo-pipeline-library@dev') _

pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }

    parameters {
        string( name: 'CF_API',
                defaultValue: 'https://api.run.pivotal.io',
                description: 'Cloud Foundry API Endpoint')

        string( name: 'CF_ORG',
                defaultValue: 'azd-cidemo',
                description: 'PCF Organization')

        string( name: 'CF_SPACE',
                defaultValue: 'development',
                description: 'PCF Space')
    }

    tools {
        nodejs 'node-8'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Unit Tests') {
            environment {
                PORT = randomPort()
            }
            steps {
                sh 'npm run test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    expression { isReleaseBranch() }
                    expression { isFeatureBranch() }
                }
            }

            steps {
                script {
                    String appName = isFeatureBranch()
                                ? appNameFromManifest(append: env.BRANCH_NAME)
                                : appNameFromManifest()

                    cfPush([
                        appName: appName,
                        apiUrl: params.CF_API,
                        org:    params.CF_ORG,
                        space:  params.CF_SPACE,
                        credentialsId: 'pcf'
                    ])
                }
            }
        }
    }
}
