import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('teacher')
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    surname: string;

    @Column()
    lastname: string;





}
