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
  @Field()
  creator_id: User;

  // @Field()
  // @Column()
  // creator_id: string

  @Field(() => [User], { nullable: true })
  @Column('json', { nullable: true }) // Esto permite usar JSON para moderadores múltiples
  moderators: User[] | null;

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
