const dotenv = require("dotenv");
const express = require("express");
const PRTG = require("node-prtg");

const colors = require("colors");
const TelegramBot = require("node-telegram-bot-api");
const { log } = require("console");

process.env.TZ = 'Asia/Singapore';
// Asia/Singapore
dotenv.config();
const date = new Date();


const day = ("0" + date.getDate()).slice(-2);
let month = ("0" + (date.getUTCMonth() + 1)).slice(-2)
const year = date.getFullYear();
const hours = ("0" + date.getHours()).slice(-2);
// const minutes = ("0" + date.getMinutes()).slice(-2);
const minutes = ("0" + date.getMinutes()).slice(-2);


let updatedDate = `${month}/${day}/${year}`;
let updatedTime = `${hours}:${minutes}`;

let executed = false;

// const axios = require('axios');

const user_telegram = process.env.USER_TELEGRAM;

// const user_telegram = '-1001188501383';
const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN;
const PRTG_API_KEY = process.env.PRTG_API_KEY;






const bot = new TelegramBot(TELEGRAM_API_TOKEN, { polling: true });
// const vlan71 = 2283;
// const vlan73 = 2282;
// const vlan72 = 2284;
// const vlan75 = 2285;
const vlan71 = 2158;
const vlan73 = 2157;
const vlan72 = 2284;
const vlan75 = 2285;
const interval = 3000;

const app = express();
const port = 3210;

// JANRO PASSHASH 3845357539
const network = new PRTG({
    url: 'http://localhost:80',
    username: "prtgadmin",
    passhash: '447823838',
});

