import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm'
import { Length, IsEmail, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import { Post } from './Post.entity';

@Entity()
@Unique(["username", "email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        default: "default.jpg"
    })
    avatar: string

    @Column()
    @Length(6, 30, { message: 'The username must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'Username is required' })
    username: string

    @Column()
    @Length(6, 30, { message: 'The firstname must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'Firstname is required' })
    firstName: string

    @Column()
    @Length(6, 30, { message: 'The lastname must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'Lastname is required' })
    lastName: string

    @Column()
    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'E-mail is required' })
    @Length(15, 100, { message: 'The e-mail must be at least 15 but not longer than 100 characters' })
    email: string

    @Column()
    @Length(6, 50, { message: 'The password must be at least 6 but not longer than 50 characters' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string

    @Column({
        default: 0
    })
    role: number

    @Column({
        default: 0
    })
    level: number

    @OneToMany(() => Post, post => post.author, {
        onDelete: 'CASCADE',
    })
    posts: Post[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}