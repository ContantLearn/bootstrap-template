module.exports = {
    prompts: {
        name: {
            type: "String",
            default: "Bootstrap project",
            message: "Project Name"
        },
        description: {
            type: "String",
            message: "Project description"
        },
        echarts: {
            type: "confirm",
            default: false,
            message: "Use Echarts"
        },
        websocket: {
            type: "confirm",
            default: false,
            message: "Use WebSocket"
        },
        autoInstall: {
            type: "confirm",
            default: true,
            message: "Automatic execution of 'npm install'？"
        }
    }
};