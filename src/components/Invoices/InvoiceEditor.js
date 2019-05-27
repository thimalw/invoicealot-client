import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import './InvoiceEditor.css';

class InvoiceEditor extends Component {
  render() {
    return (
      <div className="invoice-editor">
        <div className="invoice-body">
          <Formik
            initialValues={{
              number: this.props.invoice.number,
              createdAt: this.props.invoice.createdAt,
              dueDate: this.props.invoice.dueDate
            }}
            validationSchema={this.signupSchema}
            onSubmit={this.onSubmit}
          >
            {(errors, touched, isSubmitting) => (
              <Form>
                <div className="invoice-header">
                  <div className="row">
                    <div className="col">
                      <div className="invoice-organization">
                        <div className="organization-name">{this.props.organization.name}</div>
                      </div>
                    </div>
                    <div className="col col-right">
                      <div className="invoice-type text-right">{this.props.invoice.type}</div>
                      <div className="invoice-details-form">
                        <div className="form-group">
                          <label htmlFor="number">Invoice Number</label>
                          <Field
                            name="number"
                            type="text"
                            placeholder="Invoice Number"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="number">Invoice Date</label>
                          <Field
                            name="createdAt"
                            type="text"
                            placeholder="Invoice Date"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="number">Payment Due</label>
                          <Field
                            name="dueDate"
                            type="text"
                            placeholder="Payment Due"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-details">
                  <div className="row">
                    <div className="col">
                      Customer
                    </div>
                    <div className="col col-right">
                      
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default InvoiceEditor;
