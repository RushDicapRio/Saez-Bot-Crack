const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../classes/ExtendedClient');

module.exports = {
    structure: {
        name: 'info',
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
            .setColor('Random')
            .setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/1097059764137115678/1136961395330650152/standard.gif')
            .setDescription(`
                    1. La semaine il n'y aura pas d'ajout de grosse jeu ( +5 go ), étant donné que la journée je travail.
                    
                    2. Les membres VIP du serveur streaming [ NEBULA ] seront automatiquement VIP sur le serveur qaund le rôle sera sortis.
                    
                    3. Les jeux de +10go seront des jeux PRENIUM ( il y aura un système pour cela a l'avenir ).
                    
                    4. Vous pouvez faire une commande toutes les 6H.
                    
                    5. Les demandes d'ajouts arriveront dans le week-end ( je tiens a précisé plus le jeu est gros plus il prendra du temps a être ajouter ).
                    
                    6. Pout toutes autres questions veuillez ouvrir un ticket.`)

            .setTitle('Info sur le système de Jeux Crack')
            .setFooter({
                text: 'Commande executée par ' + message.author.username,
                iconURL: message.author.displayAvatarURL()
            });

        message.channel.send({ embeds: [embed] });
        message.delete();
    }
};