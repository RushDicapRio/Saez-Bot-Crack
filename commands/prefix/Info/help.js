const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, StringSelectMenuBuilder, ButtonStyle } = require('discord.js');
const ExtendedClient = require('../../../classes/ExtendedClient');
const config = require('../../../config');

const categories = [
    { name: 'Jeux Crack', value: 'games' },
    { name: 'Info', value: 'info' },
    { name: 'Utile', value: 'utile' }
];

const commands = {
    games: `${config.handler.prefix}60-seconds [60s]
			${config.handler.prefix}absolute-drift-zen [adz]
            ${config.handler.prefix}911-operator [911o]
            ${config.handler.prefix}among-us [au]
            ${config.handler.prefix}besiege [b1]
            ${config.handler.prefix}bomber-crew [bc]
			${config.handler.prefix}brick-rigs [br]
            ${config.handler.prefix}cluster-truck [ct]
            ${config.handler.prefix}crazy-oafish-ultra-blocks-big-sale [coubbs]
            ${config.handler.prefix}doomsday-hunters [dh]
			${config.handler.prefix}faster-than-light [ftl]
			${config.handler.prefix}garrys-mod [gm]
            ${config.handler.prefix}geometry-dash [gd]
            ${config.handler.prefix}grab-the-bottle [gtb]
            ${config.handler.prefix}hidden-folks [hf]
			${config.handler.prefix}human-fall-flat [hff]
            ${config.handler.prefix}kerbal-space-program [ksp]
			${config.handler.prefix}kill-the-bad-guy [ktbg]
            ${config.handler.prefix}mini-metro [mm]
			${config.handler.prefix}mr-president [mrp]
            ${config.handler.prefix}my-summer-car [msc]
            ${config.handler.prefix}papers-please [pp]
            ${config.handler.prefix}poly-bridge [pb]
            ${config.handler.prefix}pony-island [pi]
			${config.handler.prefix}portal-knights [pk]
			${config.handler.prefix}project-highrise [ph]
            ${config.handler.prefix}slime-rancher [sr]
			${config.handler.prefix}subnautica [s]
			${config.handler.prefix}superhot
            ${config.handler.prefix}the-escapists [te]
            ${config.handler.prefix}train-frontier-classic [tfc]
            ${config.handler.prefix}train-valley [tv]
			${config.handler.prefix}turmoil
			${config.handler.prefix}war-in-a-box-paper-tanks [wiabpt]
			${config.handler.prefix}welcome-to-the-game [wttg]
            ${config.handler.prefix}what-the-box [wtb]
            ${config.handler.prefix}youtubers-life [yl]
            ${config.handler.prefix}zup [z]`,
    info: `${config.handler.prefix}catalogue
            ${config.handler.prefix}help
            ${config.handler.prefix}info`,
    utile: `${config.handler.prefix}ping [p]
            ${config.handler.prefix}prefix 
            ${config.handler.prefix}suggest [suggestion]`
};

module.exports = {
    structure: {
        name: 'help',
        description: 'Affiche de l\'aide pour les commandes.',
        aliases: [],
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const initialEmbed = new EmbedBuilder()
            .setTitle('Aide des Commandes')
            .setDescription('Sélectionnez une catégorie dans le menu déroulant ci-dessous pour afficher les commandes.')
            .setColor('Random')
            .setImage('https://cdn.discordapp.com/attachments/1097059764137115678/1136961395330650152/standard.gif')
            .setTimestamp()
            .setFooter({
                text: 'Commande utilisée par ' + message.author.username,
                iconURL: message.author.displayAvatarURL()
            });

        const categorySelectMenu = new StringSelectMenuBuilder()
            .setCustomId('categorySelect')
            .setPlaceholder('Sélectionnez une catégorie')
            .addOptions(categories.map(category => ({
                label: category.name,
                value: category.value,
                description: `Voir les commandes de la catégorie "${category.name}"`
            })));

        const row = new ActionRowBuilder().addComponents(categorySelectMenu);

        const menuMessage = await message.channel.send({ embeds: [initialEmbed], components: [row] });

        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = menuMessage.createMessageComponentCollector({ filter, time: 15000 });

        let currentCategory = null;

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'categorySelect') {
                // Display the selected category's commands
                const selectedCategory = interaction.values[0];

                const categoryEmbed = new EmbedBuilder()
                    .setTitle(`Aide - ${categories.find(cat => cat.value === selectedCategory).name}`)
                    .setDescription(commands[selectedCategory])
                    .setColor('Random')
                    .setTimestamp()
                    .setFooter({
                        text: 'Commande utilisée par ' + message.author.username,
                        iconURL: message.author.displayAvatarURL()
                    });

                currentCategory = selectedCategory;

                const returnButton = new ButtonBuilder()
                    .setCustomId('return')
                    .setLabel('Retour')
                    .setStyle(ButtonStyle.Danger);

                const backButtonRow = new ActionRowBuilder().addComponents(returnButton);

                await interaction.update({ embeds: [categoryEmbed], components: [backButtonRow] });
            } else if (interaction.customId === 'return') {
                // Return to the main menu
                currentCategory = null;
                await interaction.update({ embeds: [initialEmbed], components: [row] });
            }
        });

        collector.on('end', () => {
            menuMessage.edit({ components: [] });
        });
    }
};
