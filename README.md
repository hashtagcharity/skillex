[ ![Codeship Status for hashtagcharity/skillex](https://codeship.com/projects/3cc467f0-ab32-0132-215e-0e9793c56dea/status?branch=master)](https://codeship.com/projects/68249)

# skillex

Skill processing service.

Takes incoming skills and stores them in the configured database. See Skill.js for schema.

### Development and Build Process
The development is based on Git Flow. Master branch covers production, development branch covers test and local environments. After the changes has been pushed to GitHub, Codeship initiates a build and pushes back everything onto the corresponding verified branch. This means if you pushed to _master_ then after the build Codeship will push back the tested code onto _master-verified_. Same with development. The verified branches trigger an Automated Build on Docker Hub which will then take the source and create a docker image from it. The image's tag will be _latest_ or _latest-dev_ depending on whether you pushed to _master_ or _development_.

#### API
| Route | Method | Params | Return (HTTP code, result) |
| ----- | ------ | ----- | ------ |
| /api/v1/skills | POST | [String] - array of skill names | 200, - |

#### Environment Variables
 - PORT: the port number the application is going to publish its API
 - DB_HOST: the host number/name of the MongoDB instance the application will connect to (should be the same as the main app's)
 - DB_PORT: the port number of the MongoDB instance
 - DB_NAME: the name of the database where the Skill collection resides. This collection will be populated by this service and being read by the main app

#### Run
Console: `PORT=3000 DB_HOST=localhost DB_PORT=27017 DB_NAME=platform node index`

Docker:
`docker run -d --name skillex -p 30001:3000 -e "DB_HOST=localhost" -e "DB_PORT=27017" -e "DB_NAME=charity" hashtagcharity/skillex:latest`
