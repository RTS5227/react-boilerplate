import {Schema, arrayOf, valuesOf} from 'normalizr'

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

export const userSchema = new Schema('users', {
    idAttribute: 'id'
});

export const custmerSchema = new Schema('customers', {
    idAttribute: 'id'
});

export const sessionSchema = new Schema('session', {
    idAttribute: 'id'
});

export const roleSchema = new Schema('roles', {
    idAttribute: 'id'
});

export const roleMemberSchema = new Schema('roleMembers', {
    idAttribute: 'id'
});

// Schemas for Github API responses.
export default {
    CUSTOMER: valuesOf(custmerSchema),
    USER: valuesOf(userSchema),
    USER_ARRAY: arrayOf(userSchema),
    SESSION: valuesOf(sessionSchema),
    ROLE: valuesOf(roleSchema),
    ROLE_ARRAY: arrayOf(roleSchema),
    ROLE_MEMBER: valuesOf(roleMemberSchema),
    ROLE_MEMBER_ARRAY: arrayOf(roleMemberSchema)
};
