import axios from 'axios';

const BASE_URL = 'http://localhost:2990/jira/rest/api/2/';
const CUSTOM_URL = 'http://localhost:2990/jira/rest/userGroupManagement/1.0/';
const MAIN_USER = 'admin';
const MAIN_GROUP = 'admin-groups-management';

export const AdminUserAPI = {

    getAllUser: () => {
        return axios.get( BASE_URL+'user/search?username=.').then( response => response.data );
    },

    searchUserPicker: (query) => {
        return axios.get( BASE_URL+'user/picker?query='+query+'&exclude='+MAIN_USER).then( response => response.data );
    },

    getAllGroups: () => {
        return axios.get( BASE_URL+'groups/picker').then( response => response.data.groups );
    },

    checkUser: (login) => {
        return axios.get(BASE_URL+"user?username="+login).then( response => response.data );
    },


    checkGroup: (groupname) => {
        return axios.get(BASE_URL+"group/member?groupname="+groupname).then( response => response.data );
    },

    addUserToGroup: (login) =>{
        return axios.post(BASE_URL+"group/user?groupname="+MAIN_GROUP,{ name: login}).then( response => response.data );
    },

    bindUserAndGroup: (login, displayName, email, groupname) => {
        return axios.post(CUSTOM_URL+"admin/bindUserAndGroup",{
            login,
            displayName,
            email,
            groupname
        }).then( response => response.data );
    },

    getBindedUsersAndGroups: () => {
        return axios.get(CUSTOM_URL+"admin/getAllUsers").then( response => response.data );
    },

    deleteUserFromGroup: (username) => {
        return axios.delete(BASE_URL+"group/user?groupname="+MAIN_GROUP+"&username="+username).then( response => response.data);
    },

    deleteUser: function(userId,username){
        return this.deleteUserFromGroup(username).then( response => axios.delete(CUSTOM_URL+"admin/deleteUser/"+userId).then( response => response.data));
    },

    deleteUserToGroup: (userId, groupId) => {
        return axios.delete(CUSTOM_URL+"admin/deleteUserToGroup/"+userId+"/"+groupId).then(response => response.data);
    }

};

export const AdminGroupAPI = {

    searchGroupPicker: (query) => {
        return axios.get( BASE_URL+'groups/picker?query='+query+'&exclude='+MAIN_GROUP).then( response => response.data );
    },

};
