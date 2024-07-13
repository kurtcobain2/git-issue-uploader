const core = require('@actions/core');
const github = require('@actions/github');


async function run() {
    try {
        const TOKEN = core.getInput('github-token');
        const octokit = github.getOctokit(TOKEN);
        const issueTitle = core.getInput('issue-title');
        const issueBody = core.getInput('issue-body');

        const issue = await octokit.rest.issues.create({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            title: issueTitle,
            body: issueBody,
            labels: ['승인요청']
        });

        core.setOutput('issue-number', issue.data.number);
        core.setOutput('issue-url', issue.data.html_url);
    } catch (error) {
        core.setFailed(error.message);
    }
}
run();