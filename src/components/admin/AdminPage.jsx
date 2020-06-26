import React from 'react';
import { AdminUserAPI, AdminGroupAPI }  from '../../api/UserGroupManagementAPI';
import './main.css';
import ErrorComponent from '../commons/error/ErrorsComponent';
import UsersTableComponent from './UsersTableComponent';
import FormComponent from './FormComponent';


class GroupsManagement extends React.Component{


    constructor(props){
        super(props);
        this.userFieldRef = React.createRef();
        this.groupFieldRef = React.createRef();
    }

    state = {
        userSearchResults: [],
        userSearchText: '',
        userSearchResultsIsFetch: false,

        groupSearchResults: [],
        groupSearchText: '',
        groupSearchResultsIsFetch: false,

        errorMessages: [],

        bindedUsersAndGroups: []
    }
    

    componentDidMount(){
        
        AdminUserAPI.getBindedUsersAndGroups().then( data => {
            this.setState({bindedUsersAndGroups : data});
        });

        document.addEventListener("click", this.handleClickOnDocument);

    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOnDocument);
    }

    handleClickOnDocument = (event) => {
        let userFieldRef = this.userFieldRef.current;
        let groupFieldRef = this.groupFieldRef.current;

        this.searchResultBlockSetStyle(event.path.includes(userFieldRef.childNodes[1]),userFieldRef.lastChild);
        this.searchResultBlockSetStyle(event.path.includes(groupFieldRef.childNodes[1]),groupFieldRef.lastChild);
    }

    searchResultBlockSetStyle = (isVisible, objRef) => {
        objRef.style.display = isVisible ? "block" : "none";
    }

    handleClickDelete = (apiMethod, params) => {

        apiMethod(...params).then(data => {
            
            AdminUserAPI.getBindedUsersAndGroups().then( data => {
                
                this.setState({
                    userSearchText: '',
                    groupSearchText: '',
                    bindedUsersAndGroups: data
                 });

             });
            
        }).catch(error => {
            
            if(error.response.data.errorText){
                this.setState({errorMessages: [ ...this.state.errorMessages, error.response.data.errorText ]});
                return;
            }

        });
    }

    handleChangeSearchInput = (query, apiMethod, searchTextParamName, searchResultIsFetchParamName, searchResultsParamName, array) => {

        this.setState({
            errorMessages: []
        });
          
        if(query.length > 0){
             this.setState({ [searchTextParamName]: query });
             
             apiMethod(query).then( data => {
                
                 if(data[array].length > 0){
                     this.setState({ 
                        [searchResultIsFetchParamName]: true, 
                        [searchResultsParamName]: data[array].map(m=> m.name)
                     });
                 }else{
                     this.setState({
                        [searchResultIsFetchParamName]: false,
                        [searchResultsParamName]: []
                     });
                 }
 
             });
 
        }else{
            this.setState({
                [searchResultIsFetchParamName]: false,
                [searchResultsParamName]: [],
                [searchTextParamName]: ''
            });
        }

    }

    handleChangeUserSearchInput = (e) => {
       this.handleChangeSearchInput(e.target.value, 
                                    AdminUserAPI.searchUserPicker, 
                                    "userSearchText", 
                                    "userSearchResultsIsFetch", 
                                    "userSearchResults", 
                                    "users");
    }

    handleChangeGroupSearchInput = (e) => {
        this.handleChangeSearchInput(e.target.value, 
            AdminGroupAPI.searchGroupPicker, 
            "groupSearchText", 
            "groupSearchResultsIsFetch", 
            "groupSearchResults", 
            "groups");
    }

    handleUserLiClick = (e) => {
        this.setState({
            userSearchResultsIsFetch: false,
            userSearchResults: [],
            userSearchText: e.currentTarget.dataset.name
        });
    }

    handleGroupLiClick = (e) => {
        this.setState({
            groupSearchResultsIsFetch: false,
            groupSearchResults: [],
            groupSearchText: e.currentTarget.dataset.name
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            userSearchResultsIsFetch: false,
            userSearchResults: [],
            groupSearchResultsIsFetch: false,
            groupSearchResults: []
        });

        let errors = []; 

        if(!this.state.userSearchText)
           errors = [...errors, 'Заполните имя пользователя'];
        if(!this.state.groupSearchText)
           errors = [...errors, 'Заполните имя группы'];

        if(errors.length > 0){
            this.setState({ errorMessages: errors });
            return;
        }

        AdminUserAPI.checkGroup(this.state.groupSearchText).then(data => {

            return AdminUserAPI.checkUser(this.state.userSearchText);

        }, error => {
    
            if(error.response.data.errorMessages){
                this.setState({errorMessages: [...this.state.errorMessages, 
                    ...error.response.data.errorMessages ]});
                return;
            }

        }).then(data => {

            if(!data)
              return;

            return AdminUserAPI.bindUserAndGroup(data.name, data.displayName,data.emailAddress,this.state.groupSearchText);
        },error => {
    
            if(error.response.data.errorMessages){
                this.setState({errorMessages: [...this.state.errorMessages, 
                    ...error.response.data.errorMessages ]});
                return;
            }

        }).then(data => {

            if(!data)
              return;

            return AdminUserAPI.addUserToGroup(this.state.userSearchText);

        }, error => {

            if(error.response.data.errorText){
                this.setState({errorMessages: [ ...this.state.errorMessages, error.response.data.errorText ]});
                return;
            }

        }).finally(data => {

            AdminUserAPI.getBindedUsersAndGroups().then( data => {
                this.setState({
                    userSearchText: '',
                    groupSearchText: '',
                    bindedUsersAndGroups: data
                 });

             });
        });

    }

    handleDeleteUserClick = (e) => {
        this.handleClickDelete(AdminUserAPI.deleteUser.bind(AdminUserAPI), [e.currentTarget.dataset.userid,e.currentTarget.dataset.username]);
    }

    handleDelteUsetToGroup = (e) => {
        e.preventDefault();
        this.handleClickDelete(AdminUserAPI.deleteUserToGroup, [e.currentTarget.dataset.userid,e.currentTarget.dataset.groupid]);
    }

    render(){

        let { 
               userSearchResults, 
               userSearchText, 
               userSearchResultsIsFetch,

               groupSearchResults,
               groupSearchText,
               groupSearchResultsIsFetch,

               errorMessages,

               bindedUsersAndGroups
        
            } = this.state;

        return (

             <div className="aui-page-panel">
                 

                <FormComponent handleSubmit={this.handleSubmit}

                    userFieldRef={this.userFieldRef}
                    userSearchText={userSearchText}
                    handleChangeUserSearchInput={this.handleChangeUserSearchInput}
                    userSearchResultsIsFetch={userSearchResultsIsFetch}
                    userSearchResults={userSearchResults}
                    handleUserLiClick={this.handleUserLiClick}

                    groupFieldRef={this.groupFieldRef}
                    groupSearchText={groupSearchText}
                    handleChangeGroupSearchInput={this.handleChangeGroupSearchInput}
                    groupSearchResultsIsFetch={groupSearchResultsIsFetch}
                    groupSearchResults={groupSearchResults}
                    handleGroupLiClick={this.handleGroupLiClick}
                />
                
                {errorMessages.length > 0 && 
                    <ErrorComponent errors={errorMessages}/>
                }

                {bindedUsersAndGroups.length > 0 &&
                    <UsersTableComponent users = {bindedUsersAndGroups} 
                                        deleteUser={this.handleDeleteUserClick}
                                        deleteUserToGroup={this.handleDelteUsetToGroup}/>
                }
                                 
             </div>

        );
    }
}

export default GroupsManagement;