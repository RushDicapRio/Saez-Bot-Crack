module.exports = {
    client: {
        token: '',
        id: '',
        versionsiteweb: '2.0.5',
        channel: '1145646055355068527'
    },
    handler: {
        prefix: '>',
        deploy: true,
        commands: {
            prefix: true,
            slash: false,
            user: true,
            message: true
        },
        mongodb: {
            uri: '',
            toggle: true
        }
    }
};