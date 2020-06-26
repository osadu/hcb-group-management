import React from 'react';
import './main.css';


const FormComponent = (props) => {

    let {
        handleSubmit,

        userFieldRef,
        userSearchText,
        handleChangeUserSearchInput,
        userSearchResultsIsFetch,
        userSearchResults,
        handleUserLiClick,

        groupFieldRef,
        groupSearchText,
        handleChangeGroupSearchInput,
        groupSearchResultsIsFetch,
        groupSearchResults,
        handleGroupLiClick

    } = props;

    return (
        <form className="aui" onSubmit={handleSubmit}>
            
            <div className="field-group" ref={userFieldRef}>
                    <label for="comment-email">Пользователь
                    <span className="aui-icon icon-required">(required)</span></label>
                    <input className="text medium-field" 
                        id="user-filter-userSearchFilter" 
                        placeholder="Логин" 
                        maxlength="255" 
                        name="userSearchFilter" 
                        type="text" 
                        value={userSearchText} 
                        onChange={handleChangeUserSearchInput}
                        autocomplete="off"/>
                    <div className="search-result-block">
                        {userSearchResultsIsFetch && 
                            <ul className="search-result">        
                                    {userSearchResults.map((m) => <li key={m} onClick={handleUserLiClick} data-name={m}>{m}</li>)}                                        
                            </ul>
                        }
                    </div>
            </div>
            
            <div className="field-group" ref={groupFieldRef}>
                    <label for="comment-email">Группа
                    <span className="aui-icon icon-required">(required)</span></label>
                    <input className="text medium-field"  
                        placeholder="Группа"
                        maxlength="255" 
                        name="groupSearchFilter" 
                        type="text" 
                        value={groupSearchText} 
                        onChange={handleChangeGroupSearchInput}
                        autocomplete="off"/>
                    <div className="search-result-block">
                        {groupSearchResultsIsFetch && 
                                <ul className="search-result">        
                                    {groupSearchResults.map((m) => <li key={m} onClick={handleGroupLiClick} data-name={m}>{m}</li>)}                                        
                                </ul>
                        }
                    </div>
            </div>

            <div className="buttons-container">
                    <div className="buttons">
                        <input className="button submit" type="submit" value="Добавить" id="comment-save-button"/>
                    </div>
            </div>
                                
        </form>
    );

}


export default FormComponent;
