const Botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client({disableEveryone: true});
let xp = require("./xp.json")
const fs = require("fs")

bot.on("ready", async => {
  console.log("i AM ONLINE!!! my name is " + `${bot.user.username}`);
  bot.user.setActivity(`SUBSCRIBE TO US AND HIM`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  let prefix = Botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if(message.channel.type === "dm") return message.channel.send("Sorry, you can't talk to me in DM's!").then(msg => msg.delete(1500));

let xpAdd = Math.floor(Math.random() * 7) + 8;

if(!xp[message.author.id]){
  xp[message.author.id] = {
    xp: 0,
    level: 1
  };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtlvl = xp[message.author.id].level * 300;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtlvl <= xp[message.author.id].xp){
  xp[message.author.id].level = curlvl + 1;

  let lvlup = new Discord.RichEmbed()
  .setTitle("You leveled up!!")
  .setColor("RANDOM")
  .addField("NEW LEVEL", curlvl + 1);

  message.channel.send(lvlup)
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
  if (err) console.log(err)
});

if(cmd === `${prefix}rank`||cmd === `${prefix}level`){
  message.channel.bulkDelete(1)
  if(!xp[message.author.id]){
    xp[mesage.author.id] = {
      xp: 0,
      level: 1
    };
  }
let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtlvl = curlvl * 300;
let difference = nxtlvl - curxp;

let lvlEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("RANDOM")
.addField("Level", curlvl, true)
.addField("XP", curxp, true)
.setFooter(`${difference} XP until you get your next level up`, message.author.displayAvatarURL);

message.channel.send(lvlEmbed)

}

if(cmd === `${prefix}test`){
  return message.reply("Hello, this bot works!");
}

if(cmd === `Bot-prefix`){
  return message.channel.send("Hello, my prefix is " + `${prefix}!`)
}
});

bot.login(Botconfig.token);
