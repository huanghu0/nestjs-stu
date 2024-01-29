import { User } from "./user/entities/user.entity"
import { Student } from "./student/entities/student.entity"
export const login_test_config:any = {
    type: "mysql",
    name:'loginTestConnection',
    host:'localhost',
    port:3306,
    username:'root',
    password:'123456',
    database:'login_test',
    entities: [User],
    synchronize: true,
    logging:true,
    poolSize:10,
    connectorPackage:'mysql2',
    extra:{
      authPlugin:'sha256_password'
    }
}

export const test_config:any = {
    type: "mysql",
    name:'testConnection',
    host:'localhost',
    port:3306,
    username:'root',
    password:'123456',
    database:'test',
    entities: [Student],
    synchronize: true,
    logging:true,
    poolSize:10,
    connectorPackage:'mysql2',
    extra:{
      authPlugin:'sha256_password'
    }
}