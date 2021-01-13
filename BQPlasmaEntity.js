const BQPlasmaJs = require('./BQPlasmaJs');
const PlasmaEntity = require('plasma/PlasmaEntity');
const uuidv4 = require('uuid/v4');

class BQPlasmaEntity extends PlasmaEntity{

    clean() {
        super.clean();
    }

    save(callback) {
        return super.save(callback);
    }

    insert(callback) {
        return super.insert(callback);
    }

    update(callback) {
        return super.update(callback);
    }

    delete(callback) {
        return super.delete(callback);
    }

    populateObject(object, readonly) {
        super.populateObject(object, readonly);
    }

}

