# privatediary-downloader

http://privatediary.net/ hasn't public API, but it isn't a problem for us :wink: 

## Install

```
$ npm install -g testcafe
$ git clone https://github.com/s373r/privatediary-downloader
$ cd privatediary-downloader
```

## For start downloading

```
$ npm test
```

If you don't use Chromium like me, please check [TestCafe browser support doc](https://devexpress.github.io/testcafe/documentation/using-testcafe/common-concepts/browser-support.html#locally-installed-browsers)

After that your notes will be saved at `output/` directory :notebook:

## Nota bene

http://privatediary.net/ works under **HTTP**. Maybe a good idea after download notes - stop using these service :ok_hand:
