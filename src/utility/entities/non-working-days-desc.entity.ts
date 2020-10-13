import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("Description_Unique", ["description"], { unique: true })
@Entity("non_working_days_desc", { schema: "restourants" })
export class NonWorkingDaysDesc {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "description", unique: true, length: 32 })
  description: string;
}
