import React, { CSSProperties } from "react";
declare const manywho: any;

/*
This class shows a chat history.

*/
export default class _URLChanger extends React.Component<any,any> {
    
    constructor(props: any) {
        super(props);
        window.location.href = this.props.parent.contentValue;
    }

    async componentDidMount() {
        
    }
    
    render() {
        
        return(
            <div/>
        );
    }
}