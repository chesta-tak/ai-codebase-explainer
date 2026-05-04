// const axios = require('axios');

// const githubAPI = axios.create({
//   baseURL: 'https://api.github.com',
//   headers: {
//     Authorization: `token ${process.env.GITHUB_TOKEN}`,
//     Accept: 'application/vnd.github.v3+json',
//   },
// });

// // Parse GitHub URL to get owner and repo
// const parseGitHubUrl = (url) => {
//   const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
//   if (!match) throw new Error('Invalid GitHub URL');
//   return { owner: match[1], repo: match[2].replace('.git', '') };
// };

// // Recursively fetch file tree
// const fetchFileTree = async (owner, repo, path = '') => {
//   const response = await githubAPI.get(`/repos/${owner}/${repo}/contents/${path}`);
//   const items = response.data;

//   const tree = [];
//   for (const item of items) {
//     if (item.type === 'file') {
//       tree.push({
//         name: item.name,
//         path: item.path,
//         type: 'file',
//         size: item.size,
//         download_url: item.download_url,
//       });
//     } else if (item.type === 'dir') {
//       const subItems = await fetchFileTree(owner, repo, item.path).catch(() => []);
//       tree.push({
//         name: item.name,
//         path: item.path,
//         type: 'dir',
//         children: subItems,
//       });
//     }
//   }
//   return tree;
// };

// // Fetch file content
// const fetchFileContent = async (owner, repo, filePath) => {
//   try {
//     const response = await githubAPI.get(`/repos/${owner}/${repo}/contents/${filePath}`);
//     if (response.data.encoding === 'base64') {
//       return Buffer.from(response.data.content, 'base64').toString('utf8');
//     }
//     return response.data.content;
//   } catch {
//     return null;
//   }
// };

// // Get repo metadata
// const fetchRepoMetadata = async (owner, repo) => {
//   const response = await githubAPI.get(`/repos/${owner}/${repo}`);
//   return response.data;
// };

// // Get key files content for AI analysis
// const fetchKeyFilesContent = async (owner, repo, fileTree) => {
//   const keyFileNames = [
//     'README.md', 'README.txt', 'package.json', 'requirements.txt',
//     'Pipfile', 'go.mod', 'Cargo.toml', 'pom.xml', 'build.gradle',
//     'Dockerfile', 'docker-compose.yml', '.env.example', 'index.js',
//     'app.js', 'main.py', 'app.py', 'main.go', 'main.rs',
//   ];

//   const flatFiles = flattenTree(fileTree);
//   const keyFiles = flatFiles.filter((f) =>
//     keyFileNames.includes(f.name) && f.size < 50000
//   );

//   const contents = {};
//   for (const file of keyFiles.slice(0, 10)) {
//     const content = await fetchFileContent(owner, repo, file.path);
//     if (content) contents[file.path] = content;
//   }
//   return contents;
// };

// const flattenTree = (tree) => {
//   let files = [];
//   for (const item of tree) {
//     if (item.type === 'file') files.push(item);
//     else if (item.type === 'dir' && item.children) {
//       files = files.concat(flattenTree(item.children));
//     }
//   }
//   return files;
// };

// module.exports = {
//   parseGitHubUrl,
//   fetchFileTree,
//   fetchFileContent,
//   fetchRepoMetadata,
//   fetchKeyFilesContent,
// };


// const axios = require('axios');

// const githubAPI = axios.create({
//   baseURL: 'https://api.github.com',
//   headers: {
//     Accept: 'application/vnd.github.v3+json',
//   },
// });

// // Add token if available
// if (process.env.GITHUB_TOKEN) {
//   githubAPI.defaults.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
//   console.log('✓ GitHub API configured with token');
// } else {
//   console.log('⚠ GitHub API running without token (rate limited to 60 req/hour)');
// }

// // Parse GitHub URL to get owner and repo
// const parseGitHubUrl = (url) => {
//   const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
//   if (!match) throw new Error('Invalid GitHub URL');
//   return { owner: match[1], repo: match[2].replace('.git', '') };
// };

// // Recursively fetch file tree
// const fetchFileTree = async (owner, repo, path = '') => {
//   try {
//     const response = await githubAPI.get(`/repos/${owner}/${repo}/contents/${path}`);
//     const items = response.data;

