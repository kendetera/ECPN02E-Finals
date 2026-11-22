// pm2 process file: keeps the app running and restarts it on crash or reboot.
module.exports = {
  apps: [
    {
      name: 'ElectiveFinals',
      script: 'server/index.js',
      cwd: __dirname,
      node_args: '--env-file-if-exists=.env',
      max_memory_restart: '300M',
      env: { NODE_ENV: 'production' },
    },
  ],
};
