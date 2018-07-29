# Resume

[![](https://badgen.now.sh/badge/published/now/purple)](https://zeit.co/about)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

- Generate resume based on only **markdown syntax** with **emoji**.
- Support feature to export pdf by click.
- Publish generated resume with [now](https://github.com/zeit/now-cli) on the web.

## Examples

- [getpapercss theme sample](https://build-ialtskcwoc.now.sh/)

## Real demo

- [jbee-resume](https://jbee-resume.now.sh/) - _my resume_

## If you...

If you want to create your own resume with using this repository, follow the steps below.

```bash
# Setup
$ git clone https://github.com/JaeYeopHan/resume my-resume
$ cd my-resume
$ npm run bs

# For publishing,
$ npm install -g now

$ code .
# Writing resume in `packages/resume-data/resume.md` file on your favorite editor with markdown syntax.
# Customize theme in `packages/resume-data/resumeConfig.json`.
# Customize now.json for deployment setting.

# Prepare to publish.
$ npm run publish:resume
```

> It's done!

## Development

- This repository is consist of
  - [mdx](https://github.com/mdx-js/mdx)
  - [remark-emoji](https://github.com/rhysd/remark-emoji)
  - [create-react-app](https://github.com/facebook/create-react-app)
  - [html2pdf.js](https://github.com/eKoopmans/html2pdf)
- You can customize...
  - template in `components` directory.
  - config in `templates/resumeConfig.json` directory.

### Supported Theme

- [papercss](https://github.com/papercss/papercss)

## Development Installation

```bash
$ git clone https://github.com/JaeYeopHan/resume resume
$ cd resume
$ npm run bs # lerna bootstrap
$ npm start

# Working
$ git checkout -b [YOUR BRANCH NAME]
# After working
$ npm test
# Register Pull Request
```

## Contribute

> Welcome for contributing :prey:

## LICENSE

[MIT](https://github.com/JaeYeopHan/resume/blob/master/LICENSE)

<p align="center">✌️</p>
<p align="center">
<sub><sup>A little project by <a href="https://jbee-resume.now.sh/">@Jbee</a></sup></sub>
</p>
