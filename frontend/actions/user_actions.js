import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const CREATE_USER = 'CREATE_USER';

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
});

const sendUser = user => ({
    type: CREATE_USER,
    user
})

export const fetchUsers = () => dispatch => (
    UserApiUtil.fetchUsers()
    .then(users => dispatch(receiveUsers(users)))
)

export const fetchUser = (userId) => dispatch => (
    UserApiUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)))
)

export const updateUser = (user) => dispatch => (
    UserApiUtil.updateUser(user)
    .then(user => dispatch(receiveUser(user)))
)

export const createUser = user => dispatch => (
    UserApiUtil.signUp(user)
    .then(user => dispatch(sendUser(user)))
)