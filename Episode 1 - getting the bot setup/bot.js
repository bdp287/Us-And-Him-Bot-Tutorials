const Botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client({disableEveryone: true});

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

if(cmd === `${prefix}test`){
  return message.reply("Hello, this bot works!");
}

if(cmd === `Bot-prefix`){
  return message.channel.send("Hello, my prefix is " + `${prefix}!`)
}
});

bot.login(Botconfig.token);
//end
