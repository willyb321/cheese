import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Image {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column()
  width: number;

  @Column()
  height: number;

}
