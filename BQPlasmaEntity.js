const BQPlasmaJs = require('./BQPlasmaJs');
const PlasmaEntity = require('plasma/PlasmaEntity');
const uuidv4 = require('uuid/v4');

class BQPlasmaEntity extends PlasmaEntity{

    constructor(){
        super();
        this._uuid = null;
        this.plasma_meta ={};
    }

    clean(){
        if(!this.uuid.match(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/)){
            throw new Error("Invalid UUID");
        }
    }

    insert(callback){
        const ENTITY = this.constructor.getEntity();
        const PLASMA_MAPPING = this.constructor.getPlasmaMapping();

        let query = "INSERT INTO " + ENTITY;
        let fields = Object.keys(this);
        let fields_query = " (";
        let values_query = " VALUES(";
        let object_values = Object.values(this);
        let parameters = [];
        let parameter_index = 1;
        let obj = this;
        fields.forEach(function(field, index){
            if(field !== "plasma_meta") {
                field = obj.constructor.fieldModifier(field);
                parameters.push(object_values[index]);
                if (PLASMA_MAPPING[field] !== undefined) {
                    field = PLASMA_MAPPING[field].field;
                }
                if (parameter_index === 1) {
                    fields_query += field;
                    values_query += "?" + parameter_index;
                } else {
                    fields_query += ", " + field;
                    values_query += ", ?" + parameter_index;
                }
                parameter_index++;
            }
        });

        query += fields_query + ")" + values_query + ");";

        let _this = this;
        if(callback === undefined){
            return new Promise((resolve, reject) => {
                BQPlasmaJs.getConnection.query(query, parameters).then((res) => {
                    let plasma_meta = _this.plasma_meta;
                    plasma_meta.exists = true;
                    _this.plasma_meta = plasma_meta;
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        }else{
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    update(callback){
        const ENTITY = this.constructor.getEntity();
        const PLASMA_MAPPING = this.constructor.getPlasmaMapping();

        let query = "UPDATE " + ENTITY + " SET";
        let fields = Object.keys(this);
        let fields_query = " ";
        let object_values = Object.values(this);
        let parameters = [];
        let obj = this;
        let parameter_index = 1;
        fields.forEach(function(field, index){
            if(field !== "plasma_meta") {
                field = obj.constructor.fieldModifier(field);
                parameters.push(object_values[index]);
                if (PLASMA_MAPPING[field] !== undefined) {
                    field = PLASMA_MAPPING[field].field;
                }
                if (parameter_index === 1) {
                    fields_query += field + " = ?" + parameter_index;
                } else {
                    fields_query += ", " + field + " = ?" + parameter_index;
                }
                parameter_index++;
            }
        });

        query += fields_query + " WHERE uuid = ?" + parameter_index;
        parameters.push(this.uuid);

        let _this = this;
        if(callback === undefined){
            return new Promise((resolve, reject) => {
                BQPlasmaJs.getConnection.query(query, parameters).then((res) => {
                    let plasma_meta = _this.plasma_meta;
                    plasma_meta.exists = true;
                    _this.plasma_meta = plasma_meta;
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            });
        }else{
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    update(callback) {
        return super.update(callback);
    }

    delete(callback) {
        return super.delete(callback);
    }

    static get(uuid, callback){
        return BQPlasmaJs.getConnection.getByUUID(this, uuid, callback);
    }

    populateObject(object, readonly) {
        super.populateObject(object, readonly);
    }

}
module.exports = BQPlasmaEntity;
