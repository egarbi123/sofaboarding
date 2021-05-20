import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const CREATE_USER = 'CREATE_USER';
export const RECEIVE_BIO = 'RECEIVE_BIO'

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

const receiveBio = bio => ({
    type: RECEIVE_BIO,
    bio
})

export const createBio = (bio) => dispatch => (
    UserApiUtil.createBio(bio)
    .then(bio => dispatch(receiveBio(bio)))
)

export const updateBio = data => dispatch => {
    console.log(data);
    return UserApiUtil.updateBio(data)
        .then(bio => dispatch(receiveBio(bio)))
}

export const fetchUsers = () => dispatch => (
    UserApiUtil.fetchUsers()
    .then(users => dispatch(receiveUsers(users)))
)

export const fetchUser = (userId) => dispatch => (
    UserApiUtil.fetchUser(userId)
    .then(user => dispatch(receiveUser(user)))
)

export const updateUser = (data) => dispatch => {
    console.log(data);
    return UserApiUtil.updateUser(data)
        .then(user => dispatch(receiveUser(user)))
}

export const createUser = user => dispatch => (
    UserApiUtil.signUp(user)
    .then(user => dispatch(sendUser(user)))
)