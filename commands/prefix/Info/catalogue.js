const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../classes/ExtendedClient');
const games = '17';
const queue = '13';

module.exports = {
    structure: {
        name: 'catalogue',
        description: 'Donne la latence du bot',
        aliases: []
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args
     */
    run: async (client, message, args) => {
        const embed = new EmbedBuilder()
            .setTitle('Le catalogue de jeux crack')
            .setDescription('Vous pouvez consulter le catalogue en cliquant sur le lien [Site Web](https://saez-crack.000webhostapp.com/)')
            .setImage('https://cdn.discordapp.com/attachments/1097059764137115678/1136961395330650152/standard.gif')
            .addFields(
                { name: 'Nombre de jeux actuels', value: `${games}` },
                { name: "En file d'attente", value: `${queue}` }
            )
            .setFooter({
                text: 'Commande utilisée par ' + message.author.username,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setColor('DarkBlue');

        message.channel.send({ embeds: [embed] });
        message.delete();
    }
};