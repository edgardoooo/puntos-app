import firebase from 'firebase';
import { BUSINESS_SIGNUP_UPDATE, SIGNUP_BUSINESS, SIGNUP_BUSINESS_FAIL, SIGNUP_BUSINESS_SUCCESS, BUSINESS_SIGNUP_RESET } from './types';
import { Actions } from 'react-native-router-flux';

export const businessFormUpdate = ({ prop, value }) => {
  return {
    type: BUSINESS_SIGNUP_UPDATE,
    payload: { prop, value }
  };
};

export const businessSignUpReset = (dispatch) => {
  return {
    type: BUSINESS_SIGNUP_RESET
  };
};

export const businessSignUp = (props) => {
      return (dispatch) => {
      dispatch({ type: SIGNUP_BUSINESS });
      firebase.auth().createUserWithEmailAndPassword(props.email, props.password)
            .then(user => signUpBusinessSuccess(dispatch, user))
            .catch((response) => {
              if( response.code === 'auth/invalid-email'){
                signUpBusinessFail(dispatch, 'Invalid Email')
            }
            else {
              signUpBusinessFail(dispatch, 'Email Already Registered')
            }
            });
        };
      };

const signUpBusinessFail = (dispatch, error) => {
  dispatch({ type: BUSINESS_SIGNUP_UPDATE, payload: { prop: 'step', value: 1 }})
  dispatch({ type: SIGNUP_BUSINESS_FAIL, payload: error });
};

const signUpBusinessSuccess = (dispatch, user) => {
  dispatch(
    { type: SIGNUP_BUSINESS_SUCCESS, payload: user }
  );
  Actions.signUpSuccessBusiness();
};
