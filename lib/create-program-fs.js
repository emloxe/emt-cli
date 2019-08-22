const inquirer = require('inquirer');
const config = require('./config');
const downloadTemplate = require('./download-template');

const question = [
  // 选择模式使用 page -> 创建页面 | component -> 创建组件
  {
    type: 'list',
    name: 'mode',
    message: '选择想要创建的模版',
    choices: [
        'rollup-template',
        'webpack-template',
    ]
  },
  // 设置名称
  {
    type: 'input',
    name: 'name',
    message: answer => `设置 ${answer.mode} 名称 (e.g: index):`,
  },
];

module.exports = function(name) {

  // 问题执行
  inquirer.prompt(question).then(answers => {
    downloadTemplate(config[answers.mode + 'repo'], './'+name);

    console.log(answers);
  });
};