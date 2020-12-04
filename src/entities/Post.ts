import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToOne, JoinColumn, RelationId, ManyToOne } from 'typeorm'
import { Length, IsNotEmpty } from "class-validator";
import { User } from './User';

@Entity()
@Unique(["title"])
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    @Length(6, 30, { message: 'The title must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string

    @Column()
    @Length(6, 30, { message: 'The description must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'description is required' })
    description: string

    @Column()
    @IsNotEmpty({ message: 'Content is required' })
    @Length(15, 500, { message: 'The content must be at least 15 but not longer than 100 characters' })
    content: string

    @Column({ 
        type: "text", 
        array: true,
        default: {}
    })
    tags: string[];

    @ManyToOne(type => User, user => user.posts)
    author: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}

//Adicionar imagem
// upload/posts - post/image/1
// upload/avatar