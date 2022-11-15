# Twitter Exporter

A quick and dirty tool to export at least some of your data before the whole thing melts down.

It's not super user friendly but it at least gets the job done. If you are having trouble with it or wish it did more file an issue or just hit me up on twitter at @rgigger.

## Prerequisites

Some version node. Works for me on 14. YMMV.
A twitter bearer token: https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens

## Instructions

```
git clone git clone https://github.com/rgigger/twitter-export.git
cd twitter-export/
mv .env-sample .env
# edit .env and enter your bearer token and user name
npm install
npm run build
npm run export-follows
```

Information about your follows will now be in a file in this directory called "follows-{timestamp}.json. It's probably a good idea to run it periodically and save all the results as people update and delete their information.

## TODO

- [x] Download profile info for all follows
- [ ] Make it more user friendly (maybe use bun to make an executable download)
- [ ] Download all avatars
- [ ] Create an HTML page to simulate their twitter profile
- [ ] Categorize links by which one's have RSS feeds or are for specific sites (github, linktree, etc)
- [ ] Find a way to save a prioritization
- [ ] Export bookmarks
- [ ] Twitter timeline to RSS