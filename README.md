This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Basically just clone the repo, then:

```
$ npm install
$ npm start
```

The only method of authentication currently supported is via Google, so hopefully you have a Google account you can use. All this app cares about is the account's `.uid` and `.displayName`.

For some reason, the login process isn't working on mobile devices as of this writing. Probably something silly I did because I've never used Firebase before, but I'm on a deadline here.
