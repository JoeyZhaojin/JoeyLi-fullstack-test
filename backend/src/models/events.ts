import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn  } from 'typeorm';
import { IsNotEmpty, Matches } from 'class-validator';

@Entity()
export class Event {
  // Primary key id, auto generated
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  title!: string;

  @Column()
  @IsNotEmpty()
  message!: string;

  // Date auto generated
  @CreateDateColumn()
  date!: Date;

  // Owner, must have letters followed by numbers (e.g. joey123)
  @Column()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+[0-9]+$/, {
    message: 'Owner must have letters followed by numbers (e.g. joey123)',
  })
  owner!: string;
}

