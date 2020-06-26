import React from "react";
import "./main.css";

const UsersTableComponent = (props) => {

    let {users,
         deleteUser,
         deleteUserToGroup} = props;

    return (

        <table class="aui">
            <thead>
                <tr>
                    <th id="basic-number">Логин</th>
                    <th id="basic-fname">Полное имя</th>
                    <th id="basic-lname">Email</th>
                    <th id="basic-username">Группы</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>

                {users.map((user,index) => {

                    return (
                    
                    <tr key={index}>
                        <td>{user.login}</td>
                        <td>{user.displayName}</td>
                        <td>{user.email}</td>
                        <td>
                            <ul>
                                {user.groups.map((group,index) => {
                                    return <li key={index}>
                                        {group.name}
                                        {user.groups.length > 1 &&
                                           <a href="delete" data-userid={user.id} data-groupid={group.id} onClick={deleteUserToGroup} className="table-delete">Удалить</a>            
                                        }
                                    </li>
                                })}    
                            </ul>
                        </td>
                        <td>
                            <input data-userid={user.id} data-username={user.login} onClick={deleteUser} className="aui-button" type="button" value="Удалить"/>
                        </td>
                    </tr>

                    );

                })}

            </tbody>
        </table>

    );
}

export default UsersTableComponent;