import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `
    INSERT
    INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
    VALUES('${id}', 'Admin', 'admin@rentx.com.br', '${password}', 'XXXXXXXX', true, 'now()')
    `
  );

  await connection.close();
}

create().then(() => console.log('User admin created'));
