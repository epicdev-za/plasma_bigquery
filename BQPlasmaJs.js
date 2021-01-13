const PlasmaJs = require('plasma/PlasmaJs');
const {BigQuery} = require('@google-cloud/bigquery');

class BQPlasmaJs extends PlasmaJs{


    constructor() {
        super();
    }

    query(query, parameters, callback) {
        // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
        const options = {
            query: query,
            // Location must match that of the dataset(s) referenced in the query.
            location: this.location,
        };
        if(callback === undefined){
            return new Promise(async (resolve, reject) => {
                // Run the query as a job
                this.bigquery.createQueryJob(options).then(([job]) => {
                    console.log(`Job ${job.id} started.`);
                    // Wait for the query to finish
                    job.getQueryResults().then(([rows]) => {
                        console.log('Rows:');
                        rows.forEach(row => console.log(row));
                        resolve(rows);
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

        }
    }

    fetch(entity, query, parameters, callback) {
        return super.fetch(entity, query, parameters, callback);
    }

    getByUUID(entity, uuid, callback) {
        return super.getByUUID(entity, uuid, callback);
    }

    fetchPartial(entity, query, parameters, callback) {
        return super.fetchPartial(entity, query, parameters, callback);
    }

    list(entity, callback) {
        return super.list(entity, callback);
    }

    exists(entity, uuid, callback) {
        return super.exists(entity, uuid, callback);
    }

    connect(config) {
        configIsset(config, 'location');
        this.bigquery = new BigQuery();
        this.location = config.location;
        PlasmaJs.setConnection = this;
    }

    closeConnection() {
        super.closeConnection();
    }
}
module.exports = BQPlasmaJs;

/* PRIVATE */

function configIsset(object, key){
    if(object[key] === undefined){
        throw new Error("Missing required parameter '" + key + "'");
    }
}
