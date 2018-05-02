import React, { Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom' ;
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    // renderTitleField(field){
    //     return(
    //         <div className="form-group">
    //             <label>Title</label>
    //             <input className="form-control"
    //             //onChange={field.input.onChange}
    //             //onFocus={field.input.onFocus}
    //             //onBlur={field.input.onBlur}
    //             {...field.input}
    //             />
    //         </div>
    //     );
    // }

    renderField(field){

        //console.log(field);

        const {meta : {touched, error }} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                //onChange={field.input.onChange}
                //onFocus={field.input.onFocus}
                //onBlur={field.input.onBlur}
                {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>                
            </div>
        );
    }

    onSubmit(values){
        //console.log(values);        
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
        
    }

    render() {

        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    name="title" 
                    label="Title for Post"
                    component={this.renderField}
                />
                <Field 
                    name="categories" 
                    label="categories" 
                    component={this.renderField}
                />
                <Field 
                    name="content" 
                    label="Post Content" 
                    component={this.renderField}
                />
                <button 
                    type="submit"                    
                    className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                     Cancel
                </Link>        
            </form>
        );
    }
}

function validate(values){
    //console.log(values); -> { title: 'asdf', categories: 'asf'}

    const errors = {};

    // if(!values.title.length){
    //     errors.title = "Enter a title that is at least 3 characters!";
    // }

    if(!values.title){
        errors.title = "Enter a title!";
    }

    if(!values.categories){
        errors.categories = "Enter some categories!";
    }

    if(!values.content){
        errors.content = "Enter some content please!";
    }

    return errors;
}

export default reduxForm({ 
    validate,
    form: 'PostsNewForm',    
})(
    connect(null, {createPost})(PostsNew)
);