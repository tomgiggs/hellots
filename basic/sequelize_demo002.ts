import * as sequelize from 'sequelize';
import { map } from 'bluebird';



// let sql = 'SELECT a.* FROM (SELECT * FROM d_product_deploy WHERE STATUS !=0 AND access_type=3) a LEFT JOIN (SELECT guid,`version`,flag FROM d_product_set )b ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL OR b.flag =4\n' +
//     'UNION\n' +
//     'SELECT a.* FROM (SELECT * FROM d_product_deploy WHERE STATUS !=0 AND access_type=1) a LEFT JOIN  (SELECT guid,`version`,flag FROM d_product_set )b  ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL OR b.flag =4\n' +
//     'UNION \n' +
//     'SELECT a.*   FROM (SELECT * FROM d_product_deploy WHERE STATUS !=0 AND access_type=2 ) a LEFT JOIN  (SELECT guid,`version`,flag FROM d_product_set ) b ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL OR b.flag =4\n'

let client= new sequelize(
    'vr_mmo',
    'root',
    '123',
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306,
        'define': {
            'underscored': true ,
            'charset': 'utf8',
            'collate': 'utf8_general_ci',
            'freezeTableName': true,
            'timestamps': true,
        },
        'pool': {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    }
);

let sql1 = "SELECT a.app_id,a.app_version FROM (SELECT app_id,app_version FROM d_product_deploy WHERE STATUS !=0 AND access_type=3) a " +
    "LEFT JOIN (SELECT guid,`version`,flag FROM d_product_set WHERE flag =4)b ON a.app_id=b.guid AND a.app_version=b.version WHERE b.version IS NULL";

let result = client.query(sql1, {
    // raw: true,
    type:sequelize.QueryTypes.SELECT

});

console.log(result.all().then((data) => {
    for(let row of data){
        console.log(row);
        // break;
        console.log(row.app_id+'_'+row.app_version+'_'+row.access_type+'_'+row.code_type+'_'+row.versioncode)
    }
    // console.log(data);
}));

