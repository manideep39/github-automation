const axios = require("axios");
require("dotenv").config();

const authToken = `Bearer ${process.env.AUTH_TOKEN}`;
const org = "masaiTest"; // organization name
const team = "cohort-test"; // team name
const owner = "masaiTest";
const templateRepo = "template-repo"; // repository template to use
const repoNames = ["student-7", "student-8", "student-9"];
const userNames = ["falakthkr", "keshavmahawar", "manideepTest"];

const addOrUpdateMembershipInOrg = async (username) => {
  try {
    const response = await axios({
      method: "put",
      url: `https://api.github.com/orgs/${org}/teams/${team}/memberships/${username}`,
      headers: {
        Authorization: authToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addMembers = async () => {
  const status = await Promise.all(
    userNames.map((username) => addOrUpdateMembershipInOrg(username))
  );
  console.log("Status =>", status);
};

const createUsingTemplate = async (repositoryName) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://api.github.com/repos/${owner}/${templateRepo}/generate`,
      headers: {
        Authorization: authToken,
        Accept: "application/vnd.github.baptiste-preview+json",
      },
      data: {
        name: `${repositoryName}`,
        owner: `${owner}`,
        private: true,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const createRepositories = async () => {
  const status = await Promise.all(
    repoNames.map((name) => createUsingTemplate(name))
  );
  console.log("Status =>", status);
};

const addCollaborator = async (repo, username) => {
  try {
    const response = await axios({
      method: "put",
      url: `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
      headers: {
        Authorization: authToken,
        Accept: "application/vnd.github.baptiste-preview+json",
      },
      data: {
        permission: "admin",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

const addCollaboratorsToRepositories = async () => {
  const status = await Promise.all(
    userNames.map((name, i) => addCollaborator(repoNames[i], name))
  );
  console.log("Status =>", status);
};

async function automate() {
  try {
    await addMembers();
    await createRepositories();
    await addCollaboratorsToRepositories();
  } catch (error) {
    console.log(error);
  }
}

console.log(automate());
