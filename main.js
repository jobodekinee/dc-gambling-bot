import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import { addBalance, handlePaymentMethod } from './commands/addbalance.js';

dotenv.config();

const discordclient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

discordclient.on('ready', (c) => {
    console.log(`${c.user.username} is online!`);
});

discordclient.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() && interaction.commandName === 'addbalance') {
        await addBalance(interaction);
    }

    if (interaction.isButton()) {
        await handlePaymentMethod(interaction);
    }
});

discordclient.login(process.env.TOKEN);
