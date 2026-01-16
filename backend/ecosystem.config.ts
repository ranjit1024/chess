export default {
  apps: [{
    name: 'app',
    script: '/src/index.ts',
    interpreter: 'bun',
    instances: 1,
    exec_mode: 'fork' as const,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};