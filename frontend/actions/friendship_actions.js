import * as FriendshipApiUtil from '../util/friendship_api_util';

export const RECEIVE_FRIEND_REQUEST = 'RECEIVE_FRIEND_REQUEST';
export const RECEIVE_ALL_FRIEND_REQUESTS = 'RECEIVE_ALL_FRIEND_REQUESTS';
export const RECEIVE_FRIENDSHIP = 'RECEIVE_FRIENDSHIP';
export const RECEIVE_ALL_FRIENDSHIPS = 'RECEIVE_ALL_FRIENDSHIPS';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';
export const SET_ACTIVE_FRIEND = 'SET_ACTIVE_FRIEND';
export const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

const receiveFriendRequest = (friendRequest) => ({
    type: RECEIVE_FRIEND_REQUEST,
    friendRequest
})

const receiveAllFriendRequests = (requests) => ({
    type: RECEIVE_ALL_FRIEND_REQUESTS,
    requests
})

const removeFriendRequest = (request) => ({
    type: REMOVE_FRIEND_REQUEST,
    request
})

const removeFriendship = (friendship) => ({
    type: REMOVE_FRIENDSHIP,
    friendship
})

const receiveFriendship = (friendship) => ({
    type: RECEIVE_FRIENDSHIP,
    friendship
})

const receiveAllFriendships = (friendships) => ({
    type: RECEIVE_ALL_FRIENDSHIPS,
    friendships
})

const setActiveFriend = friendId => ({
    type: SET_ACTIVE_FRIEND,
    friendId
})

export const makeActiveFriend = friendId => dispatch => (
    dispatch(setActiveFriend(friendId))
)

export const sendFriendRequest = (friendRequest) => dispatch => (
    FriendshipApiUtil.createFriendRequest(friendRequest)
    .then(friendRequests => dispatch(receiveAllFriendRequests(friendRequests)))
)

export const fetchAllRequests = () => dispatch => (
    FriendshipApiUtil.fetchFriendRequests()
    .then(requests => dispatch(receiveAllFriendRequests(requests)))
)

export const deleteFriendRequest = (request) => dispatch => (
    FriendshipApiUtil.deleteFriendRequest(request)
    .then(request => dispatch(removeFriendRequest(request)))
)

export const deleteFriendship = (friendshipId) => dispatch => (
    FriendshipApiUtil.deleteFriendship(friendshipId)
    .then(friendships => dispatch(receiveAllFriendships(friendships)))
)

export const createFriendship = (friendship) => dispatch => (
    FriendshipApiUtil.createFriendship(friendship)
    .then(friendship => dispatch(receiveFriendship(friendship)))
)

export const fetchAllFriendships = () => dispatch => (
    FriendshipApiUtil.fetchFriendships()
    .then(friendships => dispatch(receiveAllFriendships(friendships)))
)