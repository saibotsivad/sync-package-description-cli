# sync-package-description-cli

Ever notice how the description in your `package.json` file
and your Github repo description don't quite match?

This module will help you fix that.

## install

Install it as a CLI module:

```bash
npm install -g sync-package-description-cli
```

## configure

You will need one of
[these auth objects](https://github.com/mikedeboer/node-github#authentication)
and you will need it available as a JSON-stringified object in
the environment variable `SYNC_PACKAGE_DESCRIPTION_AUTH`.

Go [create a token](https://github.com/settings/tokens/new) and
give it `Full control of private repositories`. (If you know a
more restrictive permission that still works, please
[file an issue](https://github.com/saibotsivad/sync-package-description/issues)
and let me know!)

It's probably going to be easiest to add it to your `~/.profile` file:

```bash
export SYNC_PACKAGE_DESCRIPTION_AUTH='{"type":"token","token":"<TOKEN VALUE>"}'
```

(Note the single quotes surrounding the JSON object.)

## test

Make sure everything is configured correctly by passing it the `test` parameter:

```bash
sync-package-description test
# Success!
```

## run it for a single module

Go into some module folder that you want to sync, and run the command:

```
sync-package-description
```

If the operation is a success, there will be no output (the application will
exit with a `0`). Check your Github repo to see your updated description!

You can run it in verbose mode:

```
sync-package-description -v
# Updated Github description for 'your-module-name'.
```

## run automatically

A good way to have this run automatically might be to add it to
your `~/.profile` script as part of a set of operations you should
be running each time you `npm publish`.

Here is the section of my own `~/.profile` script:

```bash
export SYNC_PACKAGE_DESCRIPTION_AUTH='{"type":"token","token":"<TOKEN>"}'
# npm publishing hooks
alias pre-version='git diff --exit-code && npm prune && npm install -q && npm test'
# scroll to the end to see the command
alias post-version='(npm run build; exit 0) && git diff --exit-code && git push && git push --tags && npm publish && sync-package-description'
# use these to publish versions to npm
alias patch="pre-version && npm version patch && post-version"
alias feature="pre-version && npm version minor && post-version"
alias breaking="pre-version && npm version major && post-version"
```

## license

Published and released under the [VOL](http://veryopenlicense.com).

<3
