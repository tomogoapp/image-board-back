
import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { slug } from 'slug-gen'
import { User } from "src/auth/entities/user.entity"

const date = Date

@ObjectType()
@Entity()
export class Post {
  //@Field(() => Int, { description: 'Example field (placeholder)' })
  //exampleField: number;
  
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => User)
  @ManyToOne(
  () => User,
  ( user ) => user.id,
  {
      eager:true
  }
  )
  createdBy: User

  @Field(() => String)
  @Column()
  title: string

  @Field()
  @Column()
  content: string

  @Field()
  @Column()
  slug: string

  @Field({ nullable: true })
  @Column({nullable:true})
  created_at?: Date

  @Field({ nullable: true })
  @Column({nullable:true})
  updated_at?: Date

  @Field({ nullable: true })
  @DeleteDateColumn({nullable:true})
  deleted_at?: Date

  @BeforeInsert()
  slugBeforeInsert(){
    this.slug = slug(this.title)
  }


  @BeforeInsert()
  setCreatedAt() {
    const currentDate = new Date()
    this.created_at = currentDate
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updated_at = new Date()
  }



}
