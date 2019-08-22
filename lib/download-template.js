const downloadGit = require('download-git-repo');

module.exports = downloadLocal = async (templateRepo, projectName) => {
  let api = templateRepo;
  return new Promise((resolve, reject) => {
    //projectName 为下载到的本地目录
    downloadGit(templateRepo, projectName, (err) => {
      if (err) {
          reject(err);
      }
      resolve();
    });
  });
}