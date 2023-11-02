import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {CourseEntity} from '../../course/entities/course.entity'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

   @ManyToMany(()=> CourseEntity, course => course.users)
    courses: CourseEntity[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
