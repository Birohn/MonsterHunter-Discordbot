const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
//API key in .env as global variable
const token = process.env.API_KEY;
//Prefix for commands
const PREFIX = '!';
//bot itself
const bot = new Discord.Client();
//Collection of command names
bot.commands = new Discord.Collection();
//array of file names ending with .js in commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
	
}

// events 

bot.on('ready',() => {
	console.log('This bot is online!');
	bot.guilds.forEach((guild) => {
		console.log(guild.name);
		guild.channels.forEach((channel) => {
			console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
		})
		let generalChannel = bot.channels.get("461288696616845314")
		//generalChannel.send("Hello Hunters! If you need help, type in `!help` into chat!");
	})
	
})


bot.on('message', msgbot=> {
	if(msgbot.author == bot.user) {
		return ;
	}
	if(!msgbot.content.startsWith(PREFIX)) {
		return ;
	}
	const args = msgbot.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	
	//if(!bot.commands.has(commandName)) return;
	//const command = bot.commands.get(commandName);
	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.alias && cmd.alias.includes(commandName));
	if(!command)return;
	if(command.args && !args.length) {
		return msgbot.channel.send(`You didn't provide any arguments, ${msgbot.author}!`);
	}
	try {
		command.execute(msgbot, args);
		//console.log(`Message: ${msgbot.content}`);
		//console.log(`args: ${args} commandName: ${commandName}`);
	} catch(error) {
		console.error(error);
		msgbot.reply('There was an error trying to execute that command!');
		
	}
	
})


bot.login(token);
