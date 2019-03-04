import React, { Component } from 'react';
import { Formik } from 'formik';

class FormWizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      bag.setSubmitting(false);
      console.log(values);
      this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <div className="form-btn btn-row">
              {page > 0 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.previous}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}

              {!isLastPage &&
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Continue
                </button>
              }
              {isLastPage && (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {this.props.submitText ? this.props.submitText : 'Submit'}
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

export default FormWizard;
