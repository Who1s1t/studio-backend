import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity'
import {ScheduleEntity} from "../../schedule/entities/schedule.entity";

@Entity('course')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    shortDescription: string;

    @Column()
    fullDescription: string;

    @ManyToMany(()=> UserEntity, user => user.courses)
    @JoinTable()
    users: UserEntity[];

    @OneToMany(() => ScheduleEntity, schedule => schedule.course)
    schedule: ScheduleEntity[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}

