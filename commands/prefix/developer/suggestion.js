const { Message } = require('discord.js');
const ExtendedClient = require('../../../classes/ExtendedClient');

// ID du serveur où vous souhaitez envoyer les suggestions
const targetServerId = '1097059709535654011';

// ID du canal dans le serveur cible où vous souhaitez envoyer les suggestions
const targetSuggestionChannelId = '1140022028850712682';

module.exports = {
    structure: {
        name: 'suggest',
        description: 'Envoyer une suggestion au serveur de développement',
        aliases: ['suggestion']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args
     */
    run: async (client, message, args) => {
        // Vérifier si l'utilisateur a les messages privés activés
        try {
            await message.author.send("Votre demande d'ajout a bien été envoyé.");
        } catch (error) {
            return message.reply("Veuillez activer vos messages privés pour recevoir les réponses de vos suggestions.");
        }
        
        // Vérifier si des arguments ont été fournis
        if (args.length === 0) {
            return message.reply("Veuillez fournir une suggestion.");
        }
        
        // Joindre les arguments pour former la suggestion complète
        const suggestion = args.join(' ');
        
        // Récupérer le serveur cible
        const targetServer = client.guilds.cache.get(targetServerId);
        
        if (!targetServer) {
            return message.reply("Le serveur n'a pas été trouvé.");
        }
        
        // Récupérer le canal de suggestions dans le serveur cible
        const suggestionChannel = targetServer.channels.cache.get(targetSuggestionChannelId);
        
        if (!suggestionChannel) {
            return message.reply("Le salon de suggestions dans le serveur n'a pas été trouvé.");
        }
        
        // Envoyer la suggestion dans le canal de suggestions du serveur cible
        const suggestionMessage = await suggestionChannel.send({
            content: `Nouvelle suggestion de ${message.author.tag} dans le serveur ${message.guild.name}:\n${suggestion}`
        });
        
        // Réagir au message de suggestion pour permettre aux utilisateurs de voter
        await suggestionMessage.react('👍');
        await suggestionMessage.react('👎');
        
        // Répondre à l'utilisateur pour confirmer l'envoi de la suggestion
        await message.reply("Votre suggestion a été envoyée au développeur.");
        
        // Attendre les réactions sur la suggestion
        const filter = (reaction, user) => user.id === message.author.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎');
        const collected = await suggestionMessage.awaitReactions({ filter, max: 1, time: 604800000, errors: ['time'] });
        
        // Envoyer un message privé à l'utilisateur en fonction de la réaction
        const reaction = collected.first();
        if (reaction.emoji.name === '👍') {
            await message.author.send("Votre suggestion a été approuvée !");
        } else if (reaction.emoji.name === '👎') {
            await message.author.send("Malheureusement, votre suggestion n'a pas été approuvée.");
        }
    }
};
