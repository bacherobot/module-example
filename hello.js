// On importe quelques éléments
const { SlashCommandBuilder } = require('discord.js')
const bacheroFunctions = require('../../functions')
const database = bacheroFunctions.database.getDatabase('com.example.helloworld')

// Et on exporte ce qu'il faut
module.exports = {
    slashInfo: new SlashCommandBuilder()
        .setName('helloworld')
        .setDescription('Salut tout le monde !'),

    async execute(interaction){
        // Vérifier et répondre si l'utilisateur est limité, sinon on le limite
        var checkAndReply = await bacheroFunctions.cooldown.checkAndReply(interaction, 'helloworldUsage')
        if(checkAndReply) return; else await bacheroFunctions.cooldown.set('helloworldUsage', interaction.user.id, 5000)

        // Obtenir le nombre d'utilisations dans la base de données
        var count = await bacheroFunctions.database.get(database, 'count') || 0

        // Répondre
        interaction.reply(`Hello ${bacheroFunctions.config.getValue('com.example.helloworld', 'name')} (${count} fois)`)

        // Redéfinir le nombre avec +1
        bacheroFunctions.database.set(database, 'count', count + 1)
    }
}