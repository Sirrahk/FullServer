import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
        //will examine the this.props.auth
        switch(this.props.auth){
            case null:
                return; //Want to display nothing
            case false:
                return <li><a href = "/auth/google"> Login With Google</a></li>   
            default:
                return <li><a>Logout </a></li>
        }
    }
    render() {

        return(
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Emaily
                    </a>
                    <ul className="right">
                        {
                            this.renderContent()
                        }
                    </ul>
                </div>
            </nav>
        
        );
    }
}
function mapStateToProps({ auth }){
    return {auth}
}
export default connect(mapStateToProps) (Header);