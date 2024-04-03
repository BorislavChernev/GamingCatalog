const environments = {
    development: {
        jwtSecret: 'myDevelopmentSecret',
    },
    test: {
        jwtSecret: 'myTestSecret',
    },
    production: {
        jwtSecret: 'myProductionSecret',
    }
};

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = environments[NODE_ENV];