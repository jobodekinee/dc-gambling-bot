import { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, PermissionsBitField } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const discordclient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,

    ]


})

discordclient.on('ready', (c) => {
    console.log(`${c.user.username} is online!`)

})

discordclient.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'addbalance') {
            const buyrow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("PayPal")
                    .setLabel("PayPal")
                    .setStyle(ButtonStyle.Success),
            
                new ButtonBuilder()
                    .setCustomId("DonutMoney")
                    .setLabel("DonutMoney")
                    .setStyle(ButtonStyle.Success)
            );

            // send reaction with the buttons
            await interaction.reply({
                content: 'Which top-up method would you like to use?',
                components: [buyrow], 
                flags: MessageFlags.Ephemeral,
            });
        }
    }

    // check for a button press
    if (interaction.isButton()) {
        if (interaction.customId === "PayPal") {

            try {
                const TicketCategoryId = '1342622184992149534';
                const guild = interaction.guild;
                const user = interaction.user;


                const channel = await guild.channels.create({
                    name: `ticket-${user.displayName}`,
                    type: 0,
                    parent: TicketCategoryId,
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],

                        },

                        {
                            id: user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],

                        },

                        
                    ]
                })

                await channel.send(`
                    Hello **${user.username}**, \n\nPlease enter the **amount** you'd like to top up below. Our team will process the transaction as soon as possible. 💼
                    `);
                    

                await interaction.update({
                    content: `Please proceed in <#${channel.id}>`,
                    flags: MessageFlags.Ephemeral,
                    components: [],

                });
            } catch (error) {
                console.error("error creating the ticket channel:", error)
                await interaction.update({
                    content: "There was an error creating your ticket channel if this proceeds to happen open a help ticket!",
                    flags: MessageFlags.Ephemeral,
                    components: [],
                });
            }
        } else if (interaction.customId === "DonutMoney") {
            await interaction.update({
                content: 'You chose the PayPal method!',
                components: [], // Voeg de knoppen toe aan de reactie
                flags: MessageFlags.Ephemeral,
        });
    }
    }
});


discordclient.login(process.env.TOKEN);



