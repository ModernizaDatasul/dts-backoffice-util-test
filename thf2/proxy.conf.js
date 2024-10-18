const PROXY_CONFIG = [
    {
        context: [
            "/totvs-rest",
            "/totvs-login",
            "/country",
            "/customer",
            "/contact",
            "/order",
            "/genericsZoom",
            "/jobScheduler"
        ],
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        autoRewrite: true
    }, {
        context: [
            "/josso",
            "/dts/datasul-rest",
            "/qrcode/download"
        ],
        //target: "https://caraiva:8180",
        target: "http://engjv-devdock01:8183",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
        autoRewrite: true,
        headers: {
            //Cookie: "loginMode=normal; JOSSO_SESSIONID=72B88B2C5A5000AFF9C23C56A3908603; JSESSIONID=F5201606657FDB646AF59E2C9D93ECB4"
            // vigia Authorization: "Basic XXXXXXXXX"
            Authorization: "Basic XXXXXXXXX"
        }
    }
]

module.exports = PROXY_CONFIG;

