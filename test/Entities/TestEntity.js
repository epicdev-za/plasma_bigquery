const BQPlasmaEntity = require('../../BQPlasmaEntity');
class TestEntity extends BQPlasmaEntity {
    constructor(){
        super();
        this.uid = null;
        this.device_uid= null;
        this.page= null;
        this.parameter= null;
        this.value = null;
        this.datetime = null;
    }

    static getEntity(){
        return "energydrive-analytics.datalogging.data_1_second";
    }

    // static getPlasmaMapping(){
    //     return {...super.getPlasmaMapping(), ...{
    //             "_name": {"field":"name", "data_type":"VARCHAR", "data_length":255},
    //             "_string_test": {"field":"string_test", "data_type":"VARCHAR", "data_length":255},
    //             "_int_test": {"field":"int_test", "data_type":"INTEGER"},
    //             "_double_test": {"field":"double_test", "data_type":"double precision"},
    //             "_deleted": {"field":"deleted", "data_type":"BOOLEAN"}
    //            }};
    // }

    clean() {
        super.clean();
        // this.name = this.name.replace(/[^a-zA-Z0-9 ]/g, '');
    }


}

module.exports = TestEntity;
