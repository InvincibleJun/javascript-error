const UA = require('ua-device');

async function create(req, res, next) {
    const { name, host, creator, users } = req.body;
    await mdb.project.create({name, host, creator, users})
    var schema = {
        uuid: {
            type: String,
            unique: true
        },
        name: {
            type: String,
        },
        createTime: {
            type: Date,
            default: Date.now()
        },
        lineNo: {
            type: Number
        },
        colunmNo: {
            type: Number
        },
        ip: {
            type: String
        },
        url: {
            type: String
        },
        href: {
            type: String
        },        
        location: {
            type: String
        },
        stack: {
            type: String
        },
        userAgent: {
            type: String
        },
        os: {
            type: Object
        },
        brower: {
            type: Object
        },
        device: {
            type: Object
        },
        engine: {
            type: Object
        },
        isWX: {
            type: Boolean
        },
        isPhone: {
            type: Boolean
        }
    }

    mdb._create(name, schema);
    res.send(200)
}

module.exports = {
    create
}