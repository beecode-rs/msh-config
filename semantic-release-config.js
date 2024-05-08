module.exports = {
	branches: 'main',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/exec',
			{
				prepareCmd: 'echo VERSION=${nextRelease.version} > version.txt && npm version ${nextRelease.version}',
			},
		],
		'@semantic-release/changelog',
		'@semantic-release/github',
		[
			'@semantic-release/git',
			{
				assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
	preset: 'angular',
}
