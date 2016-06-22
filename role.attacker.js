var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    creep.moveTo(Game.getObjectById('id170040'));
	    creep.attack(Game.getObjectById('id170040'));
	}
};

module.exports = roleAttacker;