bot.onText(/\/test/, (msg) => {
    bot.sendMessage(msg.chat.id, date, { parse_mode: "HTML" });

});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Server started on ${port}`));

const inventoryMsg = `<b><u>TOTAL OF NECESSARY OFFICE ITEMS</u></b>\n<b>System Unit:</b> 11 \n<b>Work phone: </b>14 iPhone
`;


let incidentMsg = `
    <b><u>INCIDENT REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate}) \n<b>Computer No:</b>\n<b>Employee:</b>\n<b>Issue:</b>\n<b>Resolve:</b>
    `;


const requestMsg = `
    <b><u>REQUEST REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Computer No:</b>\n<b>Employee:</b>\n<b>Requested:</b>\n<b>Action:</b>
    `;

const workphoneMsg = `
    <b><u>WORKPHONE TRACK REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Type of Phone:</b>\n<b>Employee:</b>\n<b>Action:</b>\n<b>Remaining:</b>
    `;

const taskdoneMsg = `
    <b><u>TASKDONE REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Subject:</b>\n<b>Attainment:</b>
    `;

const pcmovementMsg = `
    <b><u>PC MOVEMENT REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Computer No:</b>\n<b>Employee:</b>\n<b>Movement:</b>
    `;

const ipgserversMsg = `
    <b><u>IPGSERVERS REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Subject:</b>\n<b>Attainment:</b>
    `;

const cableMsg = `<b><u>CABLES AND VLAN CHANGES REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Cable No: </b>\n<b>Computer No:</b>\n<b>Employee: </b>\n<b>Changes: </b>\n<b>Reason for Changes: </b>
`;

const powerMsg = `
<b><u>INCIDENT REPORT</u></b>\n<b>Time & Date: </b>${updatedTime} (${updatedDate})\n<b>Issue:</b> No Electricity Power at \n<b>Remarks:</b>
`;


const amshiftMsg = `
    <b><u>END OF SHIFT REPORT</u></b>\n<b>Date: </b> ${updatedDate}\n<b>Working hours: </b>06:00 - 14:00\n\n${inventoryMsg}
    `;

const midshiftMsg = `
    <b><u>END OF SHIFT REPORT</u></b>\n<b>Date: </b> ${updatedDate}\n<b>Working hours: </b>14:00 - 22:00\n\n${inventoryMsg}
    `;

const pmshiftMsg = `
    <b><u>END OF SHIFT REPORT</u></b>\n<b>Date: </b> ${updatedDate} - DATE \n<b>Working hours: </b>22:00 - 06:00\n\n${inventoryMsg}
    `;
bot.onText(/\/eastern/, (msg) => {
    const ph_html = `
        <b><u>EASTERN PUBLIC IP ADDRESSES</u></b>
        
        116.50.188.74
        116.50.188.75 <b><i>CURRENT</i></b>
        116.50.188.76
        116.50.188.77
        116.50.188.78
    `;

    bot.sendMessage(msg.chat.id, ph_html, { parse_mode: "HTML" });
});

bot.onText(/\/hk/, (msg) => {
    const hk_html = `
    <b><u>HK-LINE PUBLIC IP</u></b>
    <b>CMI</b>
        223.119.193.226
        223.119.193.227
        223.119.193.228
        223.119.193.229
        223.119.193.230
        223.119.193.231
        223.119.193.232 <b><i>CURRENT</i></b>
        223.119.193.233
        223.119.193.234
        223.119.193.335
        223.119.193.236
        223.119.193.237
        223.119.193.238
    `;

    bot.sendMessage(msg.chat.id, hk_html, { parse_mode: "HTML" });
});

bot.onText(/\/hgc/, (msg) => {
    const allpublic = `
        <b><u>EASTERN PUBLIC IP ADDRESSES</u></b>
        
        116.50.188.74
        116.50.188.75 <b><i>CURRENT</i></b>
        116.50.188.76
        116.50.188.77
        116.50.188.78



        <b><u>HGC PUBLIC IP ADDRESSES</u></b>
        <b>PH2</b>
        
        103.247.228.160
        103.247.228.161
        103.247.228.162
        103.247.228.163
        103.247.228.164
    `;

    bot.sendMessage(msg.chat.id, allpublic, { parse_mode: "HTML" });


});


bot.onText(/\/allpublic/, (msg) => {
    const ph2_html = `
        <b><u>HGC PUBLIC IP ADDRESSES</u></b>
        <b>PH2</b>
        
        103.247.228.160
        103.247.228.161
        103.247.228.162
        103.247.228.163
        103.247.228.164
    `;

    bot.sendMessage(msg.chat.id, ph2_html, { parse_mode: "HTML" });


});

// [["/incident", "/request", "/taskdone"], ["/workphone", "/pcmovement", "/ipgservers"], ["/amshift", "/midshift", "/pmshift"]]
bot.onText(/\/network/, (msg) => {
    bot.sendPhoto(msg.chat.id, "https://ibb.co/5jTFTLm");
});

bot.onText(/\/routerconfig/, (msg) => {
    bot.sendPhoto(msg.chat.id, "https://ibb.co/MkMGLf2");
})

bot.onText(/\/reports/, (msg) => {
    bot.sendMessage(msg.chat.id, "List of Reports:", {
        "reply_markup": {
            "inline_keyboard": [
                [{
                    text: 'Incident',
                    callback_data: 'incident'
                },
                {
                    text: 'Request',
                    callback_data: 'request'
                },
                {
                    text: 'Taskdone',
                    callback_data: 'taskdone',
                },
                ],
                [
                    {
                        text: 'PC Movement',
                        callback_data: 'pcmovement',
                    },
                    {
                        text: 'Ipgservers',
                        callback_data: 'ipgservers'
                    },
                    {
                        text: 'Workphone',
                        callback_data: 'workphone'
                    }
                ],
                [
                    {
                        text: 'Cables and Vlan Changes',
                        callback_data: 'cable'
                    }
                ],

                [
                    {
                        text: 'AM Shift',
                        callback_data: 'amshift'
                    },
                    {
                        text: 'MID Shift',
                        callback_data: 'midshift'
                    },
                    {
                        text: 'PM Shift',
                        callback_data: 'pmshift'
                    }
                ]
            ]
        }
    }
    );
});

bot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data;

    bot.answerCallbackQuery(callbackQuery.id).then(() => {
        if (data === 'incident') {
            bot.sendMessage(msg.chat.id, incidentMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'request') {
            bot.sendMessage(msg.chat.id, requestMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'taskdone') {
            bot.sendMessage(msg.chat.id, taskdoneMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'pcmovement') {
            bot.sendMessage(msg.chat.id, pcmovementMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'ipgservers') {
            bot.sendMessage(msg.chat.id, ipgserversMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'amshift') {
            bot.sendMessage(msg.chat.id, amshiftMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'midshift') {
            bot.sendMessage(msg.chat.id, midshiftMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'pmshift') {
            bot.sendMessage(msg.chat.id, pmshiftMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'workphone') {
            bot.sendMessage(msg.chat.id, workphoneMsg, { parse_mode: "HTML" });
            return;
        } else if (data === 'cable') {
            bot.sendMessage(msg.chat.id, cableMsg, { parse_mode: "HTML" });
        }
    });
});

bot.onText(/\/socolive/, (msg) => {
    const site = `
        <b><u>SOCOLIVE</u></b>
        socolive1.tv  (Redirect to other domain name socolive2.site)
        socolive2.tv
        socolive3.tv
        socolive4.tv
        socolive5.tv
        socolive1.vip
        socolive2.site
        socolive.io
        socolive1.io
    
    `;
    bot.sendMessage(msg.chat.id, site, { parse_mode: "HTML" });

})

bot.onText(/\/website/, (msg) => {
    const site = `
        <b><u>SOCOLIVE</u></b>
        
        socolive1.co  	104.21.81.54
        socolive2.co 	172.67.201.70
        socolive3.co    172.67.164.107
        socolive4.co    104.21.12.195
        socolive5.co    104.21.50.24
        socolive6.co    104.21.38.214
        socolive7.co    104.18.5.33
        socolive10.co   104.18.19.122
        socolive3.tv    45.116.82.62
        socolive4.tv    =
        socolive5.tv    =
        socolive1.vip (Redirect to other domain name socolive10.co)
        socolive.io     104.18.18.145
        socolive1.io    104.18.31.167
    
        <b><u>M6</u></b>
        f.m6vip2.com    34.96.247.90
        f.m6vip9.com    20.187.248.48
        f.m6vip8.com    52.246.128.54
        f.m6vip118.com  34.96.247.90
        f.m6vip5.com    34.96.247.90
        f.m6vip4.com    	20.247.96.105
        f.m6vip11.com   34.96.247.90
        <b><u>YUYANTV</u></b>
    
        yuyantv.tv  20.239.113.44
        yyzb1.tv       20.239.113.44
        yyzb2.tv       13.225.103.37
        yyzb3.tv       13.94.41.139
        yyzb4.tv       13.94.41.139
        yyzb5.tv       13.94.41.139
        yyzb6.tv       20.239.113.44
        yyzb1.live  13.94.41.139
        yyzb3.live  
        yyzb4.live
        yyzb5.live  20.239.113.44
        yuyanzhibo.cn (the site can't be reached)
        yuyans.com (the site can't be reached)
        console.yuyan.live
        <b><u>BSPORTS</u></b>
        f.bsports1.com  101.32.201.49 28ms
        f.bsports2.com  101.32.201.49  
        f.bsports5.com  101.32.201.49
        f.bsports6.com  101.32.201.49
        f.bsports7.com  101.32.201.49
        f.bsports9.com  101.32.201.49
        f.bty0vip1.com (the site can't be reached)
        
        <b><u>BTY - BSPORTS</u></b>
        bty521.com 104.21.45.83
        bty522.com 104.21.58.136
        bty523.com 172.67.138.170
        bty621.com  172.67.167.176
        bty622.com  172.67.170.213
        bty599.com  172.67.142.138
        bty30.com   104.21.59.110
    `;
    bot.sendMessage(msg.chat.id, site, { parse_mode: "HTML" });

});


bot.onText(/\/new/, (msg) => {
    // await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${user_telegram}&text=${message}`, {parse_mode: 'HTML'});

    // for new command
    const message = "Added a new command \n\n <b>• status72</b> - Bandwidth total in BOSS ROOM \n\n  <b>Try this command:</b> /status72";
    bot.sendMessage(user_telegram, message, { parse_mode: "HTML" });

});


