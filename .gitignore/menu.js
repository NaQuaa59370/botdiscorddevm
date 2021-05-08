let discord = require("discord.js");
let client = new discord.Client();
prefix = "$"
client.on("message", message => {
  if (message.content === prefix + "ping") {
message.reply(`🏓 PONG, ${Math.round(client.ws.ping)}ms`)
  .then(msg => {
    msg.delete({ timeout: 3000 })
    message.delete({ timeout: 3250})
  })
  .catch(console.error);
  }

if (message.content == prefix+"help"){

  const embed = new discord.MessageEmbed()
  .setTitle('**:detective: Aide commande :**')
  .setColor(0x206694)
  .setDescription(':detective: `'+prefix+'help : affiche toute les commandes que DevM offre.`\n:detective: `'+prefix+'tarif : affiche tous nos services et prix...`\n:detective: `'+prefix+'ping : Vérifie la latence entre un ou plusieurs hôte.`\n:detective: `'+prefix+'ban : Permets de bannir un membre [ADMIN].`\n:detective: `'+prefix+'unban : Permet de révoquer une sanction [ADMIN].`\n:detective: `'+prefix+'kick : Permets de expulser le membre spécifier [ADMIN].`')
  .addField("**Merci d'avoir lu notre formulaire d'aide soigneusement ecris,\nl'équipe Dev M.**","`-----------------------------------------------------------`")
  .setImage("https://cdn.discordapp.com/attachments/783768660354269240/840292305315168306/Capture.PNG")
message.channel.send(embed);
}



if (message.content == prefix+"tarif"){

  const embed = new discord.MessageEmbed()
  .setTitle('**:money_with_wings: Dev M  Tarif :**')
  .setColor(0x1F8B4C)
  .setDescription(":money_with_wings:`• Ajout de script (7€)\n`:money_with_wings:`• Corrections de bug (4€)\n`:money_with_wings:`• Ajout de job (4€)\n`:money_with_wings:`• Ajout de véhicules (3€)\n`:money_with_wings:`• Ajout de mapping (8€)\n`:money_with_wings:`• Création de base US base faite de A a Z (25€)\n`")
  .addField("**Merci d'avoir lu nos tarif soigneusement ecris,\nl'équipe Dev M.**","`-----------------------------------------------------------`")
  .setImage("https://cdn.discordapp.com/attachments/783768660354269240/840566130610667551/unknown.png")
message.channel.send(embed);
}

if (message.content.startsWith( prefix + 'ban')) {
if (message.member.hasPermission("BAN_MEMBERS")){
    if(!message.mentions.users.first()) return message.reply(`Vous n'avez pas spécifier de victime pour votre chatiment!`)
    .then(msg => {
      msg.delete({ timeout: 5000 })
    })
    .catch(console.error); 

victim = message.mentions.users.first().id
ane = 
message.delete()
message.guild.members.ban(victim)
message.reply(`Nous avons banni `+ message.mentions.users.first().username+ ' avec succès!')
    .then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(console.error); 
}
else {
    message.channel.send("Vous ne disposez pas des autorisations nécessaires pour utiliser cette commande!")
}
}


  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'kick')) {
    if (message.member.hasPermission("KICK_MEMBERS")){
   

      const user = message.mentions.users.first();

      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member
            .kick('Kicked By Dev M')
            .then(() => {
              message.channel.send(`${user.tag} a était expulsé avec succès!:slight_smile:`);
            })
            .catch(err => {
              message.reply("je n'ai pas les permissions requises pour exécuter cette action! :sob:");
              console.error(err);
            });
        } else {
          message.reply("utilisateur introuvable. :confused:");
        }
  
      } else {
        message.reply("aucun membre n'a été mentionné. :face_with_monocle: ");
      }

    }
    else{ 
      message.channel.send("Vous ne disposez pas des autorisations nécessaires pour utiliser cette commande!")
    }
  }






})

client.on("message", async message => {
  if(message.author.bot || message.channel.type === "dm") return;
  let messageArray = message.content.split(" ")
  let args = messageArray.slice(1);
  let cmd = messageArray[0];

  if(cmd ===  prefix + "unban") {
      let toBan = await client.users.fetch(args[0])

      if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous ne disposez pas des autorisations nécessaires pour utiliser cette commande!") 
     if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("[error] le bot n'a pas les permissions requise pour utiliser cette commande.") 

      const reason = args[1] || "There was no reason!";

      message.guild.members.unban(toBan, reason)

      message.channel.send(`${toBan} à était debanni avec succès!`)
  }

})



client.login(process.env.TOKEN);


client.on('ready', function () { 
  client.user.setActivity( prefix + "help")
})
