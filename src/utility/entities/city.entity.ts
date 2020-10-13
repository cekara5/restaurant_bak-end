import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("City_Name_Unique", ["name"], { unique: true })
@Entity("city", { schema: "restourants" })
export class City {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 32 })
  name: string;
}