// change mpbs message
bot.onText(/\/update/, (msg) => {
    // await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${user_telegram}&text=${message}`, {parse_mode: 'HTML'});

    // for new command
    const message = "Update \n\n <b>• VLAN71</b> - set 200Mpbs from 250Mpbs bandwidth \n\n ";
    bot.sendMessage(user_telegram, message, { parse_mode: "HTML" });

});

bot.onText(/\/red/, (msg) => {
    // await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${user_telegram}&text=${message}`, {parse_mode: 'HTML'});

    // for new command
    const message = "Baka gusto mo manahimik Patrick? @patrickpaterno.";
    bot.sendMessage(user_telegram, message, { parse_mode: "HTML" });

});

bot.onText(/\/remove/, (msg) => {
    // await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage?chat_id=${user_telegram}&text=${message}`, {parse_mode: 'HTML'});

    // for new command
    const message = "Monitoring all VLAN \n\n <b>• VLAN72 removing to monitoring </b> -  \n\n ";
    bot.sendMessage(user_telegram, message, { parse_mode: "HTML" });

});


bot.onText(/\/incident/, (msg) => {
    bot.sendMessage(msg.chat.id, incidentMsg, { parse_mode: "HTML" });

});

bot.onText(/\/request/, (msg) => {
    bot.sendMessage(msg.chat.id, requestMsg, { parse_mode: "HTML" });
});

