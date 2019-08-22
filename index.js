#!/usr/bin/env node

const version = require('./package').version; // 版本号
const program = require('commander'); // 命令行解析
const createProgramFs = require('./lib/create-program-fs'); // 创建项目文件

program.version(version, '-v, --version');

program
    .command('create <name>')    
    .description('创建页面或组件')
    .action((name) => createProgramFs(name));

/* 后续可以根据不同的命令进行不同的处理，可以简单的理解为路由 */
// program
//     .command('build [cli]')
//     .description('执行打包构建')
//     .action((cmd, env) => callback);

/* = main entrance
-------------------------------------------------------------- */
program.parse(process.argv)