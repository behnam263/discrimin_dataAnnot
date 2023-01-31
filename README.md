# Annotation system
We proposed a method of data annotation based on
Bayesian statistical inference that aims to warn about the risk of
discriminatory results of a given data set.
## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Prepared docker image](#Prepared-docker-image)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Most of today data sets used to train models are chosen through
non-probabilistic methods, generating problems of data imbalance
and representativeness.

- This means that different fractions
of the population do not show the same opportunity to be represented
within the sample - aka, training sets -, leading some groups
of individuals to have a lower probability of being represented.

- Our data annotation system is based on four modules:
    - Dependence
    - Diverseness
    - Inclusiveness
    - Training Likelihood
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Technologies Used
- Django
- React
- Babbel, WebPack, React-mui


## Features
List the ready features here:
- Upload datasets in server
- Select features to evaluate
- Evaluate the result with respect to four models

## Prepared docker image:
https://hub.docker.com/r/behnam263/antsystem


## Prerequisites 
You need to install Node.js and npm befor you start.

If you are using anaconda you can add modules like this:

    conda config --add channels conda-forge

    conda install -c anaconda django

    conda install django-debug-toolbar

    conda install djangorestframework

other wise just install them using pip for your environment.

## Setup
Dependencies for react is in package file so you can use 
> npm -i

For apply changes in react as it uses babbel and webpack use
> npm run dev

in development environment and for production environment use 
> npm run build

For server part just need to prepare files in a directory for django

## Usage
Using pycharm and its configuration set these parameters:
> Parameters: runserver

> Working directory : directory where project is located ~\Project

> script path: ~\Project\manage.py


