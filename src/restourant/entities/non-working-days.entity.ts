import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("non_working_days", { schema: "restourants" })
export class NonWorkingDays {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "restaurant_id" })
  restaurantId: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "description_id" })
  descriptionId: number;
}
