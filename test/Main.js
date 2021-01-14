const assert = require('assert');
const BQPlasmaJs = require('../BQPlasmaJs');
const TestEntity = require('./Entities/TestEntity');
const TestData = require("./Assets/data");
let test_confirm = {};
let test_count;
let config = {
    location: "EU",
};

describe('Plasma database interaction tests', function () {
    console.log("Running tests");

    let database;
    before(function() {
        database = new BQPlasmaJs();
        database.connect(config);
    });

    it('testing database query', function (done) {
        database.query("SELECT *  FROM `energydrive-analytics.datalogging.data` LIMIT 5").then(([rows]) => {
            console.log('Rows:');
            rows.forEach(row => console.log(row));

            done();
        }).catch((err) => {
            console.error(err);
            done();
        });
        // TestEntity.initialiseTable( (err,res)=>{
        //     if(err !== undefined){
        //         console.error(err);
        //         done(err);
        //     }else{
        //         const tests = TestData.test_entity;
        //         test_count = tests.length;
        //         savetests(tests, ()=>{
        //             done();
        //         });
        //     }
        });
    // });

    // it('testing database read and data comparison', function (done) {
//         TestEntity.list((err,res)=>{
//             assert.equal(Object.keys(res).length, test_count, 'Testing write count');
//             let cnt = 0;
//             res.forEach(function(obj, index){
//                 let test_obj = test_confirm[obj.uuid];
//                 assert.equal(obj.name, test_obj.name, 'Testing read on name');
//                 assert.equal(obj.string_test, test_obj.string_test, 'Testing read on string_test');
//                 assert.equal(obj.int_test, test_obj.int_test, 'Testing read on int_test');
//                 assert.equal(obj.double_test, test_obj.double_test, 'Testing read on double_test');
//                 cnt++;
//             });
//             done();
//         });
//     });
//
    it('testing get by uuid', function (done) {
        // let uuid = Object.keys(test_confirm)[0];
        TestEntity.get("01ff513e-c845-4966-b7e5-c39b5cbcba58").then((obj) => {
            assert.equal(obj.uuid, "01ff513e-c845-4966-b7e5-c39b5cbcba58", 'Testing read on uuid');
            done();
        }).catch((err) => {
            console.error(err);
            done();
        });
    });
});
//
//     it('testing count method', function (done) {
//         TestEntity.count((err,cnt)=>{
//             assert.equal(cnt, test_count, 'Testing count value');
//             done();
//         });
//     });
//
//     it('testing delete', function (done) {
//         test_count--;
//         let uuid = Object.keys(test_confirm)[0];
//         TestEntity.get(uuid, (err,obj)=>{
//             obj.delete((err,res)=>{
//                 if(err !== undefined){
//                     console.error(err);
//                     done(err);
//                 }else{
//                     TestEntity.count((err,cnt)=>{
//                         assert.equal(cnt, test_count, 'Testing count value after delete');
//                         done();
//                     });
//                 }
//             });
//         });
//     });
//
//     after(function() {
//         database.query("drop table " + TestEntity.getEntity(), [], (err,res)=>{
//             if(err === undefined){
//                 console.log("Cleaned test database successfully");
//             }else{
//                 console.error("Failed to clean test database successfully");
//                 console.error(err);
//             }
//             database.closeConnection();
//         });
//     });
// });
//
// function savetests(tests, callback){
//     let inc = 1;
//     tests.forEach(function(obj, index){
//         let test = new TestEntity().initialise();
//         test_confirm[test.uuid]=obj;
//         test.name = obj.name;
//         test.string_test = obj.string_test;
//         test.int_test = obj.int_test;
//         test.double_test = obj.double_test;
//
//         test.save((err,res)=>{
//             if(err !== undefined){
//                 console.error(err);
//             }
//             if(inc === tests.length){
//                 callback();
//             }
//             inc++;
//         });
//     });
// }

