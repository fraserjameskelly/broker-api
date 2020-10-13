import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Insurer } from './Insurer';
import { PolicyType } from './PolicyType';

@Entity()
export class Policy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    customerAddress: string;

    @Column("double")
    premium: number;

    @ManyToOne(_type => PolicyType, policyType => policyType.policies)
    @JoinColumn()
    policyType: PolicyType;

    @ManyToOne(_type => Insurer, insurer => insurer.policies)
    @JoinColumn()
    insurer: Insurer;
}

export default Policy;