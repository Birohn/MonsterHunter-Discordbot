module.exports={
	name: 'list',
	description: 'List all the current Large Monsters.',
	args:false,
	
	execute(message, args) {
		let data = require("../data/Monster_info.json");
		let reply =[];
		for( let i = 0; i< data.LargeMonster.length; i++) {
			reply.push(data.LargeMonster[i].name);
		}
		message.reply(reply,{split:true});	
	},
	
};