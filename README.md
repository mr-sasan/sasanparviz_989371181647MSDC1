# This Project has been build with these technologies:

* Docker
* Microservices
* Node.js Back-end API Server
* MongoDB & Mongoose
* Express & JsonWebToken
* React.js
* Ionic
* Typescript
* Redux not used in this project becuase of being small sized project, I used LocalStorage instead!
* NIVO Chart for React
* Material-UI/data-grid for Tables
* if we have more time we could use NGINX for better local domain names and load balancing


# Overview
each branch of this repository is one Microservice (I could devide it into more Microservices but there was no time for it!).
when you close all of these branches in your machine its Important to pull Mongo:latest from docker hub, these micro services use it for database.

run this command and build container images => docker-compose build
after this you can run docker-compose up

current container running on my machine:
 PORTS                      NAMES
7692c3c03d3b   test_iatestpanelbackend   "docker-entrypoint.s…"   55 minutes ago      Up 55 minutes   0.0.0.0:3001->3001/tcp     test_iatestpanelbackend_1
f548c9647361   test_iatestbackend        "docker-entrypoint.s…"   55 minutes ago      Up 55 minutes   0.0.0.0:3000->3000/tcp     test_iatestbackend_1
afcb0d059b81   test_iatestpanel          "docker-entrypoint.s…"   About an hour ago   Up 55 minutes   0.0.0.0:4001->5000/tcp     test_iatestpanel_1
2d87f66154f5   mongo                     "docker-entrypoint.s…"   About an hour ago   Up 55 minutes   0.0.0.0:27017->27017/tcp   test_db_1
535faa4aa524   test_iatest               "docker-entrypoint.s…"   About an hour ago   Up 55 minutes   0.0.0.0:4000->5000/tcp     test_iatest_1

the port of Backend Microservices has been hardcoded unforchunetly :D (duo to lack of time) so make sure you run both of Backend Microservices on Port 3000 and 3001 on you local machine!
iatestbackend => -port "3000:3000"
iatestpanelbackend => -port "3001:3001"

_Port of MongoDB should be 27017_

and that's it! hope you enjoy.

writen with <3 by Sasan Parviz 
email: sasanparviz98@gmail.com & sasanparviz1998@gmail.com
