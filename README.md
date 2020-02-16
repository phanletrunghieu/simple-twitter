# Simple Twitter
A very simple version of Twitter (https://simpletwitter.tk)

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Architect](#Architect)
  * [Current Architect](#current-architect)
  * [Scale Architect](#scale-architect)
* [Contact](#contact)


## About The Project

### Built With
* [Golang](https://golang.org)
* [GraphQL](https://gqlgen.com)
* [NextJs](https://nextjs.org), [Redux](https://redux.js.org)
* [Docker](https://docs.docker.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* NodeJs v10.16.3 and up
* Golang 1.12 and up
* Docker 19.03.5 and up
* Docker Compose 1.24.1 and up

### Installation

**1. Backend**
```
cd backend
```

**1.1. Setup database (Postgres & Redis)**

```
make local-db
```
Import `db.sql` file to `postgres` container

**1.2. Run server**
```
make run
```
**2. Frontend**

```
cd frontend
```

**2.1. Install modules**
```
yarn install
```
**2.2. Start app**
```
yarn dev
```

## Architect

### Current Architect

![Current Architecy](/doc/images/current-architect.png)

### Scale Architect

For scaling the system that can serve milions of users, we can:

- Deploy API server with many instance and loadbalance for requests.
- Deploy databases with master/slave architecture.
- Store data in `tweets` table with sharding by location. Ex: Tweets created by Vietnamese is stored in server in Vietnam, 
tweets created by Singaporean is stored in server in Singapore.

![Scale Architecy](/doc/images/scale-architect.png)

## Contact

Hiếu Phan - hieutrunglephan@gmail.com
