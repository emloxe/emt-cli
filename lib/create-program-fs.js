const fs  = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbol  = require('log-symbols');
const config = require('./config');
const template = require('./template');

const choicesType = Object.keys(config);

const question = [
  {
    type: 'list',
    name: 'mode',
    message: 'Select Packaging Template',
    choices: choicesType
  },
  {
    type: 'input',
    name: 'version',
    default: '1.0.0',
    message: `version:`,
  },
  {
    type: 'input',
    name: 'description',
    message: `description:`,
  },
  {
    type: 'input',
    name: 'author',
    message: `author:`,
  },
  {
    type: 'input',
    name: 'license',
    default: 'MIT',
    message: `license:`,
  },
];

module.exports = function(projectName) {

  if (!fs.existsSync(projectName)) {
    // 问题执行
    inquirer.prompt(question).then(answers => {
      const loading = ora('downloading template ...');
      loading.start();

      template(config[answers.mode], './'+projectName).then(() => {
        loading.succeed();
        // 处理模板内容
        const fileName = `${projectName}/package.json`;
        if(fs.existsSync(fileName)){
          const data = fs.readFileSync(fileName).toString();
          let json = JSON.parse(data);
          json.name = projectName;
          json.version = answers.version;
          json.description = answers.description;
          json.author = answers.author;
          json.license = answers.license;
          //修改项目文件夹中 package.json 文件
          fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
        }
        console.log(symbol.success, chalk.green('Project initialization finished!'));
      })

      // console.log(answers); // todo
    });
  } else {
    //项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'));
  }

};