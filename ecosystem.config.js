module.exports = {
    apps: [
      {
         name: 'entertainme - Client',
         script: 'cd client/entertain-me && npm install && npm start',
      },
      {
        name: 'entertainme - Orchestrator',
        script: 'cd server/orchestrator && npm install && nodemon app.js',
        env: {
          PORT: 4000
        },
      },
      {
        name: 'entertainme - Service Movies',
        script: 'cd server/services/Movies && npm install && nodemon app.js',
        env: {
          PORT: 4001,
          URI: 'mongodb://localhost:27017'
        },
      },
      {
        name: 'entertainme - Service TV Series',
        script: 'cd server/services/TvSeries && npm install && nodemon app.js',
        env: {
          PORT: 4002,
          URI: 'mongodb://localhost:27017'
        },
      },
    ],
  };