import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn, OneToMany, ManyToOne, JoinColumn
} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity'
import {ScheduleEntity} from "../../schedule/entities/schedule.entity";
import {TeacherEntity} from "../../teacher/entities/teacher.entity";
import { Type } from 'class-transformer';

@Entity('course')
export class CourseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    hours: number;

    @Column()
    day: string;

    // @Column()
    // startDate: Date;
    //
    // @Column()
    // endDate: Date;

    @Column()
    image: string;

    @Column()
    open: boolean;

    @Column()
    shortDescription: string;

    @Column()
    fullDescription: string;

    @ManyToMany(()=> UserEntity, user => user.courses)
    @JoinTable()
    users: UserEntity[];

    @OneToMany(() => ScheduleEntity, schedule => schedule.course)
    schedule: ScheduleEntity[];

    @ManyToOne(()=> TeacherEntity, teacher => teacher.courses)
    @JoinColumn({name: "teacher_id"})
    teacher: TeacherEntity;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}

