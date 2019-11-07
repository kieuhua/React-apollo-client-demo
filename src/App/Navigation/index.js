import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';
import './style.css';
import Input from '../../Input';
import Button from '../../Button'

const Navigation = ({
    location: {pathname},
    organizationName,
    onOrganizationSearch,
}) => (
    <header className="Navigation">
        <div className="Navigation-link">
            <Link to={routes.PROFILE}>Porfile</Link>
        </div>
        <div className="Navigation-link">
            <Link to={routes.ORGANIZATION}>Organization</Link>
        </div>
        {pathname === routes.ORGANIZATION && (
            <OrganizationSearch  
                organizationName= {organizationName}
                onOrganizationSearch={onOrganizationSearch}
            />
        )}
    </header>
);

class OrganizationSearch extends React.Component {
    state = { value: this.props.organizationName,}

    onChange = event => {
        this.setState({ value: event.target.value});
    }

    // this onSubmit will call App onOrganizationSearch()
    onSubmit = event => {
        this.props.onOrganizationSearch(this.state.value);
        event.preventDefault();
    }
    render() {
        const { value} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <Input color={'white'} type="text" value={value} 
                        onChange={this.onChange}  />{' '}
                    <Button color={'white'} type="submit" >
                        Search
                    </Button>
                </form>
            </div>
        )
    }
}

// use HOC withRouter, so you can access current URL,
// which can use to show search field
export default withRouter(Navigation);