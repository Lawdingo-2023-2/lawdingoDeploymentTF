import { Users } from './users';

export class Subscription {
//atributos
idSubscription: number = 0;
name: string = '';
amount: number = 0.0;
sub_start_date: Date =new Date(Date.now()); 
users: Users = new Users();
}