bot.onText(/\/workphone/, (msg) => {
    bot.sendMessage(msg.chat.id, workphoneMsg, { parse_mode: "HTML" });
});


bot.onText(/\/taskdone/, (msg) => {
    bot.sendMessage(msg.chat.id, taskdoneMsg, { parse_mode: "HTML" });
});

bot.onText(/\/pcmovement/, (msg) => {
    bot.sendMessage(msg.chat.id, pcmovementMsg, { parse_mode: "HTML" });
});

bot.onText(/\/ipgservers/, (msg) => {
    bot.sendMessage(msg.chat.id, ipgserversMsg, { parse_mode: "HTML" });
});

bot.onText(/\/amshift/, (msg) => {
    bot.sendMessage(msg.chat.id, amshiftMsg, { parse_mode: "HTML" });

});

bot.onText(/\/midshift/, (msg) => {
    bot.sendMessage(msg.chat.id, midshiftMsg, { parse_mode: "HTML" });

});

bot.onText(/\/pmshift/, (msg) => {
    bot.sendMessage(msg.chat.id, pmshiftMsg, { parse_mode: "HTML" });

});

bot.onText(/\/power/, (msg) => {
    bot.sendMessage(msg.chat.id, powerMsg, { parse_mode: "HTML" });

});




let timer = null;

bot.onText(/\/start/, (res) => {
    const message = `
    <b><u>LIST OF REACTIVE REPORTS</u></b> \n\nCommands: \n • /incident for <b>INCIDENT REPORT</b>\n • /request for <b>REQUEST REPORT</b>\n • /taskdone for <b>TASKDONE REPORT</b>\n • /workphone for <b>WORKPHONE TRACK REPORT</b>\n • /pcmovement for <b>PC MOVEMENT REPORT</b>\n • /cable for <b>CABLES AND VLAN CHANGES REPORT</b>\n • /ipgservers for <b>IPGSERVERS REPORT</b>\n • /cablevlan for <b>CABLES AND VLAN CHANGES REPORT</b>\n <b><u>END SHIFT REPORT</u></b>\n\nCommands:\n • /amshift <b>AM SHIFT</b>\n • /midshift <b>MID SHIFT</b>\n • /pmshift <b>PM SHIFT</b>\n\n For the list command: /reports   \n\n <i><b>Note: Kindly check and update the Time & Date.</b></i>
    `;

    // timer = setInterval(() => {
    //     if(new Date().getSeconds() === 1) {
    //         bot.sendMessage(5126686245, message, { parse_mode: "HTML"});    
    //     }
    // }, 1000)3,600,000    
    start = setInterval(() => {
        console.log("Running service...");
    }, 100000);

    timer = setInterval(() => {
        // if(new Date().getSeconds() === 1) {
        bot.sendMessage(user_telegram, message, { parse_mode: "HTML" });
        // }
    }, 25200000);
    console.log(res);
    // 25200000
});

bot.onText(/\/stop/, () => {
    console.log("Stopped Service");
    clearInterval(timer);
    clearInterval(start)
});
