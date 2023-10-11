import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    shortDescription: string;

    @Column()
    fullDescription: string;

    @Column()
    image: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
