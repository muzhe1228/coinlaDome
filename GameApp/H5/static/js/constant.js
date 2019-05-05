var constant = {
    //  //http请求地址
    //  baseUrl: "http://192.168.10.200:7001",
    //  //注册url
    //  registerUrl: "/uac/user/register",
    //  //发送验证码url
    //  sendUrl: "/uac/user/sms",
    //  //二维码接口
    //  codeUrl: "https://api.bbpk.com/uac/resource/qrcode?text=",
    // guanWangUrl: 'https://www.bbpk.com'
    //recaptchaKey: "6Lc385MUAAAAAKPJOqXPLFUSqXiFwrGqdza-rOUA",
    recaptchaKey: "6Lf-8Z8UAAAAAKY3mcurodttmKnonkgaoraMjy-E",
    //http请求地址
    baseUrl: "https://api.pk123.app",
    //注册url
    registerUrl: "/uac/user/register",
    //发送验证码url
    sendUrl: "/uac/user/sms",
    //二维码接口
    codeUrl: "https://api.pk123.app/uac/resource/qrcode?text=",
    androidDownload: "https://download.pk123.app/uac/resource/download/app",

    guanWangUrl: "https://www.pk123.app",
    browserGameUrl: "https://game.pk123.app/",
    IosDownload: "https://cw.pub/pdr6"
};

var data = {
    home: {
        navTitle: [
            { title: "首页", link: "#banner" },
            { title: "游戏介绍", link: "#gameIntrod" },
            { title: "区块链游戏", link: "#blockCompetition" },
            { title: "代理合作", link: "#gameAgent" }
        ],
        gameIntrod: [
            [
                "玩家进入房间后可以押注或者通过竞庄参与游戏。",
                "玩家可以任意押注闲1、闲2、闲3。每个位置无上限金额限制。",
                "玩家同时可以参与竞庄，申请成为庄家。成为庄家后，可连续当庄10把，10把结束后自动下庄。",
                "房间内所有玩家可同时进行下一轮庄家竞拍。截止本庄结束后，取竞庄列表中出价最高的玩家成为下一轮庄家。"
            ],
            [
                "玩家通过预测ETH区块高度对应Hash(哈希值)的最后1位数字。",
                "玩家可任意押注0-9数字，每个数字最多可押注20000PK。",
                "猜中尾数的玩家即可获得8倍奖励，未猜中则损失下注本金。"
            ],
            [
                "玩家通过预测ETH区块高度对应Hash(哈希值)的最后3位数字。",
                " 玩家可任意购买夺币号码，从000到999，总共1000注，每注金额10PK即可。玩家购买一注，将获得1个系统分配的夺宝号码。",
                "猜中末尾3位数字的玩家即可获得8888PK奖励，未猜中则损失购买本金。"
            ]
        ],

        feature: [
            {
                title: "公平",
                size1: "区块链哈希开奖",
                size2: "无篡改"
            },
            {
                title: "娱乐",
                size1: "模式新颖",
                size2: "与棋牌游戏完美结合"
            },
            {
                title: "匿名",
                size1: "数字货币交易",
                size2: "方便快捷"
            }
        ],
        BlockList: [
            {
                title: "什么是区块链？",
                size1:
                    "区块链顾名思义就是区块的链，也就是很多包含信息的的区块通过链条一样的方式组合在了一起，形成了区块链。",
                size2:
                    "区块是区块链中的一条记录，包含并确认待处理的交易。所有的交易都被组成一个”块”。区块包含了数据，并且通过哈希指针连接了前一个区块，如此形成了区块链。区块链就是一个个账单系统，一个区块链包含了一系列这样的链。"
            },
            {
                title: "区块链为什么绝对公平？",
                size1: "区块链安全是因为其不可更改特性和分布式特性。",
                size2:
                    "简而言之，即如果要修改区块链中的数据，你需要完成下面两件事情：第一，你需要计算出修改区块之后的所有区块的哈希值，这需要非常庞大的计算能力。第二，你需要让超过50%的区块链用户同意你的修改。同时完成上面两件事情基本上是不可能的，所以区块链绝对公平。"
            }
        ],
        agentListL: [
            [
                //超级代理
                "超级代理",
                "发展下级代理为主，有自由调整下级代理收益比例的权限",
                "申请指标",
                "单日消耗流水2000万PK（无限级） 70%（利润分成）"
            ],
            [
                //普通代理
                "普通代理",
                " 发展玩家为主，达到要求数据，根据需求可申请成为超级代理",
                "申请指标",
                "单日消耗流水500万PK 50%（利润分成）"
            ],
            [
                "超级代理有调整下级代理收益比例的权限",
                "项目利润=平台30%+（超级代理70%）；超级代理可自行调整括号内的比例"
            ]
        ],
        agentListR: [
            [
                //绑定关系
                "绑定关系",
                "通过分享注册链接形成绑定关系，一旦绑定，终身绑定，且享有分享链接的所有级收益。",
                "举例",
                " A代理分享了B玩家，B玩家分享了C玩家，C玩家分享了D玩家.....无数级；A代理分享的链接作为母链，享有BCD...及所有下线玩家的所有收益。"
            ],
            [
                //项目利润
                "项目利润",
                "抽取下线玩家消耗流水的一定比例当服务费作为利润供平台及相关代理分享。",
                "品类抽取比例：牛牛3%、猜尾数、（平台坐庄）和夺宝（平台坐庄）。"
            ]
        ],
        footer: {
            title: "首款<strong>区块链公平</strong>游戏",
            list: [
                {
                    title: "常见问题",
                    link: "####"
                },
                {
                    title: "代理合作",
                    link: "#gameAgent"
                },
                {
                    title: "进入游戏",
                    link: "https://game.pk123.app"
                }
            ],
            contact: {
                QQ: "941980273",
                WX: "BBPK789",
                DB: "https://t.me/bbpkcom"
            }
        }
    },
    register: {
        downloadTip: "下载APP体验区块链游戏",
        sizeInfo: "区块链公平游戏",
        tipsBot: "此游戏版权归BBPK.COM 所有"
    },
    activity: {
        rule_size: [
            {
                content: "活动期间，玩家充值即可100%获得返利回馈，最高3%返利！"
            },
            {
                content:
                    "用户在游戏中首次充值等价100USDT以上，即可获得最高3%返利；"
            },
            {
                content:
                    "1 USDT固定可兑换100PK，BTC和ETH则随着市场价格波动，浮动兑换；"
            },
            {
                content: "返利跟随充值兑换的PK币实时到账；"
            },
            {
                content: "本次活动每个参与用户最高返利等额等值300 USDT；"
            },
            {
                content:
                    "充值的PK币可随时提现，赠送的PK币需要参与游戏，产生50倍的流水后即可提现；"
            },
            {
                content:
                    "如需帮助，请联系BBPK客服<br />微信：BBPK789，<br />电报群：https://t.me/bbpkcom；"
            },
            {
                content: "本活动最终解释权归BBPK团队所有。"
            }
        ],
        rebate_list: [
            {
                title1: "充值",
                title2: "返利"
            },
            {
                title1: "价值满100 USDT",
                title2: "1%"
            },
            {
                title1: "价值满1000 USDT",
                title2: "2%"
            },
            {
                title1: "价值满10000 USDT",
                title2: "3%"
            }
        ]
    }
};
