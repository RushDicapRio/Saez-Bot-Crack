const { Message } = require('discord.js');
const ExtendedClient = require('../../../classes/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');

module.exports = {
    structure: {
        name: 'prefix',
        description: 'Obtenir/Définir/Préfixe par défaut',
        aliases: [],
        permission: 'Administrator'
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        if (!config.handler?.mongodb?.toggle) {
            await message.reply({
                content: "La base de données n'est pas prête, cette commande ne peut pas être exécutée."
            });
            return;
        };

        const type = args[0];

        switch (type) {
            case 'set': {
                let data = await GuildSchema.findOne({ guild: message.guildId });

                if (!data) {
                    data = new GuildSchema({
                        guild: message.guildId
                    });
                }

                const oldPrefix = data.prefix || config.handler.prefix;

                if (!args[1]) {
                    await message.reply({
                        content: "Vous devez fournir le préfix comme deuxième paramètre."
                    });
                    return;
                }

                data.prefix = args[1];

                await data.save();

                await message.reply({
                    content: `L'ancien préfix \`${oldPrefix}\` a été remplacé par \`${args[1]}\`.`
                });
                break;
            }
            case 'reset': {
                let data = await GuildSchema.findOne({ guild: message.guildId });

                if (data) {
                    await GuildSchema.deleteOne({ guild: message.guildId });
                }

                await message.reply({
                    content: `Le nouveau préfix sur ce serveur est : \`${config.handler.prefix}\` (par défaut).`
                });
                break;
            }
            default: {
                await message.reply({
                    content: "Méthodes autorisées : `set`, `reset`"
                });
                break;
            }
        }
    }
};