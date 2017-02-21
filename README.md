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
more restrictive permission, please
[file an issue](https://github.com/saibotsivad/sync-package-description/issues)!)

It's probably going to be easiest to add it to your `~/.profile` file:

```bash
export SYNC_PACKAGE_DESCRIPTION_AUTH='{"type":"token","token":"<TOKEN VALUE>"}'
```

(Note the single quotes surrounding the JSON object.)

## test

Make sure everything is configured correctly:

```bash
sync-package-description
# Success!
```

## run it for a single module

Go into some module that you want to sync, and simply run the command:

```
sync-package-description
```

If the operation is a success, there will be no output. Check your Github
repo to see your updated description!

## git hook

If you want this to run every time you run `git push` than you will
want to add a [`pre-push` hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

For a single repo, add a file named `pre-push` that looks like:

```bash
#!/bin/sh

sync-package-description
```

To the file `.git/hooks/pre-push` in your repo.

For a global solution, based on [this Stackoverflow answer](http://stackoverflow.com/questions/2293498/git-commit-hooks-global-settings).

1. In your `dotfiles` folder add a folder named something like `git-templates`, and
	in that folder add a `hooks` folder. Inside that folder, create a file named
	`pre-push` and put the above contents in it. You'll need to `chmod +x` it.
2. Set the environment variable `GIT_TEMPLATE_DIR` in your bash profile to the
	`git-templates` folder you've made.

Now in any git repo you make, it'll add those hooks.

Also, according to the same Stackoverflow thread, and my personal experience,
running `git init` in a folder will not overwrite history or break things.

## license

Published and released under the [VOL](http://veryopenlicense.com).

<3
