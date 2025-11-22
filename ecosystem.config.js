let oxydev = require('./conf.json');

let oxyv14 = [
      {
        name: `${oxydev.user}_manager`,
        namespace: `${oxydev.RealOwner}`,
        script: 'oxy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Main"
      },
      {
        name: `${oxydev.user}_welcomer`,
        namespace: `${oxydev.RealOwner}`,
        script: 'oxy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Welcomer"
      },
      {
        name: `${oxydev.user}_private`,
        namespace: `${oxydev.RealOwner}`,
        script: 'oxy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Private"
      },
      {
        name: `${oxydev.user}_database`,
        namespace: `${oxydev.RealOwner}`,
        script: 'oxy.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Database"
      }
      
    ]
  module.exports = {
    apps: oxyv14
  };