import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, MessageFlags } from 'discord.js';

export async function addBalance(interaction) {
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

    await interaction.reply({
        content: 'Which top-up method would you like to use?',
        components: [buyrow], 
        flags: MessageFlags.Ephemeral,
    });
}

export async function handlePaymentMethod(interaction) {
    if (interaction.customId === "PayPal") {
        try {
            const TicketCategoryId = '1342622184992149534';
            const guild = interaction.guild;
            const user = interaction.user;

            const channel = await guild.channels.create({
                name: `ticket-${user.username}`,
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
            });

            await channel.send(`Hello **${user.username}**, \n\nPlease enter the **amount** you'd like to top up below. Our team will process the transaction as soon as possible. 💼`);

            await interaction.update({
                content: `Please proceed in <#${channel.id}>`,
                flags: MessageFlags.Ephemeral,
                components: [],
            });

        } catch (error) {
            console.error("Error creating the ticket channel:", error);
            await interaction.update({
                content: "There was an error creating your ticket channel. If this continues, open a help ticket!",
                flags: MessageFlags.Ephemeral,
                components: [],
            });
        }
    } else if (interaction.customId === "DonutMoney") {
        await interaction.update({
            content: 'You chose the DonutMoney method!',
            components: [],
            flags: MessageFlags.Ephemeral,
        });
    }
}
