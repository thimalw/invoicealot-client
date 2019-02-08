import React, { Component } from 'react';
import { Field } from 'formik';
import './NewOrganization.css';
import { AuthConsumer } from '../../contexts/AuthContext';
import FormWizard from '../Parts/FormWizard';

class NewOrganization extends Component {
  onSubmit = async (organization, actions) => {
    console.log(organization);
  };
  
  render() {
    return (
      <AuthConsumer>
        {({ organizations }) => (
          <div className="new-organization">
            <div className="container container-narrow">
              {organizations.length ?
                <header>
                  <h1>Create a new organization</h1>
                </header>
              :
                <header>
                  <h1>Let's get started!</h1>
                </header>
              }

              <FormWizard
                initialValues={{
                  name: ''
                }}
                onSubmit={this.onSubmit}
                submitText="Create Organization"
              >
                <FormWizard.Page>
                  <p>Welcome to Invoicealot! Let's create an organization for you to start issuing invoices from.</p>
                </FormWizard.Page>
                <FormWizard.Page>
                  <div className="card">
                    <div className="form-group">
                      <label>Organization name</label>
                      <span className="form-help">If you don't have a company, just use your own name or any other which you want to appear on your invoices.</span>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Organization Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Logo</label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Organization Name"
                      />
                    </div>
                  </div>
                </FormWizard.Page>
                <FormWizard.Page>
                  <div className="card">
                    <div className="form-group">
                      <label>Logo</label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Organization Name"
                      />
                    </div>
                  </div>
                </FormWizard.Page>
              </FormWizard>
            </div>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default NewOrganization;
