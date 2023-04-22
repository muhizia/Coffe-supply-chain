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
```
git clone https://github.com/muhizia/Coffe-Supply-Chain-Fotend.git
```

# Installing dependancies


### `cd Coffe-supply-chain`
### `npm install       # yarn install`


### `cd ../Coffe-Supply-Chain-Fotend`
### `npm install      # yarn install or `


## Building the application and deploying localy
Make is used to run all the command to build

```
make dev        # to deploy on desktop docker
make env        # copy .env to docker image
make migrate    # migrate all migrations on the image
make seed       # run the seeds (inital datas)
```

# Run test (Coffe-supply-chain)
```
npm run test
```