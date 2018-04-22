const UA = require("ua-device");
const request = require("request");
const uuid = require("uuid/v1");
module.exports = {
  receive,
  search
};

async function search(req, res, next) {
  const { _id, page = 1, pageSize = 12 } = req.query;
  const { code } = await mdb.project.findById(_id);
  const data = await mdb[code].find({})
  res.send({ code:200, data });
}

async function receive(req, res, next) {
  const userAgent = req.headers["user-agent"];
  const { ip, body, baseUrl } = req;
  // IP处理
  const position = await resolveIp(ip);
  const data = Object.assign(body, {
    uuid: uuid(),
    position,
    ...UA(userAgent)
  });
  // 取得collection
  let code;
  try {
    code = (await mdb.project.findById(data.token)).code;
  } catch (e) {
    res.send(500);
  }
  await mdb[code].create(data);
  res.send(200);
}

function resolveIp(ip) {
  if (!ip) return {};
  return new Promise((resolve, reject) => {
    request(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`, function(
      err,
      res,
      body
    ) {
      err && reject(err);
      resolve(body);
    });
  });
}
