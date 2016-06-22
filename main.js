var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleAttacker = require('role.attacker');
var i = 0;
var h = Game.spawns.Spawn1.memory.section;
if(h==null){
    Game.spawns.Spawn1.memory.section=0;
}
var count_harvester = 0;
module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var attacker = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
    console.log("----------------------------------");
    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgrader: ' + upgrader.length);
    console.log('Attackers: ' + attacker.length);
    console.log("----------------------------------");

    if(harvesters.length < 16) {
        var error = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', section: Game.spawns.Spawn1.memory.section})
        if(error!=ERR_NOT_ENOUGH_RESOURCES&&error!=ERR_BUSY){
            h = Game.spawns.Spawn1.memory.section;
            h++;
            Game.spawns.Spawn1.memory.section = h;
            if(Game.spawns.Spawn1.memory.section==2&&attacker.length==0){
                Game.spawns.Spawn1.memory.section=3;
            }
            if(Game.spawns.Spawn1.memory.section==4){
                Game.spawns.Spawn1.memory.section=0;
            }
            console.log("----------------------------------");
            console.log('Spawning new harvester:');
            console.log("Name: "+ error);
            console.log("Section: "+Game.spawns.Spawn1.memory.section);
            console.log("----------------------------------");
        }else{
            console.log('No spawning');
            console.log('Next will spawn on '+Game.spawns.Spawn1.memory.section);
            console.log("----------------------------------");
        }
    }else if(upgrader.length < 2) {
        i++;
        if(i>=3){
            i=0;
        }
        var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader', section: i});
        console.log('Spawning new upgrader: ' + newName);
    }else if(attacker.length < 2) {
        i++;
        if(i>=3){
            i=0;
        }
        var newName = Game.spawns.Spawn1.createCreep([ATTACK,MOVE], undefined, {role: 'attacker', section: i});
        console.log('Spawning new attacker: ' + newName);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, creep.memory.section);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, creep.memory.section);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
    }
}
