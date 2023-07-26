import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import {CourseEntity} from '../../course/entities/course.entity'

@Entity('schedule')
export class ScheduleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @ManyToOne(()=> CourseEntity, course => course.schedule)
    @JoinColumn({name: "course_id"})
    course: CourseEntity;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}