'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GitHubStats() {
  const githubUsername = 'pithop';
  const gitlabUsername = 'chahraouiidriss';
  const [githubStats, setGithubStats] = useState({ publicRepos: 0, followers: 0 });
  const [githubRepos, setGithubRepos] = useState([]);
  const [gitlabProjects, setGitlabProjects] = useState([]);
  const [githubError, setGithubError] = useState('');
  const [gitlabError, setGitlabError] = useState('');

  const fetchGithubData = async () => {
    try {
      // Add proper headers for GitHub API
      const headers = {
        'User-Agent': 'Portfolio-App',
        'Accept': 'application/vnd.github.v3+json'
      };

      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`, { headers });
      if (!userResponse.ok) throw new Error(`GitHub user API error: ${userResponse.status}`);
      const userData = await userResponse.json();

      setGithubStats({
        publicRepos: userData.public_repos || 0,
        followers: userData.followers || 0,
      });

      // Fetch all repos with pagination
      let allRepos = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const reposResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100&page=${page}`,
          { headers }
        );

        if (!reposResponse.ok) throw new Error(`GitHub repos API error: ${reposResponse.status}`);

        const reposData = await reposResponse.json();
        allRepos = [...allRepos, ...reposData];

        // Check if more pages exist
        hasMore = reposData.length === 100;
        page++;
      }

      setGithubRepos(allRepos);
      setGithubError('');
    } catch (error) {
      console.error('GitHub data fetch error:', error);
      setGithubError('Failed to load GitHub data. Please try again later.');
    }
  };

  const fetchGitlabData = async () => {
    try {
      // Fetch GitLab user ID
      const userResponse = await fetch(`https://gitlab.com/api/v4/users?username=${gitlabUsername}`);
      if (!userResponse.ok) throw new Error(`GitLab user API error: ${userResponse.status}`);

      const userData = await userResponse.json();
      if (!userData.length) throw new Error('GitLab user not found');

      const userId = userData[0].id;

      // Fetch all projects with pagination
      let allProjects = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const projectsResponse = await fetch(
          `https://gitlab.com/api/v4/users/${userId}/projects?per_page=100&page=${page}`
        );

        if (!projectsResponse.ok) throw new Error(`GitLab projects API error: ${projectsResponse.status}`);

        const projectsData = await projectsResponse.json();
        allProjects = [...allProjects, ...projectsData];

        // Check if more pages exist
        hasMore = projectsData.length === 100;
        page++;
      }

      setGitlabProjects(allProjects);
      setGitlabError('');
    } catch (error) {
      console.error('GitLab data fetch error:', error);
      setGitlabError('Failed to load GitLab projects. Please try again later.');
    }
  };

  useEffect(() => {
    fetchGithubData();
    fetchGitlabData();
  }, []);

  // Sort repositories
  const sortedGithubRepos = [...githubRepos].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  const sortedGitlabProjects = [...gitlabProjects].sort((a, b) => (b.star_count || 0) - (a.star_count || 0));

  return (
    <motion.div
      className="bg-glass p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* GitHub Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-indigo-500">GitHub</h3>
          {githubError && (
            <div className="text-red-500 mb-4">
              {githubError}
              <p className="mt-2">
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View GitHub profile directly
                </a>
              </p>
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300">Public Repos: {githubStats.publicRepos}</p>
          <p className="text-gray-700 dark:text-gray-300">Followers: {githubStats.followers}</p>
          <h4 className="text-xl font-semibold mt-4 mb-2">Top Repositories</h4>

          {githubRepos.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              {githubError ? 'Failed to load repositories' : 'Loading GitHub repositories...'}
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              {sortedGithubRepos.slice(0, 10).map(repo => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {repo.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {githubRepos.length > 10 && (
            <p className="mt-2">
              <a
                href={`https://github.com/${githubUsername}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                See all repositories
              </a>
            </p>
          )}
        </div>

        {/* GitLab Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-indigo-500">GitLab</h3>
          <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-2">
            Note: I&apos;ve developed 20+ additional applications that are not publicly
            available due to client confidentiality agreements and company policies.
            These include enterprise solutions, internal tools, and client projects.
          </p>
          {gitlabError && (
            <div className="text-red-500 mb-4">
              {gitlabError}
              <p className="mt-2">
                <a
                  href={`https://gitlab.com/${gitlabUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View GitLab profile directly
                </a>
              </p>
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300">Projects: {gitlabProjects.length}</p>
          <h4 className="text-xl font-semibold mt-4 mb-2">Top Projects</h4>

          {gitlabProjects.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              {gitlabError ? 'Failed to load projects' : 'Loading GitLab projects...'}
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              {sortedGitlabProjects.slice(0, 10).map(project => (
                <li key={project.id}>
                  <a
                    href={project.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {gitlabProjects.length > 10 && (
            <p className="mt-2">
              <a
                href={`https://gitlab.com/${gitlabUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                See all projects
              </a>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}