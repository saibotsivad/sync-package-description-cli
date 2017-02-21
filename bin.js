#!/usr/bin/env node

const SyncDescription = require('sync-package-description')
const readPackage = require('read-pkg')

let authenticate
try {
	authenticate = JSON.parse(process.env.SYNC_PACKAGE_DESCRIPTION_AUTH)
} catch (e) {
	console.log('The authentication token is not available, or is malformed.')
	process.exit(1)
}

if (!authenticate || !Object.keys(authenticate).length) {
	console.log('The authentication token is available, but is empty.')
	process.exit(1)
}

if (process.argv[2] === 'test') {
	console.log('Success!')
	process.exit(0)
}

const verbose = process.argv[2] === '-v'

readPackage('./')
	.then(package => {
		const sync = SyncDescription({ authenticate })
		sync('./')
			.then(() => {
				if (verbose) {
					console.log(`Updated Github description for '${package.name}'.`)
				}
			})
			.catch(error => {
				if (verbose) {
					console.log('Error updating Github repo description:', error.message || error)
				}
			})
	})
	.catch(error => {
		if (verbose) {
			console.log('No package.json file found in this directory.')
		}
	})
