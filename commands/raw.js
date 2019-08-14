module.exports= {
	name: 'raw',
	description: 'Specify weapon and damage to find base raw damage',
	args:true,
	usage:'[weapon name] [damage]',
	
	execute(message,args) {
		const data =require("../data/weapon_modifiers.json");
		if(!args.length == 2 || args[1] < 0) {
			message.reply("Error. You either didn't suppy the right amount of arguments or given a number less than 0. Try again or type in `!help raw` for help.");

		}
		else if(!Number.isInteger(Number(args[1]))) {
			message.reply(`You must supply an integer`);
		}
		else {
			for(var i = 0; i < data.Weapon.length; i++) {
				if(args[0] === data.Weapon[i].name||(data.Weapon[i].hasOwnProperty('alias') && data.Weapon[i].alias.includes(args[0]))) {
					let rawnum = args[1]/data.Weapon[i].modifier;
					let raw =rawnum.toFixed(2);
					message.reply(`${data.Weapon[i].name} raw damage: ${raw}`);
					break;
				}
			}
			if(i == data.Weapon.length) {
				message.reply(`${args[0]} is not a weapon. Try again!`);
			}
		}
		
	}
}