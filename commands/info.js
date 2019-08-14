
module.exports = {
		name: 'info',
		description: 'General Monster Info.',
		args: false,
		usage:'[Monster Name]',
		execute(message, args) {
			//cehcks to see if there is an argument
			if(!args.length) {
				return message.channel.send(`Please supply the Monster\'s name! You can use !list for the list of monsters!`);
			}
			if(args.length) {
				const data = require("../data/Monster_info.json");
				let reply =[];
				for( let i = 0; i< data.LargeMonster.length; i++) {
					//sets the found argument to extract necessary info.
					 if(args.join(" ").toUpperCase()=== data.LargeMonster[i].name.toUpperCase()) {
						 let targetMonster = data.LargeMonster[i];
						 message.reply(`${targetMonster.Description}`);
						 break;
					 }
					 //returns a message with instruction if argument wasn't found
					 if( i == data.LargeMonster.length -1){
						 message.reply(`${args} is not a monster. Try again or type in !list for the monster list!`);
					 }
				}
			}
		},
};