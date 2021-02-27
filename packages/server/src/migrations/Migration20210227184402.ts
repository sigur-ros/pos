import { Migration } from '@mikro-orm/migrations'

export class Migration20210227184402 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null, add column "username" text not null, add column "password" text not null;'
    )
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");')
  }
}
