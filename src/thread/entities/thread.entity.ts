import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/auth/entities/user.entity";
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
  @Field(() => String, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Post, (post) => post.thread, {
    eager: true, 
    nullable: true, // ✅ Esto permite que Thread no tenga un Post asociado
    onDelete: "SET NULL" // 🔥 Si se borra un Thread, su referencia en Post será NULL
  })
  @Field(() => Post, { nullable: false }) 
  post?: Post;

  @OneToMany(() => Reply, (reply) => reply.thread, {
    eager: false, 
  })
  @Field(() => [Reply], { nullable: true }) // ✅ Evita errores si `reply` es null
  reply?: Reply[];

  @ManyToOne(
    () => User,
    ( user ) => user.id,
    {
        eager:true
    }
  )
  @Field(
    () => User, 
    { nullable: true }
  )
  createdBy?: User

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
