# Coffe-supply-chain

# Pre-requisite
```
. Docker installed 
. Node installed and npm or yarn (NPM is used in this project)

```

# Getting files from git (backend)

```
git clone https://github.com/muhizia/Coffe-supply-chain.git
```

# Installing dependancies

```
yarn install or npm install
```
# Building the application and deploying localy
Make is used to run all the command to build

```
make dev        # to deploy on desktop docker
make env        # copy .env to docker image
make migrate    # migrate all migrations on the image
make seed       # run the seeds (inital datas)
```

# Run test
```
npm run test
```