//     const tree = [];
//     for (const item of items) {
//       if (item.type === 'file') {
//         tree.push({
//           name: item.name,
//           path: item.path,
//           type: 'file',
//           size: item.size,
//           download_url: item.download_url,
//           sha: item.sha,
//         });
//       } else if (item.type === 'dir') {
//         const subItems = await fetchFileTree(owner, repo, item.path).catch(() => []);
//         tree.push({
//           name: item.name,
//           path: item.path,
//           type: 'dir',
//           children: subItems,
//         });
//       }
//     }
//     return tree;
//   } catch (error) {
//     console.error(`Error fetching tree for ${path}:`, error.message);
//     return [];
//   }
// };

// // Fetch file content - FIXED VERSION
// const fetchFileContent = async (owner, repo, filePath) => {
//   try {
//     console.log(`Fetching file: ${owner}/${repo}/${filePath}`);
    
//     // Method 1: Try GitHub API first
//     const response = await githubAPI.get(`/repos/${owner}/${repo}/contents/${filePath}`);
    
//     if (response.data.content) {
//       // Decode base64 content
//       const content = Buffer.from(response.data.content, 'base64').toString('utf8');
//       console.log(`✓ Fetched ${filePath} (${content.length} chars)`);
//       return content;
//     }
    
//     // Method 2: If content is too large, use download_url
//     if (response.data.download_url) {
//       const rawResponse = await axios.get(response.data.download_url);
//       console.log(`✓ Fetched ${filePath} via download_url (${rawResponse.data.length} chars)`);
//       return rawResponse.data;
//     }
    
//     throw new Error('No content available');
//   } catch (error) {
//     console.error(`✗ Failed to fetch ${filePath}:`, error.message);
    
//     // Method 3: Try raw.githubusercontent.com as fallback
//     try {
//       const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
//       console.log(`Trying fallback: ${rawUrl}`);
//       const fallbackResponse = await axios.get(rawUrl);
//       console.log(`✓ Fetched ${filePath} via raw URL`);
//       return fallbackResponse.data;
//     } catch {
//       // Try 'master' branch
//       try {
//         const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${filePath}`;
//         const masterResponse = await axios.get(masterUrl);
//         console.log(`✓ Fetched ${filePath} via master branch`);
//         return masterResponse.data;
//       } catch {
//         console.error(`✗ All methods failed for ${filePath}`);
//         return null;
//       }
//     }
//   }
// };

// // Get repo metadata
// const fetchRepoMetadata = async (owner, repo) => {
//   try {
//     const response = await githubAPI.get(`/repos/${owner}/${repo}`);
//     console.log(`✓ Fetched metadata for ${owner}/${repo}`);
//     return response.data;
//   } catch (error) {
//     console.error(`✗ Failed to fetch metadata:`, error.message);
//     throw error;
//   }
// };

// // Get key files content for AI analysis
// const fetchKeyFilesContent = async (owner, repo, fileTree) => {
//   const keyFileNames = [
//     'README.md', 'README.txt', 'package.json', 'requirements.txt',
//     'Pipfile', 'go.mod', 'Cargo.toml', 'pom.xml', 'build.gradle',
//     'Dockerfile', 'docker-compose.yml', '.env.example', 'index.js',
//     'app.js', 'main.py', 'app.py', 'main.go', 'main.rs',
//   ];

//   const flatFiles = flattenTree(fileTree);
//   const keyFiles = flatFiles.filter((f) =>
//     keyFileNames.includes(f.name) && f.size < 100000 // Increased to 100KB
//   );

//   const contents = {};
//   for (const file of keyFiles.slice(0, 12)) { // Get more files
//     const content = await fetchFileContent(owner, repo, file.path);
//     if (content) {
//       contents[file.path] = content;
//     }
//   }
  
//   console.log(`✓ Fetched ${Object.keys(contents).length} key files`);
//   return contents;
// };

// const flattenTree = (tree) => {
//   let files = [];
//   for (const item of tree) {
//     if (item.type === 'file') files.push(item);
//     else if (item.type === 'dir' && item.children) {
//       files = files.concat(flattenTree(item.children));
//     }
//   }
//   return files;
// };

// module.exports = {
//   parseGitHubUrl,
//   fetchFileTree,
//   fetchFileContent,
//   fetchRepoMetadata,
//   fetchKeyFilesContent,
// };

const axios = require('axios');

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Add token if available
if (process.env.GITHUB_TOKEN) {
  githubAPI.defaults.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  console.log('✓ GitHub API configured with token');
} else {
  console.log('⚠ GitHub API running without token (rate limited to 60 req/hour)');
}

