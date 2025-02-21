import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const discordclient = new Client({
    intents: [


    ]


})

discordclient.on('ready', (c) => {
    console.log(`${c.user.username} is online!`)

})

discordclient.login(process.env.TOKEN);



