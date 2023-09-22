import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CourseEntity} from "../../course/entities/course.entity";

@Entity('teacher')
export class TeacherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    surname: string;

    @Column()
    lastname: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @OneToMany(() => CourseEntity, course => course.teacher)
    courses: CourseEntity[];




}
