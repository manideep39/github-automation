const axios = require('axios');

const addOrUpdateMembershipInOrg = async (userid) => {
	try {
		const response = await axios({
			method: 'put',
			url: `https://api.github.com/orgs/masaiTest/teams/cohort-test/memberships/${userid}`,
			headers: {
				Authorization: 'Bearer 34791a5a9fff5d74dca70f788c3b32c97a99da80'
			}
		});
		return response;
	} catch (error) {
		return error;
	}
};

const addMembers = async () => {
	const usernames = [ 'falakthkr', 'keshavmahawar', 'manideepTest' ];
	const status = await Promise.all(usernames.map((username) => addOrUpdateMembershipInOrg(username)));
	console.log('Status =>', status);
};

const createUsingTemplate = async (template_owner, template_repo, repo_name) => {
	try {
		const response = await axios({
			method: 'post',
			url: `https://api.github.com/repos/${template_owner}/${template_repo}/generate`,
			headers: {
				Authorization: 'Bearer 34791a5a9fff5d74dca70f788c3b32c97a99da80',
				Accept: 'application/vnd.github.baptiste-preview+json'
			},
			data: {
				name: `${repo_name}`,
				owner: `${template_owner}`,
				private: true
			}
		});
		return response;
	} catch (error) {
		return error;
	}
};

const createRepositories = async () => {
	const repoNames = [ 'student-five', 'student-six', 'student-seven' ];
	const status = await Promise.all(repoNames.map((name) => createUsingTemplate('masaiTest', 'template-repo', name)));
	console.log('Status =>', status);
};

const addCollaborator = async (owner, repo, username) => {
	try {
		const response = await axios({
			method: 'put',
			url: `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
			headers: {
				Authorization: 'Bearer 34791a5a9fff5d74dca70f788c3b32c97a99da80',
				Accept: 'application/vnd.github.baptiste-preview+json'
			},
			data: {
				permission : "admin"
			}
		});
		return response;
	} catch (error) {
		return error;
	}
};

const addCollaboratorsToRepositories = async () => {
	const repoNames = [ 'student-five', 'student-six', 'student-seven' ];
	const usernames = [ 'falakthkr', 'keshavmahawar', 'manideepTest' ];
	const status = await Promise.all(usernames.map((name, i) => addCollaborator('masaiTest', repoNames[i], name)));
	console.log('Status =>', status);
};

// console.log(addMembers())
// console.log(createRepositories())
// console.log(addCollaboratorsToRepositories())
