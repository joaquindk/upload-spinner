# File transfer spinner

This project is a sample web app demoing a file transfer spinner similar to the one used by WeTransfer. A circular spinner is user where the progress segment increases in size while it rotates around text showing the upload progress as a percentage.

## Technology used by the project

The following tools and technologies have been used to build up the project.

* React as the frontend framework and Typescript for typing.
* Parcel for the build process given its ease of use and zero-config setup
* CSS Modules for styling
* Jest and testing-library for testing. Given the incompatibility of Jest with Parcel we've had to transpile our components with Babel to be able to test them. So the Babel transpile is only done for test purposes.

## Running the project.

To run the project on the browser simply

```
  git clone https://github.com/joaquindk/upload-spinner
  cd upload-spinner
  yarn install && yarn start
```
