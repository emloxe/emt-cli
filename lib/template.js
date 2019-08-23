const downloadGit = require('download-git-repo');

module.exports = downloadLocal = (templateRepo, projectName) => {
  let api = templateRepo;
  return new Promise((resolve, reject) => {
    downloadGit(templateRepo, projectName, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}