// Parse GitHub URL to get owner and repo
const parseGitHubUrl = (url) => {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');
  return { owner: match[1], repo: match[2].replace('.git', '') };
};

// Recursively fetch file tree
const fetchFileTree = async (owner, repo, path = '') => {
  try {
    const response = await githubAPI.get(`/repos/${owner}/${repo}/contents/${path}`);
    const items = response.data;

    const tree = [];
    for (const item of items) {
      if (item.type === 'file') {
        tree.push({
          name: item.name,
          path: item.path,
          type: 'file',
          size: item.size,
          download_url: item.download_url,
          sha: item.sha,
        });
      } else if (item.type === 'dir') {
        const subItems = await fetchFileTree(owner, repo, item.path).catch(() => []);
        tree.push({
          name: item.name,
          path: item.path,
          type: 'dir',
          children: subItems,
        });
      }
    }
    return tree;
  } catch (error) {
    console.error(`Error fetching tree for ${path}:`, error.message);
    return [];
  }
};

// Fetch file content - FIXED VERSION
const fetchFileContent = async (owner, repo, filePath) => {
  try {
    console.log(`Fetching file: ${owner}/${repo}/${filePath}`);
    
    // Method 1: Try GitHub API first
    const response = await githubAPI.get(`/repos/${owner}/${repo}/contents/${filePath}`);
    
    if (response.data.content) {
      // Decode base64 content
      const content = Buffer.from(response.data.content, 'base64').toString('utf8');
      console.log(`✓ Fetched ${filePath} (${content.length} chars)`);
      return content;
    }
    
    // Method 2: If content is too large, use download_url
    if (response.data.download_url) {
      const rawResponse = await axios.get(response.data.download_url);
      console.log(`✓ Fetched ${filePath} via download_url (${rawResponse.data.length} chars)`);
      return rawResponse.data;
    }
    
    throw new Error('No content available');
  } catch (error) {
    console.error(`✗ Failed to fetch ${filePath}:`, error.message);
    
    // Method 3: Try raw.githubusercontent.com as fallback
    try {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
      console.log(`Trying fallback: ${rawUrl}`);
      const fallbackResponse = await axios.get(rawUrl);
      console.log(`✓ Fetched ${filePath} via raw URL`);
      return fallbackResponse.data;
    } catch {
      // Try 'master' branch
      try {
        const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${filePath}`;
        const masterResponse = await axios.get(masterUrl);
        console.log(`✓ Fetched ${filePath} via master branch`);
        return masterResponse.data;
      } catch {
        console.error(`✗ All methods failed for ${filePath}`);
        return null;
      }
    }
  }
};

// Get repo metadata
const fetchRepoMetadata = async (owner, repo) => {
  try {
    const response = await githubAPI.get(`/repos/${owner}/${repo}`);
    console.log(`✓ Fetched metadata for ${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error(`✗ Failed to fetch metadata:`, error.message);
    throw error;
  }
};

// Get key files content for AI analysis
const fetchKeyFilesContent = async (owner, repo, fileTree) => {
  const keyFileNames = [
    'README.md', 'README.txt', 'package.json', 'requirements.txt',
    'Pipfile', 'go.mod', 'Cargo.toml', 'pom.xml', 'build.gradle',
    'Dockerfile', 'docker-compose.yml', '.env.example', 'index.js',
    'app.js', 'main.py', 'app.py', 'main.go', 'main.rs',
  ];

  const flatFiles = flattenTree(fileTree);
  const keyFiles = flatFiles.filter((f) =>
    keyFileNames.includes(f.name) && f.size < 100000 // Increased to 100KB
  );

  const contents = {};
  for (const file of keyFiles.slice(0, 12)) { // Get more files
    const content = await fetchFileContent(owner, repo, file.path);
    if (content) {
      contents[file.path] = content;
    }
  }
  
  console.log(`✓ Fetched ${Object.keys(contents).length} key files`);
  return contents;
};

const flattenTree = (tree) => {
  let files = [];
  for (const item of tree) {
    if (item.type === 'file') files.push(item);
    else if (item.type === 'dir' && item.children) {
      files = files.concat(flattenTree(item.children));
    }
  }
  return files;
};

module.exports = {
  parseGitHubUrl,
  fetchFileTree,
  fetchFileContent,
  fetchRepoMetadata,
  fetchKeyFilesContent,
};