import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Channel {
  @Field(() => String, { description: 'Example field (placeholder)' })
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

  @Field()
  @Column()
  creator_id: string

  @Field()
  @Column()
  moderator_id: string // this could be a JSON schema, because a channel can be moderate by a group 

  @Field()
  @Column()
  rules: JSON

  @Field()
  @Column()
  report_threshold: number

  @Field()
  @Column()
  post_count: number

  @Field()
  @Column()
  tag: JSON

  @Field()
  @Column()
  theme: string
}
