import React, { Component } from 'react';
import { Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import './NewOrganization.css';
import AppContext, { AppConsumer } from '../../contexts/AppContext';
import FormWizard from '../Includes/FormWizard';
import { errorsToJsx } from '../../api/apiUtils';
import OrganizationApi from '../../api/organization.api';

class NewOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationPlans: [],
      formErrors: {}
    };
  }
  
  onSubmit = async (organization, actions) => {
    this.setState({
      formErrors: {}
    }, async () => {
      try {
        const res = await OrganizationApi.create(organization);

        if (res.data.data.organization.paid) {
          try {
            await this.context.selectOrganization(res.data.data.organization.id);
            this.props.history.push('/');
          } catch (err) {
            if (typeof (err.response) !== 'undefined') {
              const jsxErrors = errorsToJsx(err.response.data.data.errors);
              this.setState({
                formErrors: jsxErrors
              });
              toast.error(err.response.data.message);
              actions.setErrors(jsxErrors);
            }
          }
        }
      } catch (err) {
        if (typeof (err.response) !== 'undefined') {
          const jsxErrors = errorsToJsx(err.response.data.data.errors);
          this.setState({
            formErrors: jsxErrors
          });
          toast.error(err.response.data.message);
          actions.setErrors(jsxErrors);
        } else {
          toast.error('Unable to connect. Please try again later.');
        }
      }

      actions.setSubmitting(false);
    });
  };

  componentDidMount = async () => {
    const res = await OrganizationApi.listPlans();

    if (res.data.data.organizationPlans.length) {
      this.setState({
        organizationPlans: res.data.data.organizationPlans
      });
    }
  };
  
  render() {
    return (
      <AppConsumer>
        {({ organizations }) => (
          <div className="new-organization">
            <div className="container">
              {organizations.length ?
                <header>
                  <h1>Create a new organization</h1>
                </header>
              :
                <header>
                  <h1>Let's get started!</h1>
                </header>
              }

              {typeof this.state.formErrors.allFields !== 'undefined' &&
                <div className="alert alert-danger">
                  {this.state.formErrors.allFields}
                </div>
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
                  <div className="organization-select-cards">
                    {this.state.organizationPlans.map((organizationPlan) =>
                      <div
                        className="organization-select-container"
                        key={organizationPlan.id.toString()}>
                        <Field
                          id={`orgPln-${organizationPlan.id}`}
                          name="organizationPlanId"
                          type="radio"
                          value={organizationPlan.id}
                        />
                        <label
                          className="organization-select-card"
                          htmlFor={`orgPln-${organizationPlan.id}`}
                        >
                          <span className="organization-name">{organizationPlan.name}</span>
                          <span className="organization-price">{organizationPlan.price}</span>
                        </label>
                      </div>
                    )}
                  </div>
                </FormWizard.Page>
                <FormWizard.Page>
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
                    <label>Default Currency</label>
                    <span className="form-help">You will also be able to select the currency per invoice.</span>
                    <Field
                      name="currency"
                      component="select"
                      placeholder="Currency"
                    >
                      <option value="LKR">LKR</option>
                      <option value="USD">USD</option>
                    </Field>
                  </div>
                </FormWizard.Page>
                <FormWizard.Page>
                  <div className="form-group">
                    <label>Organization Address <sup>Optional</sup></label>
                    <Field
                      name="address1"
                      type="text"
                      placeholder="Address Line 1"
                    />
                    <Field
                      name="address2"
                      type="text"
                      placeholder="Address Line 2"
                    />
                    <Field
                      name="state"
                      type="text"
                      placeholder="State/Province"
                    />
                    <Field
                      name="zip"
                      type="text"
                      placeholder="ZIP/Postal Code"
                    />                    
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <Field
                      name="country"
                      component="select"
                      placeholder="Country"
                    >
                      <option value="LK">Sri Lanka</option>
                      <option value="US">United States of America</option>
                    </Field>
                  </div>
                </FormWizard.Page>
              </FormWizard>
            </div>
          </div>
        )}
      </AppConsumer>
    );
  }
}

NewOrganization.contextType = AppContext;

export default NewOrganization;
