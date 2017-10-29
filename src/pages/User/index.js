import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../components/Layout';

class User extends Component {

  render() {
    const { auth } = this.props;
    console.log(this.props.location);
    console.log(auth);
    return (
      <Layout>
        <div>
          <h1>User page</h1>
          <h2>{ auth.user.id }</h2>
        </div>
      </Layout>
    );
  }
}

User.propTypes = {
  location: PropTypes.object,
};

User.defualtProps = {
  location: {},
};

const mapState = ({ auth }) => ({ auth });

export default connect(mapState, undefined)(User);
