import React, { Component } from "react";

import AUX from "../Hoc/hoc-aux";
import Model from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
           this.reqIntercptors= axios.interceptors.request.use(request => {
                // console.log(request);
                return request;
            }, error => {
                // console.log(error);
                this.setState({ error: error });
            });

            this.resIntercptors=axios.interceptors.response.use(response => {
                // console.log(response);
                return response;
            }, error => {
                // console.log(error);
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIntercptors);
            axios.interceptors.response.eject(this.resIntercptors);
        }

        closeErrorHandler =() =>{
            this.setState({error:null});
        }

        render() {
            return (
                <AUX>
                    <Model show={this.state.error} cancelPurchase={this.closeErrorHandler}>
                        {(this.state.error) ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props} />
                </AUX>
            );
        }
    };
};

export default withErrorHandler;