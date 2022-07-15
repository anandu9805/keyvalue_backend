import { BaseEntity,Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
@Entity("department")
    export class department extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public dep_name: string;

        @OneToMany(() => Employee, (employee) => employee.department)
        @JoinColumn()
        public employee: Employee[];
}