import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

const statements = {
  ...defaultStatements,
};

export const ac = createAccessControl(statements);

/**
 * Super Admin
 * Full system access across all organizations.
 */
export const superAdmin = ac.newRole({
  ...adminAc.statements,
});

/**
 * Admin
 * Full system access across all organizations.
 */

export const admin = ac.newRole({
  ...adminAc.statements,
});


/**
 * User
 */
export const user = ac.newRole({});
