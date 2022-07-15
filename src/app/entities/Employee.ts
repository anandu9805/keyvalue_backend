import { BaseEntity,Column,Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./Abstract";
import { Address } from "./Address";
import { department } from "./Department";
@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;
       
        @Column({ nullable:true })
        public password: string;
       
        @Column({ nullable:true })
        public role: string;



   @ManyToOne(() => department//this is entity name not table name
   , { cascade: true })
   @JoinColumn()
   public department: department;

       @Column({ nullable: false })
       public departmentId: string;
    @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    public address:Address;
     
    @Column({ nullable: false })
    public addressId: string;
}
