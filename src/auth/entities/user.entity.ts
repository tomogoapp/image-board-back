import { ObjectType, Field, Int, ID, HideField } from '@nestjs/graphql'
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { slug } from 'slug-gen'
import { Exclude } from 'class-transformer'

/* The above class defines a User entity with various properties such as id, email, backupEmail,
password, fullName, isActive, roles, and includes before insert and update hooks to convert email to
lowercase. */
@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string
 
    @Field(() => String)
    @Column('text',{
        unique:true
    })
    email: string

    @HideField()
    @Column('text',{
        select: false
    })
    password: string

    @Field(() => String)
    @Column('text')
    username: string

    @Field(() => String)
    @Column('bool',{
        default: true
    })
    isActive: boolean

    @Field(() => String)
    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[]

    @Field({ nullable: true })
    @Column({nullable:true})
    created_at?: Date
  
    @Field({ nullable: true })
    @Column({nullable:true})
    updated_at?: Date
  
    @Field({ nullable: true })
    @DeleteDateColumn({nullable:true})
    deleted_at?: Date

    // @OneToMany(
    //     () => Product,
    //     ( product ) => product.user
    // )
    // product: Product

    // @BeforeInsert()
    // lowerCaseBeforeInsert(){
    //     this.email = this.email.toLocaleLowerCase().trim()
    // }

    // @BeforeUpdate()
    // lowerCaseBeforeUpdate(){
    //     this.lowerCaseBeforeInsert()
    // }

}
