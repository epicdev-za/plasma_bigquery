
class PlasmaJsGeneric {

    /**
     * Query method with callback
     * @param query
     * @param parameters
     * @param callback
     */
    query(query, parameters, callback){

    }

    fetch(entity, query, parameters, callback){

    }

    getByUUID(entity, uuid, callback){

    }

    /**
     * Allows queries to retrieve only desired fields, object will return with a readonly flag and cannot be saved
     * @param entity
     * @param query
     * @param parameters
     * @param callback
     */
    fetchPartial(entity, query, parameters, callback){

    }

    list(entity, callback){

    }

    exists(entity, uuid, callback){

    }

    /**
     * Connect method starts connection pool
     * @param config
     */
    connect(config){

    }

    /**
     * closeConnection must be called before closing the script to free up connection on server
     */
    closeConnection(){
    }

    static get getSchema(){
        return this.schema;
    }

    static get getConnection(){
        return this.connection;
    }

    static set setConnection(connection){
        this.connection = connection;
    }

    static set setSchema(schema){
        this.schema = schema;
    }
}
export default PlasmaJsGeneric;

/* PRIVATE */

function configIsset(object, key){
    if(object[key] === undefined){
        throw new Error("Missing required parameter '" + key + "'");
    }
}
