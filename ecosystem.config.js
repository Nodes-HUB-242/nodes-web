module.exports = {
  apps: [
    {
      name: "nodes-web",
      cwd: "/var/www/nodes-web",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        NEXT_PUBLIC_SITE_URL: "https://nodes-hub.com",
      },
    },
  ],
};
