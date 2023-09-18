import PlasmaJsGeneric from './PlasmaJsGeneric';
import {BigQuery} from '@google-cloud/bigquery';

class BQPlasmaJs extends PlasmaJsGeneric{


    constructor() {
        super();
    }

    query(query, parameters, callback) {
        // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
        const options = {
            query: query,
            // Location must match that of the dataset(s) referenced in the query.
            location: this.location,
            params: parameters,
        };
        if(callback === undefined){
            return new Promise(async (resolve, reject) => {
                // Run the query as a job
                this.bigquery.createQueryJob(options).then(([job]) => {
                    console.log(`Job ${job.id} started.`);
                    // Wait for the query to finish
                    job.getQueryResults().then(([rows]) => {
                        resolve([rows]);
                    }).catch((err2) => {
                        console.error(err2);
                        reject(err2);
                    });
                }).catch((err) => {
                    console.error(err);
                    reject(err);
                });
            });
        }else{
            this.bigquery.createQueryJob(options, (err, res) => {
                if(callback !== undefined){
                    callback(err, res.getQueryResults());
                }
            });
        }
    }

    fetch(entity, query, parameters, callback) {
        console.log(query);
        console.log("parameters ",parameters);
        let _this = this;
        if(callback === undefined) {
            return new Promise((resolve, reject) => {
                _this.query(query, parameters).then(([res]) => {
                    console.log('Rows:');
                    res.forEach(row => console.log(row));
                    let objects = [];
                    if (res !== undefined && res.length > 0) {
                        res.forEach(function (object, index) {
                            let tmp = new entity();
                            tmp.populateObject(object);
                            objects.push(tmp);
                        });
                    }
                    resolve(objects);
                }).catch((err) => {
                    reject(err);
                });
            });
        }else{
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    getByUUID(entity, uuid, callback) {
        let _this = this;
        if(callback === undefined){
            return new Promise((resolve, reject) => {
                _this.fetch(entity, "SELECT * FROM " + entity.getEntity() + " WHERE uuid = ? LIMIT 1", [uuid]).then((res) => {
                    console.log("getbyuid res ", res);
                    let object = undefined;
                    if (res !== undefined && res.length > 0) {
                        object = res[0];
                    }
                    resolve(object);
                }).catch((err) => {
                    reject(err);
                });
            });
        }else {
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    fetchPartial(entity, query, parameters, callback) {
        if(callback === undefined){
            return super.fetchPartial(entity, query, parameters, callback);
        }else{
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    list(entity, callback) {
        if(callback === undefined){
            return super.list(entity, callback);
        }else{
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    exists(entity, uuid, callback){
        let _this = this;
        const query = "SELECT uuid FROM " + entity.getEntity() + " WHERE uuid = ? LIMIT 1;";
        if(callback === undefined){
            return new Promise((resolve, reject) => {
                _this.query(query, [uuid], (err, res)=>{
                    if(res !== undefined && res.rows !== undefined && res.rows.length > 0){
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                });
            });
        }else{
            throw new Error("Callbacks have been deprecated please use promises");
        }
    }

    connect(config) {
        configIsset(config, 'location');
        this.bigquery = new BigQuery();
        this.location = config.location;
        PlasmaJsGeneric.setConnection = this;
    }

    closeConnection(){
        this.bigquery = null;
    }

    static get getConnection(){
        return this.connection;
    }

    static set setConnection(connection){
        this.connection = connection;
    }
}
export default  BQPlasmaJs;

/* PRIVATE */

function configIsset(object, key){
    if(object[key] === undefined){
        throw new Error("Missing required parameter '" + key + "'");
    }
}
