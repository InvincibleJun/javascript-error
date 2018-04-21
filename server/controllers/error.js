const UA = require('ua-device');
const request = require('request');

module.exports = {
    receiveErorr
}

async function receiveErorr(req, res, next) {
    const { ip, body } = req
    const { userAgent } = body
    const data = Object.assign(body, UA(userAgent))
    await resolveIp(ip)
    // console.log(data);
    // const { token, error, href, name, origin, stack, lineNo, message, userAgent } = req.body;
    // const { os, brower, device, engine } = UA(userAgent);
    // const { name } = await mdb.project.findById(token);
    // mdb[name].create(data)
    res.send(data)
}

function resolveIp(ip){
    if (!ip) return
    return new Promise((resolve, reject) => {
        request(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`, function(err, res, body) {
            err && reject(err);
            resolve(body);
        })
    })
}