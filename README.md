# Private Diary downloader

http://privatediary.net/ hasn't public API, but it isn't a problem for us :wink:

Written with https://github.com/DevExpress/testcafe :star2:

## Install

```
$ git clone https://github.com/s373r/privatediary-downloader
$ cd privatediary-downloader
$ npm i
```

## Quick start

```shell
$ node . --help # or npm start --help
```
```shell
Usage: privatediary-downloader [options]

Options:
  -V, --version      output the version number
  -u <user>
  -p <password>
  -b [browser]       specify browser to launch (default: "firefox")
  -s, --sort [kind]  change output sorting kind (choices: "asc", "desc", default: "desc")
  -h, --help         display help for command
```

Run grabbing with Firefox:
```
$ node . -u USER -p PASSWORD
```

Or if you prefer Google Chrome:
```
$ node . -u USER -p PASSWORD -b chrome
```

After that your notes will be saved at `output/` directory :notebook:

## Advanced options

List all available browsers:
```
$ npm run list
```

Pick one from the previous command output (e.g. Safari) and run:
```
$ node . -u USER -p PASSWORD -b safari
```

## ⚠️ Important note

http://privatediary.net/ works under **HTTP** (totally unsecure)! 

After downloading, please transfer your notes to any modern alternative
