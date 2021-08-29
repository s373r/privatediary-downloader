# privatediary-downloader

http://privatediary.net/ hasn't public API, but it isn't a problem for us :wink: 

Written with https://github.com/DevExpress/testcafe :star2:

## Install

```
$ git clone https://github.com/s373r/privatediary-downloader
$ cd privatediary-downloader
$ npm i
```

## Quick start

Run grabbing with:
```
$ npm run grab:firefox
```

Or if you prefer Google Chrome:
```
$ npm run grab:chrome
```

After that your notes will be saved at `output/` directory :notebook:

## ⚠️ Important note

http://privatediary.net/ works under **HTTP** (totally unsecure)! 

After downloading, please transfer your notes to any modern alternative
