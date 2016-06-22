var roleUpgrader = {

    /** @param {Creep} creep **/
    /** @param {var} section **/
    run: function(creep, section) {
	    if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[section]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[section]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
