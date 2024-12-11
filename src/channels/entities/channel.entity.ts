import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import GraphQLJSON from 'graphql-type-json'
import { User } from 'src/auth/entities/user.entity'

@ObjectType()
@Entity()
export class Channel {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  slug: string

  @Field()
  @Column()
  description: string

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  creator_id: User;

  // @Field()
  // @Column()
  // creator_id: string

  @Field()
  @Column()
  moderator_id: string // this could be a JSON schema, because a channel can be moderate by a group 

  @Field(() => GraphQLJSON)
  @Column('json')
  rules: JSON

  @Field()
  @Column()
  report_threshold: number

  @Field()
  @Column()
  post_count: number

  @Field(() => GraphQLJSON)
  @Column('json')
  tag: JSON

  @Field()
  @Column()
  theme: string
}
