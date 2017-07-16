# README

## introduction

`anyday` only been tested in `Ubuntu 16.04`.

`anyday` only been tested under `android Device API level: 22`.

`anyday` was developped with `Javascript` + `appium`.

## Prerequisites

You need to install `Java`, `Node` and `Android sdk`.

*note: as [ES6](https://github.com/lukehoban/es6features) was used for writing Javascript, it's better node's version be higher than v6.11.0* 

```shell
$ java -version
openjdk version "1.8.0_131"
OpenJDK Runtime Environment (build 1.8.0_131-8u131-b11-0ubuntu1.16.04.2-b11)
OpenJDK 64-Bit Server VM (build 25.131-b11, mixed mode)
```

```shell
$ node -v
v6.11.1
```

```shell
$ echo $ANDROID_HOME
/home/keegoo/Android/Sdk
```

## ENV setup

**note**: following commands all should be executed inside `anyday` folder!!!

#### install npm packages

```shell
$ npm install
```

#### emulator

I don't have an emulator installed yet, so I connect to my cellphone with usb-debug open.

## run scripts

start appium:

```shell
$ ./node_modules/.bin/appium
```

run script:

```shell
$ node src/anyday.js
```

If you want to run other cases, simply change `var calendar` insde `src/anyday.js`

```javascript
  // ======= change calendar here=======
  const calendar = '2025-12-31'
  // examples: 
  // const calendar = '2017-01-31'
  // const calendar = '2021-12-01'
  // const calendar = '2000-01-01'
  // ===================================
```


## run tests

I write unit tests for `src/utils.js`. 

Use following commands to execute the tests:

```shell
$ npm run test
```