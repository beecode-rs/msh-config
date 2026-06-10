#!/usr/bin/env node

/**
 * Updates the version in package-lock.json using raw string find-and-replace.
 * This avoids reformatting the lock file (which JSON.parse/stringify would do).
 *
 * Updates exactly two locations:
 *   1. Top-level "version": "x.y.z"
 *   2. packages[""]["version"]: "x.y.z"
 *
 * Usage: node update-lock-version.js <new-version>
 */

'use strict'

const fs = require('fs')

const newVersion = process.argv[2]
if (!newVersion) {
	console.error('Usage: node update-lock-version.js <new-version>')
	process.exit(1)
}

const lockFile = 'package-lock.json'
const content = fs.readFileSync(lockFile, 'utf8')
const oldVersion = JSON.parse(content).version

if (oldVersion === newVersion) {
	console.log(`package-lock.json version is already ${newVersion}, nothing to update`)
	process.exit(0)
}

const quote = '"'
const prefix = quote + 'version' + quote + ': ' + quote // builds: "version": "
const suffix = quote

let updated = content
updated = updated.replace(prefix + oldVersion + suffix, prefix + newVersion + suffix) // top-level
updated = updated.replace(prefix + oldVersion + suffix, prefix + newVersion + suffix) // packages[""]

fs.writeFileSync(lockFile, updated)
console.log(`package-lock.json version updated: ${oldVersion} → ${newVersion}`)
