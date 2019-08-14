module.exports = {
	name:"hitdata",
	description:"Gives the chart of the hit values on the monster.",
	usage:"[Monster Name]",
	args: true,
	execute(message,args) {
		const data = require("../data/practice.json");
		let reply =[];
		for( let i = 0; i< data.LargeMonster.length; i++) {
			//sets the found argument to extract necessary info.
			 if(args.join(" ").toLowerCase()=== data.LargeMonster[i].name.toLowerCase()) {
				let targetMonster = data.LargeMonster[i];
				delete targetMonster.name;

				for(var keys in targetMonster) {
					reply.push(keys + ":|" + formatAsTable(targetMonster[keys]));
				}
				message.channel.send(reply,{split:true});
				 break;
			}
			 if(i == data.LargeMonster.length -1) {
				  message.reply(`${args} is not a monster. Try again or type in !list for the monster list!`);
			}
		}
	},
	
	
};

function formatAsTable(arr) {
	var oldArr = arr.map(String);
	oldArr = oldArr.map(num => num.padStart(4).padEnd(4).concat("|"));
	
	oldArr = oldArr.join("");
	
	return oldArr
}