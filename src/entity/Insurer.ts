import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Policy } from './Policy';

@Entity()
export class Insurer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(_type => Policy, policy => policy.policyType) 
    policies: Policy[];
}

export default Insurer;