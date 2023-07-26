import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity'

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

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}

