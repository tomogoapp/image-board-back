import { Field, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/entities/post.entity";
import { Reply } from "src/replies/entities/reply.entity";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Thread {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (post) => post.thread, {
    eager: true, // Solo cargar los Posts automáticamente
    nullable: false,
  })
  @Field(() => Post)
  post?: Post;

  @OneToMany(() => Reply, (reply) => reply.thread, {
    eager: false, // Carga explícita para evitar ciclos
  })
  @Field(() => [Reply])
  reply?: Reply[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  created_at?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updated_at?: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @BeforeInsert()
  setCreatedAt() {
    const currentDate = new Date();
    this.created_at = currentDate;
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updated_at = new Date();
  }
}
