import { BaseEntity,Column,Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Employee } from "./Employee";
@Entity("employeeaddress")
    export class Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public street_name: string;
        @Column({ nullable: false })
        public state_name: string;
        @Column({ nullable: false })
        public house_number: string;
          

}